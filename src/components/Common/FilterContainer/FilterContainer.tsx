/* eslint-disable no-unused-vars */
import React from "react";
import SearchInput from "../Input/SearchInput";
import CheckboxInput from "../Input/CheckboxInput";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { SelectedFilters } from "pages/Jobs-Internships/AllJob/AllJob";

interface FilterContainerProps {
  searchValue: string;
  range: number[];
  selectedFilters: SelectedFilters;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (name: keyof SelectedFilters, value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (newRange: any) => void;
  handleClearFilters: () => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  searchValue,
  range,
  selectedFilters,
  handleSearchInputChange,
  handleEnterKeyPress,
  handleCheckboxChange,
  handleChange,
  handleClearFilters,
}) => {
  return (
    <div className="bg-white lg:shadow-xl rounded-2xl p-6 h-full w-full">
      <div className="flex justify-between">
        <h4 className="font-semibold">Filters</h4>
        <p className="text-custom-secondary cursor-pointer" onClick={handleClearFilters}>
          Clear
        </p>
      </div>
      <div className="my-6">
        <h6 className="font-medium pb-2">Location</h6>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInputChange}
          onKeyPress={handleEnterKeyPress}
        />
      </div>
      <CheckboxInput
        name="graduateProgram"
        label="Graduate Program"
        checked={selectedFilters.graduateProgram === "graduateProgram"}
        onChange={(checked) =>
          handleCheckboxChange("graduateProgram", checked ? "graduateProgram" : "")
        }
      />
      <div className="overflow-y-scroll custom-scroll">
        <div className="my-4">
          <h6 className="font-medium pb-2">Jobs You Might Like</h6>
          <CheckboxInput
            name="jobyoumightlike"
            label="Best Matches"
            checked={selectedFilters.jobyoumightlike === "Best Matches"}
            onChange={(checked) =>
              handleCheckboxChange("jobyoumightlike", checked ? "Best Matches" : "")
            }
          />
          <CheckboxInput
            name="jobyoumightlike"
            label="Most Recent"
            checked={selectedFilters.jobyoumightlike === "Most Recent"}
            onChange={(checked) =>
              handleCheckboxChange("jobyoumightlike", checked ? "Most Recent" : "")
            }
          />
          <CheckboxInput
            name="jobyoumightlike"
            label="Saved Jobs"
            checked={selectedFilters.jobyoumightlike === "Saved Jobs"}
            onChange={(checked) =>
              handleCheckboxChange("jobyoumightlike", checked ? "Saved Jobs" : "")
            }
          />
        </div>
        <div className="my-4">
          <h6 className="font-medium pb-2">Salary</h6>
          <div className="text-center">
            <div className="flex justify-between">
              <span className="p-1 text-sm shadow-md rounded-md border-1 mb-2 px-3 border">
                Min: ${range[0]}
              </span>
              <span className="p-1 text-sm shadow-md rounded-md border-1 mb-2 px-3 border">
                Max: ${range[1]}
              </span>
            </div>
            <Slider
              range
              min={0}
              max={500}
              defaultValue={range}
              onChange={handleChange}
              trackStyle={[{ backgroundColor: "orange" }]}
              handleStyle={[{ borderColor: "orange" }, { borderColor: "orange" }]}
              railStyle={{ backgroundColor: "lightgray" }}
            />
            <div className="flex justify-between items-center">
              <span>$10</span>
              <span>$500</span>
            </div>
          </div>
        </div>
        <div className="my-4">
          <h6 className="font-medium pb-2">Industry</h6>
          <CheckboxInput
            name="industry"
            label="Technology"
            checked={selectedFilters.industry === "Technology"}
            onChange={(checked) => handleCheckboxChange("industry", checked ? "Technology" : "")}
          />
          <CheckboxInput
            name="industry"
            label="Health Care"
            checked={selectedFilters.industry === "Health Care"}
            onChange={(checked) => handleCheckboxChange("industry", checked ? "Health Care" : "")}
          />
          <CheckboxInput
            name="industry"
            label="Saved Jobs"
            checked={selectedFilters.industry === "Saved Jobs"}
            onChange={(checked) => handleCheckboxChange("industry", checked ? "Saved Jobs" : "")}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
