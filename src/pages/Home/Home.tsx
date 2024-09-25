import Modal from "components/Common/Modal/NormalModel/Modal";
import Subscribe from "components/Common/Subscribe/Subscribed";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React from "react";
import { HomeBanner, GlossaryQueries, GetInTouch, OurServices } from "routes/routes";
import { handleSubscribeModel } from "store/Slices/modal.slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isSubscribed } = useAppSelector((state) => state.auth.userData);
  const isSubscribeModal = useAppSelector((state) => state.modal.isSubscribeModal);

  return (
    <>
      <HomeBanner />
      {/* <JourneyHistory /> */}
      {/* <ChapterSelection /> */}
      {/* <CourseSection /> */}
      <div className="my-20">
        <OurServices />
      </div>

      {/* <GradStories /> */}
      <GlossaryQueries />
      <GetInTouch />
      {/* <LegacySection /> */}

      {!isSubscribed && (
        <Modal isOpen={isSubscribeModal} onClose={() => dispatch(handleSubscribeModel(false))}>
          <Subscribe onClose={() => dispatch(handleSubscribeModel(false))} />
        </Modal>
      )}
    </>
  );
};

export default Home;
