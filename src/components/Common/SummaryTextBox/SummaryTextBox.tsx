/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../Icons/Icon";
import { FaRegEye } from "react-icons/fa";
import { useAppDispatch } from "hooks/reduxHooks";
import { openResumeModel } from "store/Slices/cvbuilder";
interface ISummaryBox {
  name: string;
  control: any;
  errors: any;
  title?: string;
}
const SummaryTextBox = ({ control, errors, name = "", title }: ISummaryBox) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div>
      {title && (
        <div className="flex justify-between items-center lg:hidden mb-3">
          <button
            className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
            onClick={() => navigate(-1)}
          >
            <span className="pt-1">
              <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
            </span>
          </button>
          <h1 className="text-xl font-semibold lg:hidden">{title}</h1>
          <button
            className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
            onClick={() => dispatch(openResumeModel(true))}
          >
            <span className="pt-1">
              <FaRegEye color="#00000" className="text-2xl" />
            </span>
          </button>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4 hidden lg:flex">{title}</h2>
      {title && (
        <div className="mb-4">
          <label htmlFor="fontFamily" className="block text-lg font-medium text-gray-700">
            Description
          </label>
        </div>
      )}

      <div className="mb-4">
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              placeholder="Enter a description..."
              className="rounded-md bg-white"
            />
          )}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
    </div>
  );
};

export default SummaryTextBox;
