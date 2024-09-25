/* eslint-disable indent */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [rendered, setRendered] = useState<boolean>(false);

  const getPagePath = (value: string) => {
    return value.split("/")[3];
  };

  useEffect(() => {
    const value = getPagePath(window.location.pathname);
    if (value) {
      if (value === "your-details") {
        setActiveTab(1);
      } else if (value === "experience") {
        setActiveTab(2);
      } else if (value === "education") {
        setActiveTab(3);
      } else if (value === "skills") {
        setActiveTab(4);
      } else if (value === "short-bio") {
        setActiveTab(5);
      }
    }

    // Set a timeout to render the JSX after 1 second
    const timeoutId = setTimeout(() => {
      setRendered(true);
    }, 500);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {rendered && (
        <div className="grid grid-cols-5 gap-4 mt-4 px-12 w-full ">
          <div>
            <div
              className={`border-b-4 mb-2 ${
                activeTab === 1 ? "" : activeTab ? "border-custom-secondary" : ""
              }`}
            ></div>
            <p className="text-sm">Your Details</p>
          </div>
          <div>
            <div
              className={`border-b-4 mb-2 ${
                activeTab === 2
                  ? ""
                  : activeTab === 3 || activeTab === 4 || activeTab === 5
                  ? "border-custom-secondary"
                  : ""
              }`}
            ></div>
            <p className="text-sm">Experience</p>
          </div>
          <div>
            <div
              className={`border-b-4 mb-2 ${
                activeTab === 3
                  ? ""
                  : activeTab === 4 || activeTab === 5
                  ? "border-custom-secondary"
                  : ""
              }`}
            ></div>
            <p className="text-sm">Education</p>
          </div>
          <div>
            <div
              className={`border-b-4 mb-2 ${
                activeTab === 4 ? "" : activeTab === 5 ? "border-custom-secondary" : ""
              }`}
            ></div>
            <p className="text-sm">Skills</p>
          </div>
          <div>
            <div className={`border-b-4 mb-2 ${activeTab === 5 && ""}`}></div>
            <p className="text-sm">Short Bio</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
