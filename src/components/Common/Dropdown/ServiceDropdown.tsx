/* eslint-disable max-len */
import React from "react";
import { IoSchoolOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { serviceData } from "Json/dropdown";

interface IServiceDropdown {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceDropdown = ({ setIsDropdownOpen, setIsOpen }: IServiceDropdown) => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(link);
    setIsDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <div
      className="lg:w-max p-3 sm:p-6 lg:absolute top-12 text-gray-900 left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-medium"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="mb-5">
        <p className="text-custom-primary font-semibold">Our Services</p>
        <p className="text-gray-500">
          <small>Tailored every stage of your UK Journey</small>
        </p>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row">
        {serviceData.map((item, index) => {
          const { title, description, buttonText, link, bgColor, buttonColor, img } = item;
          return (
            <div
              key={index}
              className="lg:w-[19rem] bg-custom-white col-span-12 md:col-span-4 text-center border rounded-xl p-4 shadow-xl border-gray-400"
            >
              <div className={`${bgColor} rounded flex items-center p-2 gap-6 mb-4`}>
                <span className="text-3xl">
                  <IoSchoolOutline />
                </span>
                <p className="text-xl font-bold">{title}</p>
              </div>

              <p className="text-start text-gray-500 mb-4" style={{ lineHeight: "16px" }}>
                <small>{description}</small>
              </p>
              <div className="flex justify-center mb-5">
                <img src={img} alt="dreamer" className="rounded-xl" />
              </div>

              <Button
                onClick={() => handleClick(link)}
                className={`w-full ${buttonColor}`}
                bgColor={buttonColor}
              >
                {buttonText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceDropdown;
