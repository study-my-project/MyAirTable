package com.myproject.myairtable.domain.record;

import com.myproject.myairtable.domain.record.dto.RecordCreateRequestDto;
import com.myproject.myairtable.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@jakarta.persistence.Table(name="record")
public class Record extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "field_id", nullable = false)
    private Long id;

    @Column(name = "table_id", nullable = false)
    private Long tableId;

    public Record (RecordCreateRequestDto RecordCreateRequestDto) {
        this.tableId = RecordCreateRequestDto.getTableId();
    }
}
