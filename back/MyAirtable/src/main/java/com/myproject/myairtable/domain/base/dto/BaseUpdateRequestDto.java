package com.myproject.myairtable.domain.base.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class BaseUpdateRequestDto {

    // 베이스 ID
    private Long id;

    // 베이스 이름
    private String baseName;
}
