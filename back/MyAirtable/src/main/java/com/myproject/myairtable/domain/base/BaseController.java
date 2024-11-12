package com.myproject.myairtable.domain.base;

import com.myproject.myairtable.domain.base.dto.BaseCreateRequestDto;
import com.myproject.myairtable.domain.base.dto.BaseUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class BaseController {

    private final BaseService baseService;

    // Create
    @MutationMapping
    public ResponseEntity<Base> createBase(@Argument BaseCreateRequestDto baseCreateRequestDto) {
        Base base = baseService.createBase(baseCreateRequestDto);
        return ResponseEntity.ok(base);
    }

    // Read - 모든 Base 목록으로 보기
    @QueryMapping
    public ResponseEntity<List<Base>> getBasesByWorkspaceId(@Argument Long workspaceId) {
        List<Base> base = baseService.getBasesByWorkspaceId(workspaceId);
        return ResponseEntity.ok(base);
    }


    // Update
    @MutationMapping
    public ResponseEntity<Base> updateBase(@Argument BaseUpdateRequestDto baseUpdateRequestDto) {
        Base updatedBase = baseService.updateBase(baseUpdateRequestDto);
        return ResponseEntity.ok(updatedBase);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public ResponseEntity<Void> deleteBase(@Argument Long baseId) {
        baseService.deleteBase(baseId);
        return ResponseEntity.noContent().build();
    }

}