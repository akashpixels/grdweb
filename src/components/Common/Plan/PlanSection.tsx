/* eslint-disable indent */
/* eslint-disable max-len */
import React from "react";
import { FaRegCircleCheck, FaRegCircleQuestion } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeIn } from "utils/variant";

interface IPlanSection {
  dreamPlan: {
    heading: string;
    subheading: string;
    highlights: string[];
    img: string;
    isImageRight: boolean;
    color: string;
  };
}

const PlanSection = ({ dreamPlan }: IPlanSection) => {
  const { heading, subheading, highlights, img, isImageRight, color } = dreamPlan;
  return (
    <div className="py-6 lg:py-12 xl:px-48 bg-custom-white grid grid-cols-12 gap-5">
      <motion.div
        variants={fadeIn("right", 0.3)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={`col-span-12 md:col-span-6 flex items-center md:items-start flex-col  text-custom-primary justify-center ${
          isImageRight ? "order-1" : "order-2"
        }`}
      >
        <p className="text-2xl font-bold mb-2">{heading}</p>
        <p className="font-medium">{subheading}</p>
        <div className="px-4 mt-6">
          {highlights?.map((item, index) => {
            return (
              <div className="flex items-center gap-4 mb-3" key={index}>
                <span>
                  {isImageRight ? (
                    <FaRegCircleCheck className={`text-xl ${color}`} />
                  ) : (
                    <FaRegCircleQuestion className={`text-xl ${color}`} />
                  )}
                </span>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.3)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={`col-span-12 md:col-span-6 xs:h-56 
          flex justify-center  items-center ${
            isImageRight ? "order-2 md:justify-end" : "order-1 md:justify-start"
          }`}
      >
        <img src={img} alt="dreamerplan" className="lg:w-96" />
      </motion.div>
    </div>
  );
};

export default PlanSection;
