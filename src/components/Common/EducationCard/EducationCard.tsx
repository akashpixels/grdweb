/* eslint-disable max-len */
import React from "react";
import { LuGraduationCap } from "react-icons/lu";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";

interface IEducationCard {
  university: string;
  experienceSummary: string;
  startDate: string;
  endDate?: string;
  isStillStudyHere: boolean;
  courseName: string;
  onDelete: () => void;
  onEdit?: () => void;
  isFromProfilePage?: boolean;
}

const EducationCard = ({
  university,
  courseName = "",
  experienceSummary,
  startDate,
  endDate,
  isStillStudyHere,
  onDelete,
  onEdit,
  isFromProfilePage,
}: IEducationCard) => {
  const checkIsDateFormatCorrect = (date: string | undefined) => {
    return date && date !== "" ? `${date}-` : "";
  };
  const formatDate = (date: string) => {
    const parts = date.split("-");
    return `${checkIsDateFormatCorrect(parts[2] || "")}${checkIsDateFormatCorrect(parts[1] || "")}${parts[0] || ""}`;
  };
  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-6 flex">
      <div className="pr-5 ">
        <span className="text-5xl ">
          <LuGraduationCap className="bg-gray-100 p-2 rounded-full border border-gray-400 text-gray-600" />
        </span>
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div style={{width: isFromProfilePage && "40rem" || ""}}><h3 className="text-xl font-semibold text-gray-800">{university}</h3></div>
            <div className="d-flex gap-6">
              <button onClick={onDelete} className="text-grey-700 text-xl">
                <MdDeleteOutline />
              </button>
              {isFromProfilePage && (
                <button onClick={onEdit} className="text-grey-700 text-xl">
                  <MdEditNote />
                </button>
              )}
            </div>
          </div>
          <span className="text-gray-600 flex">
            {courseName} : {experienceSummary}
          </span>
          <span className="text-gray-500 text-sm">
            {(startDate && formatDate(startDate)) || ""} -{" "}
            {isStillStudyHere ? "Still Present" : (endDate && formatDate(endDate)) || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
