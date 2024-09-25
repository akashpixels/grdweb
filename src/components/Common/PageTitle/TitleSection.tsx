import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "utils/variant";

interface ITitleSection {
  subTitle: string;
  title: string;
  description: string;
}

const TitleSection = ({ subTitle, title, description }: ITitleSection) => {
  return (
    <div>
      <p className="py-5 font-bold text-2xl">{subTitle}</p>
      <motion.h2
        variants={fadeIn("right", 0.3)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-4xl text-custom-primary font-bold mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-md mb-12"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default TitleSection;
