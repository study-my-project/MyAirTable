import styled from '@emotion/styled'

export const excel_container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

export const excel_table = styled.table`
  border-collapse: collapse;
  width: auto; /* 테이블 내용에 따라 너비 조정 */
  min-width: 100%; 
  table-layout: fixed; /* 테이블 칸 고정 */
  overflow-x: auto; /* /* 최소 너비 설정 */
`
export const excel_table_th = styled.th`
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center; /* 중앙 정렬 */
    font-size: 14px; /* 글자 크기 고정 */
    line-height: 1.5; /* 줄 높이 */
    min-width: 50px;
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */

    font-family: inherit; /* 부모 요소의 폰트 설정을 따르도록 */
  font-size: 14px;
  font-weight: normal; /* 기본 폰트 두께 */
  letter-spacing: normal; /* 글자 간격 기본값 */
`;
export const excel_table_td = styled.td`
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
    min-width: 50px;
    max-width: 100px;
`

export const excel_table_input = styled.input`
    border: none;
    width: 100%;
    text-align: center;
`
export const controls_button = styled.button`
    margin: 5px;
    padding: 10px;
    cursor: pointer;
`

export const context_menu = styled.ul`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 5px 0;
  margin: 0;
  z-index: 1000;
  width: 150px;
  font-size: 14px;
`;

export const context_menu_item = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const create_button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 3px;
  width:80px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ContextMenu = styled.div`
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 8px;
`;

export const ContextMenuItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const drag_handle = styled.div`
    cursor: grab;
    width: 16px;
    height: 16px;
    background-color: #ddd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
`;

export const resize_handle = styled.div`
    cursor: col-resize;
    width: 8px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

export const ResizeHandle = styled.div`
  cursor: col-resize;
  width: 8px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
`;

export const excel_table_wrapper = styled.div`
  overflow-x: auto; /* 가로 스크롤 활성화 */
  width: 100%; /* 컨테이너가 화면 전체 너비를 차지 */
  border: 1px solid #ccc; /* 테두리 추가 */
`;

