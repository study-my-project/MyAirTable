package com.myproject.myairtable.domain.cellvalue.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class CellValueUpdateRequestDto {

    // 셀 ID
    private Long Id;

    // 입력 내용
    private String value;
}
