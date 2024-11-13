package com.myproject.myairtable.domain.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BaseRepository extends JpaRepository<Base, Long> {


    @Query("SELECT w FROM Base w WHERE w.workspaceId = :workspaceId AND w.deletedAt IS NULL")
    List<Base> findByWorkspaceId(@Param("workspaceId") Long workspaceId);
}
