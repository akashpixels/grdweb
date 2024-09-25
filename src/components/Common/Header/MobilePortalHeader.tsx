/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";
import LogoShort from "assets/logo_short.svg";

const MobilePortalHeader = () => {
  return (
    <header className="no-print fixed top-0 left-0 w-full bg-white shadow-md z-10 flex items-center justify-between px-4 py-3  lg:hidden">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={LogoShort} alt="logo" width={50} height={50} />
        </Link>
        <span className="text-xl font-bold text-gray-900">TheGradStory</span>
      </div>
      <div>
        <button className="text-gray-500 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default MobilePortalHeader;
