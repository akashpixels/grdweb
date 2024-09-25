/* eslint-disable max-len */
import { templates } from "Json/cvtemplate";
import { LeftArrow } from "components/Common/Icons/Icon";
import { useAppDispatch } from "hooks/reduxHooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CVTemplateCard } from "routes/routes";
import { getSelectedTemplateId } from "store/Slices/cvbuilder";

const CVTemplateSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectedTemplate = (id: string) => {
    dispatch(getSelectedTemplateId(id));
  };

  return (
    <div className=" md:pl-6 pt-0 md-pt-6 py-6 overflow-y-scroll custom-scroll">
      <div className="flex justify-center relative ">
        <div className="flex justify-center">
          <button
            className="mb-4 border-2 border-custom-secondary px-3 py-2 absolute left-0 bg-white rounded-lg shadow-md flex items-center"
            onClick={() => navigate("/dashboard/cv-builder")}
          >
            <span className="pt-1 md:mr-2">
              <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
            </span>
            <span className="hidden md:flex">
              {" "}
              <span className="lg:hidden">Back</span>
              <span className="hidden lg:block">Back to previous section</span>
            </span>
          </button>
        </div>
        <h1 className="hidden md:flex text-2xl font-semibold my-3 md:mb-6 flex-1 text-center justify-center">
          Select Your CV Template
        </h1>
        <h1 className="flex md:hidden  text-2xl font-semibold my-3 md:mb-6 flex-1 text-center justify-center">
          Template
        </h1>
      </div>

      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {templates.map((template) => (
          <CVTemplateCard
            key={template.id}
            id={template.id}
            title={template.title}
            imageUrl={template.imageUrl}
            selectedTemplate={handleSelectedTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default CVTemplateSelection;
