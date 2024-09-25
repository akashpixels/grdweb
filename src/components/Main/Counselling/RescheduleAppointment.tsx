/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import React, { useState } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { showToast } from "utils/toastUtils";

interface IRescheduleMeet {
  timing: string[];
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (item: string) => void;
}
const RescheduleAppointment = ({ timing, onClose, onConfirm }: IRescheduleMeet) => {
  const [date, setDate] = useState<string>("");
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null);

  const rescheduleAppointment = () => {
    if (selectedTiming) {
      onConfirm(selectedTiming || "");
      onClose();
    } else {
      showToast("error", "Select time to reschedule");
    }
  };

  return (
    <div>
      <div className="flex gap-6 mb-3">
        <div className="p-3 border text-2xl rounded-lg">
          <GiSandsOfTime />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Reschedule Appointment</h3>
          <p className="text-gray-500 text-sm">Select the new slot below</p>
        </div>
      </div>
      <p className="text-gray-500 text-md mt-3 mb-2">Available Slots</p>
      <div className="w-1/2">
        <input
          type="date"
          className="border rounded-lg p-3 mb-4 w-full text-gray-700 hover:border-custom-secondary cursor-pointer"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 my-4 gap-3">
        {timing.map((item, key) => {
          const isSelected = selectedTiming === item;
          return (
            <p
              key={key}
              onClick={() => setSelectedTiming(isSelected ? null : item)}
              className={`p-3 border shadow-inner rounded-md text-center font-semibold ${
                isSelected
                  ? "bg-[#FFF3E0] border-custom-secondary"
                  : "hover:border-custom-secondary hover:bg-[#FFF3E0]"
              }`}
            >
              {item}
            </p>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onClose}
          className="text-custom-dark-orange bg-transparent border border-custom-dark-orange hover:bg-custom-white hover:border-custom-primary hover:text-custom-primary"
        >
          Cancel
        </Button>
        <Button
          onClick={rescheduleAppointment}
          className="text-custom-secondary border hover:bg-transparent hover:border-custom-primary hover:text-custom-primary"
        >
          Reschedule
        </Button>
      </div>
    </div>
  );
};

export default RescheduleAppointment;
