/* eslint-disable max-len */
import PlanTitle from "components/Common/Plan/PlanTitle";
import React from "react";
import PlanSection from "components/Common/Plan/PlanSection";
import { dreamPlan } from "Json/plan";
import PaymentCard from "components/Common/Card/PaymentCard";
import { dreamPaymentCards } from "Json/paymentCard";
import ToggleButton from "components/Common/Toggle/Toggle";

const DreamerPlan = () => {
  return (
    <div>
      <PlanTitle
        title="The Dreamer plan"
        heading="Begin Your UK Education Adventure"
        subheading="Take the first step on a journey of academic discovery"
        textColor="text-white"
      />
      <div className="bg-custom-white p-4 sm:p-8">
        {dreamPlan?.map((item, index) => (
          <PlanSection dreamPlan={item} key={index} />
        ))}

        <div className="text-custom-primary  text-center">
          <p className="text-4xl font-bold mb-4">Choose Your Academic Pathway</p>
          <p className="mb-5">
            Select a plan that fits your dream, with transparent pricing every step of the way.
          </p>
        </div>
        <ToggleButton />
        <PaymentCard PaymentCards={dreamPaymentCards} />
      </div>
    </div>
  );
};

export default DreamerPlan;
