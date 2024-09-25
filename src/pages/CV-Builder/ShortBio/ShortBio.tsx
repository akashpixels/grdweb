/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { LeftArrow } from "components/Common/Icons/Icon";
import ProgressBar from "components/Common/ProgressBar/ProgressBar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getProfessionalSummary } from "store/Slices/cvbuilder";
import { showToast } from "utils/toastUtils";
import SummaryTextBox from "components/Common/SummaryTextBox/SummaryTextBox"; // Adjust the import path accordingly
import { generateGPTPayload } from "utils";
import { getDataFromDoc } from "api/services/gpt.api";
import { uploadNewResume } from "api/services/cvbuilder.apis";

interface FormValues {
  bio: string;
}

const ShortBio = () => {
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userData?.userid);

  const [suggestionData, setSuggestionData] = useState<string[]>([]);
  const getSuggestion = async (resumeInfo: any) => {
    const text = `Name : ${resumeInfo.firstName} ${resumeInfo.lastName}, Job : ${resumeInfo.jobTitle}`;
    const payload = await generateGPTPayload(text, "profileSummary");
    const suggestion = await getDataFromDoc(payload);
    const suggestionData = JSON.parse(suggestion.choices[0].message.content);
    suggestionData && setSuggestionData(suggestionData);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      bio: resumeData?.bio || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    if (data && data.bio?.length > 10) {
      dispatch(getProfessionalSummary(data.bio));
      uploadNewResume({ ...resumeData, isDraft: false, bio: data?.bio, userID: userId })
        .then(() => {
          navigate("/dashboard/cv-builder/your-resume");
        })
        .catch(() => showToast("error", "Something went wrong"));
    } else {
      showToast("error", "Description should be more than 10 characters!");
    }
  };

  useEffect(() => {
    if (resumeData?.bio) {
      setValue("bio", resumeData.bio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData]);

  useEffect(() => {
    resumeData && getSuggestion(resumeData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * 5);
    setValue("bio", suggestionData[randomIndex]);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="hidden lg:flex">
        <ProgressBar />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-scroll custom-scroll flex-1">
        <div className="flex flex-col lg:flex-row md:pl-6 h-full p-4 md:pr-0 md:py-0">
          <div className="flex flex-col w-full lg:w-1/2 md:p-6 justify-between h-full">
            <div>
              <SummaryTextBox
                title="Professional Summary"
                name="bio"
                control={control}
                errors={errors}
              />
              <button
                className="mt-3 flex lg:hidden items-center underline text-custom-secondary font-semibold"
                onClick={(event) => {
                  event.preventDefault();
                  showSuggestion();
                }}
                disabled={suggestionData && suggestionData.length > 0 ? false : true}
              >
                {suggestionData && suggestionData.length > 0
                  ? "Suggest Professional Summary"
                  : "...Wait Suggestion loading"}
              </button>
            </div>

            <div className="flex justify-center lg:justify-between item-center gap-1">
              <div className="flex justify-center">
                <button
                  className="border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md lg:flex items-center hidden"
                  onClick={() => navigate(-1)}
                >
                  <span className="pt-1 mr-2">
                    <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
                  </span>
                  <span className="lg:hidden">Back</span>
                  <span className="hidden lg:block">Back</span>
                </button>
              </div>
              <button
                className="px-4 py-2 hidden lg:flex border-2 border-custom-secondary bg-white rounded-lg shadow-md items-center"
                onClick={(event) => {
                  event.preventDefault();
                  showSuggestion();
                }}
                disabled={suggestionData && suggestionData.length > 0 ? false : true}
              >
                {suggestionData && suggestionData.length > 0
                  ? "Suggest Professional Summary"
                  : "...Wait Suggestion loading"}
              </button>
              <button type="submit" className="px-4 py-3 bg-yellow-500 text-white rounded-md">
                Save and Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShortBio;
