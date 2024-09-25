/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MobilePortalHeader from "components/Common/Header/MobilePortalHeader";
import Header from "components/Main/CVBuilder/SlideNavBar/Header";
import Sidebar from "components/Main/CVBuilder/SlideNavBar/SlideNavBar";
import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ResumeUpload from "assets/uploadResume.png";
import pdfToText from "react-pdftotext";
import { getDataFromDoc } from "api/services/gpt.api";
import { showToast } from "utils/toastUtils";
import { coverLetterData } from "store/Slices/coverletter.slice";
import { useAppDispatch } from "hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import CVItem from "components/Main/CVBuilder/CVList/CVItem";
import { getCoverList } from "api/services/cvbuilder.apis";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Modal from "components/Common/Modal/NormalModel/Modal";
import MobilePortalFooter from "components/Main/Footer/MobilePortalFooter";
import { generateGPTPayload } from "utils";
/* eslint-disable max-lines-per-function */

const CoverLetter = () => {
  const uploadResume = useRef<any>(null);
  const [cvList, cvDatasetCvList] = useState([]);
  const [showLoading, setShowLoader] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSubscribe } = getUserIsSubscribe();

  useEffect(() => {
    if (!isSubscribe) {
      navigate("/dashboard/profile/subscription-plan");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function extractText(event: any) {
    setShowLoader(true);
    const file = event && event?.target && event?.target?.files[0];
    pdfToText(file)
      .then(async (text) => {
        const payload = generateGPTPayload(text, "coverLetter");
        await getDataFromDoc(payload);
        const suggestionData = "cover letter";
        dispatch(coverLetterData({ html: suggestionData || "", id: "0" }));
        navigate("/dashboard/cv-builder/cover-letter");
        setShowLoader(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(() => {
        setShowLoader(false);
        showToast("error", "something went wrong please try uploading again");
      });
  }

  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetterDetails, setCoverLetterDetails] = useState("");
  const [listLoading, setListLoading] = useState(false);

  const getCvs = async () => {
    setListLoading(true);
    const { userId } = getUserIsSubscribe();
    try {
      const cvData = await getCoverList(userId);
      cvData && cvDatasetCvList(cvData || []);
      setListLoading(false);
    } catch (e) {
      setListLoading(false);
    }
  };

  const triggerUploadResume = () => {
    uploadResume && uploadResume?.current && uploadResume.current.click();
  };

  const handleViewCoverLetter = async (coverLetterDescription: string) => {
    if (coverLetterDescription) {
      setShowCoverLetter(true);
      setCoverLetterDetails(coverLetterDescription);
    }
  };

  useEffect(() => {
    getCvs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async (data: string, title: string, cvCoverLetterID: string) => {
    dispatch(coverLetterData({ html: data || "", id: title }));
    navigate(`/dashboard/cv-builder/cover-letter?cvCoverLetterID=${cvCoverLetterID}`);
  };

  return (
    <div className="relative pt-20 pb-20 mb-16 lg:mb-0 md:pb-6 md:pt-6 flex min-h-screen bg-custom-white w-screen h-screen overflow-y-scroll custom-scroll bg-white-custom p-4">
      <Modal
        isOpen={showCoverLetter}
        onClose={() => {
          setShowCoverLetter(false);
          setCoverLetterDetails("");
        }}
        className="max-h-[30rem]"
      >
        <div
          className="border p-4 rounded-sm p-5"
          dangerouslySetInnerHTML={{ __html: coverLetterDetails || "" }}
        ></div>
      </Modal>
      <MobilePortalHeader />
      <span className="hidden lg:flex no-print">
        <Sidebar />
      </span>
      <div className="flex-1 flex flex-col md:pl-6">
        <Header
          title="Cover Letter Builder"
          subtitle="Craft a professional cover letter that opens doors."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-6 gap-8 h-full">
          <div className=" bg-white p-4 shadow-lg rounded-2xl">
            <div className="lg:px-6 lg:pt-4">
              <h2 className="mb-4 text-xl font-semibold">Your Cover Letter&apos;s</h2>
              <p className="mb-6 text-gray-400">
                Cover letter&apos;s you&apos;ve created in past are shown below
              </p>
              {listLoading ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin text-2xl" />{" "}
                </div>
              ) : cvList.length ? (
                cvList?.map((cv: any) => (
                  <CVItem
                    key={cv?.jobTitle || `${cv?.firstName}-cover-letter` || "-"}
                    title={cv?.jobTitle || `${cv?.firstName}-cover-letter` || "-"}
                    time={cv?.time || "-"}
                    builderId={cv?.cvBuilderID || cv?.cvCoverLetterID}
                    isDraft={cv?.isDraft}
                    isFromCoverLetter={true}
                    onEdit={() =>
                      handleEdit(
                        cv?.coverLetterDescription,
                        `${cv?.firstName}-cover-letter`,
                        cv?.cvCoverLetterID
                      )
                    }
                    onViewCoverLetter={() => handleViewCoverLetter(cv?.coverLetterDescription)}
                  />
                ))
              ) : (
                <p className="flex justify-center text-sm">No Cover Letter Found</p>
              )}
            </div>
          </div>
          <div className="flex-grow ">
            <div className="md:bg-white md:shadow-lg rounded-2xl md:p-6 h-full">
              <h1 className="text-3xl font-semibold mb-4 text-center">Cover Letter</h1>
              <p className="text-center mb-8 text-gray-500">
                Design a Cover Letter that captures your unique skills and experiences with our
                Cover Letter builder.
              </p>

              <div
                className="bg-white flex flex-col items-center justify-center  p-6 rounded-2xl border cursor-pointer hover:border-custom-dark-orange"
                onClick={() => {
                  triggerUploadResume();
                }}
              >
                <div
                  className={`${
                    showLoading ? "" : "bg-[#f8f9fa]"
                  } w-full py-14 rounded-2xl flex justify-center items-center mb-4`}
                >
                  {showLoading ? (
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
        </div>
      </div>
      <MobilePortalFooter />
    </div>
  );
};

export default CoverLetter;
