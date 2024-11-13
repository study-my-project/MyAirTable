package com.myproject.myairtable.domain.record;

import com.myproject.myairtable.domain.record.dto.RecordCreateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    // Create
    @MutationMapping
    public ResponseEntity<Record> createRecord(@Argument RecordCreateRequestDto recordCreateRequestDto) {
        Record record = recordService.createRecord(recordCreateRequestDto);
        return ResponseEntity.ok(record);
    }

    // Read - 해당 테이블의 Record 목록으로 보기
    @QueryMapping
    public ResponseEntity<List<Record>> getRecordsByTableId(@Argument Long tableId) {
        List<Record> record = recordService.getRecordsByTableId(tableId);
        return ResponseEntity.ok(record);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public ResponseEntity<Void> deleteRecord(@Argument Long recordId) {
        recordService.deleteRecord(recordId);
        return ResponseEntity.noContent().build();
    }

}
