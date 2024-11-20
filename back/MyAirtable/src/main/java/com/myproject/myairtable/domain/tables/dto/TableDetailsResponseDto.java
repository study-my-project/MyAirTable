package com.myproject.myairtable.domain.tables.dto;

import com.myproject.myairtable.domain.cellvalue.CellValue;
import com.myproject.myairtable.domain.field.Field;
import com.myproject.myairtable.domain.record.Record;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class TableDetailsResponseDto {

    // 필드 리스트
    private Field[] fields;

    // 레코드 리스트
    private Record[] records;

    // 값들
    private CellValue[] cellValues;

}
