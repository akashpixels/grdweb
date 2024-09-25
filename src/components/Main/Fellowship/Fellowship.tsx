/* eslint-disable max-len */
import { getTeamMember } from "api/services/home.apis";
import Heading from "components/Common/Heading/Heading";
import Profile from "components/Common/Profile/Profile";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React, { useEffect } from "react";
import { getTeamMemberList } from "store/Slices/api.slice";

const Fellowship = () => {
  const dispatch = useAppDispatch();
  const teamMemberList = useAppSelector((state) => state.api.teamMemberList);

  useEffect(() => {
    if (!teamMemberList.length) {
      getTeamMember().then((res) => {
        dispatch(getTeamMemberList(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {teamMemberList.length ? (
        <div className="p-5 md:p-10 text-custom-white">
          <div className="lg:mx-20 text-center">
            <Heading
              textColor="text-custom-secondary"
              borderColor="border-custom-secondary"
              text="TheGradStory Team"
            />
            <p className="text-2xl font-medium mt-4 text-white mb-8">
              Meet the people helping you build confidence in your career journey
            </p>
            <div className="grid grid-cols-12 gap-6 md:mx-16">
              {teamMemberList?.map((profile, index) => {
                return <Profile profileData={profile} key={index} />;
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Fellowship;
