package com.myproject.myairtable.domain.base;

import com.myproject.myairtable.domain.base.dto.BaseCreateRequestDto;
import com.myproject.myairtable.domain.base.dto.BaseUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class BaseController {

    private final BaseService baseService;

    // Create
    @MutationMapping
    public Base  createBase(@Argument BaseCreateRequestDto baseCreateRequestDto) {
        System.out.println(baseCreateRequestDto.getBaseName());
        System.out.println("베이스 만들기");
        return baseService.createBase(baseCreateRequestDto);
    }

    // Read - 모든 Base 목록으로 보기
    @QueryMapping
    public List<Base> getBasesByWorkspaceId(@Argument Long workspaceId) {
        return baseService.getBasesByWorkspaceId(workspaceId);
    }

    // Read - 특정 Base 조회하기
    @QueryMapping
    public Base getBaseById(@Argument Long BaseId) {
        return baseService.getBaseById(BaseId);
    }


    // Update
    @MutationMapping
    public Base updateBase(@Argument BaseUpdateRequestDto baseUpdateRequestDto) {
        return baseService.updateBase(baseUpdateRequestDto);
    }

    // Delete (논리 삭제)
    @MutationMapping
    public Boolean deleteBase(@Argument Long baseId) {
        return baseService.deleteBase(baseId);
    }

}