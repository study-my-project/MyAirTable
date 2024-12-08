import styled from '@emotion/styled'

export const sheet_record_td = styled.td`
  box-sizing: content-box; /* 패딩과 보더를 포함하지 않음 */
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  padding: 0;
  line-height: 1;
  min-height: 1px;
`

export const resize_handle = styled.div`
    width: 100%; 
    height: 3px; 
    position: absolute;
    left: 0; 
    bottom: 0;
    cursor: row-resize; /* 마우스 커서 변경 */
    z-index: 10; /* 우선순위 높임 */
`;

export const sheet_drag_handle = styled.div`
  width: 80%; /* 드래그 가능한 영역의 너비 */
  height: 80%; /* 드래그 가능한 영역의 높이 */
  margin: auto; /* 중앙 정렬 */
  cursor: grab; /* 드래그 커서 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;


  &:active {
    cursor: grabbing; /* 드래그 중 커서 변경 */
  }
`;