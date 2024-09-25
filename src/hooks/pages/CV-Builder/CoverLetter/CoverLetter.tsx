/* eslint-disable max-len */
import { LeftArrow } from "components/Common/Icons/Icon";
import Modal from "components/Common/Modal/NormalModel/Modal";
import BeginnerCover from "components/Common/Templates/CoverLetterTemplates/BeginnerCover";
import CoverLetterFields from "components/Main/CVBuilder/CoverLetter/CoverLetterFields";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { openResumeModel } from "store/Slices/cvbuilder";

const CoverLetter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resumeModel = useAppSelector((state) => state.builder.resumeModel);
  const coverLetterData = useAppSelector((state) => state.coverLetter.coverletterData);
  const [coverLetter, setCoverLetter] = useState<string>("");

  // const [font, setFont] = useState<{ value: string; label: string }[]>([]);
  // const [fontName, setFontName] = useState<string>("");
  useEffect(() => {
    coverLetterData && coverLetterData && setCoverLetter(coverLetterData?.html as string);
  }, [coverLetterData]);

  // useEffect(() => {
  //   getFonts().then((res) => {
  //     const optionFonts = res.map((item) => {
  //       return { value: item.fontName, label: item.fontName };
  //     });
  //     setFont(optionFonts);

  //     res &&
  //       res[0] &&
  //       res[0]?.fontName &&
  //       dispatch(getFontNames({ fontID: String(res[0].fontName || "0"), label: res[0].fontName }));
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onChange = (event: any) => {
  //   setFontName(event.target.value);
  // };

  return (
    <div className="flex flex-col w-full p-4 lg:p-0">
      <div className="flex flex-col lg:flex-row overflow-y-scroll custom-scroll flex-1 pb-6">
        <div className="flex flex-col w-full lg:w-1/2 md:p-6 justify-between h-content">
          <div>
            <div className="flex justify-between items-center lg:hidden mb-3">
              <button
                className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                onClick={() => navigate(-1)}
              >
                <span className="pt-1">
                  <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
                </span>
              </button>
              <h1 className="text-xl font-semibold lg:hidden">Cover Letter</h1>
              <button
                className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                onClick={() => dispatch(openResumeModel(true))}
              >
                <span className="pt-1">
                  <FaRegEye color="#00000" className="text-2xl" />
                </span>
              </button>
            </div>
            <h1 className="text-xl font-semibold hidden lg:flex">Cover Letter</h1>
            <div className="mb-4">
              <label htmlFor="fontFamily" className="block text-lg font-medium text-gray-700">
                Description
              </label>
            </div>
          </div>

          {/* <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Font</label>
            <select
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm w-full"
              onChange={onChange}
            >
              {font?.map((option) => (
                <option key={option.value} value={option.value} label={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div> */}
          <CoverLetterFields />
        </div>

        <div
          className={`w-full lg:w-1/2 pB-6 pr-6 hidden lg:flex bg-white h-auto overflow-auto ${
            coverLetter && coverLetter !== "" && "border-2 rounded, p-5"
          }`}
          // style={{ fontFamily: fontName }}
        >
          <BeginnerCover coverLetterHtml={coverLetter} />
        </div>
      </div>

      <Modal
        isOpen={resumeModel}
        onClose={() => dispatch(openResumeModel(false))}
        className="h-4/6 w-[90%] overflow-auto !p-0"
      >
        <BeginnerCover coverLetterHtml={coverLetter} />
      </Modal>
    </div>
  );
};

export default CoverLetter;
