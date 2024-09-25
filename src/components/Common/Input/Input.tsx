/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { ChangeEvent } from "react";

interface IInput {
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  textColor?: string;
  value?: string | number;
  id?: string;
  maxLength?: number;
  label?: string;
  className?: string;
}

const Input = ({
  name,
  onChange,
  type,
  placeholder,
  textColor,
  id,
  maxLength,
  label,
  className,
}: IInput) => {
  return (
    <div className="w-full min-w-[200px] ">
      <label
        className={`block text-sm font-medium mb-1 capitalize ${
          textColor ? textColor : "text-custom-primary"
        }`}
        dangerouslySetInnerHTML={{ __html: label ?? name }}
      ></label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name?.split(" ").join("")}
        className={`${className} border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
