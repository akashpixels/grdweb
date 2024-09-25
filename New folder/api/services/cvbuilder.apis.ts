/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fontAPI,
  skillsAPI,
  uploadResumeAPI,
  profileAPI,
  cvListAPI,
  cvListByAPI,
  deleteCVAPI,
  createCVCoverLetterAPI,
  getCVCoverLetterAPI,
  getUserProfilesDetailsAPI,
  addUserProfileAPI,
  getUserEduAndExpDetailsAPI,
  deleteEducationHistoryByIAPI,
  deleteExperienceHistoryByIAPI,
  getUserProfileSkillsAPI,
  cvCoverListAPI,
} from "api/apis";
import axios from "axios";
import { IFont } from "interface/Server/Home";

/**  Font **/
export const getFonts = (): Promise<IFont[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(fontAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getCvCoverLetter = (
  cvbuilderid: string,
  coverlatterid: string,
  userid: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(getCVCoverLetterAPI(cvbuilderid, coverlatterid, userid))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getUserProfilesDetails = (userid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(getUserProfilesDetailsAPI(userid))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getUserEduAndExpDetails = (userid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(getUserEduAndExpDetailsAPI(userid))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getUserProfileSkills = (userid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(getUserProfileSkillsAPI(userid))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
/* eslint-disable max-len */
export const deleteEducationHistoryByEducationHistory = (
  userid: string,
  userEmploymentHistoryID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(deleteEducationHistoryByIAPI(userid, userEmploymentHistoryID))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const deleteExperienceHistoryByEducationHistory = (
  userid: string,
  userEmploymentHistoryID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(deleteExperienceHistoryByIAPI(userid, userEmploymentHistoryID))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getCvList = (id: string): Promise<[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(cvListAPI(id))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getCoverList = (id: string): Promise<[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(cvCoverListAPI(id))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getCvById = (id: string): Promise<[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(cvListByAPI(id))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getAvailableSkillList = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(skillsAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const uploadNewResume = (resumeData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(uploadResumeAPI, resumeData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const addUserProfileDetails = (profileDetails: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(addUserProfileAPI, profileDetails)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const createCVCoverLetter = (coverLetter: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(createCVCoverLetterAPI, coverLetter)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const deleteCv = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(deleteCVAPI(id))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const uploadProfileImg = (userid: string, formData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(profileAPI(userid), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
