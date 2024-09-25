/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "components/Common/InputField/InputField";
import { LeftArrow } from "components/Common/Icons/Icon";
import Button from "components/Common/Button/Button";
import { FaPlus } from "react-icons/fa";
import EducationCard from "components/Common/EducationCard/EducationCard";
import { useNavigate } from "react-router-dom";
import { showToast } from "utils/toastUtils";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getEducationList, openResumeModel, setResumeInfo } from "store/Slices/cvbuilder";
import { EducationHistory } from "interface/Client/cvbuilder";
import { FaRegEye } from "react-icons/fa";
import { generateRandomAlphaNumeric } from "utils";
import {
  deleteEducationHistoryByEducationHistory,
  uploadNewResume,
} from "api/services/cvbuilder.apis";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Cookies from "js-cookie";

interface IFormInput {
  courseName: string;
  university: string;
  startDate: string;
  endDate?: string;
  experienceSummary: string;
  isStillStudyHere: boolean;
}
interface EducationProps {
  isFromProfilePage?: boolean;
  education?: any[];
  setSelectedEduDetails?: any;
}

const AddEducation = (props: EducationProps) => {
  const dispatch = useAppDispatch();
  const { userId } = getUserIsSubscribe();
  const navigate = useNavigate();
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const verifiedAddressFromLocalStore = Cookies.get("verifiedEducation");
  const [enterEducation, setEnterEducation] = useState<EducationHistory[]>([]);
  const [verifiedEducation, setVerifiedEducation] = useState<any>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<number>(0);
  const [selectedEducation, setSelectedEducationUniueID] = useState<number>(0);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<any> = (data) => {
    const previousAddress = enterEducation.filter(
      (val: any, index: number) => index !== selectedExperienceId
    );
    const isNewAddressAdded = enterEducation.length < selectedExperienceId;
    const unquieId = generateRandomAlphaNumeric();

    if (isNewAddressAdded) {
      const newAddrssDetails = verifiedEducation || [];
      newAddrssDetails.push({ unquieId: unquieId, verifed: true });
      setVerifiedEducation(newAddrssDetails);
    }
    data.unquieId = selectedEducation || unquieId;
    setEnterEducation([...previousAddress, { ...data, unquieId: selectedEducation || unquieId }]);
    const updateStatus = verifiedEducation.map((val: { unquieId: string; verifed: boolean }) => {
      const updatedUnquieId = data.unquieId || unquieId;
      if (val?.unquieId == updatedUnquieId) {
        return { unquieId: updatedUnquieId, verifed: true };
      } else {
        return val;
      }
    });
    setVerifiedEducation(updateStatus);
    props?.setSelectedEduDetails &&
      props?.setSelectedEduDetails([
        ...previousAddress,
        { ...data, unquieId: selectedEducation || unquieId },
      ]);
    reset();
    setShowForm(false);
  };

  const handleForwardToSkills = () => {
    const isAllEducationVerified = verifiedEducation.some(
      (val: { companyName: string; verifed: boolean }) => val?.verifed == false
    );
    const verifiedAddressList = enterEducation.map((val: any) => ({
      unquieId: val?.unquieId,
      verifed: true,
    }));
    !props?.isFromProfilePage &&
      verifiedAddressList &&
      Cookies.set("verifiedEducation", JSON.stringify(verifiedAddressList));
    if (enterEducation?.length > 0) {
      if (!isAllEducationVerified) {
        dispatch(getEducationList(enterEducation));
        uploadNewResume({ ...resumeData, cvEducationHistories: enterEducation, userID: userId })
          .then((res) => {
            res.userID = userId;
            dispatch(setResumeInfo(res));
          })
          .catch(() => showToast("error", "Something went wrong"));

        navigate("/dashboard/cv-builder/skills");
      } else {
        showToast("error", "Verify your education details!");
      }
    } else {
      showToast("error", "Enter your education details!");
    }
  };

  const stillWorkHere = watch("isStillStudyHere", false);

  useEffect(() => {
    if (props?.education && props?.education.length > 0) {
      const educationDetails: any[] | undefined = [];
      const unVerifiedEducation: { unquieId: string; verifed: boolean }[] = [];
      props?.education &&
        props?.education.length > 0 &&
        props?.education.forEach((val) => {
          const unquieId = generateRandomAlphaNumeric();
          educationDetails.push({ ...val, unquieId: val?.userEducationHistoryID || unquieId });
          unVerifiedEducation.push({
            unquieId: val?.userEducationHistoryID || unquieId,
            verifed: props?.isFromProfilePage ? true : false,
          });
        });
      setVerifiedEducation(unVerifiedEducation);
      setEnterEducation(educationDetails);
    } else if (resumeData.cvEducationHistories?.length) {
      const verifedList =
        (verifiedAddressFromLocalStore && JSON.parse(verifiedAddressFromLocalStore)) || [];
      const unVerifiedEducation: { unquieId: string; verifed: boolean }[] = [];
      const educationDetails: any[] | undefined = [];
      resumeData?.cvEducationHistories &&
        resumeData.cvEducationHistories.length > 0 &&
        resumeData.cvEducationHistories.forEach((val, index) => {
          const unquieId = generateRandomAlphaNumeric();
          educationDetails.push({
            ...val,
            unquieId:
              (!props?.isFromProfilePage &&
                verifedList &&
                verifedList.length > 0 &&
                verifedList[index]?.unquieId) ||
              unquieId,
          });
          unVerifiedEducation.push({
            unquieId: unquieId,
            verifed: props?.isFromProfilePage
              ? true
              : verifedList && verifedList.length > 0
              ? true
              : false,
          });
        });
      verifiedAddressFromLocalStore && !props?.isFromProfilePage
        ? setVerifiedEducation(JSON.parse(verifiedAddressFromLocalStore))
        : setVerifiedEducation(unVerifiedEducation);
      setEnterEducation(educationDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData, props?.education]);

  const handleDelete = async (index: number, unquieId?: string) => {
    setEnterEducation(enterEducation.filter((_: any, i: number) => i !== index));
    if (props?.isFromProfilePage) {
      try {
        const deletedDetails = await deleteEducationHistoryByEducationHistory(
          userId,
          unquieId || ""
        );
        props?.setSelectedEduDetails &&
          deletedDetails &&
          props?.setSelectedEduDetails(enterEducation.filter((_: any, i: number) => i !== index));
        showToast("success", "Deleted successfully");
      } catch (e) {
        showToast("success", "Deleted successfully");
      }
    }
    setVerifiedEducation(
      verifiedEducation.filter((val: { unquieId: string | undefined }) => {
        if (val?.unquieId !== unquieId) {
          return val;
        }
      })
    );
  };

  const verifyDetails = (id: number, education: any) => {
    setSelectedExperienceId(id);
    setSelectedEducationUniueID(education?.unquieId);
    setValue("courseName", education?.courseName || "");
    setValue("university", education?.university || "");
    setValue("startDate", education?.startDate || "");
    setValue("endDate", education?.endDate || "");
    setValue("experienceSummary", education?.experienceSummary || "");

    setShowForm(true);
  };

  return (
    <div className="h-full flex flex-col justify-between p-2 md:p-0">
      {!showForm ? (
        <div className="m-2">
          {!props?.isFromProfilePage ? (
            <>
              <div className="flex justify-between items-center lg:hidden mb-3">
                <button
                  className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                  onClick={() => navigate(-1)}
                >
                  <span className="pt-1">
                    <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
                  </span>
                </button>
                <h1 className="text-xl font-semibold lg:hidden">Education History</h1>
                <button
                  className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                  onClick={() => dispatch(openResumeModel(true))}
                >
                  <span className="pt-1">
                    <FaRegEye color="#00000" className="text-2xl" />
                  </span>
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-4 hidden lg:flex">Education History</h2>
            </>
          ) : null}

          {enterEducation && verifiedEducation && enterEducation?.length && verifiedEducation.length
            ? enterEducation?.map((education: any, id: number) => (
                <div className="mb-6 flex flex-col gap-5" key={id}>
                  <EducationCard
                    {...education}
                    key={id}
                    onDelete={() => handleDelete(id, education.unquieId)}
                    onEdit={() => verifyDetails(id, education)}
                    isFromProfilePage={props?.isFromProfilePage}
                  />
                  {!props?.isFromProfilePage && (
                    <button
                      type="button"
                      className={`px-4 py-3 ${
                        verifiedEducation.length > 0 &&
                        verifiedEducation.filter(
                          (val: { unquieId: any; companyName: string; verifed: boolean }) =>
                            val?.unquieId == education?.unquieId
                        )[0]?.verifed
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white rounded-md`}
                      onClick={() => {
                        verifyDetails(id, education);
                      }}
                    >
                      {verifiedEducation.filter(
                        (val: { unquieId: any; companyName: string; verifed: boolean }) =>
                          val?.unquieId == education?.unquieId
                      )[0]?.verifed
                        ? "Edit"
                        : "Verify"}
                    </button>
                  )}
                </div>
              ))
            : null}

          <Button
            onClick={() => {
              setShowForm(true);
              setSelectedExperienceId(enterEducation.length + 1);
            }}
            bgColor={props?.isFromProfilePage ? "bg-transparent" : "bg-custom-primary"}
            className={`${
              props?.isFromProfilePage ? "text-red-600 border border-red-600" : "text-white"
            } flex gap-2 items-center hover:text-custom-primary`}
          >
            <FaPlus /> Add education
          </Button>
        </div>
      ) : null}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Education History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mb-4">
              <div>
                <InputField
                  label="Course Name"
                  name="courseName"
                  register={register}
                  placeholder="Enter your course name"
                  options={{
                    required: "Course Name is required",
                  }}
                />
                {errors.courseName && (
                  <p className="text-red-500 text-sm">{errors.courseName.message}</p>
                )}
              </div>
              <div>
                <InputField
                  label="University"
                  name="university"
                  register={register}
                  placeholder="Enter university name"
                  options={{
                    required: "University is required",
                  }}
                />
                {errors.university && (
                  <p className="text-red-500 text-sm">{errors.university.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mb-4">
              <div>
                <InputField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  register={register}
                  placeholder="Select"
                  options={{
                    required: "Start Date is required",
                  }}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                )}
              </div>
              <div>
                {!stillWorkHere && (
                  <>
                    <InputField
                      label="End Date"
                      name="endDate"
                      type="date"
                      register={register}
                      placeholder="Select end date"
                      options={{
                        required: "End Date is required",
                      }}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm">{errors.endDate.message}</p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input type="checkbox" {...register("isStillStudyHere")} className="mr-2" />
              <label className="text-gray-700">I am still studying here</label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Summary
              </label>
              <textarea
                {...register("experienceSummary")}
                rows={6}
                cols={200}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="Enter your education summary"
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className=" border px-6 py-2 bg-custom-primary text-white rounded-md hover:bg-white hover:text-custom-primary border-custom-primary"
              >
                Save
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForm(false);
                }}
                className=" border px-6 py-2 bg-custom-primary text-white rounded-md hover:bg-white hover:text-custom-primary border-custom-primary "
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {!props?.isFromProfilePage && (
        <div className="flex justify-center lg:justify-between items-center">
          <div className="hidden lg:flex justify-center">
            <button
              className="border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md flex items-center"
              onClick={() => navigate(-1)}
            >
              <span className="pt-1 mr-2">
                <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
              </span>
              <span className="lg:hidden">Back</span>
              <span className="hidden lg:block">Back to previous section</span>
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-3 ${
                showForm ? "bg-slate-400" : "bg-yellow-500"
              } text-white rounded-md`}
              disabled={showForm}
              onClick={handleForwardToSkills}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEducation;
