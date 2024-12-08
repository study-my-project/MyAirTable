package com.myproject.myairtable.domain.field;

import com.myproject.myairtable.domain.field.dto.FieldCreateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldIndexUpdateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldUpdateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldWidthUpdateRequestDto;
import com.myproject.myairtable.domain.record.Record;
import com.myproject.myairtable.domain.record.dto.RecordIndexUpdateRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FieldService {


    private final FieldRepository fieldRepository;

    // Create
    public Field createField(FieldCreateRequestDto fieldCreateRequestDto) {
        synchronized (this) { // 동기화 처리로 값 충돌 방지
            int currentFieldCount = fieldRepository.countByTableId(fieldCreateRequestDto.getTableId());
            int newFieldIndex = currentFieldCount + 1;

            Field field = new Field(fieldCreateRequestDto, newFieldIndex);
            return fieldRepository.save(field);
        }
    }

    // Read - 해당 테이블의 모든 Field 목록으로 보기
    public List<Field> getFieldsByTableId(Long tableId) {
        return fieldRepository.findByTableIdOrderByFieldIndex(tableId);
    }

    // Update
    public Field updateField(FieldUpdateRequestDto fieldUpdateRequestDto) {
        return fieldRepository.findById(fieldUpdateRequestDto.getFieldId())
                .map(field -> {
                    field.updateField(fieldUpdateRequestDto);  // update 메서드 호출
                    return fieldRepository.save(field); // 변경된 필드 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 필드를 찾을 수 없습니다: " + fieldUpdateRequestDto.getFieldId()));
    }

    // 필드 순서 변경
    // 동시성 문제를 예방했음
    // 필드 이동 로직이 깔끔하고 유지보수가 쉬움
    // synchronized 키워드는 글로벌 잠금이기에 성능병목이 있을 수 있음
    // 모든 필드를 한번에 가져와 처리하므로 데이터 양이 많을수록 비효율적
    // synchronized 블록에서 DB 작업이 이루어지면 잠금시간이 길어질 수 있음.
    @Transactional
    public Boolean updateFieldIndex(FieldIndexUpdateRequestDto fieldIndexUpdateRequestDto) {

        int newIndex = fieldIndexUpdateRequestDto.getNewIndex();

        // 변경할 레코드 조회
        Field field = fieldRepository.findById(fieldIndexUpdateRequestDto.getFieldId())
                .orElseThrow(() -> new IllegalArgumentException("Field not found with id: " + fieldIndexUpdateRequestDto.getFieldId()));

        Long tableId = field.getTableId();
        int oldIndex = field.getFieldIndex();


        if (oldIndex == newIndex) {
            return true; // 이미 올바른 위치
        }

        // 트랜잭션 잠금 설정
        // 데드락(동시성 제어)를 위해
        List<Field> fields = fieldRepository.findByTableIdOrderByFieldIndex(tableId);
        synchronized (this) {
            if (newIndex < oldIndex) {
                // 앞으로 이동
                fields.stream()
                        .filter(f -> f.getFieldIndex() >= newIndex && f.getFieldIndex() < oldIndex)
                        .forEach(f -> f.updateFieldIndex(f.getFieldIndex() + 1));
            } else {
                // 뒤로 이동
                fields.stream()
                        .filter(f -> f.getFieldIndex() > oldIndex && f.getFieldIndex() <= newIndex)
                        .forEach(f -> f.updateFieldIndex(f.getFieldIndex() - 1));
            }

            // 변경하려는 레코드의 인덱스 설정
            field.updateFieldIndex(newIndex);
        }

        return true;

    }

    // 필드 width 조절
    public Field updateFieldWidth(FieldWidthUpdateRequestDto fieldWidthUpdateRequestDto) {
        return fieldRepository.findById(fieldWidthUpdateRequestDto.getFieldId())
                .map(field -> {
                    field.updateFieldWidth(fieldWidthUpdateRequestDto.getNewWidth());  // update 메서드 호출
                    return fieldRepository.save(field); // 변경된 필드 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 필드를 찾을 수 없습니다: " + fieldWidthUpdateRequestDto.getFieldId()));
    }

    // Delete (논리 삭제)
    public Boolean deleteField(Long id) {
        return fieldRepository.findById(id)
                .map(field -> {
                    // 삭제하려는 필드의 Index값
                    int deletedIndex = field.getFieldIndex();
                    Long tableId = field.getTableId();
                    field.delete(); // 논리적 삭제 수행
                    fieldRepository.save(field); // 변경사항 저장

                    // 삭제된 인덱스보다 큰 인덱스 -1 시킴
                    List<Field> affectedFields = fieldRepository.findByTableIdAndIndexGreaterThan(tableId, deletedIndex);
                    for (Field f : affectedFields) {
                        f.updateFieldIndex(f.getFieldIndex() - 1);
                    }
                    return true;
                })
                .orElse(false);
    }
}
