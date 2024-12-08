package com.myproject.myairtable.domain.record.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class RecordHeightUpdateRequestDto {

    // 레코드 ID
    private Long recordId;

    // 수정할 높이값
    private int newHeight;
}
