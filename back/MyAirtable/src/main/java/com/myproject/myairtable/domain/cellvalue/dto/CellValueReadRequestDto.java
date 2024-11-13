package com.myproject.myairtable.domain.cellvalue.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class CellValueReadRequestDto {

    private Long fieldId;

    private Long recordId;
}
