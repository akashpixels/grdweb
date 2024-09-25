/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import rightside from "assets/login.png";
import logo from "assets/logot.svg";
import Button from "../../components/Common/Button/Button";
import Input from "components/Common/Input/Input";
import { useNavigate } from "react-router-dom";
import { loginIn } from "api/services/user.apis";
import { showToast } from "utils/toastUtils";
import { setAuthToken } from "api/Http.api";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { userToken } from "store/Slices/auth.slice";
import { setResumeInfo } from "store/Slices/cvbuilder";
import Cookies from "js-cookie";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedPassword = Cookies.get("password");
    if (savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignIn = () => {
    const { email, password, rememberMe } = formData;
    let valid = true;

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

    if (valid) {
      setLoading(true);
      loginIn({ email, password })
        .then((res) => {
          if (rememberMe) {
            Cookies.set("email", email);
          } else {
            Cookies.remove("email");
          }
          Cookies.set("ProfileImage", res?.profileimage);
          setAuthToken(res.token);
          dispatch(userToken(res));
          Cookies.set("userId", res.userid);
          Cookies.set("token", res.token);
          Cookies.set("isUser", JSON.stringify(res.isSubscribed));
          dispatch(setResumeInfo({ ...resumeData, userID: res.userid }));
          setFormData({
            email: "",
            password: "",
            rememberMe: false,
          });
          showToast("success", "Login successful!");
        })
        .catch(() => {
          showToast("error", "Invalid username or password. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToast("error", "All fields are required.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="bg-custom-white">
        <div className="py-12 md:p-12 mx-5 md:mx-10">
          <div className="grid grid-cols-12 gap-6 items-center justify-center">
            <div className="col-span-12 lg:col-span-6 xl:mx-24">
              <div className="mb-14 text-center">
                <div className="md:flex justify-center mb-5 hidden">
                  <img src={logo} alt="Logo" className="h-20" />
                </div>
                <h1 className="text-3xl font-bold pt-2">Welcome Back to TheGradStory</h1>
                <p className="text-base pt-2">Sign in to continue your journey</p>
              </div>
              <div className="mb-6 relative">
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-2 relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-9 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="flex justify-between pt-2">
                <div className="flex">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <p className="ps-2">Remember for 30 days</p>
                </div>
                <p
                  className="text-custom-secondary cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password
                </p>
              </div>
              <Button
                onClick={handleSignIn}
                className="bg-custom-primary hover:bg-[#3e4d6f] shadow-md font-bold py-3 px-6 rounded-md w-full text-custom-secondary mt-10"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <FaSpinner className="animate-spin" />{" "}
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="flex justify-center pt-4">
                <p>New to TheGradStory?</p>
                <p
                  className="text-custom-secondary ps-2 cursor-pointer"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </p>
              </div>
            </div>
            <div className="container relative col-span-12 md:col-span-6 hidden lg:block items-center justify-center">
              <img src={rightside} alt="Right side" className="rounded-2xl h-[800px] w-inherit" />
              {/* <CarouselSignIn /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
