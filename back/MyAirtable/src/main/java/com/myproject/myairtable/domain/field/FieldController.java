package com.myproject.myairtable.domain.field;

import com.myproject.myairtable.domain.field.dto.FieldCreateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class FieldController {

    private final FieldService fieldService;

    // Create
    @MutationMapping
    public ResponseEntity<Field> createField(@Argument FieldCreateRequestDto fieldCreateRequestDto) {
        Field field = fieldService.createField(fieldCreateRequestDto);
        return ResponseEntity.ok(field);
    }

    // Read - 해당 테이블의 Field 목록으로 보기
    @QueryMapping
    public ResponseEntity<List<Field>> getFieldsByTableId(@Argument Long tableId) {
        List<Field> field = fieldService.getFieldsByTableId(tableId);
        return ResponseEntity.ok(field);
    }


    // Update
    @MutationMapping
    public ResponseEntity<Field> updateField(@Argument FieldUpdateRequestDto fieldUpdateRequestDto ) {
        Field updatedField = fieldService.updateField(fieldUpdateRequestDto);
        return ResponseEntity.ok(updatedField);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public ResponseEntity<Void> deleteField(@Argument Long fieldId) {
        fieldService.deleteField(fieldId);
        return ResponseEntity.noContent().build();
    }

}
