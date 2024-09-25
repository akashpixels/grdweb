/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import React from "react";

const LegacySection = () => {
  const handleLegacy = () => {
    alert("legacy");
  };
  return (
    <div className="py-12 md:p-12 mx-5 md:mx-10">
      <div className="text-center bg-custom-white px-8 md:px-16 pt-16 pb-8 rounded-2xl background-image">
        <h2 className="text-4xl text-custom-primary font-bold mb-4">
          Pen Your Legacy with TheGradStory
        </h2>
        <p className="text-xl mb-12">
          our study abroad saga is not just a dream-it&apos;s a chapter away. Unfold your future
          with a click
        </p>
        <Button onClick={handleLegacy} className="text-white hover:text-custom-primary">
          Begin Your Legacy
        </Button>
      </div>
    </div>
  );
};

export default LegacySection;
