/* eslint-disable max-len */
import React from "react";
import eventName from "assets/event-name.png";
import { CiCalendar, CiClock1, CiLocationOn, CiBookmark } from "react-icons/ci";
import Button from "components/Common/Button/Button";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  onClick: () => void; // Add the onClick prop here
}

const EventCard: React.FC<EventCardProps> = ({ title, date, time, location, description, onClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 grid grid-cols-12 gap-4 hover:border-custom-dark-orange cursor-pointer" onClick={onClick}>
      <div className="col-span-3">
        <img src={eventName} alt="event-name" />
      </div>
      <div className="col-span-9 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {/* <p className="text-xs p-1 px-2 pt-1.5 rounded-full border border-green-400 bg-green-100 text-gray-600">
            Available
          </p> */}
          <p className="bg-custom-primary text-custom-secondary p-2 rounded-lg">
            <CiBookmark className="text-xl" />
          </p>
        </div>
        <p className="text-gray-500">{description}</p>
        <div className="mt-2 flex items-center text-gray-500 font-medium gap-5">
          <div className="mr-2 flex items-center gap-2">
            <CiCalendar /> <span className="text-sm">{date}</span>
          </div>
          <div className="mr-2 flex items-center gap-2">
            <CiClock1 /> <span className="text-sm">{time}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <CiLocationOn />
            </span>
            <span className="text-blue-700 font-medium">{location}</span>
          </div>
          <div>
            <Button
              className="border border-custom-secondary text-custom-secondary hover:bg-transparent"
              bgColor="bg-[#FFF8EB]"
              onClick={() => alert("heloo")}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
