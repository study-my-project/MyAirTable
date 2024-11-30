package com.myproject.myairtable.domain.tables;

import com.myproject.myairtable.domain.cellvalue.CellValue;
import com.myproject.myairtable.domain.cellvalue.CellValueRepository;
import com.myproject.myairtable.domain.field.Field;
import com.myproject.myairtable.domain.field.FieldRepository;
import com.myproject.myairtable.domain.record.Record;
import com.myproject.myairtable.domain.record.RecordRepository;
import com.myproject.myairtable.domain.tables.dto.TableCreateRequestDto;
import com.myproject.myairtable.domain.tables.dto.TableDetailsResponseDto;
import com.myproject.myairtable.domain.tables.dto.TableIndexUpdateRequestDto;
import com.myproject.myairtable.domain.tables.dto.TableUpdateRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableService {


    private final TableRepository tableRepository;
    private final FieldRepository fieldRepository;
    private final RecordRepository recordRepository;
    private final CellValueRepository cellValueRepository;

    // Create
    public Table createTable(TableCreateRequestDto tableCreateRequestDto) {
        synchronized (this){
            int currentTableCount = tableRepository.countByBaseId(tableCreateRequestDto.getBaseId());
            int newTableCount = currentTableCount + 1;
            Table table = new Table(tableCreateRequestDto,newTableCount);
            return tableRepository.save(table);
        }
    }

    // Read - 해당 베이스의 모든 Table 목록으로 보기
    public List<Table> getTablesByBaseId(Long baseId) {
        return tableRepository.findByBaseIdOrderByTableIndex(baseId);
    }

    // Read - 특정 테이블 읽기
    public TableDetailsResponseDto getTableDetailsById(Long tableId) {
        // 테이블에 속한 필드들 가져오기
        List<Field> fieldsList = fieldRepository.findByTableIdOrderByFieldIndex(tableId);
        Field[] fields = fieldsList.toArray(new Field[0]);

        // 테이블에 속한 레코드들 가져오기
        List<Record> recordsList = recordRepository.findByTableIdOrderByRecordIndex(tableId);
        Record[] records = recordsList.toArray(new Record[0]);

        // 셀 값 가져오기 필드, 레코드의 ID 값을 사용함
        List<Long> fieldIds = fieldsList.stream()
                .map(Field::getId)
                .toList();
        List<Long> recordIds = recordsList.stream()
                .map(Record::getId)
                .toList();

        CellValue[] cellValues = cellValueRepository.findByFieldIdInAndRecordIdInAndDeletedAtIsNull(fieldIds, recordIds)
                .toArray(new CellValue[0]);

        // 응답 객체 생성 및 데이터 설정
        TableDetailsResponseDto responseDto = new TableDetailsResponseDto();
        responseDto.setFields(fields);
        responseDto.setRecords(records);
        responseDto.setCellValues(cellValues);

        return responseDto;
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

    // 테이블 위치 변경하기
    @Transactional
    public Boolean updateTableIndex (TableIndexUpdateRequestDto tableIndexUpdateRequestDto){
        try{
            // 변경할 테이블 조회
            Table table = tableRepository.findById(tableIndexUpdateRequestDto.getTableId())
                    .orElseThrow(() -> new IllegalArgumentException("Table not found with id: " + tableIndexUpdateRequestDto.getTableId()));

            // 이동할 Index
            int newIndex = tableIndexUpdateRequestDto.getNewIndex();
            // 동일한 베이스 내에서만 이동하도록 베이스 ID 가져오기
            Long baseId = table.getBaseId();

            // 기존의 index 값
            int oldIndex = table.getTableIndex();

            // 만약 기존과 신규가 같으면 변경할 필요없이 종료
            if (oldIndex == newIndex){
                return true;
            }

            // 인덱스 순서로 베이스내의 테이블 전부 불러오기
            List<Table> tables = tableRepository.findByBaseIdOrderByTableIndex(baseId);

            // 새로운 인덱스 < 기존 인덱스
            if(newIndex < oldIndex){
                // 앞으로 이동
                for(Table t : tables){
                    if(t.getTableIndex() >= newIndex && t.getTableIndex() < oldIndex){
                        t.updateTableIndex(t.getTableIndex() + 1);
                    }
                }
                // 새로운 인덱스 > 기존 인덱스
            } else {
                for(Table t : tables){
                    if(t.getTableIndex() <= newIndex && t.getTableIndex() > oldIndex){
                        t.updateTableIndex(t.getTableIndex() - 1);
                    }
                }
            }
            // 변경하려는 테이블의 index도 업데이트
            table.updateTableIndex(newIndex);
            return true;
        } catch (Exception e) {
            // 예외 발생시 false 반환
            e.printStackTrace();
            return false;
        }
    }

    // Delete (논리 삭제)
    public Boolean deleteTable(Long id) {
        return tableRepository.findById(id)
                .map(table -> {
                    table.delete();
                    tableRepository.save(table);
                    return true;
                })
                .orElse(false);
    }



}
