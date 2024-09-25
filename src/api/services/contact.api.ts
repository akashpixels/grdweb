/* eslint-disable @typescript-eslint/no-explicit-any */
import { enquiryAPI } from "api/apis";
import axios from "axios";

export interface ContactForm {
  getInTouchId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
export const postContactDetails = (contactData: ContactForm): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(enquiryAPI, contactData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
