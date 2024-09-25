/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UploadIcon } from "assets/start_resume.svg";
import ResumeUpload from "assets/uploadResume.png";
import { useNavigate } from "react-router-dom";
import pdfToText from "react-pdftotext";
import { getDataFromDoc } from "api/services/gpt.api";
import { useAppDispatch } from "hooks/reduxHooks";
import { clearState, setResumeInfo, setTemplateData } from "store/Slices/cvbuilder";
import { createResumeInfo, generateGPTPayload } from "utils";
import { showToast } from "utils/toastUtils";
import { FaSpinner } from "react-icons/fa";
import { getCvList } from "api/services/cvbuilder.apis";
import { getUserIsSubscribe } from "api/services/localServices.service";

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  // eslint-disable-next-line
  const uploadResume = useRef<any>(null);

  const getCvs = async () => {
    // setListLoading(true);
    const { userId } = getUserIsSubscribe();
    try {
      const cvData = await getCvList(userId);
      cvData && cvData.length > 0 && navigate("/dashboard/cv-builder/cv-list");
      // setListLoading(false);
    } catch (e) {
      // setListLoading(false);
    }
  };

  useEffect(() => {
    getCvs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function extractText(event: any) {
    setShowLoader(true);
    const file = event && event?.target && event?.target?.files[0];
    pdfToText(file)
      .then(async (text) => {
        const payload = generateGPTPayload(text, "userDetails");
        const extractedData = await getDataFromDoc(payload);
        const userDetail = JSON.parse(extractedData.choices[0].message.content);
        const data =
          userDetail?.users && userDetail?.users[0]
            ? userDetail?.users && userDetail?.users[0]
            : (userDetail?.user && userDetail?.user[0]) || [];
        const userInfo = createResumeInfo(data);
        const { userId } = getUserIsSubscribe();
        userInfo.userID = userId;
        dispatch(setResumeInfo(userInfo));
        dispatch(setTemplateData(userInfo));
        setShowLoader(false);
        navigate("/dashboard/cv-builder/select-template");
      })
      // eslint-disable-next-line no-unused-vars
      .catch(() => {
        setShowLoader(false);
        showToast("error", "something went wrong please try uploading again");
      });
  }

  const triggerUploadResume = () => {
    uploadResume && uploadResume?.current && uploadResume.current.click();
  };

  return (
    <main className="flex-1 pt-6 md:bg-gray-100 pb-20 md:pb-0">
      <div className="md:bg-white md:shadow-lg rounded-2xl md:p-6 h-full">
        <h1 className="text-3xl font-semibold mb-4 text-center">CV Builder</h1>
        <p className="text-center mb-8 text-gray-500">
          Design a CV that captures your unique skills and experiences with our CV builder.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Start Resume section */}
          <div
            className="bg-white flex flex-col items-center justify-center p-6 rounded-2xl border cursor-pointer hover:border-custom-dark-orange"
            onClick={() => {
              dispatch(clearState());
              navigate("/dashboard/cv-builder/select-template");
            }}
          >
            <div className="bg-[#fff8eb] w-full py-12 rounded-2xl flex justify-center items-center mb-4">
              <UploadIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Start from Scratch</h2>
            <p className="text-center text-gray-500">
              Build a new CV with our easy-to-use templates. Tailor your document to reflect your
              unique experiences and skills.
            </p>
          </div>
          {/* Upload Resume section */}
          <div
            className="bg-white flex flex-col items-center justify-center  p-6 rounded-2xl border cursor-pointer hover:border-custom-dark-orange"
            onClick={() => {
              dispatch(clearState());
              triggerUploadResume();
            }}
          >
            <div
              className={`${
                showLoader ? "" : "bg-[#f8f9fa]"
              } w-full py-14 rounded-2xl flex justify-center items-center mb-4`}
            >
              {showLoader ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin text-2xl" />{" "}
                </div>
              ) : (
                <img src={ResumeUpload} alt="resume upload" />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">Upload and Edit</h2>
            <p className="text-center text-gray-500">
              Already have a CV? Upload your document and use our advanced tools to enhance and
              update your information.
            </p>
            <input
              className="hidden"
              type="file"
              accept="application/pdf"
              ref={uploadResume}
              onChange={extractText}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
