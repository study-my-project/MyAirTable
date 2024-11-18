import React from "react";
import * as styles from "./Modal.style"


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// Modal 컴포넌트
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <styles.Overlay>
            <styles.ModalContainer>
                <styles.CloseButton onClick={onClose}>✖</styles.CloseButton>
                {children}
            </styles.ModalContainer>
        </styles.Overlay>
    );
};

export default Modal;