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

// 제목 스타일
export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
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

// 테이블
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

// 테이블 헤더
export const TableHeader = styled.th`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  background-color: #f5f5f5;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

// 테이블 행
export const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

// 테이블 데이터 셀
export const TableCell = styled.td`
  font-size: 14px;
  color: #333;
  padding: 12px;
  border-bottom: 1px solid #ddd;
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


export const AddButton = styled.button`
  margin-left: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;

  &:hover {
    background-color: #0056b3;
  }
`;