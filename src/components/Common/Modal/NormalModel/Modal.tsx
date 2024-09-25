/* eslint-disable max-len */
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (time: string) => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative bg-white rounded-lg mx-8 lg:w-4/6 2xl:w-1/2 max-h-[27rem] overflow-y-scroll md:overflow-y-auto custom-scroll  ${
          className ?? "p-6"
        }`}
      >
        {children}
        <span className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <IoMdClose className="text-2xl" />
        </span>
      </div>
    </div>
  );
};

export default Modal;
