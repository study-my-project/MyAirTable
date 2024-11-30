package com.myproject.myairtable.domain.tables;


import com.myproject.myairtable.domain.tables.dto.TableCreateRequestDto;
import com.myproject.myairtable.domain.tables.dto.TableDetailsResponseDto;
import com.myproject.myairtable.domain.tables.dto.TableIndexUpdateRequestDto;
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

    // Read - 특정 Table 필드, 레코드, 셀 밸류 가져오기
    @QueryMapping
    public TableDetailsResponseDto getTableDetailsById(@Argument Long tableId) {
        return tableService.getTableDetailsById(tableId);
    }


    // Update
    @MutationMapping
    public Table updateTable(@Argument TableUpdateRequestDto tableUpdateRequestDto) {
        return tableService.updateTable(tableUpdateRequestDto);
    }

    // IndexUpdate
    @MutationMapping
    public Boolean updateTableIndex(@Argument TableIndexUpdateRequestDto tableIndexUpdateRequestDto) {
        return tableService.updateTableIndex(tableIndexUpdateRequestDto);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public Boolean deleteTable(@Argument Long tableId) {
        return tableService.deleteTable(tableId);
    }

}
