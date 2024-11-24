import styled from "@emotion/styled";

// 컨테이너 스타일
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// 탭 컨테이너
export const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 16px;
`;

// 개별 탭
export const Tab = styled.button<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  color: ${({ isActive }) => (isActive ? "#007bff" : "#666")};
  background: none;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: ${({ isActive }) => (isActive ? "3px solid #007bff" : "none")};
  transition: all 0.2s;

  &:hover {
    color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;


// 내용 영역
export const Content = styled.div`
  font-size: 16px;
  color: #555;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;
