import React, { useEffect, useRef } from "react";
import { CiMail, CiPhone, CiLocationOn, CiLinkedin } from "react-icons/ci";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BeginnerCover = ({ coverLetterHtml }: { coverLetterHtml: string }) => {
  const coverLetterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coverLetterHtml && coverLetterRef.current) {
      coverLetterRef.current.innerHTML = coverLetterHtml;
    }
  }, [coverLetterHtml]);

  return (
    <div>
      {coverLetterHtml && coverLetterHtml !== "" ? (
        <div ref={coverLetterRef}></div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg">
          <header className=" text-white items-center bg-gray-600">
            <div className="px-8 pt-8 pb-4">
              <h1 className="text-2xl font-bold">Ryan Cooper</h1>
              <p className="text-xl ">Administrative Assistant</p>
            </div>
            <div></div>
            <div className="flex justify-around text-sm px-2 py-2 bg-gray-500">
              <p className="flex items-center gap-1 px-1">
                <CiMail />
                ryan@novoresume.com
              </p>
              <p className="flex items-center gap-1 px-1">
                <CiPhone />
                123 444 555
              </p>
              <p className="flex items-center gap-1 px-1">
                <CiLocationOn />
                Phoenix, AZ
              </p>
              <p className="flex items-center gap-1 px-1">
                <CiLinkedin />
                linkedin.com/in/ryan.cooper
              </p>
            </div>
          </header>

          <main className="p-8">
            <div className="mb-4">
              <p className="text-gray-400">To ,</p>
              <p>Master Foster</p>
              <p>123 444 555</p>
              <p>Phoenix, AZ</p>
            </div>
            <h2 className="text-center text-2xl font-bold underline">Cover Letter</h2>
            <p className="mb-4">Dear Mason,</p>
            <p className="mb-4">
              I am writing to express my interest in the Administrative Assistant position that is
              currently available at QuantSmart. I am a highly motivated individual with a strong
              desire to learn and grow professionally. I have gained valuable experience and
              knowledge through various online certificates and courses that I have completed. I am
              excited about the opportunity to apply my skills and knowledge to a professional
              setting and to contribute to the success of your company.
            </p>
            <p className="mb-4">
              As a detail-oriented individual, I take pride in my ability to spot and correct errors
              in documents and data. At my previous company, I:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Reviewed and verified all incoming financial data at ABC Organization, resulting in
                a 100% accuracy rate.
              </li>
              <li>Implemented a new data entry protocol that reduced errors by 25%.</li>
              <li>Maintained a database of over 1000 clients and vendors.</li>
              <li>
                Ensured that all contact information and records were accurate and up-to-date.
              </li>
              <li>
                Improved communication and enhanced business relationships with clients and vendors.
              </li>
            </ul>
            <p className="mb-4">
              I would welcome the opportunity to discuss my qualifications further and learn more
              about the opportunity to join your company. Please feel free to contact me at any time
              to schedule an interview.
            </p>
            <p className="mb-4">Thank you for considering my application.</p>
            <p>
              Sincerely,
              <br />
              Ryan Cooper
            </p>
          </main>
        </div>
      )}
    </div>
  );
};

export default BeginnerCover;
