/* eslint-disable max-len */
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PcfRZGgoY3aPj4EfvqC4c1el2yksrt7PzIK5CJRgbNKK4NuyGHrGKUuzaGAGe0w6jYt3rUlz6V9X0PDkRyPB7vC00p3fGNSFo"
);

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
