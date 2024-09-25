/* eslint-disable max-len */
import AttractiveTemplate from "components/Common/Templates/AttractiveTemplate";
import ElegantTemplate from "components/Common/Templates/ElegantTemplate";
import { useAppSelector } from "hooks/reduxHooks";
import { toPng } from "html-to-image";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { showToast } from "utils/toastUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TemplateWrapper = ({
  templateName,
  callingDownload,
  setCallingDownload,
}: {
  templateName: string;
  callingDownload?: any;
  setCallingDownload?: any;
}) => {
  const fontName = useAppSelector((state) => state.builder.fontName);
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const cvLetterData = useAppSelector((state) => state.coverLetter.coverletterData.html);
  const location = useLocation();
  const templateRef = useRef() as MutableRefObject<HTMLDivElement>;

  const queryParams = new URLSearchParams(location.search);
  const showCoverLetter = queryParams.get("showCoverLetter");

  useEffect(() => {
    callingDownload && htmlToImageConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callingDownload]);

  const htmlToImageConvert = () => {
    toPng(templateRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${resumeData.firstName}-${resumeData.lastName}-resume`;
        link.href = dataUrl;
        link.click();
      })
      .catch(() => {
        showToast("error", "something went wrong");
      })
      .finally(() => {
        setCallingDownload(false);
      });
  };

  return (
    <div style={{ fontFamily: fontName }} ref={templateRef} className="print-container">
      {templateName === "Elegant" && (!showCoverLetter || showCoverLetter == "false") && (
        <ElegantTemplate />
      )}
      {templateName === "Creative" && (!showCoverLetter || showCoverLetter == "false") && (
        <AttractiveTemplate />
      )}
      {(showCoverLetter || showCoverLetter == "true") && (
        <div className="p-4">
          <div
            dangerouslySetInnerHTML={{
              __html:
                cvLetterData ||
                "<div class='flex items-center justify-center p-5 flex-col text-2xl'> <div>No cover letter data found</div> </div>",
            }}
            className="p-8 bg-white shadow-md print-container"
          ></div>
        </div>
      )}
    </div>
  );
};

export default TemplateWrapper;
