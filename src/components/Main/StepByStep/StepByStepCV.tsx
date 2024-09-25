/* eslint-disable max-len */
import React from "react";

const StepByStepCV = () => {
  return (
    <div className="w-full rounded-lg p-5">
      <h1 className="mt-3 text-xl md:text-2xl font-bold mb-2 p-2 bg-custom-secondary rounded-md shadow-lg text-center">
        Step by Step guide create resume.
      </h1>
      <p className="mb-3">Fill all the fields with the following data.</p>
      <ul className="list-disc list-inside space-y-4">
        <li>
          <span className="font-semibold">Personal Information: </span>Full name, phone number,
          email address, LinkedIn profile, and location.
        </li>
        <li>
          <span className="font-semibold">Professional Title: </span>A brief one-line title
          describing your profession or desired role.
        </li>
        <li>
          <span className="font-semibold">Employment History: </span>
          Job titles, company names, employment dates, key responsibilities, and notable
          achievements for each job
        </li>
        <li>
          <span className="font-semibold">Education: </span>
          Degrees earned, institutions attended, graduation dates, relevant coursework, and honours.
        </li>
        <li>
          <span className="font-semibold">Skills: </span>
          List of relevant skills categorised (e.g., technical skills, soft skills, language skills)
        </li>
      </ul>
    </div>
  );
};

export default StepByStepCV;
