import React, { useState } from "react";
import * as styles from "./sheet.style";

export default function Sheet() {
    const [rows, setRows] = useState(20); // 기본 행 개수
    const [columns, setColumns] = useState(10); // 기본 열 개수
    const [data, setData] = useState<Record<string, string>>({});
    const [contextMenu, setContextMenu] = useState(null);

    // 셀 업데이트 핸들러
    const handleCellChange = (row: number, col: number, value: string) => {
        setData({ ...data, [`${row}-${col}`]: value });
    };

    // 열 추가: 왼쪽
    const addColumnLeft = (colIndex) => {
        setColumns((prev) => prev + 1);
        // 선택한 열 기준으로 데이터 이동 (Optional)
        // 데이터 이동 로직 작성 가능
        closeContextMenu();
    };

    // 열 추가: 오른쪽
    const addColumnRight = (colIndex) => {
        setColumns((prev) => prev + 1);
        closeContextMenu();
    };

    // 열 삭제
    const removeColumn = (colIndex) => {
        if (columns > 1) {
            setColumns((prev) => prev - 1);
            // 선택한 열의 데이터 삭제
            const updatedData = { ...data };
            Object.keys(updatedData).forEach((key) => {
                const [row, col] = key.split("-");
                if (parseInt(col) === colIndex) delete updatedData[key];
            });
            setData(updatedData);
        }
        closeContextMenu();
    };

    // 열 이름 우클릭 핸들러
    const handleColumnRightClick = (e, colIndex) => {
        e.preventDefault(); // 기본 컨텍스트 메뉴 방지
        setContextMenu({
            colIndex,
            x: e.pageX,
            y: e.pageY,
        });
    };

    // 컨텍스트 메뉴 숨기기
    const closeContextMenu = () => {
        setContextMenu(null);
    };
    return (
        <styles.excel_container onClick={closeContextMenu}>
            <styles.excel_table>
                <thead>
                    <tr>
                        <styles.excel_table_th></styles.excel_table_th> {/* 왼쪽 상단 빈 칸 */}
                        {[...Array(columns)].map((_, colIndex) => (
                            <styles.excel_table_th
                                key={colIndex}
                                onContextMenu={(e) => handleColumnRightClick(e, colIndex)}
                            >
                                {String.fromCharCode(65 + colIndex)} {/* 열 이름 A, B, C */}
                            </styles.excel_table_th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rows)].map((_, rowIndex: number) => (
                        <tr key={rowIndex}>
                            <styles.excel_table_td>{rowIndex + 1}</styles.excel_table_td> {/* 행 번호 */}
                            {[...Array(columns)].map((_, colIndex: number) => (
                                <styles.excel_table_td key={colIndex}>
                                    <styles.excel_table_input
                                        type="text"
                                        value={data[`${rowIndex}-${colIndex}`] || ""}
                                        onChange={(e) =>
                                            handleCellChange(rowIndex, colIndex, e.target.value)
                                        }
                                    />
                                </styles.excel_table_td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </styles.excel_table>

            {/* 컨텍스트 메뉴 */}
            {contextMenu && (
                <styles.context_menu
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <li onClick={() => addColumnLeft(contextMenu.colIndex)}>
                        Add Column Left
                    </li>
                    <li onClick={() => addColumnRight(contextMenu.colIndex)}>
                        Add Column Right
                    </li>
                    <li onClick={() => removeColumn(contextMenu.colIndex)}>
                        Remove Column
                    </li>
                </styles.context_menu>
            )}
        </styles.excel_container>
    );
};
