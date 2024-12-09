import * as styles from "./sheet_field.style";
import { useContextMenu } from "../contextmenu";
import { useState } from "react";
import {
    UPDATE_FIELD_WIDTH,
    UPDATE_FIELD_NAME,
} from "../../../src/graphql/queries";
import { useMutation } from "@apollo/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type field = { id: string; fieldName: string; fieldIndex: number; tableId: string; fieldWidth: number; };
export default function SheetField({ field, isDragDisabled }: { field: field, isDragDisabled: boolean }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: field.id,
        disabled: isDragDisabled, // 드래그 비활성화 조건
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const { handleContextMenu, renderContextMenu } = useContextMenu(field.tableId);



    // 필드의 사이즈 조절
    // 초기 너비 
    const [width, setWidth] = useState(field.fieldWidth);
    const [updateFieldWidth] = useMutation(UPDATE_FIELD_WIDTH);
    const [isEditing, setIsEditing] = useState(false); // 필드 이름 수정 중인지 확인

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        // 기본동작을 막음
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


    // 필드 이름 수정하기    
    const [fieldName, setFieldName] = useState(field.fieldName); // 로컬 필드 이름 상태
    const [updateFieldName] = useMutation(UPDATE_FIELD_NAME);

    // 이름 수정하기
    const handleFieldNameEdit = async () => {
        try {
            await updateFieldName({
                variables: {
                    fieldId: field.id,
                    fieldName: fieldName.trim(),
                },
            });
        } catch (error) {
            console.error("Failed to update field name:", error);
        }
    };

    // 엔터키 눌렀을때 포커스 종료
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // 이름 수정하기 기능 동작시킴
            handleFieldNameEdit();
            setIsEditing(false); // 이름 수정 종료
        }
    };

    // 포커스 되면 수정중으로 변경
    const handleBlur = () => {
        handleFieldNameEdit();
        setIsEditing(false); // 이름 수정 종료
    };


    return (
        <>
            <styles.sheet_field_th
                ref={setNodeRef} // 드래그 가능한 요소로 설정
                onContextMenu={(e) => handleContextMenu(e, "field", field.id)}
                // 동적 너비 적용
                style={{ ...style, width: `${width}px` }}>
                {/* 필드 이름을 클릭하면 input으로 전환 */}
                <styles.sheet_drag_handle
                {...attributes}
                  {...(isDragDisabled || isEditing ? {} : listeners)} // 수정 중이면 드래그 비활성화
                >
                    <styles.field_name
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        onFocus={() => setIsEditing(true)} // 이름 수정 시작
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        autoFocus
                    />
                </styles.sheet_drag_handle>
                <styles.resize_handle onMouseDown={handleResizeMouseDown} />
                {/* 컨텍스트 메뉴 렌더링 */}
                {renderContextMenu()}
            </styles.sheet_field_th>
        </>
    );
}