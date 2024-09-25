/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable newline-per-chained-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getAvailableSkillList, getUserProfileSkills } from "api/services/cvbuilder.apis";
import { showToast } from "utils/toastUtils";
import { useAppSelector } from "hooks/reduxHooks";
import { uploadProfileSkills } from "api/services/jobs.api";

interface FormValues {
  industrySkills: { skill: string }[];
  toolsSkills: { skill: string }[];
  otherSkills: { skill: string }[];
}

interface ISkills {
  skillName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Skills = ({
  setSkillData,
  isFromProfile,
  skillsList,
}: {
  setSkillData: any;
  isFromProfile?: boolean;
  skillsList?: any;
}) => {
  const userId = useAppSelector((state) => state.auth.userData?.userid);
  const [skills, setSkills] = useState<ISkills[]>([]);
  // eslint-disable-next-line
  const suggestionIndustryRefs = useRef<any>(null);
  // eslint-disable-next-line
  const suggestionToolsRefs = useRef<any>(null);
  // eslint-disable-next-line
  const suggestionOtherRefs = useRef<any>(null);

  const [industryInput, setIndustryInput] = useState("");
  const [currentActiveSkillsType, setCurrentActiveSkillsType] = useState("");
  const [toolsInput] = useState("");
  const [highlightedIndustryIndex, setHighlightedIndustryIndex] = useState(-1);
  const [highlightedToolsIndex, setHighlightedToolsIndex] = useState(-1);
  const [highlightedOtherIndex, setHighlightedOtherIndex] = useState(-1);
  const [otherInput] = useState("");
  const [searchedIndustrySkills, setSearchedIndustrySkills] = useState<ISkills[]>([]);
  const [searchedToolsTechSkills, setSearchedToolsTechSkills] = useState<ISkills[]>([]);
  const [searchedOtherSkills, setSearchedOtherSkills] = useState<ISkills[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getCurrentSkills = async () => {
    const data = await getUserProfileSkills(userId);
    reset({
      industrySkills: getConvertSkills(data?.industryKnowlageSkills) || [],
      toolsSkills: getConvertSkills(data?.toolsAndTechnolotySkills) || [],
      otherSkills: getConvertSkills(data?.otherSkills) || [],
    });
  };
  useEffect(() => {
    getCurrentSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    fields: industryFields,
    append: industryAppend,
    remove: industryRemove,
  } = useFieldArray({
    control,
    name: "industrySkills",
  });

  interface SkillObject {
    skill: string;
  }
  const convertSkillsArrayToString = (skillsArray: (SkillObject | string)[]): string => {
    return skillsArray
      .map((item) => (typeof item === "object" ? (item as SkillObject).skill : item)) // Extract skill from object or use string directly
      .filter((skill) => skill && skill.trim()) // Filter out empty or whitespace-only strings
      .map((skill) => skill.trim()) // Trim any extra whitespace
      .join(", "); // Join skills with a comma
  };

  useEffect(() => {
    isFromProfile && industryFields && setSkillData(convertSkillsArrayToString(industryFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryFields]);

  useEffect(() => {
    industryFields && industryFields.length == 0 && skillsList && skillsList.length > 0 && skillsList.split(",") && skillsList.split(",").length > 0 && skillsList.split(",").forEach((val: string)=>{
      handleAddSkill("industrySkills", val);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsList]);

  const onSubmit = (data: FormValues) => {
    if (data.industrySkills?.length || data.toolsSkills?.length) {
      const userData = {
        userID: userId,
        industryKnowlageSkills: convertSkillsArrayToString(data.industrySkills),
        toolsAndTechnolotySkills: convertSkillsArrayToString(data.toolsSkills),
        otherSkills: convertSkillsArrayToString(data.otherSkills),
      };

      uploadProfileSkills(userData)
        .then(() => {
          showToast("success", "Profile updated successfully");
        })
        .catch((error) => {
          showToast("error", error.message);
        });
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <div className="items-center grid grid-cols-12 border-b">
        <div className="col-span-12 lg:col-span-4 mt-3">
          <label className="font-semibold lg:my-2" htmlFor="photo">
            Skills
          </label>
        </div>
        <div className="col-span-12 lg:col-span-5 my-4 w-full flex gap-3 justify-around flex-col">
          <div className="flex w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-col lg:flex-row lg:pl-2 overflow-y-scroll custom-scroll flex-1">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 rounded-lg h-full w-full flex flex-col justify-between"
                >
                  <div>
                    <div>
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

                    {/* <div>
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
                                <button
                                  type="button"
                                  onClick={() => toolsRemove(index)}
                                  className="ml-2"
                                >
                                  x
                                </button>
                              </span>
                            )}
                          </>
                        ))}
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
                                <button
                                  type="button"
                                  onClick={() => otherRemove(index)}
                                  className="ml-2"
                                >
                                  x
                                </button>
                              </span>
                            )}
                          </>
                        ))}
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
                    </div> */}
                    <p className="my-3">
                      <span className="font-semibold">Note:</span> Make sure you
                      <span className="font-medium"> PRESS ENTER </span> after write a skill in text
                      box.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Skills;
