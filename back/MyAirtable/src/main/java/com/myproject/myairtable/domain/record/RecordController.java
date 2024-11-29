package com.myproject.myairtable.domain.record;

import com.myproject.myairtable.domain.record.dto.RecordCreateRequestDto;
import com.myproject.myairtable.domain.record.dto.RecordIndexUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    // Create
    @MutationMapping
    public Record createRecord(@Argument RecordCreateRequestDto recordCreateRequestDto) {
        return recordService.createRecord(recordCreateRequestDto);
    }

    // Read - 해당 테이블의 Record 목록으로 보기
    @QueryMapping
    public List<Record> getRecordsByTableId(@Argument Long tableId) {
        return recordService.getRecordsByTableId(tableId);
    }

    // 레코드의 순서 변경
    @MutationMapping
    public Boolean updateRecordIndex(@Argument RecordIndexUpdateRequestDto recordIndexUpdateRequestDto){
        return recordService.updateRecordIndex(recordIndexUpdateRequestDto);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public Boolean deleteRecord(@Argument Long recordId) {
        return recordService.deleteRecord(recordId);
    }

}
