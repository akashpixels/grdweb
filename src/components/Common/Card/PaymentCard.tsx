/* eslint-disable max-len */
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import Button from "components/Common/Button/Button";
import { useNavigate } from "react-router-dom";

interface IPaymentDetails {
  PaymentCards: {
    plan: string;
    price: string;
    buttonText: string;
    link: string;
    plusPlan: string;
    details: string[];
    color?: {
      textColor: string;
      bgColor: string;
      popularBgColor?: string;
      borderColor?: string;
    };
    isPopular?: boolean;
  }[];
}

const PaymentCard = ({ PaymentCards }: IPaymentDetails) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-12 gap-8 lg:p-8">
      {PaymentCards.map((item, index: number) => {
        const { plan, buttonText, price, link, plusPlan, details, color, isPopular } = item;
        return (
          <div
            className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl shadow-2xl"
            key={index}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-5">
                <span className="font-semibold text-gray-600">{plan}</span>
                {isPopular && (
                  <span
                    className={`p-1 border ${color?.borderColor} px-3 rounded-full ${color?.popularBgColor} font-medium ${color?.textColor}`}
                  >
                    <small>Popular</small>
                  </span>
                )}
              </div>
              <div className="flex items-end mb-5">
                <span className="text-5xl font-bold mr-2">$ {price}</span>
                <span>per month</span>
              </div>
              <Button
                onClick={() => navigate(link)}
                className="w-full text-white"
                bgColor={color?.bgColor}
              >
                {buttonText}
              </Button>
            </div>
            <div className="border-t border-gray-200"></div>
            <div className="p-8">
              <p className="font-semibold mb-1">FEATURES</p>
              <p className="mb-5">{plusPlan}</p>
              <div>
                {details?.map((item, index) => {
                  return (
                    <div className="flex items-center gap-4 mb-3" key={index}>
                      <span>
                        <FaRegCircleCheck className={`text-xl ${color?.textColor}`} />
                      </span>
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentCard;
