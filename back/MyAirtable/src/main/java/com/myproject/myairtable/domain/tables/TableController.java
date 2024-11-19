package com.myproject.myairtable.domain.tables;


import com.myproject.myairtable.domain.tables.dto.TableCreateRequestDto;
import com.myproject.myairtable.domain.tables.dto.TableUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class TableController {

    private final TableService tableService;

    // Create
    @MutationMapping
    public Table createTable(@Argument TableCreateRequestDto tableCreateRequestDto) {
        return tableService.createTable(tableCreateRequestDto);
    }

    // Read - 모든 Table 목록으로 보기
    @QueryMapping
    public List<Table> getTablesByBaseId(@Argument Long baseId) {
        return tableService.getTablesByBaseId(baseId);
    }

    // Read - 특정 Table 보기
    @QueryMapping
    public Table getTableById(@Argument Long tableId) {
        return tableService.getTableById(tableId);
    }


    // Update
    @MutationMapping
    public ResponseEntity<Table> updateTable(@Argument TableUpdateRequestDto tableUpdateRequestDto) {
        Table updatedTable = tableService.updateTable(tableUpdateRequestDto);
        return ResponseEntity.ok(updatedTable);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public Boolean deleteTable(@Argument Long tableId) {
        return tableService.deleteTable(tableId);
    }

}
