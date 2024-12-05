import * as styles from "./sheet_cell_value.style";

type cellValues = { fieldId: string; recordId: string; value: string }[];

export default function SheetCellValue({ cellValues, recordId, fieldId }: { cellValues: cellValues, recordId: string, fieldId: string }) {

    const cellValue = cellValues.find(
        (cell) => cell.fieldId === fieldId && cell.recordId === recordId
    );
    return (
        <styles.excel_table_td key={`${recordId}-${fieldId}`}>
            {cellValue ? cellValue.value : ""}
        </styles.excel_table_td>
    )



}