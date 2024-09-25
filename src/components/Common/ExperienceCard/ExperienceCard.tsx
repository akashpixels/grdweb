import React from "react";
import { BriefCase } from "../Icons/Icon";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";

export interface ExperienceCardProps {
  companyName: string;
  endDate: string;
  startDate: string;
  experienceSummary: string;
  position: string;
  isStillWorkHere: boolean;
  onDelete: () => void;
  onEdit?: () => void;
  isFromProfilePage?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  companyName,
  endDate,
  startDate,
  experienceSummary,
  position,
  isStillWorkHere,
  onDelete,
  onEdit,
  isFromProfilePage,
}) => {
  const checkIsDateFormatCorrect = (date: string | undefined) => {
    return date && date !== "" ? `${date}-` : "";
  };

  const formatDate = (date: string) => {
    const parts = date.split("-");
    return `${checkIsDateFormatCorrect(parts[2] || "")}${checkIsDateFormatCorrect(parts[1] || "")}${
      parts[0] || ""
    }`;
  };
  return (
    <div className="border border-gray-300 rounded-lg p-6 flex">
      <div className="pr-5">
        <span className="bg-gray-500">
          <BriefCase />
        </span>
      </div>
      <div className="flex-1">
        <div className="flex flex-col mb-4 w-full">
          <div className="flex justify-between items-center">
            <div style={{ width: (isFromProfilePage && "40rem") || "" }}>
              {" "}
              <h3 className="text-xl font-semibold text-gray-800">{position}</h3>{" "}
            </div>
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

          <span className="text-gray-600">{companyName}</span>
          <span className="text-gray-500 text-sm">
            {(startDate && formatDate(startDate)) || ""} -{" "}
            {isStillWorkHere ? "Still Present" : (endDate && formatDate(endDate)) || ""}
          </span>
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-700">Summary:</h4>
          <p className="text-gray-600">{experienceSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
