package com.myproject.myairtable.global;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseEntity {

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @PrePersist     //엔티티가 처음으로 영속화(Persistence) 되기 전에 호출
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate  //엔티티가 이미 데이터베이스에 존재하고, 업데이트(Update) 되기 전에 호출
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // 논리적 삭제 메서드
    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }
}
