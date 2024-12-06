import * as styles from "./sheet_record.style";
import React from "react";
import SheetCellValue from "../sheet_cell_value";
import { useContextMenu } from "../contextmenu";

type record = { id: string; recordIndex: number; tableId: string; };
type cellValues = { fieldId: string; recordId: string; value: string; }[];
type fields = { id: string; fieldName: string; tableId: string; }[];

export default function SheetRecord({ record, cellValues, fields }: { record: record, cellValues: cellValues, fields: fields }) {


    // useContextMenu를 최상위에서 호출
    const { handleContextMenu, renderContextMenu } = useContextMenu(record.tableId);
    return (
        <>
            <tr>
                <styles.excel_table_td
                    onContextMenu={(e) => handleContextMenu(e, "record", record.id)
                    }
                >
                    {record.recordIndex}
                </styles.excel_table_td>

                {fields.map((field) => {
                    return (
                        <SheetCellValue
                            key={field.id}
                            cellValues={cellValues || []}
                            recordId={record.id}
                            fieldId={field.id}
                        >
                        </SheetCellValue>
                    )

                })}
            </tr>
            {/* 컨텍스트 메뉴 렌더링 */}
            {renderContextMenu()}
        </>
    )
}