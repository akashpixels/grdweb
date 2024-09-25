/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "components/Common/InputField/InputField";
import { LeftArrow } from "components/Common/Icons/Icon";
import Button from "components/Common/Button/Button";
import { FaPlus } from "react-icons/fa";
import ExperienceCard from "components/Common/ExperienceCard/ExperienceCard";
import { useNavigate } from "react-router-dom";
import { showToast } from "utils/toastUtils";
import { useDispatch } from "react-redux";
import { getExperienceList, openResumeModel, setResumeInfo } from "store/Slices/cvbuilder";
import { useAppSelector } from "hooks/reduxHooks";
import { FaRegEye } from "react-icons/fa";
import { generateRandomAlphaNumeric } from "utils";
import {
  deleteExperienceHistoryByEducationHistory,
  uploadNewResume,
} from "api/services/cvbuilder.apis";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Cookies from "js-cookie";

interface IFormInput {
  unquieId: string | number | undefined;
  position: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  experienceSummary: string;
  isStillWorkHere: boolean;
}

interface ExperienceProps {
  isFromProfilePage?: boolean;
  experience?: any[];
  setSelectedExpDetails?: any;
}

const AddExperience = (props: ExperienceProps) => {
  const { userId } = getUserIsSubscribe();
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const verifiedAddressFromLocalStore = Cookies.get("verifiedExperience");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enterAddress, setEnterAddress] = useState<any>([]);
  const [verifiedAddress, setVerifiedAddress] = useState<any>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<number>(0);
  const [selectedExeperience, setSelectedEducationUniueID] = useState<number>(0);

  // const [verifiedDetails, setVerifiedDetails] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const previousAddress = enterAddress.filter(
      (val: any, index: number) => index !== selectedExperienceId
    );
    const isNewAddressAdded = enterAddress.length < selectedExperienceId;
    const unquieId = generateRandomAlphaNumeric();
    if (isNewAddressAdded) {
      const newAddrssDetails = verifiedAddress || [];
      newAddrssDetails.push({ unquieId: unquieId, verifed: true });
      setVerifiedAddress(newAddrssDetails);
    }
    data.unquieId = selectedExeperience || unquieId;
    setEnterAddress([
      ...previousAddress,
      {
        ...data,
        unquieId: selectedExeperience || unquieId,
        cvEmploymentHistoryID: 0,
        cvBuilderID: 0,
      },
    ]);
    props?.setSelectedExpDetails &&
      props?.setSelectedExpDetails([
        ...previousAddress,
        {
          ...data,
          unquieId: selectedExeperience || unquieId,
          cvEmploymentHistoryID: 0,
          cvBuilderID: 0,
        },
      ]);
    const updateStatus = verifiedAddress.map(
      (val: { unquieId: string; companyName: string; verifed: boolean }) => {
        const updatedUnquieId = data.unquieId || unquieId;
        if (val?.unquieId == updatedUnquieId) {
          return { unquieId: updatedUnquieId, verifed: true };
        } else {
          return val;
        }
      }
    );
    setVerifiedAddress(updateStatus);
    reset();
    setShowForm(false);
  };

  const handleForwardTEducation = () => {
    const isAllAddressVerified = verifiedAddress.some(
      (val: { companyName: string; verifed: boolean }) => val?.verifed == false
    );
    const verifiedAddressList = enterAddress.map((val: any) => ({
      unquieId: val?.unquieId,
      verifed: true,
    }));
    !props?.isFromProfilePage &&
      verifiedAddressList &&
      Cookies.set("verifiedExperience", JSON.stringify(verifiedAddressList));
    if (enterAddress?.length > 0) {
      if (!isAllAddressVerified) {
        dispatch(getExperienceList(enterAddress));
        uploadNewResume({ ...resumeData, cvEmploymentHistories: enterAddress, userID: userId })
          .then((res) => {
            res.userID = userId;
            dispatch(setResumeInfo(res));
          })
          .catch(() => showToast("error", "Something went wrong"));
        navigate("/dashboard/cv-builder/education");
      } else {
        showToast("error", "Verify your experience's details!");
      }
    } else {
      dispatch(getExperienceList([]));
      uploadNewResume({ ...resumeData, cvEmploymentHistories: [], userID: userId }).then((res) => {
        res.userID = userId;
        dispatch(setResumeInfo(res));
      });
      navigate("/dashboard/cv-builder/education");
    }
  };

  const verifyDetails = (id: number, experience: any) => {
    setSelectedExperienceId(id);
    setSelectedEducationUniueID(experience?.unquieId);
    setValue("position", experience.position || "");
    setValue("companyName", experience.companyName || "");
    setValue("startDate", experience.startDate || "");
    setValue("endDate", experience.endDate || "");
    setValue("experienceSummary", experience?.experienceSummary || "");

    setShowForm(true);
  };

  useEffect(() => {
    if (props?.experience && props?.experience.length > 0) {
      const unVerifiedExperience: { unquieId: string; verifed: boolean }[] = [];
      const experienceDetails: any[] | undefined = [];
      props?.experience &&
        props?.experience.length > 0 &&
        props?.experience.forEach((val) => {
          const unquieId = generateRandomAlphaNumeric();
          experienceDetails.push({ ...val, unquieId: val?.userEmploymentHistoryID || unquieId });
          unVerifiedExperience.push({
            unquieId: val?.userEmploymentHistoryID || unquieId,
            verifed: props?.isFromProfilePage ? true : false,
          });
        });
      setVerifiedAddress(unVerifiedExperience);
      setEnterAddress(experienceDetails);
    } else if (resumeData.cvEmploymentHistories?.length) {
      const verifedList =
        (verifiedAddressFromLocalStore && JSON.parse(verifiedAddressFromLocalStore)) || [];
      const unVerifiedExperience: { unquieId: string; verifed: boolean }[] = [];
      const experienceDetails: any[] | undefined = [];
      resumeData?.cvEmploymentHistories &&
        resumeData.cvEmploymentHistories.length > 0 &&
        resumeData.cvEmploymentHistories.forEach((val, index) => {
          const unquieId = generateRandomAlphaNumeric();
          experienceDetails.push({
            ...val,
            unquieId:
              (!props?.isFromProfilePage &&
                verifedList &&
                verifedList.length > 0 &&
                verifedList[index]?.unquieId) ||
              unquieId,
          });
          unVerifiedExperience.push({
            unquieId: unquieId,
            verifed: props?.isFromProfilePage
              ? true
              : verifedList && verifedList.length > 0
              ? true
              : false,
          });
        });
      verifiedAddressFromLocalStore && !props?.isFromProfilePage
        ? setVerifiedAddress(JSON.parse(verifiedAddressFromLocalStore))
        : setVerifiedAddress(unVerifiedExperience);
      setEnterAddress(experienceDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData, props?.experience]);

  const handleDelete = async (index: number, unquieId: string) => {
    setEnterAddress(enterAddress.filter((_: any, i: number) => i !== index));

    if (props?.isFromProfilePage) {
      try {
        const deleteDetails = await deleteExperienceHistoryByEducationHistory(
          userId,
          unquieId || ""
        );
        props?.setSelectedExpDetails &&
          deleteDetails &&
          props?.setSelectedExpDetails(enterAddress.filter((_: any, i: number) => i !== index));
        showToast("success", "Deleted successfully");
      } catch (e) {
        showToast("success", "Deleted successfully");
      }
    }
    setVerifiedAddress(
      verifiedAddress.filter((val: { unquieId: string | undefined }) => {
        if (val?.unquieId !== unquieId) {
          return val;
        }
      })
    );
  };

  const stillWorkHere = watch("isStillWorkHere", false);
  return (
    <div className="h-full flex flex-col justify-between p-2 md:p-0">
      {!showForm ? (
        <div className="m-2">
          {!props?.isFromProfilePage && (
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
                <h1 className="text-xl font-semibold lg:hidden">Employment History</h1>
                <button
                  className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                  onClick={() => dispatch(openResumeModel(true))}
                >
                  <span className="pt-1">
                    <FaRegEye color="#00000" className="text-2xl" />
                  </span>
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-4 hidden lg:flex">Employment History</h2>
            </>
          )}

          {enterAddress && verifiedAddress && enterAddress?.length && verifiedAddress.length
            ? enterAddress?.map((experience: any, id: number) => (
                <div className="mb-6 flex flex-col gap-5" key={id}>
                  <ExperienceCard
                    {...experience}
                    key={id}
                    onDelete={() => handleDelete(id, experience?.unquieId)}
                    onEdit={() => verifyDetails(id, experience)}
                    isFromProfilePage={props?.isFromProfilePage}
                  />
                  {!props?.isFromProfilePage && (
                    <button
                      type="button"
                      className={`px-4 py-3 ${
                        verifiedAddress.filter(
                          (val: { unquieId: string; verifed: boolean }) =>
                            val?.unquieId == experience?.unquieId
                        )[0]?.verifed
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white rounded-md`}
                      onClick={() => {
                        verifyDetails(id, experience);
                      }}
                    >
                      {verifiedAddress.filter(
                        (val: { unquieId: string; verifed: boolean }) =>
                          val?.unquieId == experience?.unquieId
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
              setSelectedExperienceId(enterAddress.length + 1);
              setShowForm(true);
            }}
            bgColor={props?.isFromProfilePage ? "bg-transparent" : "bg-custom-primary"}
            className={`${
              props?.isFromProfilePage ? "text-red-600 border border-red-600" : "text-white"
            } flex gap-2 items-center hover:text-custom-primary`}
          >
            <FaPlus /> Add Experience
          </Button>
        </div>
      ) : null}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Employment History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mb-4">
              <div>
                <InputField
                  label="Position"
                  name="position"
                  register={register}
                  placeholder="Enter your position"
                  options={{
                    required: "Position is required",
                  }}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm">{errors.position.message}</p>
                )}
              </div>
              <div>
                <InputField
                  label="Company"
                  name="companyName"
                  register={register}
                  placeholder="Enter company name"
                  options={{
                    required: "Company is required",
                  }}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">{errors.companyName.message}</p>
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
                  maxLength={5}
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
              <input type="checkbox" {...register("isStillWorkHere")} className="mr-2" />
              <label className="text-gray-700">I still work here</label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Summary
              </label>
              <textarea
                {...register("experienceSummary")}
                rows={6}
                cols={200}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="Enter your experience summary"
              ></textarea>
              {/* {errors.experienceSummary && (
                <p className="text-red-500 text-sm">{errors.experienceSummary.message}</p>
              )} */}
            </div>
            <div className="flex items-center gap-3">
            <button
              type="submit"
              className=" border px-6 py-2 bg-custom-primary text-white rounded-md hover:bg-white hover:text-custom-primary border-custom-primary "
            >
              Save
            </button>
            <button
              type="button"
              onClick={(e)=>{e.preventDefault(); setShowForm(false);}}
              className=" border px-6 py-2 bg-custom-primary text-white rounded-md hover:bg-white hover:text-custom-primary border-custom-primary "
            >
              Cancel
            </button>
            </div>
          </div>
        </form>
      )}
      {!props?.isFromProfilePage && (
        <div className="flex justify-center lg:justify-between items-center mt-5">
          <div className="lg:flex justify-center hidden">
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
          <button
            type="submit"
            className={`px-4 py-3 ${showForm ? "bg-slate-400" : "bg-yellow-500"} text-white rounded-md`}
            disabled={showForm}
            onClick={handleForwardTEducation}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExperience;
