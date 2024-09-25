import { achieverPaymentCards } from "Json/paymentCard";
import { achieverPlan } from "Json/plan";
import PaymentCard from "components/Common/Card/PaymentCard";
import PlanSection from "components/Common/Plan/PlanSection";
import PlanTitle from "components/Common/Plan/PlanTitle";
import ToggleButton from "components/Common/Toggle/Toggle";
import React from "react";

const AchieverPlan = () => {
  return (
    <div>
      <PlanTitle
        title="The Achiever Plan"
        heading="Bolster Your Academic and Career Goals"
        subheading="Maximize your potential with every page you turn"
        bgColor="bg-custom-jungle-green"
        textColor="text-custom-primary"
        titleColor="bg-[#1c6869]"
      />
      <div className="bg-custom-white p-4 sm:p-8">
        {achieverPlan?.map((item, index) => (
          <PlanSection dreamPlan={item} key={index} />
        ))}

        <div className="text-custom-primary  text-center">
          <p className="text-4xl font-bold mb-4">Invest in Your Academic Growth</p>
          <p className="mb-5">
            Our tailored packages are designed to align with your journey’s progress.
          </p>
        </div>
        <ToggleButton />
        <PaymentCard PaymentCards={achieverPaymentCards} />
      </div>
    </div>
  );
};

export default AchieverPlan;
