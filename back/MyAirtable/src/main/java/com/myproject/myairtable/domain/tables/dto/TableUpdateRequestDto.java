package com.myproject.myairtable.domain.tables.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class TableUpdateRequestDto {
    // 테이블 ID
    private Long id;

    // 테이블 이름
    private String TableName;
}
