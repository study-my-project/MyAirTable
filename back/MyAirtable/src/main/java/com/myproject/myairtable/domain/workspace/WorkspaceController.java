package com.myproject.myairtable.domain.workspace;


import com.myproject.myairtable.domain.workspace.dto.WorkspaceCreateRequestDto;
import com.myproject.myairtable.domain.workspace.dto.WorkspaceUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    // Create
    @MutationMapping
    public Workspace createWorkspace(@Argument WorkspaceCreateRequestDto workspaceCreateRequestDto) {
        return workspaceService.createWorkspace(workspaceCreateRequestDto);
    }

    // Read - 모든 Workspace 목록으로 보기
    @QueryMapping
    public List<Workspace> getAllWorkspaces() {
        return workspaceService.getAllWorkspaces();
    }

    // Read - 특정 Workspace 조회
    @QueryMapping
    public Workspace getWorkspace(@Argument Long workspaceId) {
        return workspaceService.getWorkspaceById(workspaceId);
    }

    // Update
    @MutationMapping
    public ResponseEntity<Workspace> updateWorkspace(@Argument WorkspaceUpdateRequestDto workspaceUpdateRequestDto) {
        Workspace updatedWorkspace = workspaceService.updateWorkspace(workspaceUpdateRequestDto);
        return ResponseEntity.ok(updatedWorkspace);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public ResponseEntity<Void> deleteWorkspace(@Argument Long workspaceId) {
        workspaceService.deleteWorkspace(workspaceId);
        return ResponseEntity.noContent().build();
    }
}
