package com.myproject.myairtable.domain.workspace.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class WorkspaceUpdateRequestDto {

    // 해당 워크 스페이스의 ID
    private Long id;

    // 수정할 워크스페이스 이름
    private String workspaceName;
}
