/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputField from "components/Common/InputField/InputField";
import SelectField from "components/Common/SelectField/SelectField";
import ImageUpload from "components/Common/ImageUpload/ImageUpload";
import { LeftArrow } from "components/Common/Icons/Icon";
import ProgressBar from "components/Common/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import {
  getFontNames,
  getProfileDetails,
  openResumeModel,
  setByStepModelOpen,
  setResumeInfo,
} from "store/Slices/cvbuilder";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import TemplateWrapper from "components/Main/CVBuilder/TemplateWrapper/TemplateWrapper";
import MobileInput from "components/Common/Input/MobileInput";
import { FaLinkedin, FaRegEye } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { getFonts, uploadNewResume } from "api/services/cvbuilder.apis";
import Modal from "components/Common/Modal/NormalModel/Modal";
import StepByStepCV from "components/Main/StepByStep/StepByStepCV";
import { showToast } from "utils/toastUtils";
import { templateName } from "utils";

interface IFormData {
  cvBuilderTemplateID?: number;
  cvBuilderID?: number;
  font: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  profileImage?: any;
  fontID: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  emailID: string;
  mobileNo: string; // Corrected field name
  links: string;
  address: string;
  countryCode?: string;
  linkedin?: string;
  github?: string;
  other?: string;
}

const YourDetails: React.FC = () => {
  const isStepModel = useAppSelector((state) => state.builder.isStepModel);
  const selectedTemplate = useAppSelector((state) => state.builder.selectedTemplateId);
  const userId = useAppSelector((state) => state.auth.userData?.userid);
  const mobileNoRef = useRef<any>(null);
  const [profilePic, setProfileData] = useState();
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const [font, setFont] = useState<{ value: string; label: string }[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      fontID: resumeData?.fontID,
      jobTitle: resumeData?.jobTitle || "",
      firstName: resumeData?.firstName || "",
      lastName: resumeData?.lastName || "",
      emailID: resumeData?.emailID || "",
      mobileNo: resumeData?.mobileNo || "",
      address: resumeData?.address || "",
      links: resumeData?.links || "",
    },
  });

  useEffect(() => {
    if (resumeData) {
      setValue("jobTitle", resumeData.jobTitle);
      setValue("firstName", resumeData.firstName);
      setValue("lastName", resumeData.lastName);
      setValue("emailID", resumeData.emailID);
      setValue("mobileNo", resumeData.mobileNo);
      setValue("address", resumeData.address);
      setValue("links", resumeData.links);
      resumeData.links.split(",").map((val) => {
        if (val.includes("linkedin")) {
          setValue("linkedin", val);
        } else if (val.includes("github")) {
          setValue("github", val);
        } else {
          setValue("other", val);
        }
      });
    }
  }, [resumeData, setValue]);

  const getTemplateId = (name: keyof typeof templateName) => {
    const templateId = templateName[name];
    return templateId;
  };

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    if (mobileNoRef && mobileNoRef.current !== null && mobileNoRef.current.value) {
      const phoneNumberArray = mobileNoRef.current.value.split(" ");
      const getCountryCode = phoneNumberArray[0];
      const getPhoneNumber = phoneNumberArray.slice(1).join("");
      data.mobileNo = `${getCountryCode} ${getPhoneNumber.replace(/-/g, "")}`;
      data.countryCode = getCountryCode;
      data.fontID = data.font;
    }
    data.profileImage = profilePic || "";
    const userDetails = {
      address: data?.address || "",
      emailID: data?.emailID,
      firstName: data?.firstName,
      fontID: data?.fontID,
      jobTitle: data?.jobTitle,
      lastName: data?.lastName,
      linkedin: data?.linkedin,
      links: data?.links,
      mobileNo: data?.mobileNo,
      other: data?.other,
    };
    const templateIdAsNumber = getTemplateId(selectedTemplate);
    if (data) {
      uploadNewResume({
        ...resumeData,
        ...userDetails,
        isDraft: true,
        userID: userId,
        cvBuilderTemplateID: templateIdAsNumber,
      })
        .then((res) => {
          res.userID = userId;
          data.cvBuilderID = res?.cvBuilderID;
          data.cvBuilderTemplateID = templateIdAsNumber;
          dispatch(setResumeInfo(res));
          dispatch(getProfileDetails(data));
        })
        .catch(() => showToast("error", "Something went wrong"));

      navigate("/dashboard/cv-builder/experience");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (e: any) => {
    if (e) {
      setProfileData(e);
      sessionStorage.setItem("ProfileImage", String(e));
    }
  };

  useEffect(() => {
    getFonts().then((res) => {
      const optionFonts = res.map((item) => {
        return { value: item.fontName, label: item.fontName };
      });
      setFont(optionFonts);

      if (resumeData.fontID) {
        if (res && res[Number(resumeData.fontID) || 0]?.fileName) {
          const setFontData = res[Number(resumeData.fontID) || 0]?.fileName;
          setValue("fontID", setFontData);
          setValue("font", setFontData);
          dispatch(
            getFontNames({ fontID: String(resumeData.fontID || "0"), label: resumeData.fontID })
          );
        }
      } else {
        res && res[0] && res[0]?.fontName && setValue("font", res[0].fontName);
        dispatch(getFontNames({ fontID: String(res[0].fontName || "0"), label: res[0].fontName }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (value: any) => {
    const fontName = value.target.label?.toLowerCase() || value.target.value;
    dispatch(getFontNames({ fontID: String(value.target.value || "0"), label: fontName }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="hidden lg:flex">
        <ProgressBar />
      </div>
      <div className="flex flex-col lg:flex-row lg:pl-6 overflow-y-scroll custom-scroll flex-1 h-full">
        <div className="flex flex-col w-full lg:w-1/2 md:p-6">
          <div className="flex justify-between items-center lg:hidden">
            <button
              className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
              onClick={() => navigate(-1)}
            >
              <span className="pt-1">
                <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
              </span>
            </button>
            <h1 className="text-xl font-semibold lg:hidden">Your CV Heading</h1>
            <button
              className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
              onClick={() => dispatch(openResumeModel(true))}
            >
              <span className="pt-1">
                <FaRegEye color="#00000" className="text-2xl" />
              </span>
            </button>
          </div>
          <h1 className="text-2xl font-semibold mb-6 hidden lg:flex">Your CV Heading</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <div className="flex flex-col justify-between h-full">
              <div className="lg:mb-6 md:m-0 pb-8">
                <div className="mb-6 flex justify-center items-center">
                  <ImageUpload onImageChange={handleImageChange} />
                </div>
                <SelectField
                  label="Font for the resume"
                  name="font"
                  classes="w-full"
                  options={font}
                  register={register}
                  onChange={handleChange}
                />
                <div className="mb-3">
                  <InputField
                    label="Current Designation"
                    name="jobTitle"
                    register={register}
                    placeholder="Enter job title"
                    options={{
                      required: "Job Title is required",
                    }}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                  <div className="mb-3">
                    <InputField
                      label="First Name"
                      name="firstName"
                      register={register}
                      placeholder="Enter first name"
                      options={{
                        required: "First Name is required",
                      }}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Last Name"
                      name="lastName"
                      register={register}
                      placeholder="Enter last name"
                      options={{
                        required: "Last Name is required",
                      }}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                  <div>
                    <InputField
                      label="Email"
                      name="emailID"
                      type="email"
                      register={register}
                      placeholder="Enter email address"
                      options={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      }}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                    )}
                  </div>
                  <Controller
                    name="mobileNo" // Corrected name
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <MobileInput
                        label="Mobile Phone"
                        req={true}
                        error={errors.mobileNo?.message} // Corrected name
                        touched={!!errors.mobileNo} // Corrected name
                        {...field}
                        ref={mobileNoRef}
                      />
                    )}
                    rules={{ required: "This field is required" }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-3">
                  <div>
                    <InputField
                      label="Address"
                      name="address"
                      type="text"
                      register={register}
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <InputField
                      label="Linkedin"
                      name="linkedin"
                      type="text"
                      register={register}
                      prefix={<FaLinkedin />}
                      placeholder="Linkedin link"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-3">
                  <div>
                    <InputField
                      label="Other"
                      name="other"
                      type="text"
                      register={register}
                      prefix={<TbWorldWww />}
                      placeholder="Other link"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-between items-center">
                <div className="flex justify-center">
                  <button
                    className="border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md lg:flex items-center hidden"
                    onClick={() => navigate(-1)}
                  >
                    <span className="pt-1 mr-2">
                      <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
                    </span>
                    <span className="lg:hidden">Back</span>
                    <span className="hidden lg:block">Back to previous section</span>
                  </button>
                </div>
                <button type="submit" className="px-4 py-3 bg-yellow-500 text-white rounded-md">
                  Save and Next
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-1/2 py-6 pr-6 bg-gray-50 hidden lg:flex">
          <TemplateWrapper templateName={selectedTemplate} />
        </div>
      </div>
      <Modal
        isOpen={isStepModel}
        onClose={() => dispatch(setByStepModelOpen(false))}
        className="w-[90%] md:w-3/5 p-6"
      >
        <StepByStepCV />
      </Modal>
    </div>
  );
};

export default YourDetails;
