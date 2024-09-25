/* eslint-disable max-len */
import React from "react";
import ApplyPanelCard from "components/Common/Card/ApplyPanelCard";
import ApplyJobForm from "components/Main/Jobs/ApplyJobForm";

const ApplyPanel: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row mt-6 pt-2 gap-6 overflow-y-scroll custom-scroll pb-6">
        <div className="w-full">
          <header className="bg-white shadow p-4 rounded-2xl mb-4">
            <h1 className="text-lg font-semibold mb-1">Applying to Marketing Intern</h1>
            <p className="text-sm text-gray-500">Submit your application</p>
          </header>
          <ApplyJobForm />
        </div>
        <div>
          <ApplyPanelCard />
        </div>
      </div>
    </div>
  );
};

export default ApplyPanel;
