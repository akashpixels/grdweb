/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserEduAndExpDetails } from "api/services/cvbuilder.apis";
import { updateUserEduAndExpDetails } from "api/services/jobs.api";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Button from "components/Common/Button/Button";
import AddEducation from "components/Main/CVBuilder/AddEducation/AddEducation";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa6";
import { AddExperience } from "routes/routes";
import { refreshPage } from "utils";
import { showToast } from "utils/toastUtils";

interface FormData {
  unquieId?: string;
  courseName?: string;
  university?: string;
  startDate?: string;
  endDate?: string;
  experienceSummary?: string;
  isStillStudyHere?: string;
  isStillWorkHere?: string;
  position?: string;
  companyName?: string;
}

const PersonalInformation: React.FC = () => {
  // eslint-disable-next-line no-console

  const { userId } = getUserIsSubscribe();
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [dob, setDob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEduDetails, setSelectedEduDetails] = useState([]);
  const [selectedExpDetails, setSelectedExpDetails] = useState([]);

  const updateEducationAndExperienceDetails = async (payload: any) => {
    const detailsData = await updateUserEduAndExpDetails(payload);
    setIsLoading(false);
    detailsData && showToast("success", "Details added successfully.");
  };

  const onSubmit = () => {
    setIsLoading(true);
    const eductionDetails =
      selectedEduDetails && selectedEduDetails.length > 0
        ? selectedEduDetails.map((value: FormData) => ({
            userEducationHistoryID: 0,
            userID: userId,
            courseName: value?.courseName,
            university: value?.university,
            startDate: value?.startDate,
            endDate: value?.endDate,
            experienceSummary: value?.experienceSummary,
            isStillStudyHere: value?.isStillStudyHere,
          }))
        : [];
    const experienceDetails =
      selectedExpDetails && selectedExpDetails.length > 0
        ? selectedExpDetails.map((value: FormData) => ({
            userEmploymentHistoryID: 0,
            userID: userId,
            position: value?.position,
            companyName: value?.companyName,
            startDate: value?.startDate,
            endDate: value?.endDate,
            experienceSummary: value?.experienceSummary,
            isStillWorkHere: value?.isStillWorkHere,
          }))
        : [];

    const payload = {
      userEmploymentHistories: experienceDetails,
      userEducationHistories: eductionDetails,
      userID: userId,
      dob: dob || "",
    };

    updateEducationAndExperienceDetails(payload);
  };

  const getUserExpAndEduDetails = async () => {
    const details = await getUserEduAndExpDetails(userId);
    details?.userEducationHistories && setEducation(details?.userEducationHistories || []);
    details?.userEmploymentHistories && setExperience(details?.userEmploymentHistories || []);
    details?.dob && setDob(details?.dob);
  };

  useEffect(() => {
    getUserExpAndEduDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex justify-between border-b py-4 flex-col md:flex-row gap-6">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p className="text-gray-500 text-sm">Manage your personal details.</p>
        </div>
        <div>
          <Button
            onClick={() => onSubmit()}
            disabled={isLoading}
            className=" bg-transparent hover:text-custom-secondary  hover:bg-custom-primary text-custom-primary border-custom-primary mr-6"
          >
            {isLoading ? "Saving.." : "Save"}
          </Button>
          <Button
            onClick={() => refreshPage()}
            className=" text-custom-secondary hover:text-custom-primary  hover:bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <div className="col-span-12 lg:col-span-4">
          <label className="font-semibold" htmlFor="photo">
            Date of Birth
          </label>
        </div>

        <div className="flex gap-10 col-span-12 lg:col-span-3 flex-col md:flex-row">
          <div className="w-full border rounded">
            <div className="flex items-center gap-4 p-2">
              <FaCalendar height="20rem" width="20rem" />
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value || "");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <div className="col-span-12 lg:col-span-4">
          <label className="font-semibold" htmlFor="photo">
            Education History
          </label>
        </div>

        <div className="flex gap-10 col-span-12 lg:col-span-8 flex-col md:flex-row">
          <div className="w-full">
            <AddEducation
              isFromProfilePage={true}
              education={education}
              setSelectedEduDetails={setSelectedEduDetails}
            />
          </div>
        </div>
      </div>

      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <div className="col-span-12 lg:col-span-4">
          <label className="font-semibold" htmlFor="photo">
            Employment History
          </label>
        </div>

        <div className="flex gap-10 col-span-12 lg:col-span-8 flex-col md:flex-row">
          <div className="w-full">
            <AddExperience
              isFromProfilePage={true}
              experience={experience}
              setSelectedExpDetails={setSelectedExpDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
