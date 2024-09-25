/* eslint-disable max-len */
import React, { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onClick?: (e?: any) => void;
  className?: string;
  bgColor?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any;
}
const Button = ({ children, onClick, className, bgColor, disabled, type }: IButton) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={` ${
        bgColor || "bg-custom-primary"
      } hover:bg-transparent border hover:border-custom-primary shadow-md font-bold py-3 px-6 rounded-md ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
