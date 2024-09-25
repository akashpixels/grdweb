/* eslint-disable @typescript-eslint/no-explicit-any */
import { gptAPI } from "api/apis";
import axios from "axios";

/** Banner API */
export const getDataFromDoc = (gptData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-proj-fY8XhUEinMrJRu3BiwgeT3BlbkFJ8vTVnQDILu8jrMeWe8BY",
    };
    axios
      .post(gptAPI, gptData, {
        headers: headers,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
