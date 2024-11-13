package com.myproject.myairtable.domain.record.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class RecordCreateRequestDto {
    // 테이블 ID
    private Long tableId;

}
