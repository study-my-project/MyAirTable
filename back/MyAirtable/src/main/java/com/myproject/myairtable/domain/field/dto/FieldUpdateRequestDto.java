package com.myproject.myairtable.domain.field.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class FieldUpdateRequestDto {
    // 필드 ID
    private Long Id;

    // 상단부 이름
    private String fieldName;

    // 들어가는 데이터 타입 - 텍스트, 체크박스, 선택리스트 등
    private String type;

    // 옵션 - 타입에 따른 추가적 옵션
    private String options;
}
