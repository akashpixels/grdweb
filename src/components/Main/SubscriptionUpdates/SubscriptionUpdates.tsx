/* eslint-disable max-len */
import React, { useState, ChangeEvent } from "react";
import Button from "components/Common/Button/Button";
import Input from "components/Common/Input/Input";
import { showToast } from "utils/toastUtils";

const SubscriptionUpdates: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscription = () => {
    if (email && isValidEmail) {
      showToast("success", `Subscribed with email: ${email}`);
    } else {
      showToast("error", "Please enter a valid email address");
    }
  };

  return (
    <div className="py-12 lg:p-12 mx-5 md:mx-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6 text-center md:text-left">
          <p className="text-custom-secondary text-2xl mb-2 font-semibold">
            Subscribe for Inspiring Updates
          </p>
          <p className="text-custom-white text-lg">
            Join our mailing list to stay informed about the UK&apos;s latest academic and
            professional opportunities.
          </p>
        </div>
        <div className="flex gap-6 col-span-12 md:col-span-6 justify-center md:justify-end flex-col md:flex-row items-center md:items-center">
          <div>
            <Input
              name="Email"
              type="text"
              placeholder="Enter your email"
              textColor="text-white"
              value={email}
              onChange={handleInputChange}
              // className={isValidEmail ? "" : "border-red-500"}
            />
            {!isValidEmail && (
              <p className="text-red-500">
                <small>Please enter a valid email address</small>
              </p>
            )}
            <p className="text-custom-white">
              <small>
                We care about your data in our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  privacy policy
                </a>
              </small>
            </p>
          </div>
          <div className="text-center md:text-start">
            <Button
              onClick={handleSubscription}
              className="bg-custom-secondary text-custom-primary hover:border-white hover:text-white"
            >
              Join our Mailing List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionUpdates;
