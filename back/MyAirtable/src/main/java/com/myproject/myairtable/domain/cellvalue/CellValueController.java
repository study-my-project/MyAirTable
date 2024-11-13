package com.myproject.myairtable.domain.cellvalue;

import com.myproject.myairtable.domain.cellvalue.dto.CellValueCreateRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueReadRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueUpdateRequestDto;
import com.myproject.myairtable.domain.field.Field;
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
public class CellValueController {

    private final CellValueService cellValueService;

    // Create
    @MutationMapping
    public ResponseEntity<CellValue> createCellValue(@Argument CellValueCreateRequestDto cellValueCreateRequestDto) {
        CellValue cellValue = cellValueService.createCellValue(cellValueCreateRequestDto);
        return ResponseEntity.ok(cellValue);
    }

    // Read - 필드, 레코드 id로 CellValue 가져오기
    @QueryMapping
    public ResponseEntity<CellValue> getCellValue(@Argument CellValueReadRequestDto cellValueReadRequestDto) {
        return cellValueService.getCellValue(cellValueReadRequestDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // Update
    @MutationMapping
    public ResponseEntity<CellValue> updateCellValue(@Argument CellValueUpdateRequestDto cellValueUpdateRequestDto ) {
        CellValue updateCellValue = cellValueService.updateCellValue(cellValueUpdateRequestDto);
        return ResponseEntity.ok(updateCellValue);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public ResponseEntity<Void> deleteCellValue(@Argument Long cellValueId) {
        cellValueService.deleteCellValue(cellValueId);
        return ResponseEntity.noContent().build();
    }
}
