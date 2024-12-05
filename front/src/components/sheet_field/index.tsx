
import * as styles from "./sheet_field.style";
import { useContextMenu } from "../contextmenu";


type field = { id: string; fieldName: string; fieldIndex: number };

export default function SheetField({ field }: { field: field }) {
    const { handleContextMenu, renderContextMenu } = useContextMenu();

    return (
        <>
            <styles.excel_table_th
                onContextMenu={(e) => handleContextMenu(e, "field", field.id)}>
                {field.fieldName}
            </styles.excel_table_th>
            {/* 컨텍스트 메뉴 렌더링 */}
            {renderContextMenu()}
        </>
    )
}