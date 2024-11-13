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
        Field field = new Field(fieldCreateRequestDto);
        return fieldRepository.save(field);
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
    public void deleteField(Long id) {
        fieldRepository.findById(id)
                .ifPresent(field -> {
                    field.delete(); // 논리적 삭제 수행
                    fieldRepository.save(field); // 변경사항 저장
                });
    }
}
