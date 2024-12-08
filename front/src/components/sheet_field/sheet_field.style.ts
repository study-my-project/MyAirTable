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

export const ResizeHandle = styled.div`
    width: 4px; /* 크기 조절 핸들의 두께 */
    height: 100%; /* 필드 전체 높이 */
    position: absolute;
    right: 0; /* 필드 오른쪽 끝에 고정 */
    top: 0;
    cursor: col-resize; /* 마우스 커서 스타일 변경 */
    z-index: 10; /* 우선순위 높임 */
`;