import styled from '@emotion/styled'

export const sheet_field_th = styled.th`
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  position: relative; /* ResizeHandle 기준 위치 설정 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 텍스트 잘림 허용 */
  text-overflow: clip; /* 긴 텍스트 생략 (...) */
  padding: 2px; /* 여백 최소화 */
`;

export const resize_handle = styled.div`
    width: 4px; /* 크기 조절 핸들의 두께 */
    height: 100%; /* 필드 전체 높이 */
    position: absolute;
    right: 0; /* 필드 오른쪽 끝에 고정 */
    top: 0;
    cursor: col-resize; /* 마우스 커서 스타일 변경 */
    z-index: 10; /* 우선순위 높임 */
`;

export const field_name = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box; /* 패딩 포함한 크기 계산 */
  border: none; /* 기본 테두리 제거 */
  padding: 0; /* 여백 제거 */
  text-align: center; /* 텍스트 가운데 정렬 */
  font-size: 14px; /* 텍스트 크기 */
  background: transparent; /* 배경 투명 */
  outline: none; /* 포커스 시 테두리 제거 */
`
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