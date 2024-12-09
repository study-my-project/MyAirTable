import styled from '@emotion/styled'


// 개별 탭
export const Tab = styled.button<{ isActive: boolean }>`
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
    background-color: ${(props) => (props.isActive ? "#ddd" : "white")};
    white-space: nowrap;
`;