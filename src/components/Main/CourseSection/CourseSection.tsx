/* eslint-disable max-len */
import Heading from "components/Common/Heading/Heading";
import React from "react";

import CourseCard from "components/Common/Card/CourseCard";
import { chartCourses } from "Json/course";

const CourseSection = () => {
  return (
    <div className="py-12 xl:p-12 mx-5 md:mx-10 ">
      <Heading
        textColor="text-custom-secondary"
        borderColor="border-custom-secondary"
        text="Chart Your Course"
      />
      <p className="text-xl text-custom-white my-8 text-center">
        Every journey has its chapters. Choose yours and turn the page to a new beginning in the UK.
      </p>
      <div className="lg:px-10 vector-background-image md:py-16 xl:m-20">
        {chartCourses?.map((chart, index) => {
          return (
            <div key={index}>
              <CourseCard chartData={chart} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSection;
