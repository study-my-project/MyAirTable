import styled from '@emotion/styled'

export const excel_table_wrapper = styled.div`
  overflow-x: auto; /* 가로 스크롤 활성화 */
  width: 100%; /* 컨테이너 너비는 부모 요소에 맞춤 */
  border: 1px solid #ccc;
`;
export const excel_container = styled.div`
  width: max-content; /* 부모 요소가 아닌 내용에 따라 너비 설정 */
`;

export const excel_table = styled.table`
  border-collapse: collapse; /* 테이블 겹침 제거 */
  table-layout: fixed; /* 고정 레이아웃으로 설정 */
`;

export const excel_table_th = styled.th`
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  position: relative; /* ResizeHandle 기준 위치 설정 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 텍스트 잘림 허용 */
  text-overflow: ellipsis; /* 긴 텍스트 생략 (...) */
  padding: 0; /* 패딩 제거 */
  min-width: 5px; /* 최소 너비 */
`;
export const excel_table_td = styled.td`
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 텍스트 잘림 허용 */
  text-overflow: ellipsis; /* 긴 텍스트 생략 (...) */
  padding: 2px; /* 패딩 최소화 */
  min-width: 5px; /* 최소 너비 강제 설정 */
`


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
