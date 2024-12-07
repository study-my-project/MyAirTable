import * as styles from "./sheet_field.style";
import { useContextMenu } from "../contextmenu";
import { useState } from "react";
import {
    UPDATE_FIELD_WIDTH,
} from "../../../src/graphql/queries";
import { useMutation } from "@apollo/client";


type field = { id: string; fieldName: string; fieldIndex: number; tableId: string; fieldWidth: number; };
export default function SheetField({ field }: { field: field }) {

    const { handleContextMenu, renderContextMenu } = useContextMenu(field.tableId);



    // 필드의 사이즈 조절
    // 초기 너비 
    const [width, setWidth] = useState(field.fieldWidth);
    const [updateFieldWidth] = useMutation(UPDATE_FIELD_WIDTH);

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX; // 마우스 시작 위치
        const startWidth = width; // 초기 필드 너비

        let newWidth = startWidth; // 최신 너비 값을 저장할 변수



        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX; // 마우스 이동 거리
            newWidth = Math.max(5, startWidth + deltaX); // 최소 너비를 50px로 제한
            setWidth(newWidth); // 새로운 너비 설정
        };

        const handleMouseUp = async () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            if (newWidth <= 0) {
                console.error("Invalid width value:", newWidth);
                return;
            }
            try {
                // 서버에 새 너비 값 업데이트
                await updateFieldWidth({
                    variables: {
                        fieldId: field.id,
                        newWidth: Math.round(newWidth),
                    },
                });
            } catch (error) {
                console.error("Failed to update field width:", error);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <>
            <styles.sheet_field_th
                onContextMenu={(e) => handleContextMenu(e, "field", field.id)}
                // 동적 너비 적용
                style={{ width: `${width}px` }} >
                {field.fieldName}
                <styles.ResizeHandle onMouseDown={handleResizeMouseDown} />
                {/* 컨텍스트 메뉴 렌더링 */}
                {renderContextMenu()}
            </styles.sheet_field_th>
        </>
    );
}