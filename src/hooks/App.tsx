import React, { useEffect } from "react";
import { AppRouter } from "routes/AppRouter";
import { Toaster } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "hooks/reduxHooks";
import { userToken } from "store/Slices/auth.slice";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Cookies from "js-cookie";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.userData);

  const isWelcomeModal = useAppSelector((state) => state.modal.isWelcomeModal);
  const isSubscribeModal = useAppSelector((state) => state.modal.isSubscribeModal);
  const isTrialPopupModal = useAppSelector((state) => state.modal.isTrialPopupModal);
  const isExpiredTrialPopup = useAppSelector((state) => state.modal.isExpiredTrialPopup);

  useEffect(() => {
    if (!user.token) {
      const userTokens = Cookies.get("token") || "";
      const { userId } = getUserIsSubscribe();
      const { isSubscribe } = getUserIsSubscribe();
      dispatch(userToken({ userid: userId, token: userTokens, isSubscribed: isSubscribe }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      "data:::::",
      isSubscribeModal,
      isWelcomeModal,
      isTrialPopupModal,
      isExpiredTrialPopup
    );
    if (isWelcomeModal || isExpiredTrialPopup) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isSubscribeModal, isWelcomeModal, isExpiredTrialPopup, isTrialPopupModal]);

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
