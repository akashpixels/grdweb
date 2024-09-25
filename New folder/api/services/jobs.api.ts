/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { httpApi } from "api/Http.api";
import {
  accountSettingsAPI,
  appliedJobAPI,
  bookmarkJobAPI,
  filterJobAPI,
  filterJobListAPI,
  getAccountSettingsAPI,
  getAppliedList,
  jobListAPI,
  postJobAPI,
  savedJobAPI,
  updateUserEduAndExpDetailsAPI,
  uploadProfileAPI,
  uploadProfileResumeAPI,
  uploadSkillsAPI,
} from "api/apis";
import { IJobList } from "interface/Server/jobs";
import { IFilterJobList } from "store/Slices/api.slice";

export const fetchJobList = (
  userId: string,
  PageNo: number,
  PageSize: number
): Promise<IFilterJobList> => {
  return new Promise((resolve, reject) => {
    httpApi
      .get(jobListAPI, {
        params: {
          userid: userId,
          PageNo: PageNo,
          PageSize: PageSize,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const bookmarkJob = (jobId: number, UserID: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(bookmarkJobAPI(jobId, UserID))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

/** POST jOB */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyForJob = (jobData: any): Promise<IJobList> => {
  const headers = {
    "Content-Type": "multipart/form-data",
    accept: "text/plain",
  };
  return new Promise((resolve, reject) => {
    httpApi
      .post(postJobAPI, jobData, { headers })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appliedJobList = (UserID: string, pageNumber: number, size: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .get(appliedJobAPI, {
        params: {
          userid: UserID,
          PageNo: pageNumber,
          PageSize: size,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterJobListing = (filterData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(filterJobAPI, filterData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const savedJobList = (UserID: string, pageNumber: number, size: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .get(savedJobAPI, {
        params: {
          userid: UserID,
          PageNo: pageNumber,
          PageSize: size,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Fetches the filtered job list for a given user ID from the server.
 * @param {string} UserID - The ID of the user.
 * @returns {Promise<any>} A promise that resolves to the filtered job list data.
 * @throws {Error} If there is an error making the request.
 */
export const fetchFilterJobList = (
  filterData: string,
  pageNumber: number,
  size: number
): Promise<any> => {
  // Make a GET request to the server to fetch the filtered job list for the given user ID.
  return new Promise((resolve, reject) => {
    httpApi
      .get(filterJobListAPI, {
        params: {
          filter: filterData, // Pass the user ID as a parameter in the request.
          PageNo: pageNumber,
          PageSize: size,
        },
      })
      .then((response) => {
        // Resolve the promise with the response data.
        resolve(response.data);
      })
      .catch((err) => reject(err)); // Reject the promise with the error if there is an error making the request.
  });
};

export const uploadProfileUserData = (userid: string, formData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(uploadProfileAPI, formData, {
        params: {
          userid: userid,
        },
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

export const uploadProfileResumeData = (userid: string, formData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(uploadProfileResumeAPI, formData, {
        params: {
          userid: userid,
        },
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

export const uploadNotificationProfileData = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(accountSettingsAPI, data, {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getNotificationProfileData = (userId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .get(getAccountSettingsAPI, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const uploadProfileSkills = (skillData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(uploadSkillsAPI, skillData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const updateUserEduAndExpDetails = (detailsData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(updateUserEduAndExpDetailsAPI, detailsData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getAppliedJobs = (jobId: number, userID: string): Promise<any> => {
  const formData = new FormData();
  formData.append("JobId", `${jobId}`);
  formData.append("UserID", userID);

  return new Promise((resolve, reject) => {
    httpApi
      .post(getAppliedList, formData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
