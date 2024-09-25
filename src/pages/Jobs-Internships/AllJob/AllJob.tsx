/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import FilterContainer from "components/Common/FilterContainer/FilterContainer";
import PostContainer from "components/Common/PostContainer/PostContainer";
import BottomSlideIn from "components/Common/Modal/BottomModel/BottomSlideIn";
import { fetchJobList } from "api/services/jobs.api";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getJobList } from "store/Slices/api.slice";
import debounce from "lodash.debounce";
import { filterJobListing } from "api/services/jobs.api";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "utils/constant";
import { getUserIsSubscribe } from "api/services/localServices.service";

export interface SelectedFilters {
  availability: string;
  jobyoumightlike: string;
  salaryMin: number | string;
  salaryMax: number | string;
  industry: string;
  graduateProgram: string;
  pageSize: number;
  pageNo: number;
}

const AllJob = () => {
  const dispatch = useAppDispatch();
  const { userId } = getUserIsSubscribe();
  const jobList = useAppSelector((state) => state.api.jobList);

  const [searchValue, setSearchValue] = useState<string>("");
  const [range, setRange] = useState([10, 500]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_NUMBER);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    availability: "",
    jobyoumightlike: "",
    salaryMin: 0,
    salaryMax: 0,
    industry: "",
    graduateProgram: "",
    pageSize: 10,
    pageNo: 1,
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getPageIndexJobList = (pageNumber: number) => {
    setPageIndex(pageNumber);
  };

  useEffect(() => {
    if (userId) {
      fetchJobList(userId, pageIndex, DEFAULT_PAGE_SIZE)
        .then((res) => {
          dispatch(getJobList(res));
        })
        .catch((err) => console.error(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);
  /** Filter Data */
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = debounce((newRange: any) => {
    setRange(newRange);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      salaryMin: newRange[0] == 10 && newRange[1] == 500 ? 0 : newRange[0],
      salaryMax: newRange[0] == 10 && newRange[1] == 500 ? 0 : newRange[1],
    }));

    handleSearch({
      ...selectedFilters,
      salaryMin: newRange[0] == 10 && newRange[1] == 500 ? 0 : newRange[0],
      salaryMax: newRange[0] == 10 && newRange[1] == 500 ? 0 : newRange[1],
    });
  }, 300); // Adjust debounce delay (e.g., 300 milliseconds)

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
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

  const handleSearch = (value?: SelectedFilters) => {
    const filterData = value
      ? { ...value, keywords: "", location: searchValue, pageNo: pageIndex }
      : { ...selectedFilters, keywords: "", location: searchValue, pageNo: pageIndex };
    filterJobListing(filterData).then((results) => {
      dispatch(getJobList(results));
    });
  };

  const handleClearFilters = () => {
    const initialFilters: SelectedFilters = {
      availability: "",
      jobyoumightlike: "",
      salaryMin: 0,
      salaryMax: 0,
      industry: "",
      graduateProgram: "",
      pageSize: 0,
      pageNo: 0,
    };
    setSearchValue("");
    setRange([10, 500]);
    setSelectedFilters(initialFilters);
    handleSearch(initialFilters);
  };

  return (
    <div className="flex-1 overflow-y-scroll custom-scroll mb-2">
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-12 md:col-span-3 h-full hidden lg:flex">
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
        </div>
        <div className="col-span-12 lg:col-span-9 h-full overflow-y-scroll custom-scroll">
          <PostContainer
            openModal={openModal}
            jobList={jobList?.data}
            totalCount={jobList?.totalRecord}
            pageIndexChange={getPageIndexJobList}
          />
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
    </div>
  );
};

export default AllJob;
