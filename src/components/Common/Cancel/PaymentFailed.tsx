import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const PaymentFailedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-center">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">Payment Failed</h1>
      <p className="text-lg text-gray-600 mt-2">
        Unfortunately, your payment was not successful. Please try again.
      </p>
      <div className="flex gap-4 my-8">
        <Button
          onClick={() => navigate("/")}
          className="  hover:text-custom-primary hover:bg-transparent text-white"
        >
          Go To Dashboard
        </Button>
        <Button
          onClick={() => navigate("/subscription")}
          className="  hover:text-custom-primary  hover:bg-transparent text-white"
        >
          Go To Subscription
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
