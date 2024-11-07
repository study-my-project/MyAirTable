package com.myproject.myairtable.domain.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    // 논리적으로 삭제되지 않은 Workspace만 조회
    @Query("SELECT w FROM Workspace w WHERE w.deletedAt IS NULL")
    List<Workspace> findAllNotDeleted();
}
