import {
  changePasswordAPI,
  deleteUserAPI,
  forgotAPI,
  loginAPI,
  resetPasswordAPI,
  signUpAPI,
  startTrailAPI,
  userProfileAPI,
  verifyOTPApi,
} from "api/apis";
import { httpApi } from "api/Http.api";
import axios from "axios";

export interface IUserResponse {
  status: string;
  message: string;
  data: UserData;
}

interface UserData {
  token: string;
  mobileNo: string | null;
  userid: string;
  firstName: string;
  surName: string;
  email: string;
  skills: string;
  isSubscribed: boolean;
  isExpired: boolean;
  isTrailExpired: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUp = (userData: any): Promise<IUserResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post(signUpAPI, userData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginIn = (userData: { email: string; password: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(loginAPI, userData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resetPassword = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(forgotAPI(email))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserprofile = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(userProfileAPI, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startTrial = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(startTrailAPI, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

interface IChangePasswordRequest {
  userid: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IUserOTP {
  userGUID: string;
  otp: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setChangePassword = (userData: IChangePasswordRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(changePasswordAPI, userData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteAccountUser = (userId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    httpApi
      .get(deleteUserAPI, {
        params: {
          id: userId,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Sets a new password for the user with the given ID.
 * @param {IChangePasswordRequest} userData - The data to be sent to the server.
 * @returns {Promise<any>} A promise that resolves to the response data.
 * @throws {Error} If there is an error making the request.
 */

export const handleOTPVerification = (userData: IUserOTP): Promise<string> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(verifyOTPApi, userData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Handles the OTP verification for the user with the given data.
 * @param {IUserOTP} userData - The data to be sent to the server.
 * @returns {Promise<string>} A promise that resolves to the response data.
 * @throws {Error} If there is an error making the request.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doResetPassword = (resetData: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    httpApi
      .post(resetPasswordAPI, resetData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
