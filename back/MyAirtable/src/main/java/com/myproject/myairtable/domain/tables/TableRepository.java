package com.myproject.myairtable.domain.tables;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TableRepository extends JpaRepository<Table, Long> {


    @Query("SELECT w FROM Table w WHERE w.baseId = :baseId AND w.deletedAt IS NULL")
    List<Table> findByBaseId(@Param("baseId") Long baseId);

}
