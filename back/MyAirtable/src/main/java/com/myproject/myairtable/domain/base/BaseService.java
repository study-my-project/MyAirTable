package com.myproject.myairtable.domain.base;

import com.myproject.myairtable.domain.base.dto.BaseCreateRequestDto;
import com.myproject.myairtable.domain.base.dto.BaseUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BaseService {

    private final BaseRepository baseRepository;

    // Create
    public Base createBase(BaseCreateRequestDto baseCreateRequestDto) {
        Base base = new Base(baseCreateRequestDto);
        return baseRepository.save(base);
    }

    // Read - 해당 워크스페이스의 모든 Base 목록으로 보기
    public List<Base> getBasesByWorkspaceId(Long workspaceId) {
        return baseRepository.findByWorkspaceId(workspaceId);
    }

    // Read - 특정 Base 가져오기
    public Base getBaseById(Long id) {
        return baseRepository.findByIdAndNotDeleted(id);
    }

    // Update
    public Base updateBase(BaseUpdateRequestDto baseUpdateRequestDto) {
        return baseRepository.findById(baseUpdateRequestDto.getId())
                .map(base -> {
                    base.updateBase(baseUpdateRequestDto);  // update 메서드 호출
                    return baseRepository.save(base); // 변경된 베이스 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 베이스를 찾을 수 없습니다: " + baseUpdateRequestDto.getId()));
    }

    // Delete (논리 삭제)
    public Boolean deleteBase(Long id) {
        return baseRepository.findById(id)
                        .map(base -> {
                            base.delete();
                            baseRepository.save(base);
                            return true;
                        })
                .orElse(false);
    }
}
