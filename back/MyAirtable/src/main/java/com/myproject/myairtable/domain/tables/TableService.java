package com.myproject.myairtable.domain.tables;

import com.myproject.myairtable.domain.tables.dto.TableCreateRequestDto;
import com.myproject.myairtable.domain.tables.dto.TableUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableService {


    private final TableRepository tableRepository;

    // Create
    public Table createTable(TableCreateRequestDto tableCreateRequestDto) {
        Table table = new Table(tableCreateRequestDto);
        return tableRepository.save(table);
    }

    // Read - 해당 베이스의 모든 Table 목록으로 보기
    public List<Table> getTablesByBaseId(Long baseId) {
        return tableRepository.findByBaseId(baseId);
    }

    // Update
    public Table updateTable(TableUpdateRequestDto tableUpdateRequestDto) {
        return tableRepository.findById(tableUpdateRequestDto.getId())
                .map(table -> {
                    table.updateTable(tableUpdateRequestDto);  // update 메서드 호출
                    return tableRepository.save(table); // 변경된 테이블 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 테이블을 찾을 수 없습니다: " + tableUpdateRequestDto.getId()));
    }

    // Delete (논리 삭제)
    public void deleteTable(Long id) {
        tableRepository.findById(id)
                .ifPresent(table -> {
                    table.delete(); // 논리적 삭제 수행
                    tableRepository.save(table); // 변경사항 저장
                });
    }



}
