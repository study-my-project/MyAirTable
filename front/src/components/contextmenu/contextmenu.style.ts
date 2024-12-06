import styled from '@emotion/styled'

export const ContextMenu = styled.div`
    position: absolute; /* 부모 요소의 흐름에서 벗어남 */
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* 다른 요소 위로 표시 */
    padding: 8px;
    border-radius: 4px;
    pointer-events: auto; /* 클릭 이벤트 허용 */
`;

export const ContextMenuItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    pointer-events: auto; /* 클릭 이벤트 허용 */
    z-index: 1000; /* 다른 요소 위로 출력 */


    &:hover {
        background-color: #f0f0f0;
    }
`;
