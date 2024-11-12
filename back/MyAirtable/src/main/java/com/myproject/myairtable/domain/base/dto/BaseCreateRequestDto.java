package com.myproject.myairtable.domain.base.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class BaseCreateRequestDto {

    // 워크스페이스 ID
    private Long workspaceId;

    // 베이스 이름
    private String baseName;

}
