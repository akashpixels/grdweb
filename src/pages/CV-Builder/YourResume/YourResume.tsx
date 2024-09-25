/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { LeftArrow } from "components/Common/Icons/Icon";
import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import TemplateWrapper from "components/Main/CVBuilder/TemplateWrapper/TemplateWrapper";
import Modal from "components/Common/Modal/NormalModel/Modal";
import Button from "components/Common/Button/Button";
import { useAppSelector } from "hooks/reduxHooks";
import { FaChevronDown } from "react-icons/fa";
import { uploadNewResume } from "api/services/cvbuilder.apis";

const YourResume = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const templateId = useAppSelector((state) => state.builder.selectedTemplateId);
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const userId = useAppSelector((state) => state.auth.userData?.userid);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [printInitiated, setPrintInitiated] = useState(false);
  const [callingDownload, setCallingDownload] = useState<boolean>(false);
  const dropdownRef = useRef() as MutableRefObject<HTMLDivElement>;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showCoverLetter = queryParams.get("showCoverLetter");
  const resume =
    (location.pathname &&
      location.pathname.split("/") &&
      location.pathname.split("/")[location.pathname.split("/").length - 1]) ||
    "";

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // const htmlToImageConvert = () => {
  //   setCallingDownload(true);
  // };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const showInstruction = () => {
    printInitiated && setPrintInitiated(false);
    setShowSharePopup(true);
  };

  useEffect(() => {
    !showSharePopup && printInitiated && window.print();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSharePopup]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function convertToPlain(html: any) {
    return html?.innerHTML;
  }

  useEffect(() => {
    if(!showCoverLetter)
    {
      const htmlString = document.getElementsByClassName("print-container");
      htmlString &&
        htmlString.length > 0 &&
        uploadNewResume({
          ...resumeData,
          isDraft: false,
          userID: userId,
          cvHtmlString: convertToPlain(htmlString[1]),
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full md:px-12 print-container">
      <div className="overflow-y-scroll custom-scroll p-4 md:p-0">
        <div className="flex justify-between items-center my-4 relative no-print w-full">
          <div className="flex justify-center md:justify-end">
            <button
              className="border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md flex items-center"
              onClick={() =>
                resume == "your-resume" && !showCoverLetter
                  ? navigate("/dashboard/cv-builder/cv-list")
                  : showCoverLetter
                  ? navigate("/dashboard/create-cover-letter")
                  : navigate(-1)
              }
            >
              <span className="pt-1 lg:mr-2">
                <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
              </span>
              <span className="hidden lg:flex">
                {" "}
                <span className="lg:hidden">Back</span>
                {!showCoverLetter && (
                  <span className="hidden lg:block">
                    {resume == "your-resume" ? "Go to cv list" : "Back to previous section"}
                  </span>
                )}
                {showCoverLetter && (
                  <span className="hidden lg:block">
                    {showCoverLetter ? "Go to cover list" : "Back to previous section"}
                  </span>
                )}
              </span>
            </button>
          </div>
          <p className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
            <BsPencilSquare />
            {showCoverLetter ? "Cover letter" : "Your Resume"}
          </p>
          <div className="relative no-print" ref={dropdownRef}>
            <button
              type="button"
              className="px-4 py-3 h-full bg-yellow-500 text-white rounded-md flex items-center gap-4 "
              onClick={() => showInstruction()}
            >
              <span className="hidden lg:flex">Download</span>
              <span className="flex lg:hidden">
                <FaChevronDown />
              </span>
            </button>
          </div>
        </div>

        <div className="lg:mx-44 md:order-2" id="source-html">
          <TemplateWrapper
            callingDownload={callingDownload}
            setCallingDownload={setCallingDownload}
            templateName={templateId || "Elegant"}
          />
        </div>

        {showSharePopup && (
          <Modal
            isOpen={showSharePopup}
            onClose={() => setShowSharePopup(false)}
            className="w-[90%] md:w-2/5 lg:2/5"
          >
            <div className="flex flex-col gap-3 items-center w-50 p-5">
              <p className="text-xl border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md flex items-center">
                Instructions to Print
              </p>
              <ul className="list-inside list-disc flex flex-col gap-2">
                <li>
                  Click on <b>More Settings</b>
                </li>
                <li>
                  Click on <b>Margins options dropdown</b>
                  <span className="px-1">
                    By default margin is set to <b>Default</b> setting set it to <b>None</b>.
                  </span>
                </li>
                <li>
                  Uncheck <b>Headers and footers</b>
                  <span className="px-1">options</span>
                </li>
                <li>
                  Check <b>Background graphics</b>
                  <span className="px-1">options</span>
                </li>
                <li>
                  Click on <b>Save</b> button.
                </li>
              </ul>
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={() => {
                    setShowSharePopup(false);
                    setPrintInitiated(true);
                  }}
                  className="hover:text-custom-primary hover:bg-transparent text-white"
                >
                  Download as PDF
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default YourResume;
