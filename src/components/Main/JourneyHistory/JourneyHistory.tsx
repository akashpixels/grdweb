/* eslint-disable no-console */
/* eslint-disable max-len */
import { getStudentHistoryNumbers } from "api/services/home.apis";
import Heading from "components/Common/Heading/Heading";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React, { useEffect } from "react";
import CountUp from "react-countup";
import { getHistoryNumbers } from "store/Slices/api.slice";

const JourneyHistory = () => {
  const dispatch = useAppDispatch();
  const historyNumbers = useAppSelector((state) => state.api.historyNumbers);

  useEffect(() => {
    if (!historyNumbers.length) {
      getStudentHistoryNumbers()
        .then((res) => {
          const arrayOfObjects = [
            { value: res?.studentPlaced, name: "Student Placed" },
            {
              value: res?.multinationalCompanies,
              name: "Multinational Companies",
            },
            {
              value: res?.globalUniversityTieups,
              name: "Global University Tie-ups",
            },
            { value: res?.countryOutreach, name: "Country Outreach" },
          ];
          dispatch(getHistoryNumbers(arrayOfObjects));
        })
        .catch((err) => console.error(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative mx-8 py-12 md:px-12 md:mx-10 pt-20">
      <Heading
        textColor="text-custom-secondary"
        borderColor="border-custom-secondary"
        text="By the Numbers: Your Journey to Success"
      />
      <div className="md:mx-12">
        <p className="text-xl text-custom-white my-8 text-center">
          Join thriving community of over [X.000] dreamers turned achievers. With [x %] success in
          visa applications [x] successful job placements, and countless stories of transformation,
          your TheGradStory is waiting to be written.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {historyNumbers?.map((item, index: number) => {
            return (
              <div
                className="text-custom-white border-b-4 md:border-b-0 md:border-l-4 px-6 border-custom-secondary md:col-span-6 lg:col-span-3 text-center md:text-start"
                key={index}
              >
                <h2 className="text-5xl font-bold">
                  <CountUp start={0} end={item?.value} duration={5} />+
                </h2>
                <p className="text-xl font-medium my-2">{item?.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyHistory;
