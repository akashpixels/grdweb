/* eslint-disable max-len */
import { getUserIsSubscribe } from "api/services/localServices.service";
import React, { useEffect, useState } from "react";
import { FaFileAlt, FaFileArchive } from "react-icons/fa";
// import { BiMessageRoundedDots } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "utils/toastUtils";

const MobilePortalFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isSubscribe } = getUserIsSubscribe();
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/dashboard/cv-builder")) {
      setSelectedTab("CV Builder");
    } else if (path.includes("/dashboard/jobs-internships")) {
      setSelectedTab("jobs");
    } else if (path.includes("/dashboard/networking/upcoming")) {
      setSelectedTab("Networking");
    } else if (path.includes("/dashboard/create-cover-letter")) {
      setSelectedTab("Cover Letter");
    } else {
      setSelectedTab("");
    }
  }, [location]);

  return (
    <footer className="no-print fixed bottom-0 left-0 w-full bg-white shadow-md flex lg:hidden justify-around py-3 border-t">
      <button
        className={`flex flex-col items-center ${
          selectedTab === "CV Builder" ? "text-yellow-500" : "text-gray-500"
        } focus:outline-none`}
        onClick={() => {
          if (isSubscribe) {
            navigate("/dashboard/cv-builder");
          } else {
            navigate("/dashboard/profile/subscription-plan");
            showToast("error", "Activate your subscription to use CV Builder");
          }
        }}
      >
        <FaFileAlt className="text-2xl" />
        <span className="text-sm">CV Builder</span>
      </button>
      <button
        className={`flex flex-col items-center ${
          selectedTab === "jobs" ? "text-yellow-500" : "text-gray-500"
        } focus:outline-none`}
        onClick={() => {
          if (isSubscribe) {
            navigate("/dashboard/jobs-internships");
          } else {
            navigate("/dashboard/profile/subscription-plan");
            showToast("error", "Activate your subscription to use Job and Internship");
          }
        }}
      >
        <FaFileArchive className="text-2xl" />
        <span className="text-sm">Jobs</span>
      </button>
      <button
        className={`flex flex-col items-center ${
          selectedTab === "Cover Letter" ? "text-yellow-500" : "text-gray-500"
        } focus:outline-none`}
        onClick={() => {
          if (isSubscribe) {
            navigate("/dashboard/create-cover-letter");
          } else {
            navigate("/dashboard/profile/subscription-plan");
            showToast("error", "Activate your subscription to use cover letter");
          }
        }}
      >
        <FaFileArchive className="text-2xl" />
        <span className="text-sm">Cover Letter</span>
      </button>

      {/* <button
        className={`flex flex-col items-center ${
          selectedTab === "Counselling" ? "text-yellow-500" : "text-gray-500"
        } focus:outline-none`}
        onClick={() => {
          navigate("/counselling");
          setSelectedTab("Counselling");
        }}
      >
        <FaSuitcase className="text-2xl" />
        <span className="text-sm">Counselling</span>
      </button> */}
      {/* <button
        className={`flex flex-col items-center ${
          selectedTab === "Networking" ? "text-yellow-500" : "text-gray-500"
        } focus:outline-none`}
        onClick={() => {
          navigate("/dashboard/networking/upcoming");
        }}
      >
        <BiMessageRoundedDots className="text-2xl" />
        <span className="text-sm">Networking</span>
      </button> */}
    </footer>
  );
};

export default MobilePortalFooter;
