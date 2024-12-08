import styled from '@emotion/styled'

export const excel_table_wrapper = styled.div`
  overflow-x: auto; /* 가로 스크롤 활성화 */
  max-width: 100%;  // 컨테이너 너비는 부모 요소에 맞춤
  max-height: 100%; /* 상위 요소의 높이 제한 제거 */
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
`;
export const excel_container = styled.div`
  width: auto; /* 부모 요소가 아닌 내용에 따라 너비 설정 */
  height: auto;
`;

export const excel_table = styled.table`
  border-collapse: collapse; /* 테이블 겹침 제거 */
  table-layout: fixed; /* 고정 레이아웃으로 설정 */
  width: 0%;  // 부모요소에 의존하지않고 테이블 자체의 값에 독립적으로 조정함.
  height: 0%; /* 높이를 콘텐츠에 맞게 조정 */
  margin: 0;
  padding: 0;
`;

export const excel_table_th = styled.th`
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 텍스트 잘림 허용 */
  text-overflow: ellipsis; /* 긴 텍스트 생략 (...) */
  padding: 0; /* 패딩 제거 */
  min-width: 5px; /* 최소 너비 */
`;
export const excel_table_td = styled.td`
  border: 1px solid #ccc;
  text-align: left; /* 텍스트와 버튼을 좌측 정렬 */
  font-size: 14px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 텍스트 잘림 허용 */
  text-overflow: ellipsis; /* 긴 텍스트 생략 (...) */
  padding: 2px; /* 패딩 최소화 */
  min-width: 5px; /* 최소 너비 강제 설정 */
  min-height: 5px;
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

