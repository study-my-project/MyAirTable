import styled from '@emotion/styled'


export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const WorkspaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

export const WorkspaceCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const WorkspaceTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const WorkspaceUpdatedAt = styled.p`
  font-size: 0.875rem;
  color: #777;
`;

export const CreateButton = styled.button`
  margin-top: 24px;
  padding: 12px 16px;
  background-color: #3b82f6; /* Tailwind's blue-500 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb; /* Tailwind's blue-600 */
  }
`;

export const CancelButton = styled.button`
  margin-top: 24px;
  padding: 12px 16px;
  background-color: #3b82f6; /* Tailwind's blue-500 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb; /* Tailwind's blue-600 */
  }
`;


export const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const BaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BaseItem = styled.div`

display: flex;
justify-content: space-between;
align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  cursor: pointer;
  position: relative;
`;

export const BaseTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

export const BaseUpdatedAt = styled.p`
  margin: 0;
  font-size: 0.9em;
  color: #666;
`;

export const MoreOptionsButton = styled.button`
  position: absolute; /* 카드 안에서 위치를 고정 */
  top: 10px; /* 위쪽 여백 */
  right: 10px; /* 오른쪽 여백 */
  background: none; /* 배경 제거 */
  border: none; /* 버튼 테두리 제거 */
  font-size: 18px; /* 세로 점 크기 */
  cursor: pointer; /* 클릭 커서 변경 */

  &:hover {
    color: #007bff; /* 마우스를 올렸을 때 색상 변경 */
    transform: scale(1.2); /* 크기를 살짝 키워서 강조 효과 */
    transition: all 0.2s ease-in-out; /* 부드러운 효과 */
  }
`

export const DropdownMenu = styled.div`
  display: block; /* 기본적으로 숨김 */
  position: absolute;
  top: 35px; /* 세로 점 버튼 아래에 위치 */
  right: 10px;
  background: white; /* 배경 흰색 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 5px; /* 둥근 모서리 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 */
  z-index: 1000; /* 메뉴가 위에 보이도록 설정 */
`

export const DropdownMenuUl = styled.div`
  list-style: none; /* 리스트 스타일 제거 */
  margin: 0;
  padding: 0;
`

export const DropdownMenuLi = styled.div`
  padding: 10px 15px;
  cursor: pointer; /* 클릭 가능한 커서 */
  &:hover{
    background: #f5f5f5; /* 마우스를 올렸을 때 배경 색상 변경 */
  }
`

export const WorkspaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WorkspaceItem = styled.div<{ selected?: boolean }>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#0056b3" : "#f0f0f0")};
    color: ${({ selected }) => (selected ? "white" : "black")};
  }
  background-color: ${({ selected }) => (selected ? "#007BFF" : "white")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: ${({ selected }) => (selected ? "2px solid #007BFF" : "1px solid #ccc")};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const NewBaseButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;