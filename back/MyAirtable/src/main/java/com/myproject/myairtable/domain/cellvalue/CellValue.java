package com.myproject.myairtable.domain.cellvalue;

import com.myproject.myairtable.domain.cellvalue.dto.CellValueCreateRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueUpdateRequestDto;
import com.myproject.myairtable.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@jakarta.persistence.Table(name="cellvalue")
public class CellValue extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cellvalue_id", nullable = false)
    private Long id;

    @Column(name = "field_id", nullable = false)
    private Long fieldId;

    @Column(name = "record_id", nullable = false)
    private Long recordId;

    @Column(name = "value", nullable = false)
    private String value;


    public CellValue (CellValueCreateRequestDto cellValueCreateRequestDto) {
        this.fieldId = cellValueCreateRequestDto.getFieldId();
        this.recordId = cellValueCreateRequestDto.getRecordId();
        this.value = cellValueCreateRequestDto.getValue();
    }

    public void updateCellValue (CellValueUpdateRequestDto cellValueUpdateRequestDto) {
        if(cellValueUpdateRequestDto.getValue() != null){
            this.value = cellValueUpdateRequestDto.getValue();
        }
    }

}
