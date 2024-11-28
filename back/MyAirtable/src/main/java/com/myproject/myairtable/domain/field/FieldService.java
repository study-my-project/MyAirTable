package com.myproject.myairtable.domain.field;

import com.myproject.myairtable.domain.field.dto.FieldCreateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldUpdateRequestDto;
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
        return fieldRepository.findByTableId(tableId);
    }

    // Update
    public Field updateField (FieldUpdateRequestDto fieldUpdateRequestDto) {
        return fieldRepository.findById(fieldUpdateRequestDto.getId())
                .map(field -> {
                    field.updateField(fieldUpdateRequestDto);  // update 메서드 호출
                    return fieldRepository.save(field); // 변경된 필드 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 필드를 찾을 수 없습니다: " + fieldUpdateRequestDto.getId()));
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
