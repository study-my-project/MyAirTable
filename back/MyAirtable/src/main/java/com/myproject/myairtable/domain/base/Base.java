package com.myproject.myairtable.domain.base;

import com.myproject.myairtable.domain.base.dto.BaseCreateRequestDto;
import com.myproject.myairtable.domain.base.dto.BaseUpdateRequestDto;
import com.myproject.myairtable.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="base")
public class Base extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "base_id", nullable = false)
    private Long id;

    @Column(name = "workspace_id", nullable = false)
    private Long workspaceId;


    @Column(name = "base_name", nullable = false)
    private String baseName;

    public Base(BaseCreateRequestDto baseCreateRequestDto) {
        this.baseName = baseCreateRequestDto.getBaseName();
        this.workspaceId = baseCreateRequestDto.getWorkspaceId();
    }

    public void updateBase(BaseUpdateRequestDto baseUpdateRequestDto) {
        if(baseUpdateRequestDto.getBaseName() != null) {
            this.baseName = baseUpdateRequestDto.getBaseName();
        }
        if(baseUpdateRequestDto.getWorkspaceId() != null) {
            this.workspaceId = baseUpdateRequestDto.getWorkspaceId();
        }
    }

}
