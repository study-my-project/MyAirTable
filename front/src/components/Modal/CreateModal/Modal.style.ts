import styled from '@emotion/styled'




// 스타일 정의
export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
  `;

export const ModalContainer = styled.div`
    position: relative;
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
  `;

export const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: #4b5563;
    font-size: 16px;
    cursor: pointer;
  
    &:hover {
      color: #1f2937;
    }
  `;
