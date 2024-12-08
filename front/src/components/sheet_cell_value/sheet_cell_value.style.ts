import styled from '@emotion/styled'

export const excel_table_td = styled.td`
  border: 1px solid #ccc; /* 테두리 유지 */
  text-align: center;
  font-size: 14px;
  position: relative; /* 크기 조절 핸들을 위한 상대 위치 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  padding: 0; /* 패딩 제거 */
  height: auto; /* 자동 높이 설정 */
  line-height: 1; /* 줄 간격 최소화 */
  min-height: 1px;
  box-sizing: border-box; /* 테두리와 패딩을 크기 계산에 포함 */
  background-clip: padding-box; /* 배경과 테두리 간 충돌 방지 */
`
export const excel_table_input = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  text-align: center;
  resize: none; /* 크기 조절 비활성화 */
  overflow: hidden; /* 내용이 넘칠 때 숨김 */
  font-size: 14px; /* 기본 텍스트 크기 */
  padding: 0; /* 여백 */
  outline: none; /* 포커스 시 테두리 제거 */
`;