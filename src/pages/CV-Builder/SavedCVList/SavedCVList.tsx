/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CVItem from "components/Main/CVBuilder/CVList/CVItem";
import Header from "components/Main/CVBuilder/SlideNavBar/Header";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UploadIcon } from "assets/start_resume.svg";
import ResumeUpload from "assets/uploadResume.png";
import { deleteCv, getCvById, getCvCoverLetter, getCvList } from "api/services/cvbuilder.apis";
import { useAppDispatch } from "hooks/reduxHooks";
import {
  clearState,
  getSelectedTemplateId,
  setResumeInfo,
  setTemplateData,
} from "store/Slices/cvbuilder";
import { useNavigate } from "react-router-dom";
import { IResumeData } from "interface/Client/cvbuilder";
import { getDataFromDoc } from "api/services/gpt.api";
import { createResumeInfo, generateGPTPayload, templateIdFromName } from "utils";
import { coverLetterData } from "store/Slices/coverletter.slice";
import { FaSpinner } from "react-icons/fa";
import pdfToText from "react-pdftotext";
import { showToast } from "utils/toastUtils";
import Modal from "components/Common/Modal/NormalModel/Modal";
import { getUserIsSubscribe } from "api/services/localServices.service";

const SavedCVList: React.FC = () => {
  const [cvList, cvDatasetCvList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const uploadResume = useRef<any>(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetterDetails, setCoverLetterDetails] = useState("");
  const [listLoading, setListLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getCvs = async (isFromDelete: boolean) => {
    setListLoading(true);
    const { userId } = getUserIsSubscribe();
    try {
      const cvData = await getCvList(userId);
      cvData && cvDatasetCvList(cvData || []);
      isFromDelete && cvData.length == 0 && navigate("/dashboard/cv-builder");
      setListLoading(false);
    } catch (e) {
      setListLoading(false);
    }
  };

  const triggerUploadResume = () => {
    uploadResume && uploadResume?.current && uploadResume.current.click();
  };

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
        setShowLoader(false);
        navigate("/dashboard/cv-builder/select-template");
      })
      // eslint-disable-next-line no-unused-vars
      .catch(() => {
        setShowLoader(false);
        showToast("error", "something went wrong please try uploading again");
        setTimeout(() => {
          window && window.location.reload();
        }, 2000);
      });
  }

  const getTemplateId = (name: number) => {
    const templateId = templateIdFromName[name];
    return templateId;
  };

  const handleEdit = async (title: string) => {
    clearState();
    const cvData = (await getCvById(title)) as any;
    cvData && dispatch(setResumeInfo(cvData as unknown as IResumeData));
    dispatch(setTemplateData(cvData as unknown as IResumeData));
    const getTemplateNameById = getTemplateId(cvData?.cvBuilderTemplateID);
    dispatch(getSelectedTemplateId(getTemplateNameById));
    navigate("/dashboard/cv-builder/your-details");
  };

  const handleCoverLetter = async (title: string) => {
    setListLoading(true);
    const cvData = await getCvById(title);
    try {
      const payload = generateGPTPayload(JSON.stringify(cvData), "coverLetter");
      const suggestion = await getDataFromDoc(payload);
      const suggestionData = suggestion.choices[0].message.content;
      dispatch(coverLetterData({ html: suggestionData || "", id: title }));
      setListLoading(false);
      navigate("/dashboard/cv-builder/cover-letter");
    } catch (e) {
      setListLoading(false);
    }
  };

  const handleViewCoverLetter = async (
    coverLetterId: string,
    cvBuilderId: string,
    userid: string
  ) => {
    try {
      setListLoading(true);
      const cvData = await getCvById(cvBuilderId);
      cvData && dispatch(setResumeInfo(cvData as unknown as IResumeData));
      dispatch(setTemplateData(cvData as unknown as IResumeData));
      const viewCoverLetterData: { coverLetterDescription: string } = await getCvCoverLetter(
        cvBuilderId,
        coverLetterId,
        userid
      );
      viewCoverLetterData &&
        setCoverLetterDetails(viewCoverLetterData?.coverLetterDescription || "");
      setListLoading(false);
      setShowCoverLetter(true);
    } catch (e) {
      showToast("error", "Cover letter not found. Try creating cover letter with AI");
      setListLoading(false);
    }
  };

  const handleDelete = async (title: string) => {
    try {
      await deleteCv(title);
      getCvs(true);
    } catch (e) {
      getCvs(true);
    }
  };

  const handleDownload = (title: string) => {
    alert("Download CV: " + title);
  };

  useEffect(() => {
    getCvs(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col lg:px-6 overflow-y-scroll custom-scroll">
      <Header
        title="CV Builder"
        subtitle="Design a CV that captures your unique skills and experiences with our CV builder."
      />
      <Modal
        isOpen={showCoverLetter}
        onClose={() => {
          setShowCoverLetter(false);
          setCoverLetterDetails("");
        }}
        className="w-[90%] md:w-3/5"
      >
        <div
          style={{ overflow: "auto", height: "42rem", border: "1px solid", padding: "22px" }}
          dangerouslySetInnerHTML={{ __html: coverLetterDetails || "" }}
        ></div>
      </Modal>
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-6 gap-8 h-full">
        <div className=" bg-white p-4 shadow-lg rounded-2xl">
          <div className="lg:px-6 lg:pt-4">
            <h2 className="mb-4 text-xl font-semibold">Your CVs</h2>
            <p className="mb-6 text-gray-400">
              CV&apos;s you&apos;ve created in past are shown below
            </p>
            {listLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-2xl" />{" "}
              </div>
            ) : (
              cvList.map((cv: any) => (
                <CVItem
                  key={cv?.jobTitle || "-"}
                  title={cv?.jobTitle || "-"}
                  time={cv?.time || "-"}
                  builderId={cv?.cvBuilderID}
                  isDraft={cv?.isDraft}
                  onEdit={() => handleEdit(cv?.cvBuilderID)}
                  onDelete={() => handleDelete(cv?.cvBuilderID)}
                  onDownload={() => handleDownload(cv?.cvBuilderID)}
                  onCreateResume={() => handleCoverLetter(cv?.cvBuilderID)}
                  onViewCoverLetter={() =>
                    handleViewCoverLetter(cv?.coverLetterId, cv?.cvBuilderID, cv?.userID)
                  }
                />
              ))
            )}
          </div>
        </div>
        <div className="flex-grow ">
          <div className="lg:p-8 lg:shadow-lg  lg:bg-white rounded-2xl h-full">
            <h1 className="text-2xl font-semibold mb-6">Welcome to the CV Builder!</h1>
            <p className="text-gray-600 mb-8">
              Whether you&apos;re crafting your first CV or looking to polish an existing one, our
              tool is designed to help you present your best self to potential employers.
            </p>
            <div className="grid grid-cols-1 gap-6">
              <div
                onClick={() => {
                  dispatch(clearState());
                  navigate("/dashboard/cv-builder/select-template");
                }}
                className="cursor-pointer bg-white border p-6 rounded-lg gap-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-12 hover:border-custom-dark-orange"
              >
                <div className="md:bg-[#fff8eb] lg:px-10 rounded-2xl col-span-4 flex justify-center items-center">
                  <UploadIcon width="100px" />
                </div>
                <div className="col-span-8 flex flex-col items-start justify-center">
                  <p className="text-lg font-semibold mb-4">Start from Scratch</p>
                  <p className=" text-gray-500">
                    Build a new CV with our easy-to-use templates. Tailor your document to reflect
                    your unique experiences and skills.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  dispatch(clearState());
                  triggerUploadResume();
                }}
                className=" cursor-pointer border bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow gap-6 grid grid-cols-12 hover:border-custom-dark-orange"
              >
                <div
                  className={`${
                    showLoader ? "" : "md:bg-[#f8f9fa]"
                  } w-full py-10 rounded-2xl flex justify-center  items-center col-span-4`}
                >
                  {showLoader ? (
                    <div className="flex justify-center items-center">
                      <FaSpinner className="animate-spin text-2xl" />{" "}
                    </div>
                  ) : (
                    <img src={ResumeUpload} alt="resume upload" />
                  )}
                </div>
                <div className="col-span-8 flex flex-col items-start justify-center">
                  <h2 className="text-lg font-semibold mb-4">Upload and Edit</h2>
                  <p className=" text-gray-500">
                    Already have a CV? Upload your document and use our advanced tools to enhance
                    and update your information.
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCVList;
