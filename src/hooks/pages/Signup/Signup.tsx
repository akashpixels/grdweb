/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import signupright from "assets/signup.png";
import logo from "assets/logot.svg";
import Button from "components/Common/Button/Button";
import Input from "components/Common/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { handleOTPVerification, IUserResponse, signUp, startTrial } from "api/services/user.apis";
import { showToast } from "utils/toastUtils";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { userToken } from "store/Slices/auth.slice";
import { setAuthToken } from "api/Http.api";
import { setResumeInfo } from "store/Slices/cvbuilder";
import { IoIosArrowRoundBack } from "react-icons/io";
import { OTPInput, SlotProps } from "input-otp";
import Cookies from "js-cookie";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { fromTrial = false } = location.state || {};
  const navigate = useNavigate();

  const resumeData = useAppSelector((state) => state.builder.resumeInfo);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState({
    type: "",
    message:
      "Password must be at least 8 characters long, include both uppercase and lowercase letters, and have at least one special character",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [captchaValue, setCaptchaValue] = useState<any>(null); // Captcha state
  const [otpValue, setOtpValue] = useState("");
  const [isVerifyScreen, setIsVerifyScreen] = useState(false);
  const [signUpResponse, setSignUpResponse] = useState<IUserResponse>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    surname: "",
    confirmPassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    surname: "",
    confirmPassword: "",
    agree: "",
    captcha: "", // Added captcha error state
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (name === "password" && value) {
      if (/^(?=.*[a-z]).{5,}$/.test(value) === false) {
        setPasswordErrorMessage({ type: "text-red-600", message: "Password is weak" });
      } else if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
      ) {
        setPasswordErrorMessage({ type: "text-lime-600", message: "Great Job!" });
      }
    } else {
      setPasswordErrorMessage({ type: "", message: "" });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    const { name, email, password, surname, confirmPassword, agree } = formData;
    let valid = true;

    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required.",
      }));
      valid = false;
    }

    if (!surname.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        surname: "Surname is required.",
      }));
      valid = false;
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      valid = false;
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
      valid = false;
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      valid = false;
    }

    if (!agree) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        agree: "You must agree to the terms and conditions.",
      }));
      valid = false;
    }

    if (!captchaValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Please complete the CAPTCHA.",
      }));
      valid = false;
    }

    if (valid) {
      setLoading(true);

      signUp({ email, password, firstName: name, surName: surname, skills: "" })
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            password: "",
            surname: "",
            confirmPassword: "",
            agree: false,
          });

          showToast("success", "Sign Up Successful. Please check your email for verification.");
          setSignUpResponse(res);
          setIsVerifyScreen(true);
        })
        .catch(() => {
          showToast("error", "Email already exists. Try logging in.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToast("error", "Please fill in all required fields correctly.");
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      captcha: "",
    }));
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value); // Store the entered OTP in the state
  };

  const getFreeTrail = async (userId: string) => {
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
  };

  const handleOtpVerification = () => {
    if (otpValue.length === 4) {
      handleOTPVerification({ userGUID: signUpResponse?.data.userid ?? "", otp: otpValue })
        .then(() => {
          /**Set all verification details */
          if (signUpResponse) {
            setAuthToken(signUpResponse.data.token);
            dispatch(userToken(signUpResponse.data));
            Cookies.set("userId", signUpResponse?.data.userid);
            Cookies.set("token", signUpResponse.data.token);
            if (!fromTrial)
              signUpResponse.data.isSubscribed &&
                Cookies.set("isUser", JSON.stringify(signUpResponse.data.isSubscribed));
            signUpResponse.data.isExpired &&
              Cookies.set("isExpired", JSON.stringify(signUpResponse.data.isExpired));
            dispatch(setResumeInfo({ ...resumeData, userID: signUpResponse.data.userid }));
            signUpResponse?.data.isSubscribed
              ? navigate("/dashboard/cv-builder")
              : navigate("/dashboard/profile/subscription-plan");
          }
          getFreeTrail(signUpResponse?.data.userid ?? "");
          showToast("success", "Sign up successful!");
          navigate("/dashboard/profile");
          // Refresh the page
          window.location.reload();
        })
        .catch(() => showToast("error", "Please check OTP"));
    } else {
      showToast("error", "Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <>
      <div className="bg-custom-white">
        <div className="py-12 md:p-12 mx-5 md:mx-10">
          <div className="grid grid-cols-12 gap-6 items-center justify-center">
            <div className="col-span-12 lg:col-span-6 lg:mx-16">
              <div className="mb-6 md:mb-14 text-center">
                <div className="justify-center mb-5 hidden md:flex">
                  <img src={logo} alt="Logo" className="h-20" />
                </div>
                <h1 className="text-3xl font-bold pt-2">Join TheGradStory</h1>
                <p className="text-base pt-2">
                  {!isVerifyScreen
                    ? "Create an account and start shaping your future"
                    : "An OTP has been sent to your email. Please check your inbox and enter the OTP to proceed."}
                </p>
              </div>
              {!isVerifyScreen ? (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-6">
                    <div className="mb-4">
                      <Input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        value={formData.name}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                      <Input
                        name="surname"
                        type="text"
                        placeholder="Enter your surname"
                        onChange={handleChange}
                        value={formData.surname}
                      />
                      {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="mb-4 ">
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-6">
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="text-gray-500 focus:outline-none focus:text-gray-700 text-xl"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div className="mb-1 relative">
                    <Input
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your confirm password"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-6">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-500 focus:outline-none focus:text-gray-700 text-xl"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                  )}

                  <div className="flex justify-between pt-2 mb-3">
                    <div className="flex">
                      <p className={`${passwordErrorMessage?.type} text-xs`}>
                        {passwordErrorMessage?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <ReCAPTCHA
                      sitekey="6LdfQTkqAAAAADsHeNk5CKhoVUkfyxgkMLAbxWTY"
                      onChange={onCaptchaChange}
                    />
                    {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="agree"
                        onChange={handleChange}
                        checked={formData.agree}
                      />
                      <span className="ml-4 text-sm">
                        By creating an account, I agree to TheGradStory&apos;s{" "}
                        <a
                          href="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Terms of Use
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Privacy policy
                        </a>
                      </span>
                    </label>
                    {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
                  </div>

                  <Button
                    type="button"
                    className="w-full text-white hover:text-custom-primary flex justify-center"
                    onClick={handleSignUp}
                    disabled={loading}
                  >
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : "Sign Up"}
                  </Button>
                  <div className="py-3 flex justify-center items-center">
                    <button
                      className="flex gap-3 justify-center items-center"
                      onClick={() => navigate("/sign-in")}
                    >
                      <IoIosArrowRoundBack className="text-xl" />
                      Log In
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white shadow-md rounded-2xl p-8 flex justify-center gap-4 items-center flex-col">
                  <h1 className="text-xl font-bold mb-4">Enter OTP</h1>
                  <OTPInput
                    maxLength={4}
                    containerClassName="group flex items-center has-[:disabled]:opacity-30 pl-12"
                    onChange={handleOtpChange} // Update state with entered OTP
                    render={({ slots }) => (
                      <>
                        <div className="flex">
                          {slots.slice(0, 4).map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>

                        <FakeDash />

                        <div className="flex">
                          {slots.slice(4).map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>
                      </>
                    )}
                  />
                  <Button
                    onClick={handleOtpVerification}
                    className="text-white hover:text-custom-primary"
                  >
                    Verify OTP
                  </Button>
                </div>
              )}
            </div>
            <div className="col-span-12 lg:col-span-6 flex-col justify-center gap-4 items-center hidden lg:flex">
              <img src={signupright} alt="" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10  h-14",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border border-custom-primary rounded mx-2",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-accent-foreground": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border" />
    </div>
  );
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import { getUserIsSubscribe, setPremiumKeys } from "api/services/localServices.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
