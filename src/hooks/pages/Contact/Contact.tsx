/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import React, { useState, FormEvent } from "react";
import Button from "components/Common/Button/Button";
import Input from "components/Common/Input/Input";
import { CiLocationOn } from "react-icons/ci";
import { postContactDetails } from "api/services/contact.api";
import { showToast } from "utils/toastUtils";
import { MdEmail } from "react-icons/md";
import { BiSolidBuildings } from "react-icons/bi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  agree: boolean;
  phoneNumber: number;
}

interface Errors {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  agree: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agree: false,
    phoneNumber: 0,
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agree: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = (): boolean => {
    const tempErrors: Errors = {
      firstName: formData.firstName ? "" : "First name is required.",
      lastName: formData.lastName ? "" : "Last name is required.",
      email: /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid.",
      message: formData.message ? "" : "Message is required.",
      agree: formData.agree ? "" : "You must agree to our privacy policy.",
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const { firstName, lastName, email, message, phoneNumber } = formData;
      postContactDetails({
        getInTouchId: 0,
        firstName,
        lastName,
        email,
        phone: `${phoneNumber}`,
        message,
      })
        .then(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
            agree: false,
            phoneNumber: 0,
          });
          showToast("success", "Message sent successfully");
        })
        .catch(() => showToast("error", "Please try again!"));
    }
  };

  return (
    <div className="p-4 py-16 px-4 md:px-12 lg:px-36 bg-custom-white">
      <div className="grid grid-cols-12 flex-col">
        <div className="col-span-12 md:col-span-8">
          <div
            className="col-span-6 text-center md:text-left text-custom-secondary 
       text-2xl mb-2 font-semibold"
          >
            Get in touch
          </div>
          <p className="col-span-6 text-lg text-center md:text-left">
            We&apos;re here to support you at every step of your journey. Whether you have questions
            about our services, need assistance, or simply want to share your experience, feel free
            to reach out to us. Fill out the form below, and our team will respond promptly.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 my-16 gap-8">
        <div className="col-span-12 md:col-span-6">
          <h2 className="text-3xl font-semibold mb-5 text-center md:text-start">Get in touch</h2>
          <p className="text-gray-500 mb-5 text-center md:text-start">
            We&apos;re here to help you navigate your journey. Contact us with any questions or for
            more information about TheGradStory.
          </p>
          <div className="flex items-center gap-6 my-5 flex-col md:flex-row flex-wrap">
            <div className="md:flex-1 w-full">
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                label="First name"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="md:flex-1 w-full">
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                label="Last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
          <div className="my-5">
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              label="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="my-5">
            <Input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
              label="<p>Phone number <small>(optional)</small></p>"
            />
          </div>
          <div className="my-5">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full h-32 p-2 border border-gray-300 rounded-md"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <div className="mt-5 flex items-center text-gray-500 gap-4">
            <div>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <span className="ml-4">
                By submitting this form, you agree to TheGradStory&apos;s{" "}
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
              {errors.agree && <p className="text-red-500 text-sm ml-4">{errors.agree}</p>}
            </div>
          </div>
          <div className="my-6">
            <Button
              className="text-white hover:text-custom-primary w-full"
              bgColor="bg-custom-primary"
              type="submit"
            >
              Send message
            </Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col gap-8">
          <div className="bg-gray-100 p-5 rounded-2xl shadow-md">
            <div className="mb-5">
              <CiLocationOn className="text-5xl bg-custom-secondary p-2 rounded-xl" />
            </div>
            <p className="mb-1 font-semibold text-xl">Visit us</p>
            <p className="mb-3 text-gray-500">Visit our office HQ.</p>
            <p className="mb-3 text-custom-orange font-semibold">
              Level One, Base Camp, 49 Jamaica Street L1 0AH Liverpool, United Kingdom
            </p>
          </div>
          <div className="bg-gray-100 p-5 rounded-2xl shadow-md">
            <div className="mb-5">
              <MdEmail className="text-5xl bg-custom-secondary p-2 rounded-xl" />
            </div>
            <p className="mb-1 font-semibold text-xl">Email Us</p>
            <p className="mb-3 text-gray-500">info@thegradstory.co.uk</p>
          </div>
          <div className="bg-gray-100 p-5 rounded-2xl shadow-md">
            <div className="mb-5">
              <BiSolidBuildings className="text-5xl bg-custom-secondary p-2 rounded-xl" />
            </div>
            <p className="mb-1 font-semibold text-xl">Business Enquiries</p>
            <p className="mb-3 text-gray-500">Corporate@thegradatory.co.uk</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
