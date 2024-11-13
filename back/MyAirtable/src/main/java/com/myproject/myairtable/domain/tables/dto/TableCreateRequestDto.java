package com.myproject.myairtable.domain.tables.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class TableCreateRequestDto {

    // 베이스 ID
    private Long baseId;
    // 테이블 이름
    private String tableName;
}
