/* eslint-disable max-len */
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProfileHeader from "components/Common/ProfileHeader/ProfileHeader";
import Sidebar from "components/Main/CVBuilder/SlideNavBar/SlideNavBar";
import { AccountSettings, ProfileOverview } from "routes/routes";
import { Loading } from "components/Common/Loader/Loading";
import MobilePortalHeader from "components/Common/Header/MobilePortalHeader";
import { useAppDispatch } from "hooks/reduxHooks";
import { getUserprofile } from "api/services/user.apis";
import { handleFreeSubscribeModel } from "store/Slices/modal.slice";
import { getUserIsSubscribe } from "api/services/localServices.service";
import MobilePortalFooter from "components/Main/Footer/MobilePortalFooter";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userId } = getUserIsSubscribe();
  const checkUserDetails = async () => {
    const userDetails = await getUserprofile(userId);
    if (!userDetails.isSubscribed && !userDetails?.isTrailExpired) {
      dispatch(handleFreeSubscribeModel(true));
    } else {
      dispatch(handleFreeSubscribeModel(false));
    }
  };

  useEffect(() => {
    userId && checkUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen p-4 bg-custom-white w-screen gap-6 pt-20 lg:pt-6 h-screen custom-scroll">
      <MobilePortalHeader />
      <span className="hidden lg:flex">
        <Sidebar />
      </span>
      <div className="w-full mx-auto bg-white shadow-md h-auto rounded-2xl p-6   lg:pb-0 overflow-y-scroll custom-scroll">
        <ProfileHeader />
        <div
          className="mt-2 overflow-y-scroll custom-scroll h-screen custom-scroll"
          // style={{ height: "calc(100% - 300px)" }}
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/profile-overview" element={<ProfileOverview />} />
              {/* <Route path="/personal-information" element={<PersonalInformation />} /> */}
              {/* <Route path="/cv-resume" element={<CVResume />} /> */}
              {/* <Route path="/skills" element={<ProfileSkills />} /> */}
              <Route path="/subscription-plan" element={<AccountSettings />} />
              <Route path="/" element={<ProfileOverview />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <MobilePortalFooter />
    </div>
  );
};

export default Profile;
