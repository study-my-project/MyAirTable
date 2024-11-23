package com.myproject.myairtable.domain.cellvalue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface CellValueRepository extends JpaRepository<CellValue, Long> {

    @Query("SELECT c FROM CellValue c WHERE c.fieldId IN :fieldIds AND c.recordId IN :recordIds AND c.deletedAt IS NULL")
    List<CellValue> findByFieldIdInAndRecordIdInAndDeletedAtIsNull(
            @Param("fieldIds") List<Long> fieldIds,
            @Param("recordIds") List<Long> recordIds
    );

    @Query("SELECT c FROM CellValue c WHERE c.fieldId = :fieldId AND c.recordId = :recordId AND c.deletedAt IS NULL")
    Optional<CellValue> findByFieldIdAndRecordIdAndDeletedAtIsNull(
            @Param("fieldId") Long fieldId,
            @Param("recordId") Long recordId
    );

}
