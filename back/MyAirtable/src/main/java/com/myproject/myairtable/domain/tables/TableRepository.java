package com.myproject.myairtable.domain.tables;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TableRepository extends JpaRepository<Table, Long> {


    @Query("SELECT w FROM Table w WHERE w.deletedAt IS NULL")
    List<Table> findByBaseId(Long baseId);

}
