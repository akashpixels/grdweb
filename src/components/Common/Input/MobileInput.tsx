/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React, { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputProps {
  label?: string;
  labels?: string;
  req?: boolean;
  error?: string;
  touched?: boolean;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}

const MobileInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="flex flex-col items-start">
      <div className="block text-sm font-medium text-gray-700 mb-1">
        {props.label || props.labels}
      </div>
      <div className="flex-grow w-full">
        <PhoneInput
          specialLabel={""}
          country={"gb"}
          autoFormat={true}
          inputStyle={{
            borderColor: props.touched && props.error ? "red" : "#e2e8f0", // Tailwind's border-gray-300
            width: "100%",
            padding: "0.6rem 0.5rem 0.6rem 3rem", // Tailwind's p-2
            borderRadius: "0.375rem", // Tailwind's rounded-md
            height: "38px",
          }}
          containerStyle={{
            width: "100%",
          }}
          enableAreaCodes={true}
          value={props.value}
          onChange={props.onChange}
          inputProps={{ ref }}
          // @ts-ignore
          ref={ref} // Forwarding ref for react-hook-form
        />
        {props.touched && props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>}
      </div>
    </div>
  );
});

export default MobileInput;
