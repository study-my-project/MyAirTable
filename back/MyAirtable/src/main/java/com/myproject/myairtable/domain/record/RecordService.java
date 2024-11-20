package com.myproject.myairtable.domain.record;

import com.myproject.myairtable.domain.record.dto.RecordCreateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;

    // Create
    public Record createRecord(RecordCreateRequestDto recordCreateRequestDto) {
        Record record = new Record(recordCreateRequestDto);
        return recordRepository.save(record);
    }

    // Read - 해당 테이블의 모든 Field 목록으로 보기
    public List<Record> getRecordsByTableId(Long tableId) {
        return recordRepository.findByTableId(tableId);
    }


    // Delete (논리 삭제)
    public Boolean deleteRecord(Long id) {
        return recordRepository.findById(id)
                .map(record -> {
                    record.delete(); // 논리적 삭제 수행
                    recordRepository.save(record); // 변경사항 저장
                    return true;
                })
                .orElse(false);
    }
}
