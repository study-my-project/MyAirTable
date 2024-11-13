package com.myproject.myairtable.domain.record;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

    // 논리적으로 삭제되지 않은 Record만 조회
    @Query("SELECT w FROM Record w WHERE w.tableId = :tableId AND w.deletedAt IS NULL")
    List<Record> findByTableId(@Param("tableId") Long tableId);
}
