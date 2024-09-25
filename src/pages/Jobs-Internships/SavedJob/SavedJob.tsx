/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { savedJobList } from "api/services/jobs.api";
import { getUserIsSubscribe } from "api/services/localServices.service";
import PostContainer from "components/Common/PostContainer/PostContainer";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getSavedJobs } from "store/Slices/api.slice";
import { getJobPageNumber } from "store/Slices/job.slice";
import { DEFAULT_PAGE_SIZE } from "utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeviceType } from "../AppliedJob/AppliedJob";
import { FaAngleRight, FaChevronLeft } from "react-icons/fa6";
import FilterContainer from "components/Common/FilterContainer/FilterContainer";
import BottomSlideIn from "components/Common/Modal/BottomModel/BottomSlideIn";
import { getSponsoredJobList } from "store/Slices/api.slice";
import debounce from "lodash.debounce";
import { filterJobListing } from "api/services/jobs.api";

export interface SelectedFilters {
  availability: string;
  jobyoumightlike: string;
  salaryMin: number | string;
  salaryMax: number | string;
  industry: string;
  graduateProgram: string;
  keywords: string;
  pageSize: number;
  pageNo: number;
}

const SavedJob = () => {
  const dispatch = useAppDispatch();
  const savedJob = useAppSelector((state) => state.api.saveJob);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useDeviceType();
  const { userId } = getUserIsSubscribe();

  // Extract the page number from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);

  const [searchValue, setSearchValue] = useState<string>("");
  const [range, setRange] = useState([10, 500]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [searchDataValue, setSearchDataValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    availability: "",
    jobyoumightlike: "",
    salaryMin: 0,
    salaryMax: 0,
    industry: "",
    keywords: "",
    graduateProgram: "",
    pageSize: 10,
    pageNo: initialPage,
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Fetch the job list based on the current page index
    setLoading(true);
    if (!searchDataValue) {
      if (userId) {
        savedJobList(userId, pageIndex, DEFAULT_PAGE_SIZE)
          .then((res) => {
            dispatch(getSavedJobs(res));
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }
    } else {
      const searchData = {
        ...selectedFilters,
        keywords: searchDataValue,
      };

      handleSearch(searchData);
    }

    // Update the URL with the current page number
    queryParams.set("page", pageIndex.toString());
    navigate(`?${queryParams.toString()}`, { replace: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = debounce((newRange: any) => {
    setRange(newRange);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      salaryMin: newRange[0] === 10 && newRange[1] === 500 ? 0 : newRange[0],
      salaryMax: newRange[0] === 10 && newRange[1] === 500 ? 0 : newRange[1],
    }));

    handleSearch({
      ...selectedFilters,
      salaryMin: newRange[0] === 10 && newRange[1] === 500 ? 0 : newRange[0],
      salaryMax: newRange[0] === 10 && newRange[1] === 500 ? 0 : newRange[1],
    });
  }, 300);

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchData = {
        ...selectedFilters,
        keywords: searchDataValue,
      };
      handleSearch(searchData, 1);
    }
  };

  const handleCheckboxChange = (name: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    handleSearch({
      ...selectedFilters,
      [name]: value,
    });
  };

  const handleSearchChange = (value: string) => {
    // Update query parameter to page=1
    queryParams.set("page", "1");
    navigate(`?${queryParams.toString()}`, { replace: true });
    const searchData = {
      ...selectedFilters,
      keywords: value,
    };

    handleSearch(searchData, 1);
    setPageIndex(1);
  };

  const handleSearch = (value?: SelectedFilters, pageNumber?: number) => {
    setLoading(true);
    const filterData = value
      ? { ...value, location: searchValue, pageNo: pageNumber ?? pageIndex }
      : { ...selectedFilters, location: searchValue, pageNo: pageNumber ?? pageIndex };
    filterJobListing(filterData).then((results) => {
      dispatch(getSponsoredJobList(results));
      setLoading(false);
    });
  };

  const handleClearFilters = () => {
    const initialFilters: SelectedFilters = {
      availability: "",
      jobyoumightlike: "",
      salaryMin: 0,
      salaryMax: 0,
      industry: "",
      keywords: "",
      graduateProgram: "",
      pageSize: 10,
      pageNo: 1,
    };
    setSearchValue("");
    setRange([10, 500]);
    setSelectedFilters(initialFilters);
    handleSearch(initialFilters);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    const updatedPageIndex = selectedItem.selected + 1;

    setPageIndex(updatedPageIndex);
    dispatch(getJobPageNumber(updatedPageIndex));

    queryParams.set("page", updatedPageIndex.toString());
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const ITEMS_PER_PAGE = 10;
  const pageCount = Math.ceil(savedJob?.totalRecord / ITEMS_PER_PAGE);

  return (
    <div className="flex-1 overflow-y-scroll custom-scroll mb-2">
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-12 h-full overflow-y-scroll custom-scroll">
          {!loading && savedJob?.data ? (
            <PostContainer
              handleChange={(value: string) => handleSearchChange(value)}
              openModal={openModal}
              jobList={savedJob?.data}
              totalCount={savedJob?.totalRecord}
              setSearchValue={setSearchDataValue}
              searchDataValue={searchDataValue}
            />
          ) : (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-2xl" />{" "}
            </div>
          )}
        </div>
      </div>
      <BottomSlideIn isOpen={isOpen} onClose={closeModal}>
        <FilterContainer
          handleClearFilters={handleClearFilters}
          handleCheckboxChange={handleCheckboxChange}
          handleEnterKeyPress={handleEnterKeyPress}
          handleChange={handleChange}
          handleSearchInputChange={handleSearchInputChange}
          range={range}
          selectedFilters={selectedFilters}
          searchValue={searchValue}
        />
      </BottomSlideIn>
      {savedJob?.data?.length ? (
        <div className="flex justify-center my-4">
          <ReactPaginate
            previousLabel={!isMobile ? "Previous" : <FaChevronLeft className="my-1" />}
            nextLabel={!isMobile ? "Next" : <FaAngleRight className="my-1" />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={isMobile ? 1 : 5}
            onPageChange={handlePageClick}
            containerClassName={"flex items-center space-x-2"}
            previousClassName={"px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"}
            nextClassName={"px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"}
            breakClassName={"px-3 py-1 border rounded-md bg-gray-200"}
            pageClassName={"px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"}
            activeClassName={"bg-yellow-500 text-white"}
            forcePage={pageIndex - 1} // Force the active page to match the URL
          />
        </div>
      ) : null}
    </div>
  );
};

export default SavedJob;
