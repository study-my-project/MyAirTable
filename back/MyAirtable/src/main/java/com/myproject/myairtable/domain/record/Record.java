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

    // 몇번째 데이터인지, 자리바꾸기 등에 사용할 index
    @Column(name = "record_index", nullable = false)
    private int recordIndex;

    public Record (RecordCreateRequestDto RecordCreateRequestDto, int recordIndex) {
        this.tableId = RecordCreateRequestDto.getTableId();
        this.recordIndex = recordIndex;
    }
}
