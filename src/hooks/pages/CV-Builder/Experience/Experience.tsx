/* eslint-disable max-len */
import ProgressBar from "components/Common/ProgressBar/ProgressBar";
import TemplateWrapper from "components/Main/CVBuilder/TemplateWrapper/TemplateWrapper";
import { useAppSelector } from "hooks/reduxHooks";
import React from "react";
import { AddExperience } from "routes/routes";

const Experience = () => {
  const selectedTemplate = useAppSelector((state) => state.builder.selectedTemplateId);

  return (
    <div className="flex flex-col w-full">
      <div className="hidden lg:flex">
        <ProgressBar />
      </div>
      <div className="flex flex-col lg:flex-row md:pl-6 overflow-y-scroll custom-scroll flex-1 pb-6">
        <div className="flex flex-col w-full lg:w-1/2 md:p-6 justify-between h-full">
          <AddExperience />
        </div>
        <div className="w-full lg:w-1/2 py-6 pr-6 bg-gray-50 hidden lg:flex">
          <TemplateWrapper templateName={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

export default Experience;
