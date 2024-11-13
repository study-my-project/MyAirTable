package com.myproject.myairtable.domain.cellvalue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface CellValueRepository extends JpaRepository<CellValue, Long> {

    @Query("SELECT c FROM CellValue c WHERE c.fieldId = :fieldId AND c.recordId = :recordId AND c.deletedAt IS NULL")
    Optional<CellValue> findByFieldIdAndRecordId(@Param("fieldId") Long fieldId, @Param("recordId") Long recordId);

}
