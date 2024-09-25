import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/SideBar";
import EventCard from "../EventCard/EventCard";
import { events as eventData } from "Json/event";
import { CiSearch } from "react-icons/ci";
import Button from "components/Common/Button/Button";
import EventDetail from "components/Common/EventDetail/EventDetail";

interface Job {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const UpcomingEvents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const results = eventData.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchQuery]);

  const handlePostClick = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="flex h-full flex-1">
      <Sidebar />
      <div className="w-full ml-4 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between gap-8 items-center mb-10 relative ">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by Name, Title"
              className=" p-3  w-full text-gray-700 pl-12 border rounded-xl shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-2xl">
              <CiSearch />
            </span>
          </div>
          <Button
            bgColor="bg-black"
            onClick={(e) => setSearchQuery(e.target.value)}
            className="text-custom-secondary shadow-md"
          >
            Search
          </Button>
        </div>
        {filteredEvents?.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
            onClick={() => handlePostClick(event)}
          />
        ))}
      </div>
      {selectedJob && (
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSelectedJob(null)}
          ></div>
          <EventDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
