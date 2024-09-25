import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "utils/variant";

interface IHeading {
  textColor: string;
  borderColor: string;
  text: string;
}

const Heading = ({ textColor, borderColor, text }: IHeading) => {
  return (
    <motion.div
      variants={fadeIn("right", 0.6)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={`flex items-center justify-center ${textColor} flex-col md:flex-row gap-1`}
    >
      <div className={`border-2 ${borderColor} text-2xl p-3 lg:mr-6 rounded-xl mb-4 md:mb-0`}>
        <FaPaperPlane />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-center">{text}</h1>
    </motion.div>
  );
};

export default Heading;
