/* eslint-disable max-len */
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

interface IPanel {
  textColor: string;
  text: string;
  subheading: string;
  paragraph: string;
}

const Panel = ({ textColor, text, subheading, paragraph }: IPanel) => {
  return (
    <div className={`${textColor} flex-col md:flex-row grid gap-4`}>
      <div
        className={`flex justify-start  gap-2
      md:justify-start ${textColor} flex-row md:flex-col`}
      >
        <div className="text-custom-orange ">
          <FaGraduationCap className="text-5xl mr-6 rounded-xl mb-4 md:mb-0 border-2 p-2 border-custom-orange" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-start">{text}</h1>
      </div>
      <p className="">{subheading}</p>
      <p className="text-custom-white" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
    </div>
  );
};

export default Panel;
