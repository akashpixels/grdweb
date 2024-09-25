/* eslint-disable max-len */
import React, { ReactNode, useEffect, useRef } from "react";

interface BottomSlideInProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSlideIn: React.FC<BottomSlideInProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-50"></div>

          {/* Modal */}
          <div
            ref={modalRef}
            className="fixed inset-x-0 bottom-0 z-50 w-full bg-white rounded-t-2xl shadow-lg overflow-hidden transform transition-transform"
          >
            <div className="p-6 max-h-[80vh] overflow-y-scroll custom-scroll">{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default BottomSlideIn;
