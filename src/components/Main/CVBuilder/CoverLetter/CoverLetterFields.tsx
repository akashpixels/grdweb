/* eslint-disable max-len */
/* eslint-disable no-console */
import { createCVCoverLetter } from "api/services/cvbuilder.apis";
import { LeftArrow } from "components/Common/Icons/Icon";
import { useAppSelector } from "hooks/reduxHooks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SummaryTextBox } from "routes/routes";
import { coverLetterData } from "store/Slices/coverletter.slice";
import { showToast } from "utils/toastUtils";

interface FormValues {
  coverText: string;
  companyDetails: string;
}

const CoverLetterFields = () => {
  const coverLetterTemplateData = useAppSelector((state) => state.coverLetter.coverletterData);
  const authData = useAppSelector((state) => state.auth.userData);
  const resumeInfoData = useAppSelector((state) => state.builder.resumeInfo);
  const queryParams = new URLSearchParams(location.search);
  const cvCoverLetterID = queryParams.get("cvCoverLetterID");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      coverText: "",
      companyDetails: "",
    },
  });

  useEffect(() => {
    setValue("coverText", coverLetterTemplateData.html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverLetterTemplateData]);

  const setCoverLetterData = async (data: FormValues) => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();
    const coverData = {
      cvCoverLetterID: cvCoverLetterID || 0,
      userID: authData.userid,
      cvBuilderID: resumeInfoData.cvBuilderID || 0,
      to: `${resumeInfoData.jobTitle} cover letter`,
      toDescription: `${resumeInfoData.jobTitle} cover description`,
      coverLetterTitle: `${resumeInfoData.jobTitle} cover title`,
      coverLetterDescription: data.coverText,
      createdDate: formattedDateTime,
    };
    await createCVCoverLetter(coverData);
    navigate("/dashboard/cv-builder/your-resume?showCoverLetter=true");
  };

  const onSubmit = (data: FormValues) => {
    if (data.coverText.length > 10) {
      setCoverLetterData(data);
    } else {
      showToast("error", "Description should be more than 50 characters!");
    }
  };

  const updateCoverLetterDetail = () => {
    const data = getValues();
    dispatch(coverLetterData({ html: data?.coverText, id: coverLetterTemplateData.id }));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-scroll custom-scroll flex-1">
        <div className="flex flex-col lg:flex-row h-full w-full">
          <div className="flex flex-col w-full justify-between h-full">
            <div>
              <SummaryTextBox name="coverText" control={control} errors={errors} />
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
              onClick={updateCoverLetterDetail}
            >
              Update
            </button>

            <div className="flex justify-between items-center mt-4">
              <div className="flex justify-center">
                <button
                  type="button"
                  className="border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md flex items-center"
                  onClick={() => navigate(-1)}
                >
                  <span className="pt-1 mr-2">
                    <LeftArrow width="25px" height="25px" color="#000000" viewBox="0 0 400 400" />
                  </span>
                  <span className="lg:hidden">Back</span>
                  <span className="hidden lg:block">Back to previous section</span>
                </button>
              </div>
              <div>
                <button type="submit" className="px-4 py-3 bg-yellow-500 text-white rounded-md">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CoverLetterFields;
