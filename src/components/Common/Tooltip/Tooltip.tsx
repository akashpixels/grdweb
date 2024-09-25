/* eslint-disable indent */
/* eslint-disable max-len */
import React from "react";

interface IToolTip {
  message: string;
  children: React.ReactNode;
  cssClasses?: string;
  isShow?: boolean;
}

const Tooltip: React.FC<IToolTip> = ({ message, children, cssClasses, isShow }) => {
  return (
    <div className={cssClasses}>
      <div className="group relative flex max-w-max flex-col items-center justify-center w-full capitalize">
        {children}
        <div
          className={`absolute  ml-auto z-50 mr-auto min-w-max  scale-0 transform rounded-lg px-3 py-2 text-xs 
      font-medium transition-all duration-500 group-hover:scale-100 ${
        isShow ? "left-10" : " top-5 -translate-x-1/2 left-1/2"
      }`}
        >
          <div
            className={`flex max-w-xs flex-col shadow-lg relative ${
              !isShow ? "justify-center items-center" : ""
            }`}
          >
            <div
              className={`clip-bottom h-2 w-4 bg-gray-800 ${
                isShow ? "-rotate-90 absolute -left-3 top-3" : ""
              }`}
            ></div>
            <div className="rounded bg-gray-800 p-2 px-4 text-center text-sm text-white">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
