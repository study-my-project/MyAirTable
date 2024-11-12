package com.myproject.myairtable.domain.base;

import com.myproject.myairtable.domain.base.dto.BaseCreateRequestDto;
import com.myproject.myairtable.domain.base.dto.BaseUpdateRequestDto;
import com.myproject.myairtable.domain.workspace.Workspace;
import com.myproject.myairtable.domain.workspace.WorkspaceRepository;
import com.myproject.myairtable.domain.workspace.dto.WorkspaceCreateRequestDto;
import com.myproject.myairtable.domain.workspace.dto.WorkspaceUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BaseService {

    private final BaseRepository baseRepository;

    // Create
    public Base createBase(BaseCreateRequestDto baseCreateRequestDto) {
        Base base = new Base(baseCreateRequestDto);
        return baseRepository.save(base);
    }

    // Read - 모든 Base 목록으로 보기
    public List<Base> getBasesByWorkspaceId(Long workspaceId) {
        return baseRepository.findByWorkspaceId(workspaceId);
    }

    // Update
    public Base updateBase(BaseUpdateRequestDto baseUpdateRequestDto) {
        return baseRepository.findById(baseUpdateRequestDto.getId())
                .map(base -> {
                    base.updateBase(baseUpdateRequestDto);  // update 메서드 호출
                    return baseRepository.save(base); // 변경된 workspace 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 베이스를 찾을 수 없습니다: " + baseUpdateRequestDto.getId()));
    }

    // Delete (논리 삭제)
    public void deleteBase(Long id) {
        baseRepository.findById(id)
                .ifPresent(base -> {
                    base.delete(); // 논리적 삭제 수행
                    baseRepository.save(base); // 변경사항 저장
                });
    }


}
