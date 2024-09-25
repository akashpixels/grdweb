/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import avatar from "assets/Avatar (1).png";
import { IoMdTime } from "react-icons/io";
import { CiStar, CiSearch } from "react-icons/ci";
import Button from "components/Common/Button/Button";
import SideModal from "components/Common/Modal/SideModal.tsx/SideModal";
import CounsellingDoctorData from "../CounsellingDoctorData";

const doctors = [
  {
    img: avatar,
    name: "Dr. Rahul Mehra",
    title: "PhD, Psychologist",
    details: "Stress Management, Anxiety Disorders, Cognitive Behavioral Therapy (CBT)",
    experience: "5 years",
    reviews: 12,
    timings: ["9.00 AM", "10.00 AM", "11.00 AM", "12.00 AM", "01.00 AM"],
  },
  {
    img: avatar,
    name: "Dr. Ananya Sharma",
    title: "PhD, Psychologist",
    details: "Stress Management, Anxiety Disorders, Cognitive Behavioral Therapy (CBT)",
    experience: "5 years",
    reviews: 12,
    timings: ["9.00 AM", "10.00 AM", "11.00 AM", "12.00 AM", "01.00 AM"],
  },
  // Add more doctors as needed
];

// eslint-disable-next-line no-unused-vars
const AppointmentSection: React.FC<{ addBooking: (booking: any) => void }> = ({ addBooking }) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line no-unused-vars
  const handleBook = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleConfirm = (time: string) => {
    if (selectedDoctor) {
      const booking = {
        doctor: selectedDoctor,
        time: `${date} ${time}`,
      };
      addBooking(booking);
    }
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeMenu = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu); // Listen for clicks outside the dropdown

    return () => {
      document.removeEventListener("mousedown", closeMenu); // Clean up event listener
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Book an Appointment</h2>

      <div className="flex justify-between gap-8 items-center mb-10 relative ">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by Name, Title"
            className=" p-3  w-full text-gray-700 pl-12 border rounded-xl shadow-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Add onChange handler
          />
          <span className="absolute left-3 top-3 text-2xl">
            <CiSearch />
          </span>
        </div>

        <Button
          bgColor="bg-black"
          onClick={(e) => setSearch(e.target.value)}
          className="text-custom-secondary shadow-md"
        >
          Search
        </Button>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex items-center font-semibold text-gray-600">25 counsellors</div>
        <div>
          <input
            type="date"
            className="border rounded-xl p-3 mb-4 w-full text-gray-700 hover:border-custom-secondary cursor-pointer"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {doctors
          .filter(
            (doctor) =>
              doctor.name.toLowerCase().includes(search.toLowerCase()) ||
              doctor.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((doctor, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer "
              onClick={() => handleBook(doctor)}
            >
              <div className="flex gap-6 mb-3">
                <div>
                  <img src={doctor.img} alt="" width={50} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-gray-500 text-sm">{doctor.title}</p>
                </div>
              </div>

              <p className="text-gray-700 ">{doctor.details}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 my-6 gap-3">
                {doctor?.timings.map((item, key) => {
                  return (
                    <p
                      key={key}
                      className="p-3 border shadow-inner rounded-md text-center font-semibold text-gray-600 hover:border-custom-secondary"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
              <div className="flex gap-4 my-3 border-t pt-4">
                <p className="text-gray-500 flex items-center gap-2 font-semibold">
                  <IoMdTime /> {doctor.experience}
                </p>
                <p className="text-gray-500 flex items-center gap-2 font-semibold">
                  <CiStar /> 5.0{" "}
                  <span className="text-gray-300 font-normal">{doctor.reviews} Reviews</span>
                </p>
              </div>
            </div>
          ))}
      </div>
      <SideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CounsellingDoctorData doctorDetails={doctors[0]} handleConfirm={handleConfirm} />
      </SideModal>
    </div>
  );
};

export default AppointmentSection;
