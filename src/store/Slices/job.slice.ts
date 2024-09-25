/* eslint-disable max-len */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface blogState {
  pageJobIndex: number;
}

const initialState: blogState = {
  pageJobIndex: 1,
};

export const blogSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getJobPageNumber: (state, action: PayloadAction<number>) => {
      state.pageJobIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getJobPageNumber } = blogSlice.actions;

export default blogSlice.reducer;
