/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { removeCVBuilderData } from "api/services/localServices.service";
import businessWomen from "assets/businesswoman.jpg";
import {
  EducationHistory,
  EmploymentHistory,
  IProfile,
  IResumeData,
  ISkills,
} from "interface/Client/cvbuilder";
import { USER_ID } from "utils/constant";

export interface IUserBio {
  cvBioID: number;
  fontID: string;
  cvBuilderID: number;
  description: string;
}
export interface builderState {
  cvName: string;
  isStepModel: boolean;
  resumeModel: boolean;
  resumeInfo: IResumeData;
  templateData: IResumeData;
  selectedTemplateId: string;
  fontName: string;
}

export interface ICvSkill {
  cvSkillID: number;
  cvBuilderID: number;
  skillType: string;
  skills: string;
  level: string;
}

const initialState: builderState = {
  cvName: "",
  isStepModel: true,
  fontName: "Poppins",
  resumeModel: false,
  selectedTemplateId: "",
  templateData: {
    cvBuilderID: 0,
    userID: "",
    fontID: "0",
    profileImage: businessWomen,
    firstName: "Rosemarie",
    lastName: "Rogi",
    jobTitle: "Web-Designer",
    emailID: "rosmariesotogmail.com",
    mobileNo: "+918806122308",
    address: "",
    links: "",
    isDraft: true,
    bio: "<div>Graphic designer with 8+ years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as well as web designing and coding (HTML, CSS, JavaScript).</div>",
    industryKnowlageSkills: "",
    toolsAndTechnolotySkills: "",
    otherSkills: "",
    cvEmploymentHistories: [
      {
        cvEmploymentHistoryID: 0,
        cvBuilderID: 0,
        position: "UI Designer at Market Studios",
        companyName: "Google India Pvt Ltd",
        startDate: "06-12-12",
        endDate: "06-12-12",
        experienceSummary:
          "Designed user interfaces and collaborated with developers to create engaging user experiences.",
        isStillWorkHere: false,
      },
      {
        cvEmploymentHistoryID: 0,
        cvBuilderID: 0,
        position: "Graphic Designer at Freelance",
        companyName: "Google India Pvt Ltd",
        startDate: "06-12-12",
        endDate: "06-12-12",
        experienceSummary:
          "Designed user interfaces and collaborated with developers to create engaging user experiences.",
        isStillWorkHere: false,
      },
    ],
    cvEducationHistories: [
      {
        cvEducationHistoryID: 0,
        cvBuilderID: 0,
        courseName: "Bachelor of Fine Arts in Graphic Design",
        university: "Los Angeles University",
        startDate: "06-12-12",
        endDate: "06-12-12",
        experienceSummary:
          "Designed user interfaces and collaborated with developers to create engaging user experiences.",
        isStillStudyHere: false,
        unquieId: "",
      },
      {
        cvEducationHistoryID: 0,
        cvBuilderID: 0,
        courseName: "Bachelor of Fine Arts in Graphic Design",
        university: "Los Angeles University",
        startDate: "06-12-12",
        endDate: "06-12-12",
        experienceSummary:
          "Designed user interfaces and collaborated with developers to create engaging user experiences.",
        isStillStudyHere: false,
        unquieId: "",
      },
    ],
  },
  resumeInfo: {
    cvBuilderID: 0,
    userID: USER_ID,
    fontID: "0",
    jobTitle: "",
    firstName: "",
    lastName: "",
    emailID: "",
    mobileNo: "",
    address: "",
    links: "",
    isDraft: true,
    countryCode: "91",
    profileImage: "",
    industryKnowlageSkills: "",
    toolsAndTechnolotySkills: "",
    otherSkills: "",
    bio: "",
    cvEmploymentHistories: [],
    cvEducationHistories: [],
  },
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    getProfileDetails: (state, action: PayloadAction<IProfile>) => {
      state.resumeInfo = {
        ...state.resumeInfo,
        ...action.payload,
      };
      state.templateData = {
        ...state.templateData,
        ...action.payload,
      };
    },
    getProfessionalSummary: (state, action: PayloadAction<string>) => {
      state.resumeInfo = {
        ...state.resumeInfo,
        bio: action.payload,
      };
      state.templateData = {
        ...state.templateData,
        bio: action.payload,
      };
    },
    getExperienceList: (state, action: PayloadAction<EmploymentHistory[]>) => {
      state.resumeInfo = {
        ...state.resumeInfo,
        cvEmploymentHistories: action.payload,
      };
      state.templateData = {
        ...state.templateData,
        cvEmploymentHistories: action.payload,
      };
    },
    getEducationList: (state, action: PayloadAction<EducationHistory[]>) => {
      state.resumeInfo = {
        ...state.resumeInfo,
        cvEducationHistories: action.payload,
      };
      state.templateData = {
        ...state.templateData,
        cvEducationHistories: action.payload,
      };
    },
    getSkillsList: (state, action: PayloadAction<ISkills>) => {
      state.templateData = {
        ...state.templateData,
        industryKnowlageSkills: action.payload.industrySkills,
        toolsAndTechnolotySkills: action.payload.toolsSkills || "",
        otherSkills: action.payload.otherSkills || "",
      };
      state.resumeInfo = {
        ...state.resumeInfo,
        industryKnowlageSkills: action.payload.industrySkills,
        toolsAndTechnolotySkills: action.payload.toolsSkills || "",
        otherSkills: action.payload.otherSkills || "",
      };
    },
    getSelectedTemplateId: (state, action: PayloadAction<string>) => {
      state.selectedTemplateId = action.payload;
    },
    getFontNames: (state, action: PayloadAction<{ fontID: string; label: string }>) => {
      state.fontName = action.payload.label;
      state.resumeInfo.fontID = action.payload.fontID;
    },
    clearState: (state) => {
      removeCVBuilderData();
      state.resumeInfo = initialState.resumeInfo;
      state.templateData = initialState.templateData;
    },
    getDeleteEducationDetails: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const stateData = state.resumeInfo.cvEducationHistories;
      state.resumeInfo.cvEducationHistories = stateData.filter((_: any, i: number) => i !== id);
    },
    getDeleteExperienceDetails: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const stateData = state.resumeInfo.cvEmploymentHistories;
      state.resumeInfo.cvEmploymentHistories = stateData.filter((_: any, i: number) => i !== id);
    },
    setResumeInfo: (state, action: PayloadAction<IResumeData>) => {
      state.resumeInfo = action.payload;
    },
    setTemplateData: (state, action: PayloadAction<IResumeData>) => {
      state.templateData = action.payload;
    },
    setByStepModelOpen: (state, action: PayloadAction<boolean>) => {
      state.isStepModel = action.payload;
    },
    openResumeModel: (state, action: PayloadAction<boolean>) => {
      state.resumeModel = action.payload;
    },
    getCVName: (state, action: PayloadAction<string>) => {
      state.cvName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getProfileDetails,
  getProfessionalSummary,
  getExperienceList,
  getEducationList,
  getSkillsList,
  clearState,
  getSelectedTemplateId,
  getFontNames,
  getDeleteEducationDetails,
  getDeleteExperienceDetails,
  setResumeInfo,
  setTemplateData,
  setByStepModelOpen,
  openResumeModel,
  getCVName,
} = builderSlice.actions;

export default builderSlice.reducer;
