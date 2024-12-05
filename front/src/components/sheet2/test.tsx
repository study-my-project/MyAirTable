import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Sheet({ tableId }: { tableId: string }) {

    const [columnWidths, setColumnWidths] = useState<number[]>([]); // 열 너비 상태 관리
    useEffect(() => {
        if (tableDetailsData?.getTableDetailsById) {
            setCellValues(tableDetailsData.getTableDetailsById.cellValues || []);
            setColumnWidths(
                tableDetailsData.getTableDetailsById.fields.map(() => 100)
            ); // 초기 너비 설정
        }
    }, [tableDetailsData]);

    const handleResizeMouseDown = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = columnWidths[index];

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            setColumnWidths((prevWidths) => {
                const newWidths = [...prevWidths];
                newWidths[index] = Math.max(50, startWidth + deltaX); // 최소 너비 50px
                return newWidths;
            });
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };


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
         <styles.excel_table_wrapper>
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
                                    {fields.map((field, index) => (
                                        <SortableField
                                            key={field.id}
                                            field={field}
                                            handleContextMenu={handleContextMenu}
                                            width={columnWidths[index]}
                                            onResize={(e) => handleResizeMouseDown(index, e)}
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
            </styles.excel_table_wrapper>
