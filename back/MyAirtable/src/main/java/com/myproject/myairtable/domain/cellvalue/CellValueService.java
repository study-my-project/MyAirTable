package com.myproject.myairtable.domain.cellvalue;

import com.myproject.myairtable.domain.cellvalue.dto.CellValueCreateRequestDto;
import com.myproject.myairtable.domain.cellvalue.dto.CellValueUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CellValueService {

    private final CellValueRepository cellValueRepository;

    // Create
    public CellValue createCellValue(CellValueCreateRequestDto cellValueCreateRequestDto) {
        // 기존에 있는지 검색
        return cellValueRepository.findByFieldIdAndRecordIdAndDeletedAtIsNull(
                cellValueCreateRequestDto.getFieldId(),
                cellValueCreateRequestDto.getRecordId()
        ).orElseGet(() -> {
            // 존재하지 않는 경우 새로 생성
            CellValue newCellValue = new CellValue(cellValueCreateRequestDto);
            return cellValueRepository.save(newCellValue);
        });
    }


    // Update
    public CellValue updateCellValue (CellValueUpdateRequestDto cellValueUpdateRequestDto) {
        return cellValueRepository.findByFieldIdAndRecordIdAndDeletedAtIsNull(
                        cellValueUpdateRequestDto.getFieldId(),
                        cellValueUpdateRequestDto.getRecordId()
                )
                .map(cellValue -> {
                    cellValue.updateCellValue(cellValueUpdateRequestDto);  // update 메서드 호출
                    return cellValueRepository.save(cellValue); // 변경된 필드 저장 후 반환
                })
                .orElseGet(() -> {
                    // 데이터가 없으면 새로 생성
                    CellValue newCellValue = new CellValue(cellValueUpdateRequestDto);
                    return cellValueRepository.save(newCellValue);
                });
    }

    // Delete (논리 삭제)
    public Boolean deleteCellValue(Long id) {
        return cellValueRepository.findById(id)
                .map(cellValue -> {
                    cellValue.delete();
                    cellValueRepository.save(cellValue);
                    return true;
                })
                .orElse(false);
    }

}
