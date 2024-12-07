package com.myproject.myairtable.domain.field.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class FieldWidthUpdateRequestDto {

    // 필드 ID
    private Long fieldId;

    // 수정할 width 값
    private int newWidth;
}
