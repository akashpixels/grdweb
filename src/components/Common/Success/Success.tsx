/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "hooks/reduxHooks";
import { fetchTransaction } from "api/apis";
import Cookies from "js-cookie";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [transactionDetails, setTransactionDetails] = useState(null);

  const sessionId = Cookies.get("sessionId");
  const { userid } = useAppSelector((state) => state.auth.userData);

  const fetchTransactionDetails = async () => {
    try {
      const response = await axios.post(fetchTransaction, {
        sessionId,
        userid,
      });
      setTransactionDetails(response.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  console.log("transactionDetails", transactionDetails);
  Cookies.set("isUser", "true");

  useEffect(() => {
    if (sessionId) {
      fetchTransactionDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-center">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">Success!</h1>
      <p className="text-lg text-gray-600 mt-2">Your payment is complete successfully.</p>
      <p className="text-lg text-gray-600 mt-2">Enjoy premium features with TheGradStory.</p>
      <Button
        onClick={() => navigate("/dashboard/cv-builder")}
        className="  hover:text-custom-primary hover:bg-transparent text-white my-8"
      >
        Go To Dashboard
      </Button>
    </div>
  );
};

export default SuccessPage;
