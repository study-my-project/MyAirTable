import React,{useState,useRef} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as styles from "./tab.style";

type Table = {id: string; tableName: string; index: number }
export default function Tab({
    table,
    isActive,
    onClick,
    onContextMenu,
}:{
    table: Table;
    isActive: boolean;
    onClick: (tabId: string) => void;
    onContextMenu: (e: React.MouseEvent, tableId: string) => void;
}) {

    // 드래그 앤 드롭을 위한 설정
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: table.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isDragging, setIsDragging] = useState(false); // 드래그 상태 추적
    const pointerStart = useRef<{ x: number; y: number } | null>(null); // 포인터 시작 좌표


    const handlePointerDown = (event: React.PointerEvent) => {
        setIsDragging(false); // 드래그 상태 초기화
        pointerStart.current = { x: event.clientX, y: event.clientY }; // 시작 좌표 저장
    };

    const handlePointerMove = (event: React.PointerEvent) => {
        if (!pointerStart.current) return;

        const distanceX = Math.abs(event.clientX - pointerStart.current.x);
        const distanceY = Math.abs(event.clientY - pointerStart.current.y);

        // 이동 거리가 임계값(5px) 이상인 경우에만 드래그 상태로 간주
        if (distanceX > 5 || distanceY > 5) {
            setIsDragging(true);
        }
    };

    const handlePointerUp = () => {
        if (!isDragging) {
            onClick(table.id); // 클릭 동작
        }
        setIsDragging(false); // 드래그 상태 초기화
        pointerStart.current = null; // 시작 좌표 초기화
    };

    return (
        <styles.Tab
            ref={setNodeRef}
            style={style}
            isActive={isActive}
            onPointerDown={handlePointerDown} // 클릭 예약
            onPointerMove={handlePointerMove} // 드래그 상태로 전환
            onPointerUp={handlePointerUp} // 클릭 발생 시 실행
            onContextMenu={(e) => onContextMenu(e, table.id)} // 컨텍스트 메뉴 핸들러
            {...attributes}
            {...listeners}
        >
            {table.tableName}
        </styles.Tab>
    )
}