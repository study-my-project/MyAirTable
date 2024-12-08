import * as styles from "./sheet_record.style";
import React from "react";
import SheetCellValue from "../sheet_cell_value";
import { useContextMenu } from "../contextmenu";
import { useState } from "react";
import {
    UPDATE_RECORD_HEIGHT,
} from "../../../src/graphql/queries";
import { useMutation } from "@apollo/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type record = { id: string; recordIndex: number; tableId: string; recordHeight: number; };
type cellValues = { fieldId: string; recordId: string; value: string; }[];
type fields = { id: string; fieldName: string; tableId: string; fieldWidth: number; }[];

export default function SheetRecord({ record, cellValues, fields, isDragDisabled }: { record: record, cellValues: cellValues, fields: fields, isDragDisabled: boolean }) {


    // useContextMenu를 최상위에서 호출
    const { handleContextMenu, renderContextMenu } = useContextMenu(record.tableId);


    // 레코드 높이 조절하기
    // 초기 높이
    const [height, setHeight] = useState(record.recordHeight);
    // 높이 변경하는 뮤테이션
    const [updateRecordHeight] = useMutation(UPDATE_RECORD_HEIGHT);

    // 크기 조절하는 handle
    const handleResizeMouseDown = (e: React.MouseEvent) => {
        // 기본 드래그 동작 막기
        e.preventDefault();
        // 초기 마우스 Y값
        const startY = e.clientY;
        // 초기 레코드 높이값
        const startHeight = height;

        // 최신값을 저장할 변수 newHeight
        let newHeight = startHeight;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            // 마우스의 이동거리 (마우스 현재위치 - 시작위치)
            const deltaY = moveEvent.clientY - startY;
            // 최소값을 5로, 초기값 + 이동값 = 새로운 높이
            newHeight = Math.max(5, startHeight + deltaY);
            // 새로운 높이값 저장
            setHeight(newHeight);
        };

        const handleMouseUp = async () => {
            // document.removeEventListener(eventType, listener, options); 형태
            // mousemove 이벤트 타입
            // mousemove 이벤트 발생시 호출되는 콜백함수 handleMouseMove
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            // 만약 새로운 높이의 값이 0이하면
            if (newHeight <= 0) {
                // 이상한 값이라는 에러메시지 출력후 종료
                console.log("Invalid height value: ", newHeight);
                return;
            }
            try {
                // 뮤테이션으로 새로운 높이값 전송
                await updateRecordHeight({
                    variables: {
                        recordId: record.id,
                        newHeight: Math.round(newHeight),
                    },
                });
            } catch (e) {
                console.error("Failed to update record Height: ", e);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    // 드래그 드롭 할때 선택되지 않도록 하기
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: record.id,
        disabled: isDragDisabled, // 드래그 비활성화 조건
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };



    return (
        <>
            <tr>
                <styles.sheet_record_td
                    ref={setNodeRef} // 드래그 가능한 요소로 설정
                    onContextMenu={(e) => handleContextMenu(e, "record", record.id)}
                    style={{ ...style, height: `${height}px` }} >
                    <styles.sheet_drag_handle
                        {...attributes}
                        {...(isDragDisabled ? {} : listeners)} // 드래그 이벤트를 조건부로 추가
                    >
                        {record.recordIndex}
                    </styles.sheet_drag_handle>
                    <styles.resize_handle onMouseDown={handleResizeMouseDown} />
                </styles.sheet_record_td>

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