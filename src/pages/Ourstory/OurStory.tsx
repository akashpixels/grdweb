/* eslint-disable max-len */
import React from "react";
import Button from "components/Common/Button/Button";
import Fellowship from "components/Main/Fellowship/Fellowship";
import midpanel from "assets/panel.jpg";
import panal2 from "assets/panel2.jpg";
import panal3 from "assets/panel3.jpg";
import Heading from "components/Common/Heading/Heading";
import Panel from "components/Common/Panel/Panel";
import TitleSection from "components/Common/PageTitle/TitleSection";
import { useNavigate } from "react-router-dom";

const OurStory = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="text-center bg-custom-white px-8 lg:px-16 pt-4 lg:pt-16 pb-8">
          <TitleSection
            subTitle="About us"
            title="Helping you craft your success story, one chapter at a time!"
            description="At TheGradStory, we understand that confidence is key to navigating the challenges of studying and working abroad. Whether you're crafting the perfect CV, applying for your first job in the UK, or stepping into a networking event, feeling confident in your abilities and decisions is crucial. That's why we’ve designed our services to not just guide you, but to empower you with the confidence you need to succeed."
          />
          <div className="flex gap-4 flex-col items-center lg:flex-row lg:justify-center lg:mx-16">
            <Button
              onClick={() => navigate("/subscription")}
              className="text-white hover:text-custom-primary"
            >
              Begin Your Journey
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-8 py-12 lg:p-12 lg:mx-10 ">
        <div className="pb-16 lg:px-16">
          <Heading
            textColor="text-custom-secondary"
            borderColor="border-custom-secondary"
            text="We believe every international student deserves the best chance to succeed."
          />
          <div className="lg:mx-12">
            <p className="text-md text-custom-white my-8 text-center">
              We&apos;re here to help you craft a success story that&apos;s uniquely yours,
              celebrating every milestone and guiding you towards a future you&apos;re proud of.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:mx-20">
          <div className="grid grid-cols-12 gap-8 lg:mx-12 mb-6">
            <div className="col-span-12 lg:col-span-6 flex justify-start items-center">
              <Panel
                textColor="text-custom-secondary"
                text="Our Story"
                subheading="Building confidence and guiding you through every step, one chapter at a time"
                paragraph="TheGradStory was founded by a team of former international students who understand the unique challenges of studying and working in the UK. We aim is to empower international students by providing comprehensive support at every stage of their journey from deciding to study in the UK to landing their first full-time sponsored job. TheGradStory is here to help you build confidence in your academic and professional pursuits. We’re committed to helping you craft your success story, one chapter at a time."
              />
            </div>
            <div
              className="col-span-12 lg:col-span-6 xs:h-56 
          flex justify-end items-center"
            >
              <img src={midpanel} alt="our-story-founder-msg" className="rounded-2xl" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8 lg:mx-12 mb-6">
            <div
              className="col-span-12 lg:col-span-6 xs:h-56 order-2 lg:order-1
          flex justify-start items-center"
            >
              <img src={panal2} alt="our-story-founder-msg" className="rounded-2xl" />
            </div>
            <div className="col-span-12 lg:col-span-6 flex justify-end items-center order-1 lg:order-2">
              <Panel
                textColor="text-custom-secondary"
                text="Our Mission and Vision"
                subheading="Supporting international students as they navigate new horizons with confidence"
                paragraph="Our mission is to empower those who possess the courage to abandon the familiar in pursuit of an opportunity to leave a mark on this world. <br/><br/> Our vision is to build a world where international students confidently pursue their academic and professional goals while resting assured that TheGradStory exists to support them with the tools, guidance, and backing to unleash their full potential."
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8 lg:mx-12 mb-6">
            <div className="col-span-12 lg:col-span-6 flex justify-start items-center">
              <Panel
                textColor="text-custom-secondary"
                text="Our core values"
                subheading="The principles that drive our commitment to your success"
                paragraph="<div>
    <ul>
        <li>• <strong>Empowerment:</strong> We’re here to empower international students by giving them the tools, knowledge, and support they need to succeed in their studies and careers.</li>
        <li>• <strong>Inclusivity:</strong> We celebrate diversity and ensure that every student feels welcome, respected, and included in our community.</li>
        <li>• <strong>Innovation:</strong> We’re always looking for new and better ways to improve the student experience and meet their changing needs.</li>
        <li>• <strong>Transparency:</strong> We believe in being clear and honest, giving students the information they need to make smart choices for their education and career.</li>
        <li>• <strong>Community:</strong> We build strong connections among students, mentors, and professionals, creating a supportive network where everyone can grow and succeed.</li>
    </ul>
</div>"
              />
            </div>
            <div
              className="col-span-12 lg:col-span-6 xs:h-56 
          flex justify-end items-center"
            >
              <img src={panal3} alt="our-story-founder-msg" className="rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
      <Fellowship />
    </>
  );
};

export default OurStory;
