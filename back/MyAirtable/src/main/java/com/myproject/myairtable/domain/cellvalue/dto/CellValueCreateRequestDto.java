package com.myproject.myairtable.domain.cellvalue.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class CellValueCreateRequestDto {

    private Long fieldId;

    private Long recordId;

    private String value;
}
