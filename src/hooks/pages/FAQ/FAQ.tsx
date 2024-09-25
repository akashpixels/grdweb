import Heading from "components/Common/Heading/Heading";
import React from "react";
import { topicFAQs } from "Json/queries";

// Define the shape of the queries object
interface Query {
  question: string;
  answer: string;
}

interface Queries {
  LIVING_IN_THE_UK: Query[];
  STUDYING_IN_THE_UK: Query[];
  NETWORKING: Query[];
  WORKING_IN_THE_UK: Query[];
  queries: Query[]; // Including this for demonstration purposes
}

const getName = (name: string) => {
  switch (name) {
    case "LIVING_IN_THE_UK":
      return "Living in the UK";
    case "STUDYING_IN_THE_UK":
      return "Studying in the UK";
    case "NETWORKING":
      return "Networking";
    case "WORKING_IN_THE_UK":
      return "Working in the UK";
    default:
      return "";
  }
};

const FAQ: React.FC = () => {
  // Ensure that queries are typed correctly
  const sections = Object.keys(topicFAQs) as Array<keyof Queries>;

  return (
    <div className="mx-5 py-12 md:p-12 md:mx-10">
      <Heading
        textColor="text-custom-secondary"
        borderColor="border-custom-secondary"
        text="Frequently Asked Questions"
      />
      <p className="text-xl text-custom-white my-8 text-center">
        Find answers to all your questions and make the most of your journey
      </p>

      {sections.map((section, sectionIndex) => {
        const sectionQueries = topicFAQs[section];

        // If there are no queries for the section, return a blank string
        if (!sectionQueries || sectionQueries.length === 0) {
          return (
            <div key={sectionIndex} className="my-8">
              {section !== "queries" && (
                <h2 className="text-2xl text-custom-secondary mb-6">
                  {section.replace(/_/g, " ")}
                </h2>
              )}
            </div>
          );
        }

        return (
          <div key={sectionIndex} className="my-8">
            {section !== "queries" && (
              <h2 className="text-3xl font-bold text-custom-secondary mb-6 text-center">
                {getName(section)}
              </h2>
            )}
            <div className="grid grid-cols-12 gap-6">
              {sectionQueries.map((item, index) => {
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
      })}
    </div>
  );
};

export default FAQ;
