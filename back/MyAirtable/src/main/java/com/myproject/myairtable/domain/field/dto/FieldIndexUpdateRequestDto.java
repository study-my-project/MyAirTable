package com.myproject.myairtable.domain.field.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class FieldIndexUpdateRequestDto {

    // 변경할 레코드의 id값
    private Long fieldId;

    // 이동할 Index 값
    private int newIndex;

}
