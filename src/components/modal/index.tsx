import IconButton from "@components/icon-button";
import React from "react";
import { MdClose } from "react-icons/md";
import { useTheme } from "theme-token-manager";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { theme } = useTheme();
  if (!isOpen) return null;

  return (
    <>
      <div className="bg-surface-page rounded-3xs p-6 shadow-lg z-10 relative">
        <IconButton
          icon={<MdClose size={theme.size.spacing?.md} />}
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        />
        {children}
      </div>
      <div
        className="fixed inset-0 flex bg-black/90 z-0"
        onClick={onClose}
      ></div>
    </>
  );
};

export default Modal;
