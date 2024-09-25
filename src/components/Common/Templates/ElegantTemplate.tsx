/* eslint-disable no-console */
/* eslint-disable max-len */
import { useAppSelector } from "hooks/reduxHooks";
import React from "react";
import { formatResumeDate } from "utils";

const ElegantTemplate = () => {
  const resumeData = useAppSelector((state) => state.builder.templateData);

  const {
    bio,
    mobileNo,
    lastName,
    jobTitle,
    firstName,
    cvEmploymentHistories,
    emailID,
    cvEducationHistories,
    industryKnowlageSkills,
    toolsAndTechnolotySkills,
    otherSkills,
  } = resumeData;

  const industrySkill = industryKnowlageSkills && industryKnowlageSkills.trim()?.split(",");
  const toolsSkill = toolsAndTechnolotySkills && toolsAndTechnolotySkills.trim()?.split(",");
  const otherSkill = otherSkills && otherSkills.trim()?.split(",");
  // const skillsData = [...industrySkill, ...toolsSkill, ...otherSkill];

  return (
    <div className="mx-auto p-6 lg:px-12 bg-white shadow-md rounded-2xl remove-shadow">
      <div className="text-center py-4 pb-6 border-b border-gray-400">
        <h1 className="text-2xl font-bold mb-3 font-mb-15px">
          {firstName || "" + " " + lastName || ""}, {jobTitle || ""}
        </h1>
        <div className="text-gray-500">
          {emailID} {mobileNo}
        </div>
      </div>
      <section className="py-6 border-b border-gray-400 grid grid-cols-12 gap-6">
        <h2 className="text-xl font-semibold col-span-3 font-mb-15px">Profile</h2>
        <div className="col-span-9" dangerouslySetInnerHTML={{ __html: bio }} />
      </section>
      <section className="py-6 border-b border-gray-400 grid grid-cols-12 gap-6">
        <h2 className="text-xl font-semibold col-span-12 font-mb-15px">Education</h2>

        {cvEducationHistories?.map((edu, index) => {
          const {
            university,
            startDate,
            endDate,
            experienceSummary,
            courseName,
            isStillStudyHere,
          } = edu;
          const startYear = (startDate && formatResumeDate(startDate || "")) || "";
          const endYear =
            !isStillStudyHere && endDate ? formatResumeDate(endDate || "") : "Current";

          return (
            <div key={index} className="col-span-12 grid grid-cols-12 gap-6">
              <p className="text-sm text-gray-500 col-span-3 mt-1">
                {startYear || ""} - {endYear || ""}
              </p>
              <div className="col-span-9">
                <h3 className="font-semibold mb-2">{university || ""}</h3>
                <p className="text-gray-500">{courseName || ""}</p>
                <p className="text-sm text-gray-500">{experienceSummary || ""}</p>
              </div>
            </div>
          );
        })}
      </section>
      {cvEmploymentHistories && cvEmploymentHistories.length > 0 && <section className="py-6 border-b border-gray-400 grid grid-cols-12 gap-6">
        <h2 className="text-xl font-semibold col-span-12 font-mb-15px">Employment</h2>

        {cvEmploymentHistories?.map((job, index) => {
          const { startDate, endDate, position, companyName, experienceSummary } = job;
          const startYear = (startDate && formatResumeDate(startDate)) || "";
          const endYear = (endDate && formatResumeDate(endDate)) || "";
          return (
            <div className="col-span-12 grid grid-cols-12 gap-6" key={index}>
              <p className="text-sm text-gray-500 col-span-3 mt-1">
                {startYear || ""} - {endYear || ""}
              </p>
              <div className="col-span-9">
                <h3 className="font-semibold ">
                  {companyName || ""} - {position || ""}
                </h3>
                <p className="text-gray-500">{experienceSummary || ""}</p>
              </div>
            </div>
          );
        })}
      </section>}
      {industrySkill && industrySkill.length && <section className="py-6 grid grid-cols-12 gap-6">
        <h2 className="text-xl font-semibold col-span-3 font-mb-15px">Skills</h2>
        <div className="flex flex-col gap-2">
          {industrySkill && industrySkill.length > 0 ? (
            <div className="col-span-9 grid grid-cols-12 gap-2 gap-x-10">
              <div className="col-span-12 underline">Industry</div>
              <div className="col-span-12 flex gap-2 flex-wrap">
                {industrySkill &&
                  industrySkill?.map((skill, id) => {
                    return (
                      <div className="col-span-2 flex justify-between" key={id}>
                        {skill && skill !== "" && (
                          <span className="bg-gray-100 py-1 px-3 rounded-lg mb-color-skills">{skill || ""}</span>
                        )}
                        {/* <span className="text-gray-500">High</span> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}

          {toolsSkill && toolsSkill.length > 0 ? (
            <div className="col-span-9 grid grid-cols-12 gap-3 gap-x-10">
              <div className="col-span-12 mt-3 underline">Technology</div>
              <div className="col-span-12 flex gap-2 flex-wrap">
                {toolsSkill &&
                  toolsSkill?.map((skill, id) => {
                    return (
                      <div className="col-span-2 flex justify-between" key={id}>
                        {skill && skill !== "" && (
                          <span className="bg-gray-100 py-1 px-3 rounded-lg mb-color-skills">{skill || ""}</span>
                        )}
                        {/* <span className="text-gray-500">High</span> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
          {otherSkill && otherSkill.length > 0 ? (
            <div className="col-span-9 grid grid-cols-12 gap-3 gap-x-10">
              <div className="col-span-12 mt-3 underline">Other</div>
              <div className="col-span-12 flex gap-2 flex-wrap">
                {otherSkill &&
                  otherSkill?.map((skill, id) => {
                    return (
                      <div className="col-span-2 flex justify-between" key={id}>
                        {skill && skill !== "" && (
                          <span className="bg-gray-100 py-1 px-3 rounded-lg mb-color-skills">{skill || ""}</span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </div>
      </section>}
    </div>
  );
};

export default ElegantTemplate;
