package com.myproject.myairtable.domain.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BaseRepository extends JpaRepository<Base, Long> {

    // 논리적으로 삭제되지 않은 Base만 조회
    @Query("SELECT w FROM Base w WHERE w.deletedAt IS NULL")
    List<Base> findAllNotDeleted();

    @Query("SELECT w FROM Base w WHERE w.deletedAt IS NULL")
    List<Base> findByWorkspaceId(Long workspaceId);
}
