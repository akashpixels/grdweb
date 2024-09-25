/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import days from "assets/Asset 1.png";
import logo from "assets/logot.svg";
import Button from "components/Common/Button/Button";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";

function ExpiredTrial(props: any) {
  const navigate = useNavigate();
  const { onClose } = props;

  const handleCloseClick = () => {
    onClose();
    navigate("/dashboard/profile/subscription-plan");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="h-full rounded-l-lg hidden md:flex">
          <img src={days} alt="model-pop" className="h-inherit" />
        </div>
        <div className="p-6 md:p-4 text-center flex justify-center items-center flex-col">
          <div className="text-center  justify-center mb-2 ">
            <img src={logo} alt="logo" width={80} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-700">
            7 DAYS <span className="text-custom-secondary">FREE</span>
          </h1>
          <h1 className="font-extrabold text-gray-600 my-2 flex items-center justify-center">
            --
            <span className="text-2xl">
              TRIAL <span className="text-red-600">EXPIRED</span>
            </span>
            --
          </h1>
          <p className="font-semibold text-gray-700 my-2">
            YOUR <span className="text-custom-secondary">DREAM JOB</span> IS CLOSER THAN YOU THINK
          </p>
          <Button
            onClick={() => handleCloseClick()}
            className="border flex items-center gap-2 bg-custom-secondary hover:text-custom-secondary  hover:bg-transparent text-white hover:border-custom-secondary"
          >
            Subscribe Now
            <span>
              <FaCircleArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExpiredTrial;
