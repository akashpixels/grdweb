/* eslint-disable max-len */
import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { getUserIsSubscribe } from "api/services/localServices.service";

interface SubscribeProps {
  onClose: () => void;
}

const Subscribe: React.FC<SubscribeProps> = ({ onClose }) => {
  const { userId, isSubscribe, isTrailExpired } = getUserIsSubscribe();
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    if (userId && !isSubscribe) {
      navigate("/subscription");
    } else {
      navigate("/sign-up");
    }
    onClose();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Create an account and invest in your future!</h2>
      <p className="mb-6">
        {isTrailExpired === "true" ? (
          "Sign up now to begin building your success story with confidence!"
        ) : (
          <p>
            Sign up now to unlock your 7-day free trial and begin building your success story with
            confidence!
          </p>
        )}
      </p>
      <Button onClick={handleSubscribeClick} className="text-white hover:text-custom-primary">
        Subscribe Now
      </Button>
    </div>
  );
};

export default Subscribe;
