package com.myproject.myairtable.domain.field;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FieldRepository extends JpaRepository<Field, Long> {

    @Query("SELECT COUNT(f) FROM Field f WHERE f.tableId = :tableId AND f.deletedAt IS NULL")
    int countByTableId(@Param("tableId") Long tableId);

    @Query("SELECT f FROM Field f WHERE f.tableId = :tableId AND f.deletedAt IS NULL ORDER BY f.fieldIndex ASC")
    List<Field> findByTableIdOrderByFieldIndex(@Param("tableId") Long tableId);


    //특정 테이블의 논리적으로 삭제되지 않은 필드를 인덱스로 조회
    @Query("SELECT f FROM Field f WHERE f.tableId = :tableId AND f.fieldIndex = :fieldIndex AND f.deletedAt IS NULL")
    Field findByTableIdAndFieldIndex(@Param("tableId") Long tableId, @Param("fieldIndex") int fieldIndex);

    // 특정 테이블의 논리적으로 삭제되지 않은 필드중 특정 인덱스보다 큰 필드 조회
    @Query("SELECT f FROM Field f WHERE f.tableId = :tableId AND f.fieldIndex > :fieldIndex AND f.deletedAt IS NULL ORDER BY f.fieldIndex ASC")
    List<Field> findByTableIdAndIndexGreaterThan(@Param("tableId") Long tableId, @Param("fieldIndex") int fieldIndex);
}
