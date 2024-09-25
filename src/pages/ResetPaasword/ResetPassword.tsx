/* eslint-disable newline-per-chained-call */
/* eslint-disable no-console */
/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import React, { useState } from "react";
import logo from "assets/logot.svg";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import signupright from "assets/forgotpassword.png";
import { useLocation, useNavigate } from "react-router-dom";
import { doResetPassword } from "api/services/user.apis";
import { showToast } from "utils/toastUtils";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Extract search params using URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code")?.split(" ").join("+");
  const email = searchParams.get("em");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setLoading(true);
    if (code && email) {
      const resetData = {
        email: email,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
        code: code,
      };

      doResetPassword(resetData)
        .then((result) => {
          console.log("Success:", result);
          showToast("success", "Password reset successful");
          navigate("/sign-in");
        })
        .catch((error) => {
          console.error("Error:", error);
          showToast("error", "Something went wrong");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToast("error", "Please check your reset password url is not valid");
      setLoading(false);
    }
  };

  // Password validation rule
  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  };

  return (
    <div className="bg-custom-white">
      <div className="py-12 md:p-12 mx-5 md:mx-10">
        <div className="grid grid-cols-12 gap-6 items-center justify-center">
          <div className="col-span-12 lg:col-span-6 xl:mx-24">
            <div className="mb-14 text-center ">
              <div className="hidden justify-center mb-5 lg:flex">
                <img src={logo} alt="Logo" className="h-20" />
              </div>
              <h1 className="text-3xl font-bold pt-2">Reset Your Password</h1>
              <p className="text-base pt-2">Enter your new password</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  {...register("newPassword", passwordValidation)}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter new password"
                />
                {errors.newPassword?.message && (
                  <p className="text-red-500 text-sm">{errors.newPassword.message.toString()}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => value === watch("newPassword") || "Passwords do not match",
                  })}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message.toString()}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-custom-primary hover:bg-[#3e4d6f] shadow-md font-bold px-6 rounded-md w-full text-custom-secondary mt-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="text-center flex justify-center items-center">
                    <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  " Reset Password"
                )}
              </Button>
            </form>
          </div>
          <div className="container relative col-span-12 lg:col-span-6 hidden lg:block items-center justify-center">
            <img src={signupright} alt="Signup right" className="rounded-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
