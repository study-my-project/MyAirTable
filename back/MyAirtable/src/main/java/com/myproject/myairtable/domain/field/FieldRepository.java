package com.myproject.myairtable.domain.field;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FieldRepository extends JpaRepository<Field, Long> {


    @Query("SELECT w FROM Field w WHERE w.deletedAt IS NULL")
    List<Field> findByTableId(Long tableId);

}
