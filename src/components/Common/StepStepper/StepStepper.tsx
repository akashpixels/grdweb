/* eslint-disable max-len */
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface StepStepperProps {
  status: string;
}

const StepStepper: React.FC<StepStepperProps> = ({ status }) => {
  return (
    <ol className="w-4/6 flex items-center text-sm font-medium justify-center  text-gray-500 dark:text-gray-400 sm:text-base">
      <li
        className={`flex md:w-full items-center ${
          status === "Applied" ||
          status === "Viewed" ||
          status === "Review" ||
          status === "Rejected" ||
          status === "Confirm"
            ? "text-green-600"
            : ""
        }  after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 justify-center `}
      >
        <span className="flex gap-3 items-center  sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {(status === "Applied" ||
            status === "Viewed" ||
            status === "Review" ||
            status === "Rejected" ||
            status === "Confirm") && <FaCheckCircle />}
          Applied
        </span>
      </li>
      {/* <li
        className={`flex md:w-full items-center ${
          status === "Viewed" ||
          status === "Review" ||
          status === "Rejected" ||
          status === "Confirm"
            ? "text-green-600"
            : ""
        } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-10 dark:after:border-gray-700`}
      >
        <div className="flex gap-2 items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {(status === "Viewed" ||
            status === "Review" ||
            status === "Rejected" ||
            status === "Confirm") && <FaCheckCircle />}
          <div>Viewed</div>
        </div>
      </li>
      <li
        className={`flex md:w-full items-center ${
          status === "Review" || status === "Rejected" || status === "Confirm"
            ? "text-green-600"
            : ""
        } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-10 dark:after:border-gray-700`}
      >
        <div className="flex gap-2 items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {(status === "Review" || status === "Rejected" || status === "Confirm") && (
            <FaCheckCircle />
          )}
          <div>Review</div>
        </div>
      </li>
      {status === "Rejected" ? (
        <li className="flex items-center after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            Rejected
          </span>
        </li>
      ) : (
        <li className="flex items-center after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            Confirm
          </span>
        </li>
      )} */}
    </ol>
  );
};

export default StepStepper;
