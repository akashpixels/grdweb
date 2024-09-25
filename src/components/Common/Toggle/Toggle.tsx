import React, { useState } from "react";

const ToggleButton = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className="w-full flex justify-center py-3">
      <div className="flex justify-between w-[22rem] border rounded-xl p-2">
        <button
          className={`text-lg font-medium focus:outline-none py-2 px-4 ${
            isMonthly ? "text-custom-primary bg-white shadow-md rounded" : "text-gray-500"
          }`}
          onClick={handleToggle}
        >
          Monthly billing
        </button>
        <button
          className={`text-lg font-medium focus:outline-none py-2 px-4 ${
            !isMonthly ? "text-custom-primary bg-white shadow-md rounded" : "text-gray-500"
          }`}
          onClick={handleToggle}
        >
          Annual billing
        </button>
      </div>
    </div>
  );
};

export default ToggleButton;
