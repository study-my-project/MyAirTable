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
  overflow-x: hidden; /* 스크롤 막대를 숨김 */
  flex: 1;
  position: relative;
  margin: 0 5px; /* 좌우 버튼 공간 확보 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */
`;

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
    padding: 10px 20px;
    margin-left: 8px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f0f0;
    white-space: nowrap;
`;

export const ScrollButton = styled.button`
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    width: 30px; /* 버튼 크기 */
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ScrollLeftButton = styled(ScrollButton)`
      left: 0; /* 탭 목록 왼쪽 외부로 위치 */
`;

export const ScrollRightButton = styled(ScrollButton)`
    right: 0; /* 탭 목록 오른쪽 외부로 위치 */
`;

export const TabHeader = styled.div`
   display: flex;
    align-items: center;
    justify-content: space-between; /* 좌우 버튼을 구분 */
    overflow: hidden; /* 탭 목록이 화면 밖으로 나가지 않도록 */
    white-space: nowrap;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0;
    position: relative;
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
