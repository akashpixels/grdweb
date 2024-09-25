/* eslint-disable max-len */
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Profile Overview", path: "/dashboard/profile" },
  // { label: "Personal Information", path: "/dashboard/profile/personal-information" },
  // { label: "CV/Resume", path: "/dashboard/profile/cv-resume" },
  // { label: "Skills", path: "/dashboard/profile/skills" },
  { label: "Subscription", path: "/dashboard/profile/subscription-plan" },
];

const ProfileHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="rounded-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="underline cursor-pointer" onClick={() => navigate("/")}>
          Go To Dashboard
        </p>
      </div>
      <div className="mt-4">
        <nav className="flex border-b overflow-x-scroll custom-scroll">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`py-2 px-4 focus:outline-none text-sm md:text-lg whitespace-nowrap ${
                location.pathname === tab.path
                  ? "border-b-2 border-yellow-500 text-black font-medium "
                  : "text-gray-600"
              }`}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileHeader;
