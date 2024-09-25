/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  prefix?: any;
  options?: any;
  defaultValue?: string;
  disabled?: boolean;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  placeholder = "",
  prefix,
  options,
  defaultValue = "",
  disabled = false,
  maxLength=999999999999999
}) => {
  return (
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <div className="flex">
        {prefix && (
          <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 text-gray-500 sm:text-sm rounded-l-md">
            {prefix}
          </span>
        )}
        <input
          type={type}
          id={name}
          {...register(name, options)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`block w-full px-3 py-2 border border-gray-300 ${
            prefix ? "rounded-r-md" : "rounded-md"
          } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default InputField;
