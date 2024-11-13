package com.myproject.myairtable.domain.cellvalue;

import com.myproject.myairtable.domain.cellvalue.dto.CellValueCreateRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueReadRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CellValueService {

    private final CellValueRepository cellValueRepository;

    // Create
    public CellValue createCellValue(CellValueCreateRequestDto cellValueCreateRequestDto) {
        CellValue cellValue = new CellValue(cellValueCreateRequestDto);
        return cellValueRepository.save(cellValue);
    }

    // Read - 필드, 레코드 id로 CellValue 가져오기
    public Optional<CellValue> getCellValue(CellValueReadRequestDto cellValueReadRequestDto) {
        return cellValueRepository.findByFieldIdAndRecordId(cellValueReadRequestDto.getFieldId(),cellValueReadRequestDto.getRecordId());
    }

    // Update
    public CellValue updateCellValue (CellValueUpdateRequestDto cellValueUpdateRequestDto) {
        return cellValueRepository.findById(cellValueUpdateRequestDto.getId())
                .map(cellValue -> {
                    cellValue.updateCellValue(cellValueUpdateRequestDto);  // update 메서드 호출
                    return cellValueRepository.save(cellValue); // 변경된 필드 저장 후 반환
                })
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 Value를 찾을 수 없습니다: " + cellValueUpdateRequestDto.getId()));
    }

    // Delete (논리 삭제)
    public void deleteCellValue(Long id) {
        cellValueRepository.findById(id)
                .ifPresent(cellValue -> {
                    cellValue.delete(); // 논리적 삭제 수행
                    cellValueRepository.save(cellValue); // 변경사항 저장
                });
    }

}
