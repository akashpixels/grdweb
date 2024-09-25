/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import React from "react";
import { AiOutlineStop } from "react-icons/ai";

interface ICloseAppointment {
  onClose: () => void;
  onConfirm: () => void;
}

const CloseAppointment = ({ onClose, onConfirm }: ICloseAppointment) => {
  return (
    <div>
      <div className="flex gap-6 mb-3 items-center">
        <div className="p-3 border text-2xl rounded-lg">
          <AiOutlineStop />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Cancel Appointment</h3>
      </div>
      <p className="text-gray-500 text-md my-4 mb-6">
        Are you sure you want to cancel the appointment?
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onClose}
          className="text-custom-dark-orange bg-transparent border border-custom-dark-orange hover:bg-custom-white hover:border-custom-primary hover:text-custom-primary"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="text-custom-secondary border hover:bg-transparent hover:border-custom-primary hover:text-custom-primary"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CloseAppointment;
