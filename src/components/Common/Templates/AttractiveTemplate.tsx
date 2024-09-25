/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { useAppSelector } from "hooks/reduxHooks";
import React from "react";
import { formatResumeDate } from "utils";

const AttractiveTemplate = () => {
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

  const industrySkill = industryKnowlageSkills.trim()?.split(",");
  const toolsSkill = toolsAndTechnolotySkills.trim()?.split(",");
  const otherSkill = otherSkills.length > 0 ? otherSkills.trim()?.split(",") : [otherSkills];

  console.log("industrySkill", industrySkill);

  return (
    <div className="mx-auto bg-white shadow-md rounded-2xl remove-shadow main-div-print flex">
      {/* Left Section */}
      <div className="bg-black text-white w-[40%] flex flex-col justify-between p-8 rounded-l-2xl">
        <div>
          <h1 className="text-3xl font-bold text-custom-secondary  font-mb-15px">{`${firstName} ${lastName}`}</h1>
          <p className="text-sm mt-4">{jobTitle}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold  font-mb-15px"></h3>
          <div className="mt-2 text-sm font-extralight" style={{ height: "41rem" }} />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold  font-mb-15px">ABOUT ME</h3>
          <div
            className="mt-2 text-sm font-extralight"
            dangerouslySetInnerHTML={{ __html: bio || "" }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[60%] bg-white p-8 rounded-r-2xl">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "38px",
          }}
        >
          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold  font-mb-15px">CONTACT</h3>
            <p className="text-sm mt-2">{emailID}</p>
            <p className="text-sm">{mobileNo}</p>
          </div>

          {/* Skills */}
          {industrySkill.length ?? toolsSkill.length ?? otherSkill.length ? (
            <div className="mb-6">
              {industrySkill.length > 1 ?? toolsSkill.length > 1 ? (
                <h3 className="text-lg font-semibold  font-mb-15px">SKILL</h3>
              ) : null}
              <ul className="text-sm mt-2">
                {(industrySkill.length ?? toolsSkill.length ?? otherSkill.length) &&
                  [...industrySkill, ...toolsSkill, ...otherSkill].map((skill, id) => {
                    return <li key={id}>-{skill}</li>;
                  })}
              </ul>
            </div>
          ) : null}

          {/* Experience */}

          <div className="mb-6">
            {cvEmploymentHistories.length > 1 && (
              <h3 className="text-lg font-semibold font-mb-15px">EXPERIENCE</h3>
            )}
            {cvEmploymentHistories?.map((job, index) => {
              const { startDate, endDate, position, companyName, experienceSummary } = job;
              const startYear = (startDate && formatResumeDate(startDate)) || "";
              const endYear = (endDate && formatResumeDate(endDate)) || "";
              return (
                <div className="my-2" key={index}>
                  <p className="font-bold flex justify-between">
                    {companyName || ""}{" "}
                    <span className="font-normal text-sm italic">
                      {startYear || ""} - {endYear || ""}
                    </span>
                  </p>
                  <p className="italic my-1 text-sm">{position || ""}</p>
                  <p className="text-sm">{experienceSummary || ""}</p>
                </div>
              );
            })}
          </div>

          {/* Education */}
          <div>
            {cvEducationHistories.length > 1 && (
              <h3 className="text-lg font-semibold font-mb-15px">EDUCATION</h3>
            )}
            {cvEducationHistories?.map((edu, index) => {
              const {
                university,
                startDate,
                endDate,
                experienceSummary,
                courseName,
                isStillStudyHere,
              } = edu;
              const startYear = (startDate && formatResumeDate(startDate)) || "";
              const endYear =
                endDate && !isStillStudyHere ? formatResumeDate(endDate || "") : "Current";

              return (
                <div className="my-2" key={index}>
                  <p className="font-bold flex justify-between">
                    {university || ""}
                    <span className="font-normal text-sm italic">
                      {startYear || ""} - {endYear || ""}
                    </span>
                  </p>
                  <p className="italic my-1 text-sm mb-4">{courseName || ""}</p>
                  <p className="text-sm">{experienceSummary || ""}</p>
                </div>
              );
            })}
          </div>
          <section className="grid grid-cols-12">
            <h2 className="text-xl font-semibold col-span-4 print-bg-black text-white mr-8 p-6 rounded-bl-2xl font-mb-15px"></h2>
            <div className="col-span-8 py-6 pr-6">
              <p></p>
              <p></p>
            </div>
          </section>
          <section className="grid grid-cols-12">
            <h2 className="text-xl font-semibold col-span-4 print-bg-black text-white mr-8 p-6 rounded-bl-2xl font-mb-15px"></h2>
            <div className="col-span-8 py-6 pr-6">
              <p></p>
              <p></p>
            </div>
          </section>
          <section className="grid grid-cols-12">
            <h2 className="text-xl font-semibold col-span-4 print-bg-black text-white mr-8 p-6 rounded-bl-2xl font-mb-15px"></h2>
            <div className="col-span-8 py-6 pr-6">
              <p></p>
              <p></p>
            </div>
          </section>
          <section className="grid grid-cols-12">
            <h2 className="text-xl font-semibold col-span-4 print-bg-black text-white mr-8 p-6 rounded-bl-2x font-mb-15pxl"></h2>
            <div className="col-span-8 py-6 pr-6">
              <p></p>
              <p></p>
            </div>
          </section>
          <section className="grid grid-cols-12">
            <h2 className="text-xl font-semibold col-span-4 print-bg-black text-white mr-8 p-6 rounded-bl-2xl font-mb-15px"></h2>
            <div className="col-span-8 py-6 pr-6">
              <p></p>
              <p></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AttractiveTemplate;
