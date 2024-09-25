/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { CiBookmark, CiTimer } from "react-icons/ci";
import { FaRegClock, FaBookmark } from "react-icons/fa6";
import { LuCircleDollarSign } from "react-icons/lu";
import { IJobList } from "interface/Server/jobs";
import { bookmarkJob, fetchJobList, getAppliedJobs } from "api/services/jobs.api";
import { useAppDispatch } from "hooks/reduxHooks";
import { showToast } from "utils/toastUtils";
import { getJobList } from "store/Slices/api.slice";
import { convertToISO, timeUntilJobPosted } from "utils";
import ImageWithFallback from "../Image/ImageFallBack";
import Modal from "../Modal/NormalModel/Modal";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "utils/constant";
import Button from "../Button/Button";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Cookies from "js-cookie";

interface JobDetailProps {
  job: IJobList;
  onClose: () => void;
  applyModal?: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onClose }) => {
  const dispatch = useAppDispatch();
  const { userId } = getUserIsSubscribe();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [bookmarkEnable, setBookmarkEnable] = useState<boolean>(job.isBookMarked);
  const [urlLinks, setUrlLinks] = useState<string>("");
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const {
    jobTitle,
    jobDescription,
    postedDate,
    salary,
    jobId,
    companyLogo,
    jobAvailability,
    redirectedUrl,
    companyName,
    expiryDate,
  } = job;

  // Check if the job is already applied
  useEffect(() => {
    const appliedJobs = JSON.parse(Cookies.get("appliedJobs") || "[]");
    if (appliedJobs.includes(jobId)) {
      setIsApplied(true);
    }
  }, [jobId]);

  const handleApplyClick = () => {
    if (redirectedUrl) {
      window.open(redirectedUrl, "_blank");
    }
  };

  const handleBookMarkJob = (jobId: number) => {
    setBookmarkEnable(!bookmarkEnable);
    bookmarkJob(jobId, userId)
      .then(() => {
        fetchJobList(userId, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)
          .then((res) => {
            dispatch(getJobList(res));
          })
          .catch((err) => console.error(err));
        showToast(
          "success",
          bookmarkEnable ? "Job removed, successfully." : "Job saved, successfully."
        );
      })
      .catch((err) => {
        showToast("error", "Please try again.");
        console.error(err);
      });
  };

  const handleShareJob = () => {
    const jobLink = `${window.location.href}?id=${jobId}`;
    setUrlLinks(jobLink);
    setShowSharePopup(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlLinks).then(() => {
      showToast("success", "Link copied to clipboard!");
      setShowSharePopup(false);
    });
  };

  const handleApplyJob = () => {
    getAppliedJobs(jobId, userId)
      .then(() => {
        showToast("success", "Mark as Applied job successfully.");
      })
      .catch(() => {
        showToast("error", "Please try again.");
      });

    const appliedJobs = JSON.parse(Cookies.get("appliedJobs") || "[]");

    // Add jobId to the array and update localStorage
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      Cookies.set("appliedJobs", JSON.stringify(appliedJobs));
      setIsApplied(true);
    } else {
      showToast("error", "Job is already marked as applied.");
    }
  };

  return (
    <div className="h-full z-50 md:py-6 rounded-l-2xl overflow-y-scroll custom-scroll">
      <button onClick={onClose} className="text-black"></button>
      <div className="flex flex-col gap-6">
        <ImageWithFallback src={companyLogo} alt={jobTitle ?? ""} classValue="w-10 h-10" />
        <div>
          <h1 className="text-xl font-semibold mb-2">{jobTitle}</h1>
          <h1 className="text-md font-semibold">
            <small className="text-gray-500">by</small> ( {companyName} )
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-500 font-semibold text-sm flex items-center">
            <span>
              <FaRegClock />
            </span>
            <span className="ms-2">{timeUntilJobPosted(postedDate)}</span>
          </p>
          <p className="text-gray-500 font-semibold text-sm flex items-center">
            <span>
              <FaRegClock />
            </span>
            <span className="ms-2">{jobAvailability}</span>
          </p>
          <p className="text-gray-500 font-semibold text-sm flex items-center">
            <span>
              <CiTimer />
            </span>
            <span className="ms-2">{convertToISO(expiryDate)}</span>
          </p>
          {salary && salary !== "null" ? (
            <p className="text-gray-500 font-semibold text-sm flex items-center">
              <LuCircleDollarSign />
              <span className="ms-2">{`${salary}`}</span>
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-12 items-center gap-3">
          <div className="bg-custom-primary rounded-lg px-3 py-3.5 text-custom-secondary hover:bg-transparent border border-custom-secondary text-sm col-span-6 h-full text-center">
            <button onClick={handleApplyClick} title="Apply for job">
              Apply
            </button>
          </div>
          <div className="col-span-6 flex">
            <button
              className="flex w-full gap-2 rounded-lg px-5 py-3 justify-center text-custom-secondary col-span-6 border-custom-secondary text-sm items-center border-2"
              onClick={handleShareJob}
              title="Share job with other"
            >
              <span>Share</span>
            </button>
          </div>
          <div className="col-span-10 flex">
            <button
              className="flex w-full gap-2 rounded-lg px-5 py-3 justify-center text-custom-secondary bg-custom-primary hover:bg-transparent text-sm items-center border-2"
              onClick={handleApplyJob}
              title="Make as Applied"
              disabled={isApplied} // Disable if already applied
            >
              <span>{isApplied ? "Applied" : "Mark as Applied"}</span>
            </button>
          </div>
          <button
            className="col-span-2 border-2 flex justify-center border-amber-400 rounded-lg text-amber-400 text-xl px-2 py-3"
            onClick={() => handleBookMarkJob(jobId)}
            title="Save job for letter"
          >
            {bookmarkEnable ? <FaBookmark /> : <CiBookmark />}
          </button>
        </div>
        <div
          className="overflow-y-scroll custom-scroll text-xs job-posting"
          dangerouslySetInnerHTML={{ __html: jobDescription }}
        ></div>
      </div>

      {showSharePopup && (
        <Modal
          isOpen={showSharePopup}
          onClose={() => setShowSharePopup(false)}
          className="w-[90%] md:w-2/5 lg:2/5"
        >
          <div className="flex flex-col gap-3 items-center w-50 p-5">
            <p className="text-sm">Share this job link:</p>
            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={handleCopyLink}
                className="hover:text-custom-primary hover:bg-transparent text-white"
              >
                Copy Link
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobDetail;
