/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegFilePdf } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import Button from "components/Common/Button/Button";
import { uploadProfileResumeData } from "api/services/jobs.api";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { showToast } from "utils/toastUtils";
import { getCVName } from "store/Slices/cvbuilder";
import { getUserIsSubscribe } from "api/services/localServices.service";
import { refreshPage } from "utils";

const CVResume: React.FC = () => {
  const dispatch = useAppDispatch();
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const { userId } = getUserIsSubscribe();
  const cvName = useAppSelector((state) => state.builder.cvName);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, reset } = useForm();

  const onSubmit = () => {
    if (!uploadedResume) {
      alert("Please upload a resume first!");
      return;
    }

    const formData = new FormData();
    formData.append("cv", uploadedResume, uploadedResume.name);

    try {
      uploadProfileResumeData(userId, formData);

      showToast("success", "CV uploaded successfully");
      reset(); // Reset the form
      dispatch(getCVName(uploadedResume?.name));
      setUploadedResume(null); // Clear the uploaded resume
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("Error uploading CV");
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <div className="flex justify-between border-b py-4 flex-col md:flex-row gap-6">
        <div>
          <h2 className="text-xl font-semibold">CV/Resume</h2>
          <p className="text-gray-500 text-sm">Your most recent CV.</p>
        </div>
        <div>
          <Button
            type="submit"
            className=" bg-transparent hover:text-custom-secondary hover:bg-custom-primary text-custom-primary border-custom-primary mr-6"
          >
            Save
          </Button>
          <Button
            onClick={() => refreshPage()}
            className=" text-custom-secondary hover:text-custom-primary hover:bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <div className="col-span-12 lg:col-span-4">
          <label className="font-semibold" htmlFor="photo">
            Current CV
          </label>
        </div>
        {uploadedResume || cvName ? (
          <div className="flex gap-10 col-span-12 lg:col-span-8 flex-col md:flex-row">
            <div className="w-full border rounded">
              <div className="flex items-center gap-4 p-5">
                <FaRegFilePdf height="20rem" width="20rem" />
                <div className="flex flex-col gap-1">
                  <p>{uploadedResume?.name ?? cvName}</p>
                  <p className="text-xs">200 KB</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-10 col-span-12 lg:col-span-8 flex-col m text-center md:flex-row">
            <p className="col-span-12 text-center">No CV Found</p>
          </div>
        )}
      </div>
      <div className="py-6 md:grid md:grid-cols-12 border-b items-center gap-8">
        <div className="col-span-12 lg:col-span-4">
          <label htmlFor="name" className="col-span-12 lg:col-span-4 font-semibold">
            Upload CV
          </label>
        </div>
        <div className="flex gap-10 col-span-12 lg:col-span-8 w-full flex-col md:flex-row border rounded">
          <div
            className="mb-2 bg-white p-4 rounded-2xl flex gap-2 flex-col justify-center items-center cursor-pointer w-full"
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
        </div>
      </div>
    </form>
  );
};

export default CVResume;
