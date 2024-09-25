/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "components/Common/Button/Button";
import { IoSchoolOutline } from "react-icons/io5";

export interface IChartCourse {
  title: string;
  subTitle: string;
  description: string;
  topics: string[];
  subDescription: string;
  buttonText: string;
  backgroundColor: string;
  mainImage: string;
}

const CourseCard = ({ chartData }: any) => {
  const {
    title,
    subTitle,
    description,
    topics,
    subDescription,
    buttonText,
    backgroundColor,
    mainImage,
    hatImg,
  } = chartData;
  return (
    <div
      className={`rounded-2xl p-5 mb-24 background-image ${backgroundColor}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 flex justify-center xs:h-56">
          <img src={mainImage} alt="female" className="w-40 md:w-auto" />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col justify-end text-center md:text-start">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <p
            className={` text-2xl font-medium mb-6 ${
              title == "The Dreamer" ? "text-gray-600" : "text-white"
            }`}
          >
            {subTitle}
          </p>
          <p className="mb-5">{description}</p>
          <div className="grid grid-cols-2 gap-6">
            {topics?.map((items: any, index: number) => {
              return (
                <div
                  className="col-span-2 md:col-span-1 flex gap-4 items-center font-bold justify-center md:justify-start"
                  key={index}
                >
                  <span className="text-2xl">
                    <IoSchoolOutline />
                  </span>
                  <span>{items}</span>
                </div>
              );
            })}
          </div>
          <p className="my-5">{subDescription}</p>
          <div className="flex justify-center lg:justify-between items-center">
            <Button onClick={() => alert("Hell")} className="text-white">
              {buttonText}
            </Button>
            <span className="md:mr-6 hidden lg:flex">
              <img src={hatImg} alt="hat" width={80} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
