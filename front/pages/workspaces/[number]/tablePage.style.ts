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
  gap: 8px;
`;

// 개별 탭
export const Tab = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? "#d6d6d6" : "#f0f0f0")};
    border: none;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    padding: 8px 12px;
    width: 130px;

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
export const AddTabButton = styled.button`
    background-color: #e0e0e0;
    border: none;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 12px;

    &:hover {
        background-color: #d6d6d6;
    }
`;

export const TabHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    margin-bottom: 16px;
`;


export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    text-align: center;
`;

export const Input = styled.input`
    width: 90%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ContextMenu = styled.div`
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 8px;
`;

export const ContextMenuItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;