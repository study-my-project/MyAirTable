package com.myproject.myairtable.domain.tables;

import com.myproject.myairtable.domain.tables.dto.TableCreateRequestDto;
import com.myproject.myairtable.domain.tables.dto.TableUpdateRequestDto;
import com.myproject.myairtable.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@jakarta.persistence.Table(name="table")
public class Table extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id", nullable = false)
    private Long id;

    @Column(name = "base_id", nullable = false)
    private Long baseId;

    @Column(name = "table_name", nullable = false)
    private String tableName;

    public Table (TableCreateRequestDto tableCreateRequestDto) {
        this.baseId = tableCreateRequestDto.getBaseId();
        this.tableName = tableCreateRequestDto.getTableName();
    }

    public void updateTable (TableUpdateRequestDto tableUpdateRequestDto) {
        if(tableUpdateRequestDto.getTableName() != null){
            this.tableName = tableUpdateRequestDto.getTableName();
        }

    }

}
