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
    public Field updateField (FieldUpdateRequestDto fieldUpdateRequestDto) {
        return fieldRepository.findById(fieldUpdateRequestDto.getFieldId())
                .map(field -> {
                    field.updateField(fieldUpdateRequestDto);  // update 메서드 호출
                    return fieldRepository.save(field); // 변경된 필드 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 필드를 찾을 수 없습니다: " + fieldUpdateRequestDto.getFieldId()));
    }

    // 필드 순서 변경
    @Transactional
    public Boolean updateFieldIndex(FieldIndexUpdateRequestDto fieldIndexUpdateRequestDto) {
        try {
            // 변경할 레코드 조회
            Field field = fieldRepository.findById(fieldIndexUpdateRequestDto.getFieldId())
                    .orElseThrow(() -> new IllegalArgumentException("Field not found with id: " + fieldIndexUpdateRequestDto.getFieldId()));

            // 이동할 Index값
            int newIndex = fieldIndexUpdateRequestDto.getNewIndex();
            // 동일한 테이블 내에서만 변경하기위해 테이블id 가져오기
            Long tableId = field.getTableId();

            // 기존 index 값
            int oldIndex = field.getFieldIndex();

            // 만약 기존 = 신규 면 변경할 필요없이 종료
            if (oldIndex == newIndex) {
                return true; // 이미 올바른 위치에 있으므로 성공으로 간주
            }

            // 인덱스 순서로 테이블내의 field 를 전부 불러옴
            List<Field> fields = fieldRepository.findByTableIdOrderByFieldIndex(tableId);

            // 새로운 index가 기존 index 보다 작으면
            if (newIndex < oldIndex) {
                // 앞으로 이동해야함
                for (Field f : fields) {
                    // 가져온 레코드의 index가 새로운 인덱스보다 크고, 기존 index보다 작으면
                    if (f.getFieldIndex() >= newIndex && f.getFieldIndex() < oldIndex) {
                        // 인덱스 값을 1씩 증가 (변경할 레코드가 들어갈 자리를 만들기 위해서)
                        f.updateFieldIndex(f.getFieldIndex() + 1);
                    }
                }
                // 아니면 ( 새로운 index가 기존 index 보다 크면 )
            } else {
                // 뒤로 이동해야함
                for (Field f : fields) {
                    if (f.getFieldIndex() > oldIndex && f.getFieldIndex() <= newIndex) {
                        f.updateFieldIndex(f.getFieldIndex() - 1);
                    }
                }
            }

            // 변경하려는 레코드의 index를 업데이트
            field.updateFieldIndex(newIndex);
            return true; // 성공적으로 업데이트 완료
        } catch (Exception e) {
            // 예외 발생 시 false 반환
            e.printStackTrace();
            return false;
        }

    }

    // 필드 width 조절
    public Field updateFieldWidth(FieldWidthUpdateRequestDto fieldWidthUpdateRequestDto){
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
                    field.delete(); // 논리적 삭제 수행
                    fieldRepository.save(field); // 변경사항 저장
                    return true;
                })
                .orElse(false);
    }
}
