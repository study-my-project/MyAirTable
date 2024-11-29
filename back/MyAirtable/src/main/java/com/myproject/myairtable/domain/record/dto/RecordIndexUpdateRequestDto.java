package com.myproject.myairtable.domain.record.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class RecordIndexUpdateRequestDto {

    // 변경할 레코드의 id값
    private Long recordId;

    // 이동할 Index 값
    private int newIndex;

}
