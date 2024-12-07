package com.myproject.myairtable.domain.field;

import com.myproject.myairtable.domain.field.dto.FieldCreateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldUpdateRequestDto;
import com.myproject.myairtable.domain.field.dto.FieldWidthUpdateRequestDto;
import com.myproject.myairtable.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@jakarta.persistence.Table(name="field")
public class Field extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "field_id", nullable = false)
    private Long id;

    @Column(name = "table_id", nullable = false)
    private Long tableId;

    // 상단부 이름
    @Column(name = "table_name", nullable = false)
    private String fieldName;

    // 들어가는 데이터 타입 - 텍스트, 체크박스, 선택리스트 등
    @Column(name = "type", nullable = false)
    private String type;

    // 옵션 - 타입에 따른 추가적 옵션
    // 선택 리스트면 {"choices": ["Option1", "Option2", "Option3"]}이런식으로
    // 숫자의 경우는  {"min": 0, "max": 100} 이런식으로 JSON 타입으로 설정
    @Column(name = "options", columnDefinition = "json")
    private String options;

    // 몇번째 데이터인지, 자리바꾸기 등에 사용할 index
    @Column(name = "field_index", nullable = false)
    private int fieldIndex;

    // 필드 크기
    @Column(name = "field_width", nullable = false)
    private int fieldWidth;

    public Field (FieldCreateRequestDto fieldCreateRequestDto, int fieldIndex) {
        this.tableId = fieldCreateRequestDto.getTableId();
        this.fieldName = fieldCreateRequestDto.getFieldName();
        this.type = fieldCreateRequestDto.getType();
        this.options = fieldCreateRequestDto.getOptions();
        this.fieldIndex = fieldIndex;
        this.fieldWidth = 100;
    }

    public void updateField (FieldUpdateRequestDto fieldUpdateRequestDto) {
        if(fieldUpdateRequestDto.getFieldName() != null){
            this.fieldName = fieldUpdateRequestDto.getFieldName();
        }
        if(fieldUpdateRequestDto.getType() != null){
            this.type = fieldUpdateRequestDto.getType();
        }
        if(fieldUpdateRequestDto.getOptions() != null){
            this.options = fieldUpdateRequestDto.getOptions();
        }
    }

    public void updateFieldWidth(FieldWidthUpdateRequestDto fieldWidthUpdateRequestDto) {
        this.fieldWidth = fieldWidthUpdateRequestDto.getNewWidth();
    }


    public void updateFieldIndex(int newIndex){
        this.fieldIndex = newIndex;
    }

}
