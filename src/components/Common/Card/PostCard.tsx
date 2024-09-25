/* eslint-disable max-len */
import React, { useState } from "react";
import { FaRegClock, FaLocationDot } from "react-icons/fa6";
import StepStepper from "../StepStepper/StepStepper";
import { timeUntilJobPosted } from "utils";
import ImageWithFallback from "../Image/ImageFallBack";
import DOMPurify from "dompurify";

interface PCard {
  img: string;
  posthead: string;
  postdescription: string;
  period: string;
  price?: string;
  workoption: string;
  onClick: () => void;
  isApplied: boolean;
  jobStatus: string;
  feedback: string;
  jobAvailability: string;
  companyName: string;
  location: string;
}

const stripHTML = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Function to truncate text to a specified length and add "..." if needed
const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const PostCard = ({
  img,
  posthead,
  postdescription,
  period,
  price,
  onClick,
  isApplied,
  jobStatus,
  feedback,
  companyName,
  location,
}: PCard) => {
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const plainText = stripHTML(postdescription ?? "");
  const truncatedText = truncateText(plainText, 200);
  const sanitizedText = DOMPurify.sanitize(truncatedText);

  return (
    <div
      className="border border-gray-200 cursor-pointer rounded-2xl grid gap-4 p-6 shadow-sm
      hover:border-custom-secondary bg-white"
      onClick={() => {
        onClick();
        setShowStatus(!showStatus);
      }}
    >
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3	">
          <ImageWithFallback src={img} alt={posthead} classValue="h-10 w-10" />
          <h3 className="font-semibold text-sm ps-3">
            {companyName} - {posthead}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{sanitizedText}</p>
      <div className="flex ">
        <p className="text-gray-500 font-semibold text-xs flex items-center gap-3">
          <FaRegClock className="text-lg" />
          <span className="text-sm">{timeUntilJobPosted(period)}</span>
        </p>
        {price && price !== "null" && (
          <p className="text-gray-500 font-semibold text-xs ps-20 flex items-center gap-3">
            <FaLocationDot className="text-lg" />
            <span className="text-sm">{location}</span>
          </p>
        )}
      </div>
      {showStatus && isApplied && (
        <>
          <div className="pt-4 w-full flex justify-center items-center border-t flex-col">
            <StepStepper status={jobStatus} />
            {jobStatus === "Rejected" ? (
              <div className="flex items-center">
                <span className="font-bold w-full text-start">Feedback</span>: {feedback}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
