package com.myproject.myairtable.domain.cellvalue.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class CellValueUpdateRequestDto {

    private Long fieldId;

    private Long recordId;

    // 입력 내용
    private String value;
}
