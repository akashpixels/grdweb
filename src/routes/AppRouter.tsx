/* eslint-disable indent */
/* eslint-disable max-len */
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withLoading } from "hocs/withLoading.hoc";
import AppSubRoutes from "./AppSubRoutes"; // Ensure correct import
import RequireAuth from "./RequireAuth";
import JobsInternships from "pages/Jobs-Internships/JobsInternships";
import { Loading } from "components/Common/Loader/Loading";
import { Counselling, CreateCoverLetter, CVBuilder, Networking, NotFound, Profile } from "./routes";
import { getUserprofile } from "api/services/user.apis";
import Modal from "components/Common/Modal/NormalModel/Modal";
import ExpiredTrial from "components/Common/Subscribe/ExpiredTrial";
import FreeSubscribe from "components/Common/Subscribe/FreeSubscribe";
import Cookies from "js-cookie";

import { handleExpiredSubscribeModel, handleFreeSubscribeModel } from "store/Slices/modal.slice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import {
  getUserIsSubscribe,
  setPremiumKeys,
  validatePremium,
} from "api/services/localServices.service";
import { initGA, logPageView } from "utils/ga4";

export const HOME_PATH = "/home";

const DashboardRoutes = withLoading(() => (
  <Routes>
    <Route path="/cv-builder/*" element={<CVBuilder />} />
    <Route path="/jobs-internships/*" element={<JobsInternships />} />
    <Route path="/counselling" element={<Counselling />} />
    <Route path="/networking/*" element={<Networking />} />
    <Route path="/profile/*" element={<Profile />} />
    <Route path="/create-cover-letter" element={<CreateCoverLetter />} />
  </Routes>
));

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isTrialPopupModal = useAppSelector((state) => state.modal.isTrialPopupModal);
  const isExpiredTrialPopup = useAppSelector((state) => state.modal.isExpiredTrialPopup);

  const [isFreeSubscribeShow, setIsFreeSubscribeShow] = useState(false);
  const [isExpiredShow, setIsExpiredShow] = useState(false);
  const isUser = Cookies.get("isUser") || "false";

  const { userId, isSubscribe, isExpired, isTrailExpired } = getUserIsSubscribe();

  const pathname = location.pathname; // Pathname only

  const checkPopupOpen = () => {
    const allowedPaths = [
      "/reset-password",
      "/sign-up",
      "/success",
      "/cancel",
      "/sign-in",
      "forgot-password",
    ];
    return !allowedPaths.includes(pathname);
  };
  const checkUserDetails = async () => {
    if (userId) {
      const userDetails = await getUserprofile(userId);
      setPremiumKeys(
        userDetails?.isExpired,
        userDetails?.isSubscribed,
        userDetails?.isTrailExpired
      );
      const userSubStatus = validatePremium(isExpired, isSubscribe, userDetails?.isTrailExpired);
      if (userSubStatus === "pendingTrial" || userSubStatus === "expiredTrial") {
        if (userSubStatus === "expiredTrial") {
          dispatch(handleExpiredSubscribeModel(true));
          setIsExpiredShow(true);
        } else if (userSubStatus === "pendingTrial") {
          dispatch(handleFreeSubscribeModel(true));
          setIsFreeSubscribeShow(true);
        } else {
          setIsFreeSubscribeShow(false);
        }
      }
    } else {
      if (checkPopupOpen()) {
        dispatch(handleFreeSubscribeModel(true));
        setIsFreeSubscribeShow(true);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkUserDetails();
    }, 200);
    initGA();
    logPageView();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppSubRoutes />} />
          <Route path="/*" element={<AppSubRoutes />} />
          <Route
            path="dashboard/*"
            element={
              <RequireAuth>
                <DashboardRoutes />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isUser === "false" &&
          isTrailExpired &&
          String(isTrailExpired) !== "true" &&
          isFreeSubscribeShow && (
            <Modal
              isOpen={isTrialPopupModal}
              onClose={() => dispatch(handleFreeSubscribeModel(false))}
              className="p-0"
            >
              <FreeSubscribe onClose={() => dispatch(handleFreeSubscribeModel(false))} />
            </Modal>
          )}

        {isExpiredShow && (
          <Modal
            isOpen={isExpiredTrialPopup}
            onClose={() => dispatch(handleExpiredSubscribeModel(false))}
          >
            <ExpiredTrial onClose={() => dispatch(handleExpiredSubscribeModel(false))} />
          </Modal>
        )}
      </BrowserRouter>
    </Suspense>
  );
};
