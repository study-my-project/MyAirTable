package com.myproject.myairtable.domain.cellvalue;

import com.myproject.myairtable.domain.cellvalue.dto.CellValueCreateRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class CellValueController {

    private final CellValueService cellValueService;

    // Create
    @MutationMapping
    public CellValue createCellValue(@Argument CellValueCreateRequestDto cellValueCreateRequestDto) {
        return cellValueService.createCellValue(cellValueCreateRequestDto);
    }


    // Update
    @MutationMapping
    public CellValue updateCellValue(@Argument CellValueUpdateRequestDto cellValueUpdateRequestDto ) {
        return cellValueService.updateCellValue(cellValueUpdateRequestDto);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public Boolean deleteCellValue(@Argument Long cellValueId) {
        return cellValueService.deleteCellValue(cellValueId);
    }
}
