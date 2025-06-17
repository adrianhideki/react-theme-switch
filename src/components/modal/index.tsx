import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="bg-surface-page rounded-default p-6 shadow-lg z-10 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-text cursor-pointer"
        >
          &times;
        </button>
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
