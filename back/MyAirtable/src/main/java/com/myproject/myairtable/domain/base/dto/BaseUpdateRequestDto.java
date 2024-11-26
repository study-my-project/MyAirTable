package com.myproject.myairtable.domain.base.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class BaseUpdateRequestDto {

    // 베이스 ID
    private Long id;

    // 워크스페이스 id : 워크스페이스를 이동할때 사용
    private Long workspaceId;

    // 베이스 이름
    private String baseName;
}
