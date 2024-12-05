import { useState,useEffect, useRef,useCallback } from "react";
import * as styles from "./contextmenu.style";
import ReactDOM from "react-dom";


type ContextMenuState = {
    x: number; // 마우스 x 좌표
    y: number; // 마우스 y 좌표
    type: "field" | "record" | null; // 클릭한 부분의 타입
    id: string | null; // 클릭한 요소의 id
} | null;

export const useContextMenu = () => {
    // 컨텍스트 메뉴 상태
    const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);

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
    // useCallback : 함수를 메모제이션해서 불필요한 재생성 방지

    const closeContextMenu = useCallback(() => {
        // 컨텍스트 메뉴의 값을 null로 만들어서 메뉴 종료
        setContextMenu(null);
    },[setContextMenu]); // 의존성배열 : 함수가 다시 생성될지 여부를 결정하는 값들의 배열, 배열의 값이 변경될 떄만 함수가 새로 생성됨
    // 해당 내용을 useCallback으로 만들지 않으면 아래의 menuRef로 인해서 재생성될 가능성이 있음.


    // 마우스로 메뉴 외부 클릭시에도 컨텍스트 메뉴 닫기.
    // useRef : DOM요소나 값을 저장하기 위한 참조 객체를 생성,관리 하는데 사용함.
    // react DOM에 직접 접근하거나, 값이 렌더링 사이클에 영향을 받지 않도록 유지해야 할 때 활용.
    // const ref = useRef(initialValue);  <- 기본 문법 / initialValue: 기본값 보통은 null 로 하는게 일반적
    // 리턴값으로 참조 객체: { current: initialValue } 형식의 객체를 반환
    const menuRef = useRef<HTMLDivElement | null>(null);
    // 메뉴 외부를 클릭하면 컨텍스트 메뉴 닫기
    // 메뉴 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 메뉴 내부를 클릭한 경우 이벤트 무시
            // menuRef.current : menuRef는 useRef로 생성된 객체
            // menuRef.current가 존재한다는 것은 컨텍스트 메뉴가 열려있다는것
            // 
            // menuRef.current.contains : contains() 메서드는 특정 노드가 해당 요소의 자식인지 확인하는 메서드 
            // 즉 현재 클릭한 요소 (event.target)이 컨텍스트 메뉴( menuRef.current)의 내부인가?
            // 
            // 컨텍스트 메뉴가 열려있고, 마우스가 컨텍스트 메뉴 내부를 클릭했으면 동작하지 않음
            if (menuRef.current && menuRef.current.contains(event.target as Node)) {
                return;
            }
            // 만약 위의 조건을 만족하지 않으면 컨텍스트 메뉴를 닫음.
            closeContextMenu();
        };

        // 클릭 이벤트 리스너 추가
        // 사용자가 메뉴 외부를 클릭했는지 감지하기 위해서 필요함.
        // React 컴포넌트는 자신의 영역 내부만 감지 가능 하기에 전역 이벤트 리스너인 document를 사용함.
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // 클릭 이벤트 리스너 제거
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeContextMenu]);

    // 컨텍스트 메뉴 렌더링 컴포넌트
    const renderContextMenu = () => {
        // 값이 비어있으면 null 리턴함
        if (!contextMenu) return null;

        return (
            contextMenu &&
            ReactDOM.createPortal(
                <styles.ContextMenu
                    style={{
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                    }}
                >
                    {/* 필드 삭제 메뉴 */}
                    {contextMenu.type === "field" && (
                        <styles.ContextMenuItem
                            onClick={() => console.log("필드 삭제", contextMenu.id)}
                        >
                            필드 삭제
                        </styles.ContextMenuItem>
                    )}

                    {/* 레코드 삭제 메뉴 */}
                    {contextMenu.type === "record" && (
                        <styles.ContextMenuItem
                            onClick={() => console.log("레코드 삭제", contextMenu.id)}
                        >
                            레코드 삭제
                        </styles.ContextMenuItem>
                    )}

                    {/* 닫기 버튼 */}
                    <styles.ContextMenuItem onClick={closeContextMenu}>
                        닫기
                    </styles.ContextMenuItem>
                </styles.ContextMenu>,
                document.body // Portal을 렌더링할 위치
            )
        );
    }

    // 필요한 함수와 상태를 반환
    return {
        contextMenu,
        handleContextMenu,
        closeContextMenu,
        renderContextMenu,
    };
}