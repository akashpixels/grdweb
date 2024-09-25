/* eslint-disable max-len */
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import signupright from "assets/forgotpassword.png";
import logo from "assets/logot.svg";
import Button from "components/Common/Button/Button";
import Input from "components/Common/Input/Input";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "api/services/user.apis";
import { showToast } from "utils/toastUtils";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: "data",
    });
    setEmailError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    const { email } = formData;
    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }
    setLoading(true);
    resetPassword(email)
      .then(() => {
        setFormData({ email: "d" });
        showToast("success", "Password reset link sent to your email!");
      })
      .catch(() => {
        showToast("error", "Password reset failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-custom-white">
        <div className="py-12 md:p-12 mx-5 md:mx-10">
          <div className="grid grid-cols-12 gap-6 items-center justify-center">
            <div className="col-span-12 lg:col-span-6 xl:mx-24">
              <div className="mb-14 text-center ">
                <div className="hidden justify-center mb-5 lg:flex">
                  <img src={logo} alt="Logo" className="h-20" />
                </div>
                <h1 className="text-3xl font-bold pt-2">Forgot Your Password</h1>
                <p className="text-base pt-2">Enter your email to reset your password</p>
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={formData.email}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <Button
                onClick={handleResetPassword}
                className="bg-custom-primary hover:bg-[#3e4d6f] shadow-md font-bold py-3 px-6 rounded-md w-full text-custom-secondary mt-10"
                disabled={loading}
              >
                {loading ? (
                  <div className="text-center flex justify-center items-center">
                    <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
              <Button
                onClick={() => navigate("/sign-in")}
                className="bg-custom-white hover:bg-[#3e4d6f] font-bold py-3 px-6 rounded-md w-full text-custom-secondary mt-4 contrast-more:border-slate-600 border-blue-gray-200"
              >
                <div className="flex justify-center items-center">
                  <span className="ps-2">Back to Sign In</span>
                </div>
              </Button>
            </div>
            <div className="container relative col-span-12 lg:col-span-6 hidden lg:block items-center justify-center">
              <img src={signupright} alt="Signup right" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
