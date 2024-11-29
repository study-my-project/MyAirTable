package com.myproject.myairtable.domain.record;

import com.myproject.myairtable.domain.record.dto.RecordCreateRequestDto;
import com.myproject.myairtable.domain.record.dto.RecordIndexUpdateRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;

    // Create
    public Record createRecord(RecordCreateRequestDto recordCreateRequestDto) {
        synchronized (this) {
            int currentRecordCount = recordRepository.countByTableID(recordCreateRequestDto.getTableId());
            int newRecordCount = currentRecordCount + 1;
            Record record = new Record(recordCreateRequestDto, newRecordCount);
            return recordRepository.save(record);
        }

    }

    // Read - 해당 테이블의 모든 Field 목록으로 보기
    public List<Record> getRecordsByTableId(Long tableId) {
        return recordRepository.findByTableIdOrderByRecordIndex(tableId);
    }

    // 순서변경
    @Transactional
    public Boolean updateRecordIndex(RecordIndexUpdateRequestDto recordIndexUpdateRequestDto) {
        try {
            // 변경할 레코드 조회
            Record record = recordRepository.findById(recordIndexUpdateRequestDto.getRecordId())
                    .orElseThrow(() -> new IllegalArgumentException("Record not found with id: " + recordIndexUpdateRequestDto.getRecordId()));

            // 이동할 Index값
            int newIndex = recordIndexUpdateRequestDto.getNewIndex();
            // 동일한 테이블 내에서만 변경하기위해 테이블id 가져오기
            Long tableId = record.getTableId();

            // 기존 index 값
            int oldIndex = record.getRecordIndex();

            // 만약 기존 = 신규 면 변경할 필요없이 종료
            if (oldIndex == newIndex) {
                return true; // 이미 올바른 위치에 있으므로 성공으로 간주
            }

            // 인덱스 순서로 테이블내의 record 를 전부 불러옴
            List<Record> records = recordRepository.findByTableIdOrderByRecordIndex(tableId);

            // 새로운 index가 기존 index 보다 작으면
            if (newIndex < oldIndex) {
                // 앞으로 이동해야함
                for (Record r : records) {
                    // 가져온 레코드의 index가 새로운 인덱스보다 크고, 기존 index보다 작으면
                    if (r.getRecordIndex() >= newIndex && r.getRecordIndex() < oldIndex) {
                        // 인덱스 값을 1씩 증가 (변경할 레코드가 들어갈 자리를 만들기 위해서)
                        r.updateRecordIndex(r.getRecordIndex() + 1);
                    }
                }
                // 아니면 ( 새로운 index가 기존 index 보다 크면 )
            } else {
                // 뒤로 이동해야함
                for (Record r : records) {
                    if (r.getRecordIndex() > oldIndex && r.getRecordIndex() <= newIndex) {
                        r.updateRecordIndex(r.getRecordIndex() - 1);
                    }
                }
            }

            // 변경하려는 레코드의 index를 업데이트
            record.updateRecordIndex(newIndex);
            return true; // 성공적으로 업데이트 완료
        } catch (Exception e) {
            // 예외 발생 시 false 반환
            e.printStackTrace();
            return false;
        }

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
