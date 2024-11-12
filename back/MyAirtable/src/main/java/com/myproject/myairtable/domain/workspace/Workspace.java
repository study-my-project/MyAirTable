package com.myproject.myairtable.domain.workspace;

import com.myproject.myairtable.domain.workspace.dto.WorkspaceCreateRequestDto;
import com.myproject.myairtable.domain.workspace.dto.WorkspaceUpdateRequestDto;
import com.myproject.myairtable.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="workspace")
public class Workspace extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workspace_id", nullable = false)
    private Long id;

    @Column(name = "workspace_name", nullable = false)
    private String workspaceName;

    public Workspace (WorkspaceCreateRequestDto workspaceCreateRequestDto) {
        this.workspaceName = workspaceCreateRequestDto.getWorkspaceName();
    }

    public void updateWorkspace (WorkspaceUpdateRequestDto workspaceUpdateRequestDto) {
        if(workspaceUpdateRequestDto.getWorkspaceName() != null) {
            this.workspaceName = workspaceUpdateRequestDto.getWorkspaceName();
        }

    }
}


