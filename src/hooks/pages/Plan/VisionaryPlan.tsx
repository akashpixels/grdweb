import { visionaryPaymentCards } from "Json/paymentCard";
import { visionaryPlan } from "Json/plan";
import PaymentCard from "components/Common/Card/PaymentCard";
import PlanSection from "components/Common/Plan/PlanSection";
import PlanTitle from "components/Common/Plan/PlanTitle";
import ToggleButton from "components/Common/Toggle/Toggle";
import React from "react";

const VisionaryPlan = () => {
  return (
    <div>
      <PlanTitle
        title="The Visionary Plan"
        heading="Ascend to Professional Excellence"
        subheading="Craft your legacy. Propel your professional journey forward"
        bgColor="bg-custom-orange"
        textColor="text-custom-primary"
        titleColor="bg-[#F27A0E]"
      />
      <div className="bg-custom-white p-4 sm:p-8">
        {visionaryPlan?.map((item, index) => (
          <PlanSection dreamPlan={item} key={index} />
        ))}

        <div className="text-custom-primary  text-center">
          <p className="text-4xl font-bold mb-4">Invest in Your Career Trajectory</p>
          <p className="mb-5">
            Select from our tiered plans to match your career milestones with our expert services.
          </p>
        </div>
        <ToggleButton />
        <PaymentCard PaymentCards={visionaryPaymentCards} />
      </div>
    </div>
  );
};

export default VisionaryPlan;
