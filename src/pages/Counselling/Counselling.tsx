/* eslint-disable max-len */
import Header from "components/Main/CVBuilder/SlideNavBar/Header";
import Sidebar from "components/Main/CVBuilder/SlideNavBar/SlideNavBar";
import MainContent from "components/Main/Counselling/MainContent";
import React from "react";

const Counselling: React.FC = () => {
  return (
    <div className="flex min-h-screen p-6 bg-custom-white w-screen h-screen overflow-y-scroll custom-scroll">
      <span className="hidden lg:flex">
        <Sidebar />
      </span>
      <div className="px-6 w-full overflow-y-scroll custom-scroll pb-3 flex flex-col">
        <Header
          title="Counselling"
          subtitle="Personal Guidance and Support When You Need it Most"
        />
        <div className="flex-1">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default Counselling;
