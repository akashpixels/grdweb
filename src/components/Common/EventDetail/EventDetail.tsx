/* eslint-disable max-len */
import React from "react";
import eventName from "assets/event-name.png";
import networkingevent1 from "../../../assets/networking-event1.png";
import networkingevent2 from "../../../assets/networking-event2.png";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import Slider from "react-slick";
import Button from "../Button/Button";

interface JobDetailProps {
  job: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
  };
  onClose: () => void;
}

const settings = {
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 2,
  slidesToScroll: 1,
};
const EventDetail: React.FC<JobDetailProps> = ({ job, onClose }) => {
  return (
    <div
      className="fixed top-0 right-0 h-full w-1/2
    md:w-2/5 bg-white shadow-xl z-50 p-6 rounded-2xl overflow-y-scroll custom-scroll"
    >
      <div className="flex">
        <img src={eventName} alt="event-name" className="h-20	w-20 rounded-lg" />
        <div className="ms-4">
          <h1 className="text-3xl font-semibold ">{job.title}</h1>
          <p className="text-inherit font-medium text-sm">Exploring the Future of Technology</p>
          <button onClick={onClose} className="text-black"></button>
        </div>
      </div>
      <div className="text-sm py-2 mt-4 ">
        <p>{job.description}</p>
      </div>
      <div className="flex justify-between	mt-2">
        <div className="flex items-center	">
          <CiCalendarDate />
          <span className="ms-2 text-sm">{job.date}</span>
        </div>
        <div className="flex items-center	">
          <FaRegClock />
          <span className="ms-2 text-sm">{job.time}</span>
        </div>
        <div className="flex items-center	">
          <SlLocationPin />
          <span className="text-blue-700 font-medium ms-2 text-sm">{job.location}</span>
        </div>
      </div>
      <div className="flex justify-start mt-6">
        {/* <div className="bg-black rounded-lg px-20 py-3 text-amber-400 text-sm"> */}
        {/* <button>Mark as Going</button> */}
        <Button
          className="bg-black border w-1/2 hover:border-custom-secondary text-custom-secondary hover:bg-transparent"
          onClick={() => alert("Hello")}
        >
          Mark as Going
        </Button>
        {/* </div> */}
        <div className="border-2 border-amber-400 rounded-lg text-amber-400 text-xl px-3  ms-2 flex items-center">
          <CiBookmark />
        </div>
      </div>
      <div className="mt-4 ">
        <Slider {...settings}>
          <div className="p-2">
            <img src={networkingevent1} alt="networking event 1" className="h-80 w-80 rounded-lg" />
          </div>
          <div className="p-2">
            <img src={networkingevent2} alt="networking event 2" className="h-80 w-80 rounded-lg" />
          </div>
          <div className="p-2">
            <img src={networkingevent1} alt="networking event 1" className="h-80 w-80 rounded-lg" />
          </div>
          <div className="p-2">
            <img src={networkingevent2} alt="networking event 2" className="h-80 w-80 rounded-lg" />
          </div>
        </Slider>
        <div className="text-sm py-2 mt-4">
          <p>
            Join us at Tech Trends 2024 to explore the cutting-edge advancements in technology. This
            event brings together industry leaders, innovators, and tech enthusiasts to discuss the
            latest trends and future directions in technology. From AI and machine learning to
            blockchain and cybersecurity, Tech Trends 2024 covers it all.
          </p>
        </div>
        <div className="mt-4">
          <h5 className="text-2xl font-semibold mb-2">Event Agenda</h5>
          <div>
            <div className="flex gap-6">
              <p>10:00 AM - 10:30 AM</p>
              <p>Registration and Networking Breakfast</p>
            </div>
            <div className="flex gap-6">
              <p>10:00 AM - 10:30 AM</p>
              <p>Keynote Speech by Dr. Jane Doe on &quot;The Future of AI&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
