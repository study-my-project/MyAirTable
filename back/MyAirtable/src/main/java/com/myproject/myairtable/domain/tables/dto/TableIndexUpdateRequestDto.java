package com.myproject.myairtable.domain.tables.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class TableIndexUpdateRequestDto {

    // 변경할 테이블의 id값
    private Long tableId;

    // 이동할 Index값
    private int newIndex;
}
