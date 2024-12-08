import React, { useState, useEffect } from "react";
import * as styles from "./sheet.style";
import type {
    QueryGetTableDetailsByIdArgs,
    Query,
    Mutation,
} from "../../../src/commons/types/generated/types";
import {
    GET_TABLE_DETAILS,
    CREATE_FIELD,
    CREATE_RECORD,
    UPDATE_FIELD_INDEX,
} from "../../../src/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import SheetField from "../sheet_field";
import SheetRecord from "../sheet_record";
import {
    DndContext,
    closestCenter,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";


export default function Sheet({ tableId }: { tableId: string }) {

    // 사용하는 뮤테이션, 쿼리들
    const [createField] = useMutation<Pick<Mutation, "createField">>(CREATE_FIELD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    });

    const [createRecord] = useMutation<Pick<Mutation, "createRecord">>(CREATE_RECORD, {
        refetchQueries: [{ query: GET_TABLE_DETAILS, variables: { tableId } }],
    });

    const [updateFieldIndex] = useMutation(UPDATE_FIELD_INDEX); // 필드 인덱스 업데이트 뮤테이션


    // ----------------------------------


    // 어떤 테이블의 값을 받아올 것인가
    // 선택한 테이블의 ID값
    const [activeTable, setActiveTable] = useState<string | null>(null);

    // useEffect 
    // 컴포넌트의 생명주기와 관련된 작업을 수행하기 위해 사용하는 훅
    // 1. API 데이터 가져오기
    // 2. 브라우저 이벤트 리스너 추가/제거
    // 3. 타이머 설정 및 해제
    // 4. Redux와 같은 상태 관리 라이브러리의 값 구독 및 클린업
    // 5. 특정 상태 변화에 따른 작업 실행
    // 등과같은 상황에 사용함

    useEffect(() => {
        // 테이블을 선택하면 해당 테이블의 ID값이 activeTable에 저장되도록하기
        // 테이블 ID 값은 외부로 부터 오기에 useEffect를 사용함
        if (tableId) {
            setActiveTable(tableId);
        }
    }, [tableId])    // 발동조건 tableId 값이 변경될때만 실행함.

    // 받아온 테이블 ID값을 사용해서 Field, Record, CellValue 가져오기
    const { data: tableDetailsData } = useQuery<
        Pick<Query, "getTableDetailsById">,
        QueryGetTableDetailsByIdArgs
    >(GET_TABLE_DETAILS, {
        variables: activeTable ? { tableId: activeTable } : undefined,
        skip: !activeTable,
    });

    // 필드, 레코드, CellValue를 각각 저장하기위해 useState 만들어주기 
    // 받아오는 데이터는 리스트 형태임
    const [fields, setFields] = useState<
        { id: string; fieldName: string; fieldIndex: number; tableId: string; fieldWidth: number; }[]
    >([]);
    const [records, setRecords] = useState<
        { id: string; recordIndex: number; tableId: string; recordHeight: number; }[]
    >([]);
    const [cellValues, setCellValues] = useState<
        { fieldId: string; recordId: string; value: string }[]
    >([]);



    // 필드, 레코드 추가하기
    // 필드 추가
    const handleCreateField = async () => {
        try {
            await createField({
                variables: {
                    tableId,
                    fieldName: `새 필드`,
                    type: "text",
                    options: "{}"
                },
            });
        } catch (error) {
            console.error("필드 생성에 실패함 :", error);
        }
    };

    // 레코드 추가
    const handleCreateRecord = async () => {
        try {
            await createRecord({
                variables: {
                    tableId,
                },
            });
        } catch (error) {
            console.error("레코드 생성에 실패함 :", error);
        }
    };



    // 받아오는 tableDetailsData의 데이터가 변경되면 데이터를 다시 저장함.
    useEffect(() => {
        // tableDetailsData.getTableDetailsById.records 에 데이터가 있으면
        if (tableDetailsData?.getTableDetailsById?.records) {
            // Records에 값을 새롭게 씌움
            setRecords(
                // 스프레드 연산자 (...)를 사용한 얕은 복사
                // 해당 값들을 
                // .sort = 정렬
                // (a, b) => a.recordIndex - b.recordIndex
                // a.recordIndex - b.recordIndex의 결과값이
                // 음수면 a가 b보다 앞으로, 0이면 순서 유지, 양수면 b가 a보다 앞으로 
                // 즉 a와 b중 작은게 앞으로 오도록 하는 정렬
                [...tableDetailsData.getTableDetailsById.records].sort(
                    (a, b) => a.recordIndex - b.recordIndex
                )
            );
        }
        // 필드도 마찬가지
        if (tableDetailsData?.getTableDetailsById?.fields) {
            setFields(
                [...tableDetailsData.getTableDetailsById.fields].sort(
                    (a, b) => a.fieldIndex - b.fieldIndex
                )
            );
        }
        if (tableDetailsData?.getTableDetailsById) {
            setCellValues(tableDetailsData.getTableDetailsById.cellValues || []);
        }


        // tableDetailsData가 변경되는 조건은
        // 새로 테이블을 열거나
        // 필드, 레코드를 추가, 수정, 삭제 하거나
        // CellValue의 값을 추가, 수정, 삭제 등
    }, [tableDetailsData])


    // 필드 드래그 앤 드롭 핸들러
    const handleDragEnd = async (event: DragEndEvent) => {

        const { active, over } = event;

        if (active.id !== over?.id) {
            const newIndex = fields.findIndex((field) => field.id === over?.id);


            // 서버에 새 인덱스 업데이트

            try {
                await updateFieldIndex({
                    variables: {
                        fieldId: active.id,
                        newIndex: newIndex + 1,

                    },
                    refetchQueries: [
                        {
                            query: GET_TABLE_DETAILS, // 기존의 쿼리
                            variables: { tableId },  // 테이블 ID를 포함해야 함
                        },
                    ],
                });
            } catch (error) {
                console.error("Failed to update field indexes:", error);
            }
        }
    }

    return (
        <>
            <styles.excel_table_wrapper>
                <styles.excel_container>
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={fields.map((field) => field.id)}
                            strategy={horizontalListSortingStrategy}
                        >


                            {/* table : 테이블의 전체 구조를 정의 하는 태그 */}
                            {/* 테이블 데이터를 포함하는 컨테이너 역할 */}
                            <styles.excel_table>
                                {/* 필드 관련 내용  */}
                                {/* <DndContext> */}
                                {/* <SortableContext> */}
                                {/* thead : 테이블의 헤더 영역 */}
                                {/* 보통 테이블의 열의 제목을 포함함 */}
                                <thead>
                                    {/* tr : 테이블의 행을 정의하는 태그 */}
                                    {/* <thead>, <tbody>, <tfoot> 안에서 사용 */}
                                    <tr>
                                        {/* th : 테이블의 헤더 셀을 정의하는 태그 */}
                                        {/* 텍스트가 굵고 가운데 정렬되어있음 */}

                                        {/* 테이블의 좌상단 빈칸 */}
                                        <styles.excel_table_th style={{ width: `30px` }} />
                                        {fields.map((field) => (
                                            <SheetField
                                                key={field.id}
                                                field={field}
                                                isDragDisabled={false} // 드래그 비활성화 플래그
                                            />
                                        ))}
                                        {/* 헤더 */}
                                        <styles.excel_table_th style={{ width: `100px` }}>
                                            <styles.create_button onClick={handleCreateField}> + 필드 </styles.create_button>
                                        </styles.excel_table_th>
                                    </tr>
                                </thead>
                                {/* </SortableContext> */}
                                {/* </DndContext> */}


                                {/* 레코드 */}
                                <tbody>
                                    {records.map((record) => (
                                        <SheetRecord
                                            key={record.id}
                                            record={record}
                                            cellValues={cellValues}
                                            fields={fields || []}
                                        />
                                    ))}
                                    {/* 레코드 추가 버튼 */}
                                    <tr>
                                        <styles.excel_table_td colSpan={fields.length + 1}>
                                            <styles.create_button onClick={handleCreateRecord}> + 레코드 </styles.create_button>
                                        </styles.excel_table_td>
                                    </tr>
                                </tbody>
                            </styles.excel_table>


                        </SortableContext>
                    </DndContext>



                </styles.excel_container>
            </styles.excel_table_wrapper>



        </>

    )
}