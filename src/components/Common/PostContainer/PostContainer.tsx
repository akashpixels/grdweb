/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import PostCard from "../Card/PostCard";
import JobDetail from "../JobDetail/JobDetail";
import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";
import { IJobList } from "interface/Server/jobs";
import { IoFilter } from "react-icons/io5";
import BottomSlideIn from "../Modal/BottomModel/BottomSlideIn";
import SideModal from "../Modal/SideModal.tsx/SideModal";
import ApplyJobForm from "components/Main/Jobs/ApplyJobForm";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getJobPageNumber } from "store/Slices/job.slice";

const PostContainer = (props: any) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.job.pageJobIndex);
  const [selectedJob, setSelectedJob] = useState<IJobList | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<IJobList[]>(props.jobList);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [isApplyJobOpen, setIsApplyJobOpen] = useState<boolean>(false);

  /** Model Open */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDesktopModelOpen, setIsDesktopModelOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const results = props?.jobList?.filter(
      (event: IJobList) =>
        event.jobTitle?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        event.jobDescription?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredEvents(results);
    if (results && results?.length > 0 && id) {
      const selectedJob = results.find((jobDetails: { jobId: string }) => jobDetails.jobId == id);
      handlePostClick(selectedJob);
    }

    return () => {
      dispatch(getJobPageNumber(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, props]);

  const handlePostClick = (job: IJobList) => {
    setSelectedJob(job);
    setIsDesktopModelOpen(true);
    openModal();
  };

  const openApplyJobModal = () => {
    setIsOpen(false);
    setIsApplyJobOpen(true);
  };

  const handleSearch = () => {
    setSearchQuery(pendingSearchQuery);
    props.handleChange(pendingSearchQuery);
  };
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative h-full rounded-2xl ">
      <div className="flex pb-6">
        <div className="flex justify-between gap-4 lg:gap-8 items-center relative w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by Company or any job keyword"
              className="p-3 w-full text-gray-700 pl-12 border rounded-xl shadow-md"
              value={props.searchDataValue}
              onChange={(e) => {
                setPendingSearchQuery(e.target.value);
                props.setSearchValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute left-3 top-3 text-2xl">
              <CiSearch />
            </span>
          </div>
          <Button
            bgColor="bg-black"
            onClick={() => props.openModal && props.openModal()}
            className="text-custom-secondary shadow-md hidden"
          >
            <IoFilter className="text-white" />
          </Button>
          <Button
            bgColor="bg-black"
            onClick={handleSearch}
            className="text-custom-secondary shadow-md flex"
          >
            <span className="lg:hidden">
              <CiSearch className="text-xl" />
            </span>
            <span className="hidden lg:block">Search</span>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 ">
        {filteredEvents?.length ? (
          filteredEvents.map((jobDetails, key) => {
            const {
              jobTitle,
              jobDescription,
              jobType,
              postedDate,
              salary,
              companyLogo,
              status,
              feedback,
              jobAvailability,
              companyName,
              location,
            } = jobDetails;

            return (
              <PostCard
                key={key}
                img={companyLogo}
                posthead={jobTitle ?? ""}
                postdescription={jobDescription}
                period={postedDate ?? ""}
                price={`${salary}`}
                workoption={jobType}
                onClick={() => handlePostClick(jobDetails)}
                jobStatus={status ?? ""}
                isApplied={props?.isApplied}
                feedback={feedback}
                jobAvailability={jobAvailability}
                companyName={companyName}
                location={location}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center">No Jobs Found</div>
        )}
      </div>
      <Items currentItems={currentPage} />
      <div className="flex lg:hidden">
        {selectedJob && (
          <BottomSlideIn isOpen={isOpen} onClose={closeModal}>
            <JobDetail
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              applyModal={openApplyJobModal}
            />
          </BottomSlideIn>
        )}
      </div>
      <div className="hidden lg:flex">
        {selectedJob && !props.isApplied && (
          <SideModal isOpen={isDesktopModelOpen} onClose={() => setIsDesktopModelOpen(false)}>
            <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
          </SideModal>
        )}
      </div>
      <div className="flex lg:hidden">
        {selectedJob && !props.isApplied && (
          <BottomSlideIn isOpen={isApplyJobOpen} onClose={() => setIsApplyJobOpen(false)}>
            <ApplyJobForm selectedJob={selectedJob} />
          </BottomSlideIn>
        )}
      </div>
    </div>
  );
};

export default PostContainer;

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems.length
        ? currentItems?.map((item: any) => (
            <div key={item}>
              <h3>Item #{item}</h3>
            </div>
          ))
        : null}
    </>
  );
}
