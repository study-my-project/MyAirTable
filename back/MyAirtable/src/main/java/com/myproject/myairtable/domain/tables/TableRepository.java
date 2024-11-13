package com.myproject.myairtable.domain.tables;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TableRepository extends JpaRepository<Table, Long> {

    // 논리적으로 삭제되지 않은 Table만 조회
    @Query("SELECT w FROM Table w WHERE w.deletedAt IS NULL")
    List<Table> findAllNotDeleted();

    @Query("SELECT w FROM Table w WHERE w.deletedAt IS NULL")
    List<Table> findByBaseId(Long baseId);

}
