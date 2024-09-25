/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from "components/Main/CVBuilder/SlideNavBar/SlideNavBar";
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "components/Main/CVBuilder/SlideNavBar/Header";
import SavedJob from "../Jobs-Internships/SavedJob/SavedJob";
import AppliedJob from "../Jobs-Internships/AppliedJob/AppliedJob";
import ApplyPanel from "./ApplyPanel/ApplyPanel";
import MobilePortalFooter from "components/Main/Footer/MobilePortalFooter";
import MobilePortalHeader from "components/Common/Header/MobilePortalHeader";
import { FaChevronDown } from "react-icons/fa";
import Sponsored from "./Sponsored/Sponsored";
import PartTime from "./PartTime/PartTime";
import Internship from "./Internship/Internship";
import { GraduateProgram } from "routes/routes";
import { getUserIsSubscribe } from "api/services/localServices.service";

const JobsInternships: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isSubscribe } = getUserIsSubscribe();

  const location = useLocation();
  const navigate = useNavigate();

  const tabMap: { [key: string]: string } = {
    "": "all",
    sponsored: "sponsored",
    "part-time": "part-time",
    internship: "internship",
    saved: "saved",
    applied: "applied",
    // "graduate-program": "graduate-program",
  };

  const getCurrentTab = () => {
    const path = location.pathname.split("/").pop();
    return tabMap[path as keyof typeof tabMap] || "sponsored";
  };

  const [selectedTab, setSelectedTab] = useState(getCurrentTab);

  useEffect(() => {
    setSelectedTab(getCurrentTab());
  }, [location.pathname]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    navigate(`/dashboard/jobs-internships/${tab !== "all" ? tab : ""}`);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  const isApplyPanelOpen = location.pathname.includes("/apply");

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      event.target instanceof Node &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (!isSubscribe) {
      navigate("/dashboard/profile/subscription-plan");
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex py-20 lg:py-6 min-h-screen p-4 bg-custom-white w-screen h-screen">
      <MobilePortalHeader />
      <span className="hidden lg:flex">
        <Sidebar />
      </span>
      <div className="flex-1 flex flex-col lg:pl-6 overflow-y-scroll custom-scroll">
        <Header
          title="Jobs and Internships"
          subtitle="Tailored opportunities to enhance your career path."
        />
        {!isApplyPanelOpen && (
          <ul className="flex py-4 justify-between items-center flex-wrap lg:flex-nowrap ">
            <div className="lg:hidden relative w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white border border-custom-secondary p-2 rounded flex items-center w-full justify-between"
              >
                {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}{" "}
                <FaChevronDown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 bg-white border rounded shadow-md z-10 w-full"
                >
                  <ul className="flex flex-col">
                    {[
                      "sponsored",
                      "part-time",
                      "internship",
                      "saved",
                      // "graduate-program",
                      "applied",
                    ].map((tab) => (
                      <li
                        key={tab}
                        className={`p-2 cursor-pointer ${
                          selectedTab === tab ? "bg-custom-subSecondary text-red-900" : ""
                        }`}
                        onClick={() => handleTabClick(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="hidden lg:flex justify-between items-center w-full">
              <div className="flex gap-1">
                <li
                  className={`p-2 cursor-pointer ${
                    selectedTab === "sponsored"
                      ? "rounded-lg bg-custom-subSecondary text-red-900 text-center"
                      : ""
                  }`}
                  onClick={() => handleTabClick("sponsored")}
                >
                  Sponsored
                </li>
                <li
                  className={`p-2 cursor-pointer ${
                    selectedTab === "part-time"
                      ? "rounded-lg bg-custom-subSecondary text-red-900 text-center"
                      : ""
                  }`}
                  onClick={() => handleTabClick("part-time")}
                >
                  Part Time/Contract
                </li>
                <li
                  className={`p-2 cursor-pointer ${
                    selectedTab === "internship"
                      ? "rounded-lg bg-custom-subSecondary text-red-900 text-center"
                      : ""
                  }`}
                  onClick={() => handleTabClick("internship")}
                >
                  Internship
                </li>
                {/* <li
                  className={`p-2 cursor-pointer ${
                    selectedTab === "graduate-program"
                      ? "rounded-lg bg-custom-subSecondary text-red-900 text-center"
                      : ""
                  }`}
                  onClick={() => handleTabClick("graduate-program")}
                >
                  Graduate Programmes
                </li> */}
              </div>
              <div className="flex gap-1">
                <li
                  className={`w-20 p-2 cursor-pointer ${
                    selectedTab === "saved"
                      ? "rounded-lg bg-custom-subSecondary text-red-900 text-center"
                      : ""
                  }`}
                  onClick={() => handleTabClick("saved")}
                >
                  Saved
                </li>
                <li
                  className={`w-20 p-2 cursor-pointer ${
                    selectedTab === "applied"
                      ? "rounded-lg bg-custom-subSecondary text-red-900 text-center"
                      : ""
                  }`}
                  onClick={() => handleTabClick("applied")}
                >
                  Applied
                </li>
              </div>
            </div>
          </ul>
        )}
        <Routes>
          <Route path="/saved" element={<SavedJob />} />
          <Route path="/applied" element={<AppliedJob />} />
          <Route path="/apply" element={<ApplyPanel />} />
          <Route path="/" element={<Sponsored />} />
          <Route path="/sponsored" element={<Sponsored />} />
          <Route path="/part-time" element={<PartTime />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/graduate-program" element={<GraduateProgram />} />
        </Routes>
      </div>
      <MobilePortalFooter />
    </div>
  );
};

export default JobsInternships;
