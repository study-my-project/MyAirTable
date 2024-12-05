import styled from '@emotion/styled'


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