import axios, { AxiosError } from "axios";
import { ApiError } from "./ApiError";
import Cookies from "js-cookie";
let authorizationToken: string | null = null;
const AuthToken = Cookies.get("token");

export const setAuthToken = (auth: string) => {
  authorizationToken = auth;
};

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorData {
  message: string;
}

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
httpApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    Authorization: AuthToken ? AuthToken : authorizationToken,
  };
  return config;
});

httpApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorData>) => {
    if (error?.response?.status === 401) {
      window.location.href = "/logout";
    }
    throw new ApiError<ApiErrorData>(
      error && error.response?.data?.message ? error.response?.data?.message : error.message
    );
  }
);
