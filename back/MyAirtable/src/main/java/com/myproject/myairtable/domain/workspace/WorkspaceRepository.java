package com.myproject.myairtable.domain.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    // 논리적으로 삭제되지 않은 Workspace만 조회
    @Query("SELECT w FROM Workspace w WHERE w.deletedAt IS NULL")
    List<Workspace> findAllNotDeleted();

    // 논리적으로 삭제되지 않은 특정 Workspace 조회
    @Query("SELECT w FROM Workspace w WHERE w.id = :id AND w.deletedAt IS NULL")
    Optional<Workspace> findByIdAndNotDeleted(@Param("id") Long id);
}
