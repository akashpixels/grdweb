import React from "react";
import "./ToggleSwitch.css"; // Create this file for styling

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div className={`switch ${checked ? "toggled" : ""}`} onClick={onChange}>
      <div className="slider" />
    </div>
  );
};

export default ToggleSwitch;
