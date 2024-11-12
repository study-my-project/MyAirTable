package com.myproject.myairtable.domain.workspace.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class WorkspaceCreateRequestDto {

    // Workspace의 이름
    private String workspaceName;
}
