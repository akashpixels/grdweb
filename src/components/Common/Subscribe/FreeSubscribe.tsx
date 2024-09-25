/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { startTrial } from "api/services/user.apis";
import React from "react";
import days from "assets/Asset 1.png";
import logo from "assets/logot.svg";
import Button from "components/Common/Button/Button";
import { FaCircleArrowRight } from "react-icons/fa6";
import { getUserIsSubscribe, setPremiumKeys } from "api/services/localServices.service";
import { showToast } from "utils/toastUtils";
import { useNavigate } from "react-router-dom";

function FreeSubscribe(props: any) {
  const { onClose } = props;
  const { userId } = getUserIsSubscribe();
  const navigate = useNavigate();
  const getExpiryDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
    const formattedDate = futureDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const getFreeTrail = async () => {
    if (userId) {
      const userDetails = await startTrial(userId);
      setPremiumKeys(
        userDetails?.isExpired,
        userDetails?.isSubscribed,
        userDetails?.isTrailExpired
      );
      getUserIsSubscribe();

      setTimeout(() => {
        showToast("success", "Your 7 days trial is started !");
      }, 2000);
    } else {
      navigate("/sign-up", {
        state: {
          fromTrial: true,
        },
      });
    }
    onClose();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      <div className="h-full rounded-l-lg hidden md:flex">
        <img src={days} alt="model-pop" className="h-inherit" />
      </div>
      <div className="p-6 md:p-4 text-center flex justify-center items-center flex-col">
        <div className="text-center flex justify-center mb-2">
          <img src={logo} alt="logo" width={80} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-700">
          7 DAYS <span className="text-custom-secondary">FREE</span>
        </h1>
        <h1 className="font-extrabold text-gray-600 my-2 flex items-center justify-center">
          ----<span className="text-4xl">TRIAL</span>----
        </h1>
        <p className="my-2 text-sm flex gap-2 items-center">
          Valid till{" "}
          <span className="rounded-full bg-red-100 border border-red-600 px-3 py-1">
            {getExpiryDate()}
          </span>
        </p>
        <p className="font-semibold text-gray-700 my-3">
          YOUR <span className="text-custom-secondary">DREAM JOB</span> IS CLOSER THAN YOU THINK
        </p>
        <Button
          onClick={() => getFreeTrail()}
          className="border flex items-center gap-2 bg-custom-secondary hover:text-custom-secondary  hover:bg-transparent text-white hover:border-custom-secondary"
        >
          Start my FREE trial today{" "}
          <span>
            <FaCircleArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default FreeSubscribe;
