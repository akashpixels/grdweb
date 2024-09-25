/* eslint-disable max-len */
import Heading from "components/Common/Heading/Heading";
import React from "react";
import { queries } from "Json/queries";

const GlossaryQueries = () => {
  return (
    <div className="py-12 md:p-12 mx-10 ">
      <Heading
        textColor="text-custom-secondary"
        borderColor="border-custom-secondary"
        text="Frequently Asked Questions"
      />
      <p className="text-xl text-custom-white my-8 text-center">
        Find answers to all your questions and make the most of your journey
      </p>

      <div className="grid grid-cols-12 gap-6">
        {queries.map((item, index) => {
          const { question, answer } = item;
          return (
            <div className="col-span-12 md:col-span-4" key={index}>
              <p className="my-3 text-custom-secondary">{question}</p>
              <p className="text-custom-white">{answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlossaryQueries;
