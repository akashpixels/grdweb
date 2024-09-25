/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */

export const BASE_URL = "https://thegradstory.in";

export const bannerAPI = `${BASE_URL}/api/Banners`;

export const partnerAPI = `${BASE_URL}/api/Partners`;

export const storiesAPI = `${BASE_URL}/api/Stories`;

export const specificStoryAPI = (id: number) => `${BASE_URL}/api/Stories?${id}`;

export const teamMemberAPI = `${BASE_URL}/api/TeamMembers`;

export const fontAPI = `${BASE_URL}/api/Fonts`;

export const uploadResumeAPI = `${BASE_URL}/api/CVBuilders`;

export const skillsAPI = `${BASE_URL}/api/Skills`;

export const numberAPI = `${BASE_URL}/api/Banners/GetNumbers`;

/** Blog List */
export const blogsAPI = `${BASE_URL}/api/BlogTypes`;

export const gptAPI = "https://api.openai.com/v1/chat/completions";

export const specificBlogCategoryAPI = (id: string) => `${BASE_URL}/api/Blogs/GetBlog?id=${id}`;

export const profileAPI = (id: number | string) =>
  `${BASE_URL}/api/CVBuilders/UpdateCVBuilderProfileImage?id=${id}`;

/** User Login */

export const signUpAPI = `${BASE_URL}/api/Auth/signup`;

export const loginAPI = `${BASE_URL}/api/Auth/login`;

export const changePasswordAPI = `${BASE_URL}/api/Auth/ChangePassword`;

export const deleteUserAPI = `${BASE_URL}/api/Auth/DeleteUser`;

export const forgotAPI = (email: string) => `${BASE_URL}/api/Auth/ForgotPassword?email=${email}`;

/** Jobs & Internship */

export const jobListAPI = `${BASE_URL}/api/Jobs/GetJobs`;

export const bookmarkJobAPI = (jobId: number, Userid: string) =>
  `${BASE_URL}/api/Jobs/Bookmarkjob?JobId=${jobId}&UserID=${Userid}`;

export const cvListAPI = (id: number | string) =>
  `${BASE_URL}/api/CVBuilders/GetCVsByUserid?userid=${id}`;

export const cvCoverListAPI = (id: number | string) =>
  `${BASE_URL}/api/CVBuilders/GetCVCoverLetterByUserID?userid=${id}`;

export const deleteCVAPI = (id: number | string) => `${BASE_URL}/api/CVBuilders/CVDelete?id=${id}`;
export const cvListByAPI = (id: string) => `${BASE_URL}/api/CVBuilders/GetCVByCVID?id=${id}`;

export const postJobAPI = `${BASE_URL}/api/Jobs`;

export const appliedJobAPI = `${BASE_URL}/api/Jobs/GetAppliedJobsByUserID`;

export const filterJobAPI = `${BASE_URL}/api/Jobs/Searchjob`;

export const savedJobAPI = `${BASE_URL}/api/Jobs/GetSavedJobsByUserID`;

export const createCVCoverLetterAPI = `${BASE_URL}/api/CVBuilders/CreateCVCoverLetter`;

/* eslint-disable max-len */
export const getCVCoverLetterAPI = (cvbuilderid: string, coverlatterid: string, userid: string) =>
  `${BASE_URL}/api/CVBuilders/GetCVCoverLetter?cvbuilderid=${cvbuilderid}&coverlatterid=${coverlatterid}&userid=${userid}`;

export const stripUrl = `${BASE_URL}/api/Stripe/api/create-subscription`;

export const fetchTransaction = `${BASE_URL}/api/Stripe/fetch-transaction`;

export const userProfileAPI = `${BASE_URL}/api/Auth/GetUserProfile`;
export const startTrailAPI = `${BASE_URL}/api/Auth/StartTrail`;

// 185b6a38-8ead-4f7e-9c1b-d245d193109a

export const filterJobListAPI = `${BASE_URL}/api/Jobs/GetJobsByFilter`;

export const getUserProfilesDetailsAPI = (userid: string) =>
  `${BASE_URL}/api/UserProfiles/GetUserProfile?userid=${userid}`;
export const getUserEduAndExpDetailsAPI = (userid: string) =>
  `${BASE_URL}/api/UserProfiles/GetPersonalInformation?userid=${userid}`;
export const addUserProfileAPI = `${BASE_URL}/api/UserProfiles/AddUpdateUserProfile`;
export const uploadProfileAPI = `${BASE_URL}/api/UserProfiles/UpdateUserProfileImage`;
export const uploadProfileResumeAPI = `${BASE_URL}/api/UserProfiles/UploadCV`;
export const accountSettingsAPI = `${BASE_URL}/api/UserProfiles/AddUpdateNotificationPreference`;
export const updateUserEduAndExpDetailsAPI = `${BASE_URL}/api/UserProfiles/AddUpdatePersonalInformation`;
export const deleteEducationHistoryByIAPI = (userid: string, userEmploymentHistoryID: string) =>
  `${BASE_URL}/api/UserProfiles/DeleteEducationHistoryByID?UserEducationHistoryID=${userEmploymentHistoryID}&userid=${userid}`;

export const deleteExperienceHistoryByIAPI = (userid: string, userEmploymentHistoryID: string) =>
  `${BASE_URL}/api/UserProfiles/DeleteUserEmploymentHistoryByID?UserEmploymentHistoryID=${userEmploymentHistoryID}&userid=${userid}`;
export const getAccountSettingsAPI = `${BASE_URL}/api/UserProfiles/GetNotificationPreference`;
export const postSkillsData = `${BASE_URL}/api/UserProfiles/GetNotificationPreference`;
export const uploadSkillsAPI = `${BASE_URL}/api/UserProfiles/AddUpdateSkills`;

export const getUserProfileSkillsAPI = (userid: string) =>
  `${BASE_URL}/api/UserProfiles/GetSkills?userid=${userid}`;

export const enquiryAPI = `${BASE_URL}/api/GetInTouches`;

export const getAppliedList = `${BASE_URL}/api/Jobs`;

export const verifyOTPApi = `${BASE_URL}/api/Auth/verifyotp`;

export const resetPasswordAPI = `${BASE_URL}/api/Auth/ResetPassword`;
