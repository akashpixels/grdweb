import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "utils/variant";
interface IPlan {
  title: string;
  heading: string;
  subheading: string;
  bgColor?: string;
  textColor?: string;
  titleColor?: string;
}

const PlanTitle = ({ title, heading, subheading, bgColor, textColor, titleColor }: IPlan) => {
  return (
    <div className={`text-center text-custom-white p-16 ${bgColor}`}>
      <div className="mb-8">
        <span
          className={`p-3 text-sm md:text-2xl font-semibold rounded-xl text-white ${
            titleColor || "bg-[#374151]"
          }`}
        >
          {title}
        </span>
      </div>
      <motion.h2
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={`text-3xl md:text-6xl font-bold mb-4 ${textColor}`}
      >
        {heading}
      </motion.h2>
      <motion.p
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-xl text-white"
      >
        {subheading}
      </motion.p>
    </div>
  );
};

export default PlanTitle;
