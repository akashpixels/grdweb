import ProgressBar from "components/Common/ProgressBar/ProgressBar";
import React from "react";
import { AddEducation } from "routes/routes";

const Education = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="hidden lg:flex">
        <ProgressBar />
      </div>

      <div className="flex flex-col lg:flex-row md:pl-6 overflow-y-scroll custom-scroll flex-1">
        <div className="flex flex-col w-full lg:w-1/2 md:p-6 justify-between h-full">
          <AddEducation />
        </div>
      </div>
    </div>
  );
};

export default Education;
