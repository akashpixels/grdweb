/* eslint-disable max-len */
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { showToast } from "utils/toastUtils";

export interface IDoctorDetails {
  doctorDetails: {
    img: string;
    name: string;
    title: string;
    details: string;
    experience: string;
    reviews: number;
    timings: string[];
  };
  // eslint-disable-next-line no-unused-vars
  handleConfirm: (time: string) => void;
}

const CounsellingDoctorData = ({ doctorDetails, handleConfirm }: IDoctorDetails) => {
  const { img, name, title, details, experience, reviews, timings } = doctorDetails;
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null);

  const handleBookAppointment = () => {
    if (selectedTiming) {
      handleConfirm(selectedTiming);
    } else {
      showToast("error", "Please select a timing.");
    }
  };
  return (
    <div className=" cursor-pointer overflow-y-scroll custom-scroll">
      <div className="flex gap-6 mb-6">
        <div>
          <img src={img} alt="" width={50} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>

      <p className="text-gray-500 text-sm">{details}</p>

      <p className="text-gray-500 flex items-center gap-3 font-medium my-4">
        <IoMdTime className="text-2xl" /> {experience}
      </p>

      <p className="text-gray-500 flex items-center gap-3 font-medium my-4">
        <CiStar className="text-2xl" /> 5.0{" "}
        <span className="text-gray-300 font-normal">{reviews} Reviews</span>
      </p>
      <div className="grid grid-cols-2 my-6 gap-3">
        {timings.map((item, key) => {
          const isSelected = selectedTiming === item;
          return (
            <p
              key={key}
              onClick={() => setSelectedTiming(isSelected ? null : item)}
              className={`p-3 border shadow-inner rounded-md text-center font-semibold ${
                isSelected
                  ? "bg-[#FFF3E0] border-custom-secondary"
                  : "hover:border-custom-secondary hover:bg-[#FFF3E0]"
              }`}
            >
              {item}
            </p>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleBookAppointment}
          className=" border px-6 py-3 flex-1 font-medium text-custom-secondary bg-custom-primary rounded-md hover:bg-white hover:text-custom-primary border-custom-primary"
        >
          Book Appointment
        </button>
        <span className="text-xl border-2 p-2.5 py-3 border-custom-secondary text-custom-secondary rounded-lg">
          <FaRegBookmark />
        </span>
      </div>
      <p className="mt-6 text-gray-500">
        Dr. Emily Johnson believes in a personalized approach to mental health, drawing on extensive
        clinical experience and the latest research to support her clients journeys toward wellness.
        Approach
      </p>
      <h3 className="text-xl font-semibold my-2">Approach</h3>
      <p className="text-gray-500">
        I use a combination of cognitive-behavioral therapy and mindfulness to address individual
        patient needs, fostering an environment of growth and healing.
      </p>
    </div>
  );
};

export default CounsellingDoctorData;
