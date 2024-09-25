/* eslint-disable no-console */
/* eslint-disable max-len */
import Sidebar from "components/Main/CVBuilder/SlideNavBar/SlideNavBar";
import Header from "components/Main/CVBuilder/SlideNavBar/Header";
import React, { Suspense, useEffect } from "react";
import MainContent from "components/Main/CVBuilder/SlideNavBar/MainContent";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  SelectTemplate,
  ShortBio,
  YourDetails,
  Experience,
  YourResume,
  CVList,
  CoverLetter,
} from "routes/routes";
import { Loading } from "components/Common/Loader/Loading";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import MobilePortalHeader from "components/Common/Header/MobilePortalHeader";
import MobilePortalFooter from "components/Main/Footer/MobilePortalFooter";
import Modal from "components/Common/Modal/NormalModel/Modal";
import TemplateWrapper from "components/Main/CVBuilder/TemplateWrapper/TemplateWrapper";
import { clearState, openResumeModel } from "store/Slices/cvbuilder";
import { getUserIsSubscribe } from "api/services/localServices.service";

const CVBuilder: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTemplate = useAppSelector((state) => state.builder.selectedTemplateId);
  const resumeModel = useAppSelector((state) => state.builder.resumeModel);
  const { isSubscribe } = getUserIsSubscribe();

  useEffect(() => {
    return () => {
      dispatch(clearState());
      if (!isSubscribe) {
        navigate("/dashboard/profile/subscription-plan");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative pt-20 pb-20 md:pb-6 md:pt-6 flex min-h-screen bg-custom-white w-screen h-screen overflow-y-scroll custom-scroll bg-white-custom p-4">
      <MobilePortalHeader />
      <span className="hidden lg:flex no-print">
        <Sidebar />
      </span>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-1 flex flex-col md:pl-6">
                <Header
                  title="CV Builder"
                  subtitle="Design a CV that captures your unique skills and experiences with our CV builder."
                />
                <MainContent />
              </div>
            }
          />
          <Route path="/select-template" element={<SelectTemplate />} />
          <Route path="/your-details" element={<YourDetails />} />
          <Route path="/short-bio" element={<ShortBio />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/your-resume" element={<YourResume />} />
          <Route path="/cv-list" element={<CVList />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
        </Routes>
      </Suspense>

      <Modal
        isOpen={resumeModel}
        onClose={() => dispatch(openResumeModel(false))}
        className="h-4/6 w-[90%] overflow-auto !p-0 pop-up-window-cv-modal"
      >
        <div className="pop-up-window-cv-modal">
          <TemplateWrapper templateName={selectedTemplate} />
        </div>
      </Modal>
      <MobilePortalFooter />
    </div>
  );
};

export default CVBuilder;
