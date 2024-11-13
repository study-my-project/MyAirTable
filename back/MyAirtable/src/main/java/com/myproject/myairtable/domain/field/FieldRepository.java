package com.myproject.myairtable.domain.field;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FieldRepository extends JpaRepository<Field, Long> {


    @Query("SELECT w FROM Field w WHERE w.tableId = :tableId AND w.deletedAt IS NULL")
    List<Field> findByTableId(@Param("tableId") Long tableId);

}
