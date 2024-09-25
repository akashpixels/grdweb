/* eslint-disable max-len */
import PlanTitle from "components/Common/Plan/PlanTitle";
import React from "react";
import PlanSection from "components/Common/Plan/PlanSection";
import { premiumPlan } from "Json/plan";
import Button from "components/Common/Button/Button";
import { useNavigate } from "react-router-dom";
import { getUserIsSubscribe } from "api/services/localServices.service";

const PremiumPlan = () => {
  const navigate = useNavigate();
  const { isSubscribe, userId } = getUserIsSubscribe();

  const makePayment = async () => {
    if (userId) {
      navigate("/dashboard/profile/subscription-plan");
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <div>
      <PlanTitle
        title="TheGradStory subscription"
        heading="Write your Future with TheGradStory"
        subheading="Take your professional career to the next level with us by your side!"
        bgColor="bg-custom-orange"
        textColor="text-custom-primary"
        titleColor="bg-[#F27A0E]"
      />
      <div className="bg-custom-white p-4 sm:p-8">
        {premiumPlan?.map((item, index) => (
          <PlanSection dreamPlan={item} key={index} />
        ))}
      </div>
      {!isSubscribe ? (
        <div className="py-6 lg:py-12 xl:px-48 bg-custom-white text-center">
          <h1 className="text-2xl font-semibold">Affordable Pricing</h1>
          <p className="my-6">
            Access all our services for <b>Just £9.99/month</b>
          </p>
          <p className="mb-2">
            Enjoy unlimited access to all TheGradStory features from crafting the perfect CV to
            landing your dream sponsored job, we have you covered.
          </p>
          <Button
            onClick={makePayment}
            className="border border-transparent text-custom-primary hover:bg-transparent hover:border-custom-primary"
            bgColor="bg-custom-secondary"
          >
            TheGradStory Subscription
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PremiumPlan;
