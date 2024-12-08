import * as styles from "./sheet_cell_value.style";
import React, { useEffect, useState } from "react";
import {
    CREATE_CELL_VALUE,
    GET_TABLE_DETAILS,
    UPDATE_CELL_VALUE,
} from "../../../src/graphql/queries";
import { useMutation } from "@apollo/client";
import type {
    Mutation,
} from "../../../src/commons/types/generated/types";

type cellValues = { fieldId: string; recordId: string; value: string }[];

export default function SheetCellValue({ cellValues, recordId, fieldId }: { cellValues: cellValues, recordId: string, fieldId: string }) {
    const [localCellValues, setLocalCellValues] = useState<cellValues>([]);

    // 받아온 cellValues 값을 로컬로 저장
    useEffect(() => {
        setLocalCellValues(cellValues || []);
    }, [cellValues]);

    // 생성, 수정 뮤테이션
    const [createCellValue] = useMutation<Pick<Mutation, "createCellValue">>(CREATE_CELL_VALUE, {
        refetchQueries: [{ query: GET_TABLE_DETAILS }],
    });
    const [updateCellValue] = useMutation<Pick<Mutation, "updateCellValue">>(UPDATE_CELL_VALUE, {
        refetchQueries: [{ query: GET_TABLE_DETAILS }],
    });

    // 셀에 데이터 추가하기
    // 아무런 데이터가 없는 셀을 선택하면 데이터 생성으로
    // 만약 해당 셀에 데이터가 있으면 수정으로

    // 값을 입력하면 데이터를 로컬에 저장함


    // 셀을 클릭하여 포커스 상태일때 값이 없으면 create를 실행함.
    const handleCellFocus = async (recordId: string, fieldId: string) => {
        const existingCell = localCellValues.find(
            (cell) => cell.fieldId === fieldId && cell.recordId === recordId
        );
        // 만약 셀의 데이터가 없으면
        if (!existingCell) {
            try {
                // create로 실행
                await createCellValue({
                    variables: {
                        fieldId,
                        recordId,
                        value: "", // 빈칸 생성
                    },
                });

                // 로컬 상태 업데이트
                setLocalCellValues((newCellValues) => [
                    ...newCellValues,
                    { fieldId, recordId, value: "" },
                ]);

            } catch (error) {
                console.error("Error creating cell value on focus:", error);
            }
        }
    }




    const handleCellChange = (recordId: string, fieldId: string, value: string) => {
        // 로컬에 데이터 저장
        // LocalCellValues 배열의 값들을 nowCellValues에 하나하나씩 불러옴
        setLocalCellValues((nowCellValues) =>
            // map으로 불러와서 각각 이름을 cell로 지정
            nowCellValues.map((cell) =>
                // 현재 받아온 레코드, 필드id값과 동일한 cell이 있으면
                cell.recordId === recordId && cell.fieldId === fieldId
                    // 있으면 기존값을 가져오고 , value 값만 새롭게 덮어씌움
                    ? { ...cell, value }
                    // 없으면 현재 cell을 그대로 반환함. (수정 대상이 아닌셀은 넘어간다는 뜻)
                    : cell
            ))
    }

    // 값 입력 종료 후 포커스가 종료되면 값을 업데이트함
    const handleCellBlur = async (recordId: string, fieldId: string, value: string) => {
        try {
            // 포커스가 종료되면 백엔드에 UpdateCellValue 호출
            await updateCellValue({
                variables: {
                    fieldId,
                    recordId,
                    value,
                },
            });
        } catch (error) {
            console.error("Error updating cell value on blur:", error);
        }
    };

    // 엔터 버튼을 사용해서 포커스 종료하기 , Alt + 엔터면 줄바꿈
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Alt 엔터
        if (event.altKey && event.key === "Enter") {
            const target = event.target as HTMLTextAreaElement;
            const value = target.value;
            const start = target.selectionStart;
            const end = target.selectionEnd;

            // 현재 커서 위치에 줄바꿈 추가
            target.value = value.substring(0, start) + "\n" + value.substring(end);
            target.selectionStart = target.selectionEnd = start + 1; // 커서 위치 조정
            event.preventDefault(); // 기본 동작 방지
        } else if (event.key === "Enter") {
            // 일반 Enter는 blur()로 포커스 해제
            (event.target as HTMLTextAreaElement).blur();
        }
    };

    // 현재 레코드와 필드 ID에 해당하는 셀 값을 찾거나 기본 값을 설정
    const currentValue =
        localCellValues.find(
            (cell) => cell.fieldId === fieldId && cell.recordId === recordId
        )?.value || "";

    return (
        <styles.excel_table_td key={`${recordId}-${fieldId}`}>
            <styles.excel_table_input
                value={currentValue}
                onFocus={() => handleCellFocus(recordId, fieldId)}
                onChange={(e) => handleCellChange(recordId, fieldId, e.target.value)}
                onBlur={(e) => handleCellBlur(recordId, fieldId, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
        </styles.excel_table_td >
    )



}