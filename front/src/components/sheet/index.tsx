import React, { useState, useEffect } from "react";
import * as styles from "./sheet.style";
import { CREATE_CELL_VALUE, GET_TABLE_DETAILS, UPDATE_CELL_VALUE, CREATE_FIELD, CREATE_RECORD, DELETE_FIELD, DELETE_RECORD } from "../../../src/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import type {
    QueryGetTableDetailsByIdArgs,
    Query,
    Mutation,

} from "../../../src/commons/types/generated/types";

export default function Sheet({ tableId }: { tableId: string }) {

    // 현재 선택된 테이블 ID 상태
    const [activeTable, setActiveTable] = useState<string | null>(null);
    // tableId 변경 시 activeTable 업데이트
    useEffect(() => {
        if (tableId) {
            setActiveTable(tableId);
        }
    }, [tableId]);
    // 받아온 테이블 ID를 사용해서 Field의 리스트와 Records 리스트, CellValue 전부 가져오자
    const { data: tableDetailsData } = useQuery<
        Pick<Query, "getTableDetailsById">,
        QueryGetTableDetailsByIdArgs
    >(GET_TABLE_DETAILS, {
        variables: activeTable ? { tableId: activeTable } : undefined,
        skip: !activeTable,
    });

    // 값을 입력 받을 수 있도록 셀 값을 프론트에 바로 넣는게 아닌 useState로 로컬 상태를 만들자.
    const [cellValues, setCellValues] = useState<
        { fieldId: string; recordId: string; value: string }[]
    >([]);
    useEffect(() => {
        if (tableDetailsData?.getTableDetailsById) {
            setCellValues(tableDetailsData.getTableDetailsById.cellValues || []);
        }
    }, [tableDetailsData]);

    // 뮤테이션으로 값을 입력하기
    const [createCellValue] = useMutation<Pick<Mutation, "createCellValue">>(
        CREATE_CELL_VALUE,
        {
            refetchQueries: [{ query: GET_TABLE_DETAILS }]
        }
    )

    const [updateCellValue] = useMutation<Pick<Mutation, "updateCellValue">>(
        UPDATE_CELL_VALUE,
        {
            refetchQueries: [{ query: GET_TABLE_DETAILS }]
        }
    )
    const [createField] = useMutation<Pick<Mutation, "createField">>(CREATE_FIELD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    });

    const [createRecord] = useMutation<Pick<Mutation, "createRecord">>(CREATE_RECORD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    });

    const [deleteField] = useMutation<Pick<Mutation,"deleteField">>(DELETE_FIELD,{
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    })
    const [deleteRecord] = useMutation<Pick<Mutation,"deleteRecord">>(DELETE_RECORD,{
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    })


    // 필드 추가
    const handleCreateField = async () => {
        try {
            const fieldCount =
                tableDetailsData?.getTableDetailsById?.fields?.length || 0; // 안전하게 필드 수를 가져옴
            const response = await createField({
                variables: {
                    tableId,
                    fieldName: `필드 ${fieldCount + 1}`, // 필드 수를 기반으로 새 필드 이름 생성
                },
            });
            console.log("Field added:", response);
        } catch (error) {
            console.error("Error adding field:", error);
        }
    };

    // 레코드 추가
    const handleCreateRecord = async () => {
        try {
            const recordCount =
                tableDetailsData?.getTableDetailsById?.records?.length || 0;
            const response = await createRecord({
                variables: {
                    tableId,
                    recordIndex: `레코드 ${recordCount + 1}`,
                },
            });
            console.log("Record added:", response);
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };


    // 컨텍스트 메뉴 상태
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        type: "field" | "record" | null;
        id: string | null;
    } | null>(null);

    // 컨텍스트 메뉴 열기
    const handleContextMenu = (
        e: React.MouseEvent,
        type: "field" | "record",
        id: string
    ) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            type,
            id,
        });
    };

    // 컨텍스트 메뉴 닫기
    const closeContextMenu = () => {
        setContextMenu(null);
    };

    // 필드 삭제
    const handleDeleteField = async () => {
        if (contextMenu?.type === "field" && contextMenu.id) {
            try {
                await deleteField({ variables: { fieldId: contextMenu.id } });
                closeContextMenu();
            } catch (error) {
                console.error("Error deleting field:", error);
            }
        }
    };

    // 레코드 삭제
    const handleDeleteRecord = async () => {
        if (contextMenu?.type === "record" && contextMenu.id) {
            try {
                await deleteRecord({ variables: { recordId: contextMenu.id } });
                closeContextMenu();
            } catch (error) {
                console.error("Error deleting record:", error);
            }
        }
    };




    // 셀에 값을 입력하기
    // 1. 셀 선택시 (onFocus) -> 만약 백엔드에 "" 빈칸을 포함해서 데이터가 존재하면 넘어가고 데이터가 없으면 빈칸으로 create를 실행
    const handleCellFocus = async (recordId: string, fieldId: string) => {
        const existingCellValue = cellValues.find(
            (cell) => cell.fieldId === fieldId && cell.recordId === recordId
        );

        if (!existingCellValue) {
            try {
                // 백엔드에 데이터가 없으면 createCellValue 호출
                const response = await createCellValue({
                    variables: {
                        fieldId,
                        recordId,
                        value: "", // 빈칸 생성
                    },
                });
                console.log("Cell created successfully on focus:", response);

                // 로컬 상태 업데이트
                setCellValues((prevCellValues) => [
                    ...prevCellValues,
                    { fieldId, recordId, value: "" },
                ]);
            } catch (error) {
                console.error("Error creating cell value on focus:", error);
            }
        }
    };

    // 2. 값 입력하면 로컬에 데이터 저장하기
    const handleCellChange = (recordId: string, fieldId: string, value: string) => {
        // 로컬 상태 업데이트
        setCellValues((prevCellValues) =>
            prevCellValues.map((cell) =>
                cell.recordId === recordId && cell.fieldId === fieldId
                    ? { ...cell, value }
                    : cell
            )
        );
    };

    // 3. 값 입력이 끝나고 포커스 종료시 값을 업데이트
    const handleCellBlur = async (recordId: string, fieldId: string, value: string) => {
        try {
            // 포커스가 종료되면 백엔드에 UpdateCellValue 호출
            const response = await updateCellValue({
                variables: {
                    fieldId,
                    recordId,
                    value,
                },
            });
            console.log("Cell updated successfully on blur:", response);
        } catch (error) {
            console.error("Error updating cell value on blur:", error);
        }
    };

    // 엔터버튼으로도 포커스 종료
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            // 엔터 키가 눌렸을 때 포커스 해제
            (event.target as HTMLInputElement).blur();
        }
    };
    return (
        <>
            <styles.excel_container>
                {/* 표전체를 감싸는 테이블 */}
                <styles.excel_table>
                    {/* 맨 윗줄  */}
                    <thead>
                        <tr>
                            {/* 최 좌상단은 빈칸 */}
                            <styles.excel_table_th></styles.excel_table_th>
                            {/* 테이블 디테일 내용중 field의 이름으로 나열하기  */}
                            {tableDetailsData?.getTableDetailsById.fields.map((field) => (
                                <styles.excel_table_th
                                    key={field.id}
                                    onContextMenu={(e) =>
                                        handleContextMenu(e, "field", field.id)
                                    }>
                                    {field.fieldName}
                                </styles.excel_table_th>
                            ))}

                            {/* 필드 추가 버튼 */}
                            <styles.excel_table_th>
                                <styles.create_button onClick={handleCreateField}>+ 필드</styles.create_button>
                            </styles.excel_table_th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 세로는 records */}
                        {tableDetailsData?.getTableDetailsById.records.map((record) => (
                            <tr key={record.id}>
                                {/* 각 레코드의 첫 번째 셀에는 record.Index 값 */}
                                <styles.excel_table_td
                                    onContextMenu={(e) =>
                                        handleContextMenu(e, "record", record.id)
                                    }>
                                    {record.recordIndex}
                                </styles.excel_table_td>

                                {/* 각 필드에 대해 값 출력 */}
                                {tableDetailsData?.getTableDetailsById.fields.map((field) => {
                                    const cellValue = cellValues.find(
                                        (cell) =>
                                            cell.fieldId === field.id &&
                                            cell.recordId === record.id
                                    );
                                    return (
                                        <styles.excel_table_td key={`${record.id}-${field.id}`}>
                                            <styles.excel_table_input
                                                type="text"
                                                value={cellValue ? cellValue.value : ""}
                                                onFocus={() => handleCellFocus(record.id, field.id)}
                                                onChange={(e) => handleCellChange(record.id, field.id, e.target.value)}
                                                onBlur={(e) => handleCellBlur(record.id, field.id, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                        </styles.excel_table_td>
                                    );
                                })}
                            </tr>
                        ))}
                        {/* 레코드 추가 버튼 */}
                        <tr>
                            <styles.excel_table_td colSpan={(tableDetailsData?.getTableDetailsById?.fields?.length || 0) + 1}>
                                <styles.create_button onClick={handleCreateRecord}>+ 레코드</styles.create_button>
                            </styles.excel_table_td>
                        </tr>
                    </tbody>

                </styles.excel_table>
            </styles.excel_container>

            {/* 컨텍스트 메뉴 */}
            {contextMenu && (
                <styles.ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
                    {contextMenu.type === "field" && (
                        <styles.ContextMenuItem onClick={handleDeleteField}>
                            필드 삭제
                        </styles.ContextMenuItem>
                    )}
                    {contextMenu.type === "record" && (
                        <styles.ContextMenuItem onClick={handleDeleteRecord}>
                            레코드 삭제
                        </styles.ContextMenuItem>
                    )}
                    <styles.ContextMenuItem onClick={closeContextMenu}>
                        닫기
                    </styles.ContextMenuItem>
                </styles.ContextMenu>
            )}



        </>

    )

}