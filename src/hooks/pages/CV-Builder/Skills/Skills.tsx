/* eslint-disable newline-per-chained-call */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { getAvailableSkillList, uploadNewResume } from "api/services/cvbuilder.apis";
import { LeftArrow } from "components/Common/Icons/Icon";
import ProgressBar from "components/Common/ProgressBar/ProgressBar";
import TemplateWrapper from "components/Main/CVBuilder/TemplateWrapper/TemplateWrapper";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getSkillsList, openResumeModel, setResumeInfo } from "store/Slices/cvbuilder";
import { showToast } from "utils/toastUtils";
import { FaRegEye } from "react-icons/fa";

interface FormValues {
  industrySkills: { skill: string }[];
  toolsSkills: { skill: string }[];
  otherSkills: { skill: string }[];
}

interface ISkills {
  skillName: string;
}

const SkillsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<ISkills[]>([]);
  // eslint-disable-next-line
  const suggestionIndustryRefs = useRef<any>(null);
  // eslint-disable-next-line
  const suggestionToolsRefs = useRef<any>(null);
  // eslint-disable-next-line
  const suggestionOtherRefs = useRef<any>(null);

  const [industryInput, setIndustryInput] = useState("");
  const resumeData = useAppSelector((state) => state.builder.resumeInfo);
  const userId = useAppSelector((state) => state.auth.userData?.userid);
  const [currentActiveSkillsType, setCurrentActiveSkillsType] = useState("");
  const [toolsInput, setToolsInput] = useState("");
  const [highlightedIndustryIndex, setHighlightedIndustryIndex] = useState(-1);
  const [highlightedToolsIndex, setHighlightedToolsIndex] = useState(-1);
  const [highlightedOtherIndex, setHighlightedOtherIndex] = useState(-1);
  const [otherInput, setOtherInput] = useState("");
  const [searchedIndustrySkills, setSearchedIndustrySkills] = useState<ISkills[]>([]);
  const [searchedToolsTechSkills, setSearchedToolsTechSkills] = useState<ISkills[]>([]);
  const [searchedOtherSkills, setSearchedOtherSkills] = useState<ISkills[]>([]);
  const selectedTemplate = useAppSelector((state) => state.builder.selectedTemplateId);

  const templateData = useAppSelector((state) => state.builder.templateData);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      industrySkills: [],
      toolsSkills: [],
      otherSkills: [],
    },
  });

  const getSkills = async () => {
    const skillsData = await getAvailableSkillList();
    setSkills(skillsData || []);
  };

  const scrollToSuggestion = (index: number) => {
    if (suggestionIndustryRefs?.current && suggestionIndustryRefs.current[index]) {
      suggestionIndustryRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const scrollToSuggestionTools = (index: number) => {
    if (suggestionToolsRefs?.current && suggestionToolsRefs.current[index]) {
      suggestionToolsRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const scrollToSuggestionOther = (index: number) => {
    if (suggestionOtherRefs?.current && suggestionOtherRefs.current[index]) {
      suggestionOtherRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const getConvertSkills = (data: string) => {
    if (data?.length) {
      return data?.split(",").map((item) => {
        return { skill: item };
      });
    }
  };

  useEffect(() => {
    setHighlightedIndustryIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedIndustrySkills]);

  useEffect(() => {
    setHighlightedToolsIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedToolsTechSkills]);

  useEffect(() => {
    setHighlightedOtherIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedOtherSkills]);

  useEffect(() => {
    const handleSearch = () => {
      switch (currentActiveSkillsType) {
        case "industrySkills":
          if (industryInput) {
            const lowercasedKeywordIndustry = industryInput.toLowerCase();
            const matchedIndustrySkills = skills.filter((obj) =>
              JSON.stringify(obj).toLowerCase().includes(lowercasedKeywordIndustry)
            );
            setSearchedIndustrySkills(matchedIndustrySkills || []);
          }
          break;
        case "toolsSkills":
          if (toolsInput) {
            const lowercasedKeywordToolsAndSkills = toolsInput.toLowerCase();
            const matchedToolAndSkills = skills.filter((obj) =>
              JSON.stringify(obj).toLowerCase().includes(lowercasedKeywordToolsAndSkills)
            );
            setSearchedToolsTechSkills(matchedToolAndSkills || []);
          }
          break;
        case "otherSkills":
          if (otherInput) {
            const lowercasedKeywordOtherSkills = otherInput.toLowerCase();
            const matchedToolOtherSkills = skills.filter((obj) =>
              JSON.stringify(obj).toLowerCase().includes(lowercasedKeywordOtherSkills)
            );
            setSearchedOtherSkills(matchedToolOtherSkills || []);
          }
          break;
      }
      setCurrentActiveSkillsType("");
    };
    currentActiveSkillsType && handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryInput, currentActiveSkillsType, toolsInput, otherInput]);

  useEffect(() => {
    if (templateData) {
      reset({
        industrySkills: getConvertSkills(templateData?.industryKnowlageSkills.trim()) || [],
        toolsSkills: getConvertSkills(templateData?.toolsAndTechnolotySkills.trim()) || [],
        otherSkills: getConvertSkills(templateData?.otherSkills.trim()) || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData]);

  const {
    fields: industryFields,
    append: industryAppend,
    remove: industryRemove,
  } = useFieldArray({
    control,
    name: "industrySkills",
  });

  const {
    fields: toolsFields,
    append: toolsAppend,
    remove: toolsRemove,
  } = useFieldArray({
    control,
    name: "toolsSkills",
  });

  const {
    fields: otherFields,
    append: otherAppend,
    remove: otherRemove,
  } = useFieldArray({
    control,
    name: "otherSkills",
  });

  useEffect(() => {
    const industryKnowlageSkills = templateData.industryKnowlageSkills.split(",").filter((val) => {
      if (val && val.trim() !== "") {
        return { skill: val };
      }
    }) as [];
    const toolsAndTechnolotySkills = templateData.toolsAndTechnolotySkills
      .split(",")
      .filter((val) => {
        if (val && val.trim() !== "") {
          return { skill: val };
        }
      }) as [];

    const otherSkills = templateData.otherSkills.split(",").filter((val) => {
      if (val && val.trim() !== "") {
        return { skill: val };
      }
    }) as [];
    industryKnowlageSkills && industryFields?.length == 0 && industryAppend(industryKnowlageSkills);
    toolsAndTechnolotySkills && toolsAppend(toolsAndTechnolotySkills);
    otherSkills && otherAppend(otherSkills);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData]);

  const onSubmit = (data: FormValues) => {
    if (data.industrySkills?.length || data.toolsSkills?.length) {
      const getData = (data: { skill: string }[]) => {
        return data?.map((item) => item.skill).join(",");
      };

      const industrySkills = getData(
        data.industrySkills.filter((val) => {
          if (val?.skill != "") {
            return val;
          }
        })
      );

      const otherDetails = getData(
        data.otherSkills.filter((val) => {
          if (val?.skill != "") {
            return val;
          }
        })
      );

      const toolsSkills = getData(
        data.toolsSkills.filter((val) => {
          if (val?.skill != "") {
            return val;
          }
        })
      );

      const cvBuilderData = getSkillsList({
        industrySkills: industrySkills,
        toolsSkills: toolsSkills,
        otherSkills: otherDetails,
      });

      dispatch(cvBuilderData);
      uploadNewResume({
        ...resumeData,
        industryKnowlageSkills: cvBuilderData?.payload?.industrySkills,
        toolsAndTechnolotySkills: cvBuilderData?.payload?.toolsSkills,
        otherSkills: cvBuilderData?.payload?.otherSkills,
        userID: userId,
      })
        .then((res) => {
          res.userID = userId;
          dispatch(setResumeInfo(res));
        })
        .catch(() => showToast("error", "Something went wrong"));
      navigate("/dashboard/cv-builder/short-bio");
    } else {
      showToast("error", "Add skills each section !");
    }
  };

  const handleAddSkill = (
    category: "industrySkills" | "toolsSkills" | "otherSkills",
    skill: string
  ) => {
    if (skill) {
      const trimedSkills = skill.trim();
      if (trimedSkills == "") {
        return;
      }
      switch (category) {
        case "industrySkills":
          industryAppend({ skill });
          setIndustryInput("");
          setSearchedIndustrySkills([]);
          break;
        case "toolsSkills":
          toolsAppend({ skill });
          setToolsInput("");
          setSearchedToolsTechSkills([]);
          break;
        case "otherSkills":
          otherAppend({ skill });
          setOtherInput("");
          setSearchedOtherSkills([]);
          break;
      }
    }
  };

  const getSkillsType = (type: string) => {
    switch (type) {
      case "industrySkills":
        return searchedIndustrySkills;
      case "toolsSkills":
        return searchedToolsTechSkills;
      case "otherSkills":
        return searchedOtherSkills;
    }
  };

  const setHighlightedSkillsChoice = (type: string, eventType: string) => {
    switch (type) {
      case "industrySkills":
        if (eventType == "ArrowDown") {
          setHighlightedIndustryIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % searchedIndustrySkills?.length;
            scrollToSuggestion(nextIndex);
            return nextIndex;
          });
        }
        if (eventType == "ArrowUp") {
          setHighlightedIndustryIndex((prevIndex) => {
            const nextIndex =
              (prevIndex - 1 + searchedIndustrySkills?.length) % searchedIndustrySkills?.length;
            scrollToSuggestion(nextIndex);
            return nextIndex;
          });
        }
        break;
      case "toolsSkills":
        if (eventType == "ArrowDown") {
          setHighlightedToolsIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % searchedToolsTechSkills?.length;
            scrollToSuggestionTools(nextIndex);
            return nextIndex;
          });
        }
        if (eventType == "ArrowUp") {
          setHighlightedIndustryIndex((prevIndex) => {
            const nextIndex =
              (prevIndex - 1 + searchedIndustrySkills?.length) % searchedIndustrySkills?.length;
            scrollToSuggestionOther(nextIndex);
            return nextIndex;
          });
        }
        break;
      case "otherSkills":
        if (eventType == "ArrowDown") {
          setHighlightedOtherIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % searchedOtherSkills?.length;
            scrollToSuggestion(nextIndex);
            return nextIndex;
          });
        }
        if (eventType == "ArrowUp") {
          setHighlightedOtherIndex((prevIndex) => {
            const nextIndex =
              (prevIndex - 1 + searchedOtherSkills?.length) % searchedOtherSkills?.length;
            scrollToSuggestion(nextIndex);
            return nextIndex;
          });
        }
        break;
    }
  };
  // eslint-disable-next-line
  const handleKeyDown = (e: any, type: string) => {
    const typeOfskills = getSkillsType(type);
    if (typeOfskills && typeOfskills.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        return setHighlightedSkillsChoice(type, "ArrowDown");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        return setHighlightedSkillsChoice(type, "ArrowUp");
      } else if (e.key === "Enter") {
        e.preventDefault();
        switch (type) {
          case "industrySkills":
            if (highlightedIndustryIndex >= 0) {
              handleAddSkill(
                "industrySkills",
                searchedIndustrySkills[highlightedIndustryIndex]?.skillName
              );
            }
            break;
          case "toolsSkills":
            if (highlightedToolsIndex >= 0) {
              handleAddSkill(
                "toolsSkills",
                searchedToolsTechSkills[highlightedToolsIndex]?.skillName
              );
            }
            break;
          case "otherSkills":
            if (highlightedOtherIndex >= 0) {
              handleAddSkill("otherSkills", searchedOtherSkills[highlightedOtherIndex]?.skillName);
            }
            break;
        }
        setHighlightedIndustryIndex(-1);
        setHighlightedToolsIndex(-1);
        setHighlightedOtherIndex(-1); // Reset the highlighted index after selection
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault();
        switch (type) {
          case "industrySkills":
            handleAddSkill("industrySkills", industryInput);
            break;
          case "toolsSkills":
            handleAddSkill("toolsSkills", toolsInput);
            break;
          case "otherSkills":
            handleAddSkill("otherSkills", otherInput);
            break;
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="hidden lg:flex">
        <ProgressBar />
      </div>
      <div className="flex flex-col lg:flex-row md:pl-6 overflow-y-scroll custom-scroll flex-1">
        <div className="flex flex-col w-full lg:w-1/2 md:p-6 h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg h-full flex flex-col justify-between p-2 md:p-0"
          >
            <div>
              <div>
                <div className="flex justify-between items-center lg:hidden mb-3">
                  <button
                    className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                    onClick={() => navigate(-1)}
                  >
                    <span className="pt-1">
                      <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
                    </span>
                  </button>
                  <h1 className="text-xl font-semibold lg:hidden">Skills</h1>
                  <button
                    className="border-2 flex items-center border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md"
                    onClick={() => dispatch(openResumeModel(true))}
                  >
                    <span className="pt-1">
                      <FaRegEye color="#00000" className="text-2xl" />
                    </span>
                  </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4 hidden lg:flex">Skills</h2>
                <h2 className="text-lg font-medium mb-2 text-gray-600">Industry Knowledge</h2>
                {industryFields?.length ? (
                  <div className="flex flex-wrap gap-2 my-4">
                    {industryFields.map((field, index) => (
                      <>
                        {field?.skill && field.skill.trim() !== "" && (
                          <span
                            key={field.id}
                            className="flex items-center bg-white text-gray-600 px-3 py-1 border border-gray-600 rounded-md"
                          >
                            {field.skill}
                            <button
                              type="button"
                              onClick={() => industryRemove(index)}
                              className="ml-2"
                            >
                              x
                            </button>
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                ) : null}

                <div className="mb-2 text-gray-500">
                  <label htmlFor="skills">Type to add Skills</label>
                </div>
                <input
                  type="text"
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full input-focused"
                  placeholder="Add Skills"
                  onKeyDown={(e) => {
                    setCurrentActiveSkillsType("industrySkills");
                    handleKeyDown(e, "industrySkills");
                  }}
                />
                {searchedIndustrySkills && searchedIndustrySkills.length > 0 && (
                  <ul className="suggestions border border-gray-300 ">
                    {searchedIndustrySkills.map((skills, index) => (
                      <li
                        className={`p-2 rounded w-full input-focused ${
                          highlightedIndustryIndex === index ? "bg-gray-200" : ""
                        }`}
                        key={index}
                        ref={(el) => {
                          if (
                            suggestionIndustryRefs?.current &&
                            suggestionIndustryRefs.current[index] &&
                            suggestionIndustryRefs.current[index] &&
                            el
                          ) {
                            suggestionIndustryRefs.current[index] = el;
                          }
                        }}
                        onClick={() => handleAddSkill("industrySkills", skills?.skillName)}
                        onMouseEnter={() => setHighlightedIndustryIndex(index)}
                      >
                        {skills?.skillName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-600 mb-2 mt-2">
                  Tools and Technology
                </h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {toolsFields.map((field, index) => (
                    <>
                      {field?.skill && field.skill.trim() !== "" && (
                        <span
                          key={field.id}
                          className="flex items-center bg-white text-gray-600 px-3 py-1 border border-gray-600 rounded-md"
                        >
                          {field.skill}
                          <button type="button" onClick={() => toolsRemove(index)} className="ml-2">
                            x
                          </button>
                        </span>
                      )}
                    </>
                  ))}
                </div>
                <div className="mb-2 text-gray-500">
                  <label htmlFor="skills">Type to add Skills</label>
                </div>
                <input
                  type="text"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Add Skills"
                  onKeyDown={(e) => {
                    setCurrentActiveSkillsType("toolsSkills");
                    handleKeyDown(e, "toolsSkills");
                  }}
                />
                {searchedToolsTechSkills && searchedToolsTechSkills.length > 0 && (
                  <ul className="suggestions border border-gray-300 ">
                    {searchedToolsTechSkills.map((skills, index) => (
                      <li
                        className={`p-2 rounded w-full input-focused ${
                          highlightedToolsIndex === index ? "bg-gray-200" : ""
                        }`}
                        key={index}
                        ref={(el) => {
                          if (
                            suggestionToolsRefs?.current &&
                            suggestionToolsRefs.current[index] &&
                            suggestionToolsRefs.current[index] &&
                            el
                          ) {
                            suggestionToolsRefs.current[index] = el;
                          }
                        }}
                        onClick={() => handleAddSkill("toolsSkills", skills?.skillName)}
                        onMouseEnter={() => setHighlightedToolsIndex(index)}
                      >
                        {skills?.skillName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2 text-gray-600 mt-2">Other Skills</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {otherFields.map((field, index) => (
                    <>
                      {field?.skill && field.skill.trim() !== "" && (
                        <span
                          key={field.id}
                          className="flex items-center bg-white text-gray-600 px-3 py-1 border border-gray-600 rounded-md"
                        >
                          {field.skill}
                          <button type="button" onClick={() => otherRemove(index)} className="ml-2">
                            x
                          </button>
                        </span>
                      )}
                    </>
                  ))}
                </div>
                <div className="mb-2 text-gray-500">
                  <label htmlFor="skills">Type to add Skills</label>
                </div>

                <input
                  type="text"
                  value={otherInput}
                  onChange={(e) => setOtherInput(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Add Skills"
                  onKeyDown={(e) => {
                    setCurrentActiveSkillsType("otherSkills");
                    handleKeyDown(e, "otherSkills");
                  }}
                />
                {searchedOtherSkills && searchedOtherSkills.length > 0 && (
                  <ul className="suggestions border border-gray-300 ">
                    {searchedOtherSkills.map((skills, index) => (
                      <li
                        className={`p-2 rounded w-full input-focused ${
                          highlightedOtherIndex === index ? "bg-gray-200" : ""
                        }`}
                        key={index}
                        ref={(el) => {
                          if (
                            suggestionOtherRefs?.current &&
                            suggestionOtherRefs.current[index] &&
                            suggestionOtherRefs.current[index] &&
                            el
                          ) {
                            suggestionOtherRefs.current[index] = el;
                          }
                        }}
                        onClick={() => handleAddSkill("otherSkills", skills?.skillName)}
                        onMouseEnter={() => setHighlightedOtherIndex(index)}
                      >
                        {skills?.skillName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="my-3">
                <span className="font-semibold">Note:</span> Make sure you
                <span className="font-medium"> PRESS ENTER </span> after write a skill in text box.
              </p>
            </div>

            <div className="flex justify-center lg:justify-between items-center mt-5">
              <div className="hidden lg:flex justify-center">
                <button
                  className="border-2 border-custom-secondary px-3 py-2 bg-white rounded-lg shadow-md flex items-center"
                  onClick={() => navigate(-1)}
                >
                  <span className="pt-1 mr-2">
                    <LeftArrow width="25px" height="25px" color="#00000" viewBox="0 0 400 400" />
                  </span>
                  <span className="lg:hidden">Back</span>
                  <span className="hidden lg:block">Back to previous section</span>
                </button>
              </div>
              <button type="submit" className="px-4 py-3 bg-yellow-500 text-white rounded-md">
                Save and Next
              </button>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-1/2 py-6 pr-6 bg-gray-50 hidden lg:flex">
          <TemplateWrapper templateName={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
