/* eslint-disable max-len */
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Option {
  value: number | string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
  classes?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  onChange,
  classes,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${classes}`}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} label={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
