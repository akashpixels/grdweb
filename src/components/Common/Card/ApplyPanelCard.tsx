import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { LuCircleDollarSign } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { BASE_URL } from "api/apis";

const ApplyPanelCard: React.FC = () => {
  const location = useLocation();
  const job = location.state || {};
  const { jobTitle, jobDescription, jobForTime, salary, companyLogo } = job;
  return (
    <>
      {job ? (
        <div className="shadow-xl rounded-2xl bg-white flex flex-col gap-4 p-6">
          <img src={`${BASE_URL}/${companyLogo}`} alt={jobTitle} className="w-10 h-10" />
          <h1 className="text-2xl font-semibold">{jobTitle}</h1>
          <p className="text-sm">{jobDescription}</p>
          <p className="text-gray-500 font-semibold text-xs flex items-center">
            <span>
              <FaRegClock />
            </span>
            <span className="ms-2">{jobForTime}</span>
          </p>
          <p className="text-gray-500 font-semibold text-xs flex items-center">
            <span>
              <LuCircleDollarSign />
            </span>
            <span className="ms-2">{salary}</span>
          </p>
          <div
            className="overflow-y-scroll custom-scroll"
            dangerouslySetInnerHTML={{ __html: jobDescription }}
          ></div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-2xl" />{" "}
        </div>
      )}
    </>
  );
};

export default ApplyPanelCard;
