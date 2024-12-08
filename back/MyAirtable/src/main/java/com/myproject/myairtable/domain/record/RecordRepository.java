package com.myproject.myairtable.domain.record;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

    @Query("SELECT COUNT(r) FROM Record r WHERE r.tableId = :tableId AND r.deletedAt IS NULL")
    int countByTableId(@Param("tableId") Long tableId);

    // 논리적으로 삭제되지 않은 Record만 조회
    @Query("SELECT r FROM Record r WHERE r.tableId = :tableId AND r.deletedAt IS NULL ORDER BY r.recordIndex ASC")
    List<Record> findByTableIdOrderByRecordIndex(@Param("tableId") Long tableId);

    //특정 테이블의 논리적으로 삭제되지 않은 레코드를 인덱스로 조회
    @Query("SELECT r FROM Record r WHERE r.tableId = :tableId AND r.recordIndex = :recordIndex AND r.deletedAt IS NULL")
    Record findByTableIdAndRecordIndex(@Param("tableId") Long tableId, @Param("recordIndex") int recordIndex);

    // 특정 테이블의 논리적으로 삭제되지 않은 레코드 중 특정 인덱스보다 큰 레코드를 조회
    @Query("SELECT r FROM Record r WHERE r.tableId = :tableId AND r.recordIndex > :recordIndex AND r.deletedAt IS NULL ORDER BY r.recordIndex ASC")
    List<Record> findByTableIdAndIndexGreaterThan(@Param("tableId") Long tableId, @Param("recordIndex") int recordIndex);

}
