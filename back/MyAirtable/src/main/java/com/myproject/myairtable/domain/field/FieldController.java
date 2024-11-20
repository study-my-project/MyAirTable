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
    public Field createField(@Argument FieldCreateRequestDto fieldCreateRequestDto) {
        return fieldService.createField(fieldCreateRequestDto);
    }

    // Read - 해당 테이블의 Field 목록으로 보기
    @QueryMapping
    public List<Field> getFieldsByTableId(@Argument Long tableId) {
        return fieldService.getFieldsByTableId(tableId);
    }


    // Update
    @MutationMapping
    public Field updateField(@Argument FieldUpdateRequestDto fieldUpdateRequestDto ) {
        return fieldService.updateField(fieldUpdateRequestDto);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public Boolean deleteField(@Argument Long fieldId) {
        return fieldService.deleteField(fieldId);
    }

}
