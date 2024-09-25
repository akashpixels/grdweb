import React from "react";

interface TabsProps {
  currentTab: string;
  // eslint-disable-next-line no-unused-vars
  setCurrentTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex space-x-4">
      {["Upcoming Events", "Saved", "My Bookings"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded ${
            currentTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
