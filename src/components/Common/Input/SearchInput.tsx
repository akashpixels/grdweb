/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SInput {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Add onKeyPress prop
  type: "text";
  placeholder?: string;
  value?: string;
}

const SearchInput = ({ onChange, onKeyPress, type, placeholder, value }: SInput) => {
  return (
    <div className="w-full min-w-[200px] relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type={type}
        className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        onKeyPress={onKeyPress} // Attach onKeyPress handler
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
