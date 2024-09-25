/* eslint-disable max-len */
import Heading from "components/Common/Heading/Heading";
import React from "react";
import Card from "components/Common/Card/Card";
import { cardData } from "Json/chapter";

const ChapterSelection = () => {
  const handleDreamer = () => {
    alert("Dreamer");
  };

  return (
    <div className="p-10 bg-custom-white rounded-xl shadow-2xl text-custom-primary background-image">
      <div className="lg:mx-20">
        <Heading
          textColor="text-custom-primary"
          borderColor="border-custom-primary"
          text="Select Your Chapter"
        />
        <p className="text-center my-6 text-xl">
          Wherever you are your journey, there&apos;s chapter waiting to be written. Which will you
          choose?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((item, index) => {
            const { title, description, buttonText, img, borderColor } = item;
            return (
              <Card
                key={index}
                img={img}
                onClick={handleDreamer}
                title={title}
                description={description}
                buttonText={buttonText}
                borderColor={borderColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChapterSelection;
