import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Sidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="w-1/4 p-6 bg-white rounded-xl shadow-md h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold">Filters</h3>
        <p className="text-custom-dark-orange text-sm">Clear</p>
      </div>

      <div className="mb-8">
        <label className="block text-gray-700 font-semibold">Location</label>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2.5 mt-2.5 w-full text-gray-700 pl-12 border rounded-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-5 text-2xl">
            <CiSearch />
          </span>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-gray-700 font-semibold">Date</label>
        <input type="date" className="mt-3 p-2 w-full border rounded-lg shadow-sm" />
      </div>
      <div>
        <h4 className="text-lg font-semibold">Type</h4>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="type" value="best-matches" />
            <span className="ml-2">Best Matches</span>
          </label>
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="type" value="saved-jobs" />
            <span className="ml-2">Saved Jobs</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
