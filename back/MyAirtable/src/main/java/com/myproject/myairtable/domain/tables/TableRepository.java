package com.myproject.myairtable.domain.tables;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TableRepository extends JpaRepository<Table, Long> {


    @Query("SELECT w FROM Table w WHERE w.baseId = :baseId AND w.deletedAt IS NULL")
    List<Table> findByBaseId(@Param("baseId") Long baseId);

    @Query("SELECT t FROM Table t WHERE t.id = :id AND t.deletedAt IS NULL")
    Table findByIdAndNotDeleted(@Param("id") Long id);

    // 삭제되지 않은 테이블 정렬해서 조회하기
    @Query("SELECT t FROM Table t WHERE t.baseId = :baseId AND t.deletedAt IS NULL ORDER BY t.tableIndex ASC")
    List<Table> findByBaseIdOrderByTableIndex(@Param("baseId") Long baseId);

    // 테이블 생성시 Index 값을 계산하기 위한 카운트
    @Query("SELECT COUNT(t) FROM Table t WHERE t.baseId = :baseId AND t.deletedAt IS NULL")
    int countByBaseId(@Param("baseId") Long baseId);


}
