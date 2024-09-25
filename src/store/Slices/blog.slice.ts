/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBlogCategoriesList } from "interface/Server/Blog";
import { BlogPost } from "pages/Blog/Blog";

export interface blogState {
  blogSelectedCategory: any;
  blogSelectedCategoryData: BlogPost[] | null;
  blogCategories: IBlogCategoriesList[];
  blogData: BlogPost | null;
}

const initialState: blogState = {
  blogSelectedCategory: {},
  blogSelectedCategoryData: null,
  blogCategories: [],
  blogData: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogSelectedCategoryData: (
      state,
      action: PayloadAction<{ value: any; response: BlogPost[] }>
    ) => {
      state.blogSelectedCategoryData = action.payload.response;
      state.blogSelectedCategory = action.payload.value;
    },
    getBlogCategories: (state, action: PayloadAction<IBlogCategoriesList[]>) => {
      state.blogCategories = action.payload;
    },
    getBlogDetails: (state, action: PayloadAction<BlogPost>) => {
      state.blogData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getBlogSelectedCategoryData, getBlogCategories, getBlogDetails } = blogSlice.actions;

export default blogSlice.reducer;
