/* eslint-disable max-len */
import { getUserIsSubscribe } from "api/services/localServices.service";
import Button from "components/Common/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const GetInTouch = () => {
  const navigate = useNavigate();
  const { userId } = getUserIsSubscribe();

  const handleGetInTouch = () => {
    if (userId) {
      navigate("/faq");
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <div className="py-12 md:p-12 mx-5 md:mx-10">
      <div className="flex justify-between items-center p-8 rounded-2xl bg-[#374156] flex-col md:flex-row">
        <div className="text-center md:text-start mb-4 md:mb-0">
          <p className="text-custom-secondary text-xl mb-2 font-semibold">
            Want to learn more about living and studying in the UK ?
          </p>
          <p className="text-xl text-custom-white">Sign up to get access to our extensive FAQs</p>
        </div>
        <Button
          onClick={handleGetInTouch}
          className="bg-custom-secondary text-custom-primary hover:border-white hover:text-white"
        >
          {userId ? "View FAQs" : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
};

export default GetInTouch;
