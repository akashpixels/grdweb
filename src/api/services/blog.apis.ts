/* eslint-disable @typescript-eslint/no-explicit-any */
import { blogsAPI, specificBlogCategoryAPI } from "api/apis";
import axios from "axios";

/** Banner API */
export const getBlogCategoriesList = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(blogsAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getSpecificCategoryList = (id?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(specificBlogCategoryAPI(id || ""))
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
