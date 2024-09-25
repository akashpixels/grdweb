export interface IProfile {
  fontID: string;
  profileImage?: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  emailID: string;
  mobileNo: string;
}


export interface IShortBio {bio: string, cvBuilderID: number}

export interface IUserProfile extends IProfile {
  description: string;
  experiences: WorkExperience[];
  education: EducationExperience[];
  skills: ISkills;
}

export interface WorkExperience {
  stillWorkHere: boolean;
  experienceSummary: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
}

export interface EducationExperience {
  stillStudyingHere: boolean;
  educationSummary: string;
  courseName: string;
  university: string;
  startDate: string;
  endDate: string;
}

export interface ISkills {
  skillName?: string | undefined;
  skillsName?: string | undefined;
  industrySkills: string;
  toolsSkills?: string;
  otherSkills?: string;
}

/** */

export interface EmploymentHistory {
  cvEmploymentHistoryID: number;
  cvBuilderID: number;
  position: string;
  companyName: string;
  startDate: string;
  endDate: string;
  experienceSummary: string;
  isStillWorkHere: boolean;
}

export interface EducationHistory {
  unquieId: string | number;
  cvEducationHistoryID?: number;
  cvBuilderID?: number;
  courseName: string;
  university: string;
  startDate: string;
  endDate?: string;
  experienceSummary: string;
  isStillStudyHere: boolean;
}

export interface CvSkill {
  cvSkillID: number;
  cvBuilderID: number;
  skillType: string;
  skills: string;
  level: string;
}

export interface IResumeData {
  profile?: string | undefined;
  employment?: never[] | undefined;
  description?: string;
  skills?: object;
  experience?: never[];
  education?: never[];
  email?: "";
  contact?: "";
  cvBuilderID: number | string;
  userID: string;
  fontID: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  emailID: string;
  mobileNo: string;
  address: string;
  links: string;
  isDraft: boolean;
  countryCode?: string;
  bio: string;
  industryKnowlageSkills: string;
  toolsAndTechnolotySkills: string;
  otherSkills: string;
  cvEmploymentHistories: EmploymentHistory[];
  cvEducationHistories: EducationHistory[];
}
