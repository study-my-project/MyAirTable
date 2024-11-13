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
    public ResponseEntity<Table> createTable(@Argument TableCreateRequestDto tableCreateRequestDto) {
        Table table = tableService.createTable(tableCreateRequestDto);
        return ResponseEntity.ok(table);
    }

    // Read - 모든 Table 목록으로 보기
    @QueryMapping
    public ResponseEntity<List<Table>> getTablesByBaseId(@Argument Long baseId) {
        List<Table> table = tableService.getTablesByBaseId(baseId);
        return ResponseEntity.ok(table);
    }


    // Update
    @MutationMapping
    public ResponseEntity<Table> updateTable(@Argument TableUpdateRequestDto tableUpdateRequestDto) {
        Table updatedTable = tableService.updateTable(tableUpdateRequestDto);
        return ResponseEntity.ok(updatedTable);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public ResponseEntity<Void> deleteTable(@Argument Long tableId) {
        tableService.deleteTable(tableId);
        return ResponseEntity.noContent().build();
    }

}
