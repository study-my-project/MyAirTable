package com.myproject.myairtable.domain.workspace;

import com.myproject.myairtable.domain.workspace.dto.WorkspaceCreateRequestDto;
import com.myproject.myairtable.domain.workspace.dto.WorkspaceUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;

    // Create
    public Workspace createWorkspace(WorkspaceCreateRequestDto workspaceCreateRequestDto) {
        Workspace workspace = new Workspace(workspaceCreateRequestDto);
        return workspaceRepository.save(workspace);
    }

    // Read - 모든 Workspace 목록으로 보기
    public List<Workspace> getAllWorkspaces() {
        System.out.println("모든항목찾기");
        return workspaceRepository.findAllNotDeleted();
    }
    // Read - 특정 Workspace 내용 보기
    public Workspace getWorkspaceById(Long id) {
        return workspaceRepository.findByIdAndNotDeleted(id).orElse(null);
    }

    // Update
    public Workspace updateWorkspace(WorkspaceUpdateRequestDto workspaceUpdateRequestDto) {
        return workspaceRepository.findById(workspaceUpdateRequestDto.getId())
                .map(workspace -> {
                    workspace.updateWorkspace(workspaceUpdateRequestDto);  // update 메서드 호출
                    return workspaceRepository.save(workspace); // 변경된 workspace 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 워크스페이스를 찾을 수 없습니다: " + workspaceUpdateRequestDto.getId()));
    }

    // Delete (논리 삭제)
    public void deleteWorkspace(Long id) {
        workspaceRepository.findById(id)
                .ifPresent(workspace -> {
                    workspace.delete(); // 논리적 삭제 수행
                    workspaceRepository.save(workspace); // 변경사항 저장
                });
    }
}
