/* eslint-disable max-len */
import React from "react";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { fadeIn } from "utils/variant";

interface ICard {
  img: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (url: string) => void;
  title: string;
  description: string;
  buttonText: string;
  borderColor?: string;
  navigate?: string;
}

const Card = ({ img, title, description, buttonText, borderColor, onClick, navigate }: ICard) => {
  return (
    <>
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={`bg-custom-white text-center border-[3px] rounded-2xl p-8 shadow-xl flex flex-col ${borderColor}`}
      >
        <div className="flex-1">
          <div className="flex justify-center mb-5">
            <img src={img} alt="schoolers hat" height={150} width={60} />
          </div>
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <p className="text-xl mb-5">{description}</p>
        </div>

        <Button
          onClick={() => onClick && onClick(navigate ?? "")}
          className="w-full text-white hover:text-custom-primary"
        >
          {buttonText}
        </Button>
      </motion.div>
    </>
  );
};

export default Card;
