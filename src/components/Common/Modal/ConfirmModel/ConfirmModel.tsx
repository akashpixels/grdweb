/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import React from "react";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="text-center">
      <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: message }}></p>
      <div className="flex justify-center gap-4">
        <Button
          onClick={onConfirm}
          className="  hover:text-custom-secondary hover:bg-transparent text-white bg-custom-secondary hover:border-custom-secondary"
        >
          OK
        </Button>
        <Button
          onClick={onCancel}
          className="  hover:text-custom-secondary bg-transparent text-gray-500  hover:border-custom-secondary border-gray-400"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
