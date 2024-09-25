/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
/* eslint-disable max-len */
import InputField from "components/Common/InputField/InputField";
import { IJobList } from "interface/Server/jobs";
import React, { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import MobileInput from "components/Common/Input/MobileInput";
import { BASE_URL } from "api/apis";
import { useAppSelector } from "hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "utils/toastUtils";
import { applyForJob } from "api/services/jobs.api";

interface FormData {
  fontID: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  emailID: string;
  mobileNo: string;
}

const ApplyJobForm = ({ selectedJob }: { selectedJob?: IJobList }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const { userid } = useAppSelector((state) => state.auth.userData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const job = location.state;

  const onSubmit: SubmitHandler<FormData> = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("JobId", selectedJob?.jobId ?? job?.jobId);
    formData.append("CompanyId", selectedJob?.companyId ?? job?.companyId);
    formData.append("UserID", userid);

    if (uploadedResume) {
      formData.append("resume", uploadedResume);
      applyForJob(formData)
        .then(() => {
          setIsLoading(false);
          showToast("success", "Job applied successfully.");
          navigate("/jobs-internships/applied");
        })
        .catch(() => {
          showToast("error", "Please try again.");
        });
    } else {
      showToast("error", "Upload your resume.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedResume(file);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full pb-12 lg:pb-0">
      <div className="flex gap-4 items-center mb-6 lg:hidden">
        <img src={`${BASE_URL}/${selectedJob?.companyLogo}`} alt={selectedJob?.jobTitle || ""} />
        <h3 className="text-xl font-semibold">{selectedJob?.jobTitle}</h3>
      </div>
      <div className="flex flex-col">
        <div>
          <div
            className="mb-6 bg-white shadow p-4 rounded-2xl flex gap-2 flex-col justify-center items-center cursor-pointer"
            onClick={handleFileClick}
          >
            <div>
              <FiUploadCloud className="text-2xl" />
            </div>
            <div className="text-sm">
              <span className="text-amber-400 font-semibold">Click to upload</span>
              <span>&nbsp; or drag and drop</span>
            </div>
            <div className="text-sm">PDF (max. 5 MB)</div>
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          {uploadedResume && (
            <div className="mb-6 bg-white shadow p-4 rounded-2xl flex gap-2 flex-col justify-center items-center">
              <p className="text-green-500 font-semibold">Uploaded Resume: {uploadedResume.name}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="mb-3">
              <InputField
                label="First Name"
                name="firstName"
                register={register}
                placeholder="Enter first name"
                options={{ required: "First Name is required" }}
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
                options={{ required: "Last Name is required" }}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
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
              {errors.emailID && <p className="text-red-500 text-sm">{errors.emailID.message}</p>}
            </div>
            <Controller
              name="mobileNo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <MobileInput
                  label="Mobile Phone"
                  req={true}
                  error={errors.mobileNo?.message}
                  touched={!!errors.mobileNo}
                  {...field}
                />
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        </div>
        <div className="flex justify-center lg:justify-between items-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-custom-primary text-custom-secondary rounded-lg text-sm hover:bg-transparent border-2 border-custom-primary hover:text-custom-primary"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplyJobForm;
