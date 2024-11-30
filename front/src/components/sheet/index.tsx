import React, { useState, useEffect } from "react";
import * as styles from "./sheet.style";
import {
    CREATE_CELL_VALUE,
    GET_TABLE_DETAILS,
    UPDATE_CELL_VALUE,
    CREATE_FIELD,
    CREATE_RECORD,
    DELETE_FIELD,
    DELETE_RECORD,
    UPDATE_RECORD_INDEX,
    UPDATE_FIELD_INDEX
} from "../../../src/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import type {
    QueryGetTableDetailsByIdArgs,
    Query,
    Mutation,

} from "../../../src/commons/types/generated/types";

import { DndContext, closestCenter,DragEndEvent  } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    const { data: tableDetailsData, refetch } = useQuery<
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
    const [createCellValue] = useMutation<Pick<Mutation, "createCellValue">>(CREATE_CELL_VALUE, {
        refetchQueries: [{ query: GET_TABLE_DETAILS }],
    });

    const [updateCellValue] = useMutation<Pick<Mutation, "updateCellValue">>(UPDATE_CELL_VALUE, {
        refetchQueries: [{ query: GET_TABLE_DETAILS }],
    });
    const [createField] = useMutation<Pick<Mutation, "createField">>(CREATE_FIELD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    });

    const [createRecord] = useMutation<Pick<Mutation, "createRecord">>(CREATE_RECORD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    });

    const [deleteField] = useMutation<Pick<Mutation, "deleteField">>(DELETE_FIELD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    })
    const [deleteRecord] = useMutation<Pick<Mutation, "deleteRecord">>(DELETE_RECORD, {
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
                    type: "text",
                    options: "{}"
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

    // 필드 자리 변경하기
    const [fields, setFields] = useState<
        { id: string; fieldName: string; fieldIndex: number }[]
    >([]);
    useEffect(() => {
        if (tableDetailsData?.getTableDetailsById?.fields) {
            setFields(
                [...tableDetailsData.getTableDetailsById.fields].sort(
                    (a, b) => a.fieldIndex - b.fieldIndex
                )
            );
        }
    }, [tableDetailsData]);

    const [updateFieldIndex] = useMutation<
        Pick<Mutation, "updateFieldIndex">
    >(UPDATE_FIELD_INDEX);

    // 레코드 자리 변경하기
    // 레코드 상태 관리
    const [records, setRecords] = useState<
        { id: string; recordIndex: number }[]
    >([]);
    useEffect(() => {
        if (tableDetailsData?.getTableDetailsById?.records) {
            setRecords(
                [...tableDetailsData.getTableDetailsById.records].sort(
                    (a, b) => a.recordIndex - b.recordIndex
                )
            );
        }
    }, [tableDetailsData]);

    const [updateRecordIndex] = useMutation<
        Pick<Mutation, "updateRecordIndex">
    >(UPDATE_RECORD_INDEX);

    // 필드 드래그 종료 시 호출되는 핸들러
    const handleFieldDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return; // 드롭 대상이 없거나, 같은 위치라면 종료
        }

        const oldIndex = fields.findIndex((field) => field.id === active.id);
        const newIndex = fields.findIndex((field) => field.id === over.id);

        // 필드 순서 업데이트
        const reorderedFields = arrayMove(fields, oldIndex, newIndex).map(
            (field, index) => ({
                ...field,
                fieldIndex: index + 1, // 필드 인덱스를 1부터 시작
            })
        );

        // 로컬 상태 업데이트
        setFields(reorderedFields);

        try {
            // 백엔드에 순서 변경 요청
            await updateFieldIndex({
                variables: {
                    fieldId: active.id,
                    newIndex: newIndex + 1,
                },
            });

            // 데이터 다시 가져오기
            await refetch();
            console.log("Field index updated successfully");
        } catch (error) {
            console.error("Error updating field index:", error);
            refetch(); // 실패 시 데이터 복구
        }
    };

    // 드래그 종료 시 호출되는 핸들러
    const handleRecordDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return; // 드롭 대상이 없거나, 같은 위치라면 종료
        }

        // 기존 인덱스와 새로운 인덱스 계산
        const oldIndex = records.findIndex((record) => record.id === active.id);
        const newIndex = records.findIndex((record) => record.id === over.id);

        // 레코드 순서 업데이트
        const reorderedRecords = arrayMove(records, oldIndex, newIndex).map(
            (record, index) => ({
                ...record,
                recordIndex: index + 1, // 백엔드와 일치하도록 1부터 시작
            })
        );

        // 로컬 상태 업데이트
        setRecords(reorderedRecords);

        try {
            // 백엔드에 순서 변경 요청
            await updateRecordIndex({
                variables: {
                    recordId: active.id, // 이동된 레코드 ID
                    newIndex: newIndex + 1, // 새로운 위치 (1부터 시작)
                },
            });

            // 데이터 다시 가져오기
            await refetch();
            console.log("Record index updated successfully");
        } catch (error) {
            console.error("Error updating record index:", error);
            refetch(); // 실패 시 데이터 복구
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
                <styles.excel_table>

                    
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleFieldDragEnd} // 필드 드래그 이벤트 처리
                    >
                        <SortableContext
                            items={fields.map((field) => field.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <thead>
                                <tr>
                                    <styles.excel_table_th></styles.excel_table_th>
                                    {fields.map((field) => (
                                        <SortableField
                                            key={field.id}
                                            field={field}
                                            handleContextMenu={handleContextMenu}
                                        />
                                    ))}
                                    <styles.excel_table_th>
                                        <styles.create_button onClick={handleCreateField}>
                                            + 필드
                                        </styles.create_button>
                                    </styles.excel_table_th>
                                </tr>
                            </thead>
                        </SortableContext>
                    </DndContext>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleRecordDragEnd}>
                        <SortableContext
                            items={records.map((record) => record.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <tbody>
                                {records.map((record) => (
                                    <SortableRow
                                        key={record.id}
                                        record={record}
                                        fields={tableDetailsData?.getTableDetailsById.fields || []}
                                        cellValues={cellValues}
                                        handleCellFocus={handleCellFocus}
                                        handleCellChange={handleCellChange}
                                        handleCellBlur={handleCellBlur}
                                        handleKeyDown={handleKeyDown}
                                        handleContextMenu={handleContextMenu}

                                    />
                                ))}
                                {/* 레코드 추가 버튼 */}
                                <tr>
                                    <styles.excel_table_td colSpan={(tableDetailsData?.getTableDetailsById?.fields?.length || 0) + 1}>
                                        <styles.create_button onClick={handleCreateRecord}>+ 레코드</styles.create_button>
                                    </styles.excel_table_td>
                                </tr>
                            </tbody>
                        </SortableContext>
                    </DndContext>
                </styles.excel_table>
            </styles.excel_container>

            {/* 컨텍스트 메뉴 */}
            {
                contextMenu && (
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
                )
            }
        </>
    )
}
function SortableRow({
    record,
    cellValues,
    fields,
    handleCellChange,
    handleCellBlur,
    handleCellFocus,
    handleKeyDown,
    handleContextMenu,
}: {
    record: { id: string; recordIndex: number };
    cellValues: { fieldId: string; recordId: string; value: string }[];
    fields: { id: string; fieldName: string }[];
    handleCellChange: (recordId: string, fieldId: string, value: string) => void;
    handleCellBlur: (recordId: string, fieldId: string, value: string) => void;
    handleCellFocus: (recordId: string, fieldId: string) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleContextMenu: (event: React.MouseEvent<HTMLTableCellElement>, type: "field" | "record", id: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: record.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr ref={setNodeRef} style={style} {...attributes}>
            {/* 드래그 가능하도록 번호 열에만 listeners를 추가 */}
            <styles.excel_table_td {...listeners}
                onContextMenu={(e) =>
                    handleContextMenu(e, "record", record.id)
                }>
                {record.recordIndex}
            </styles.excel_table_td>
            {/* 입력 필드는 드래그에서 제외 */}
            {fields.map((field) => {
                const cellValue = cellValues.find(
                    (cell) => cell.fieldId === field.id && cell.recordId === record.id
                );
                return (
                    <styles.excel_table_td key={`${record.id}-${field.id}`}>
                        <styles.excel_table_input
                            type="text"
                            value={cellValue ? cellValue.value : ""}
                            onFocus={() => handleCellFocus(record.id, field.id)}
                            onChange={(e) =>
                                handleCellChange(record.id, field.id, e.target.value)
                            }
                            onBlur={(e) =>
                                handleCellBlur(record.id, field.id, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    </styles.excel_table_td>
                );
            })}
        </tr>
    );
}

function SortableField({
    field,
    handleContextMenu,
}: {
    field: { id: string; fieldName: string; fieldIndex: number };
    handleContextMenu: (event: React.MouseEvent<HTMLTableCellElement>, type: "field" | "record", id: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <styles.excel_table_th
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onContextMenu={(e) => handleContextMenu(e, "field", field.id)}
        >
            {field.fieldName}
        </styles.excel_table_th>
    );
}