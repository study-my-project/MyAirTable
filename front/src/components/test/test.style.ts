import styled from '@emotion/styled'



// 스타일 정의
export const TableWrapper = styled.div`
  overflow-x: auto; /* 좌우 스크롤 허용 */
  width: 100%; /* 화면 크기에 맞추기 */
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100px;
  table-layout: fixed; /* 고정 레이아웃 */
`;

export const TableRow = styled.tr`
  border: 1px solid #ccc;
`;

export const TableHeader = styled.th`
  border: 1px solid #ccc;
  text-align: left;
  position: relative;
  background-color: #f9f9f9;
`;

export const TableCell = styled.td`
  border: 1px solid #ccc;
  text-align: left;
  padding: 8px;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  background-color: rgba(0, 0, 0, 0.1); /* 시각적으로 구분되도록 */
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;