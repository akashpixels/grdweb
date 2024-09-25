/* eslint-disable max-len */
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <FaExclamationTriangle className="text-6xl text-red-500" />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-lg mt-2">The page you are looking for does not exist.</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;
