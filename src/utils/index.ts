/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { IResumeData } from "interface/Client/cvbuilder";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export const formateDate = () => {
  const currentDate: Date = new Date();

  const day: number = currentDate.getDate();
  const month: number = currentDate.getMonth() + 1;
  const year: number = currentDate.getFullYear();

  const formattedDay: string = day < 10 ? "0" + day : day.toString();
  const formattedMonth: string = month < 10 ? "0" + month : month.toString();

  const formattedDate: string = `${formattedMonth}-${formattedDay}-${year}`;

  return formattedDate;
};

export const templateName: { [key: string]: number } = {
  Elegant: 1,
  Creative: 2,
  Attractive: 3,
  NatureCool: 4,
};

export const templateIdFromName: any = {
  1: "Elegant",
};

/**
 * Converts a date string from "YYYY-MM-DD" format to "MMM YYYY" format.
 * @param {string} dateString - The date string in "YYYY-MM-DD" format.
 * @returns {string} - The formatted date string in "MMM YYYY" format.
 */
export function formatResumeDate(dateString: string) {
  // Array of month abbreviations
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month] = dateString.split("-");

  const monthIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[monthIndex];

  return `${monthName || ""} ${year || ""}`;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

// eslint-disable-next-line
export const generateEducation = (userData: any) => {
  if (userData && Array.isArray(userData)) {
    // eslint-disable-next-line
    const education = userData.map((val: any) => ({
      cvEducationHistoryID: 0,
      cvBuilderID: 0,
      courseName: val?.degree || val?.course || "",
      university: val?.university || val?.college || val?.institution || "",
      startDate: val?.startDate || val?.duration || val?.from || "",
      endDate: val?.endDate || val?.to || "",
      experienceSummary: "",
      isStillStudyHere: false,
    }));
    return education;
  } else {
    if ((userData && userData?.degree !== "") || userData?.university !== "") {
      const education = [
        {
          cvEducationHistoryID: 0,
          cvBuilderID: 0,
          courseName: userData?.degree,
          university: userData?.university,
          startDate: userData?.startDate,
          endDate: userData?.endDate,
          experienceSummary: "",
          isStillStudyHere: userData?.endDate !== "" ? true : false,
        },
      ];
      return education;
    } else if (userData && userData.split(",") && userData.split(",").length > 0) {
      const stringUserData = userData.split(",");
      const education = [
        {
          cvEducationHistoryID: 0,
          cvBuilderID: 0,
          courseName: stringUserData[0],
          university: stringUserData[1],
          startDate: "",
          endDate: "",
          experienceSummary: "",
          isStillStudyHere: false,
        },
      ];
      return education;
    }
    return [];
  }
};

// eslint-disable-next-line
export const generateEmployment = (userData: any) => {
  if (userData && Array.isArray(userData)) {
    const employment = userData.map((val) => ({
      cvEmploymentHistoryID: 0,
      cvBuilderID: 0,
      position: val?.title || val?.position || "",
      companyName: val?.company || val?.organization || "",
      startDate: val?.from || val?.startDate || val?.duration || "",
      endDate: val?.to || val?.endDate || "",
      experienceSummary: "",
      isStillWorkHere: true,
    }));
    return employment;
  } else {
    if ((userData && userData?.company !== "") || userData?.position !== "") {
      const employment = [
        {
          cvEmploymentHistoryID: 0,
          cvBuilderID: 0,
          position: userData?.position || userData?.experience || "",
          companyName: userData?.company || "",
          startDate: userData?.startDate || "",
          endDate: userData?.endDate || "",
          experienceSummary: "",
          isStillWorkHere: userData?.endDate !== "" ? true : false,
        },
      ];
      return employment;
    } else if (userData && userData.split(",") && userData.split(",").length > 0) {
      const stringUserData = userData.split(",");
      const employment = [
        {
          cvEmploymentHistoryID: 0,
          cvBuilderID: 0,
          position: stringUserData[0] || "",
          companyName: stringUserData[1] || "",
          startDate: "",
          endDate: "",
          experienceSummary: "",
          isStillWorkHere: true,
        },
      ];
      return employment;
    }
    return [];
  }
};

// eslint-disable-next-line
const getSKills = (userData: any) => {
  if (Object.entries(userData).length == 0) {
    return "";
  }
  const skills: string[] = [];
  Object.entries(userData).forEach((val) => {
    if (Array.isArray(val)) {
      skills.push(val.toString());
    }
  });
  // return skills && skills.toString();
  return "";
};

export function generateRandomAlphaNumeric() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export const refreshPage = () => {
  window.location.reload();
};

export const createResumeInfo = (userData: IResumeData) => {
  const linksData =
    (userData?.links &&
      Object.values(userData?.links).length > 0 &&
      Object.values(userData.links).toString()) ||
    "";
  const updatedResumeData = {
    userID: "123",
    fontID: "0",
    jobTitle: userData?.jobTitle || "",
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    emailID: userData?.email || "",
    mobileNo: userData?.contact || "",
    address: userData?.address || "",
    // links: (userData?.links && String(userData?.links)) || "",
    links: linksData || "",
    isDraft: false,
    profileImage: "",
    industryKnowlageSkills: getSKills(userData?.skills || {}),
    toolsAndTechnolotySkills: "",
    otherSkills: "",
    bio: userData?.description || userData?.profile || userData?.bio || "",
    cvEmploymentHistories: generateEmployment(
      userData?.experience && userData?.experience.length > 0
        ? userData?.experience
        : userData?.employment || []
    ),
    cvEducationHistories: generateEducation(userData?.education || []),
  } as unknown as IResumeData;
  return updatedResumeData;
};

export const getPrompt = (type: string | undefined) => {
  switch (type) {
    case "userDetails":
      // eslint-disable-next-line max-len
      return "Create a JSO user with , 'education',  'projects', 'total_year_experience', 'experience', 'skills', 'skills.languages', 'skills.industry', 'skills.technology', 'skills.other', 'skills.frontEnd',  'skills.backEnd',  'skills.other', 'employment']";
    // return "Create a JSON with all this fields in a proper JSON format with all the user with this parameters [  'firstName', 'lastName', 'jobTitle', 'email', 'profile', 'bio', 'contact', 'address', 'links', description', 'skills', skills.industry, skills.technology, skills.other, 'skills.languages',  'skills.frontEnd',  'skills.backEnd',  'skills.other',  'experience', 'employment',  'education',  'projects', 'total_year_experience']";
    case "profileSummary":
      return "Write f";
    case "coverLetter":
      return "Create";
    case "checkATSscore":
      return "Plea";
    case "getFeedBack":
      return "Checkdetails in 100 words in bullet points. Return response in HTML";
    // return "Check my details and based on that provide a feedback what can i add and improve in my details in 100 words. Return response in bullet points and style it properly in HTML and css";
  }
};

export const generateGPTPayload = (text: string, type: string) => {
  const payload = {
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: getPrompt("data"),
          },
        ],
      },
    ],
    temperature: type == "checkATSscore" ? 0.5 : 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    seed: null,
    model: "gpt-3.5-turb76",
    stream: false,
  };
  return payload;
};

// eslint-disable-next-line no-unused-vars
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
  // eslint-disable-next-line no-unused-vars
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export default debounce;

export function timeUntilJobPosted(data: string): string {
  return data;
}

export function convertToISO(dateString: string) {
  // Parse the input date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // e.g., "Saturday"
    day: "2-digit", // e.g., "03"
    month: "short", // e.g., "Aug"
    year: "numeric", // e.g., "2024"
  };

  // Format the date using toLocaleDateString
  return date.toLocaleDateString("en-GB", options);
}
