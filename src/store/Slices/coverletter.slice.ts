import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CoverLetterState {
  id: string | undefined;
  coverletterData: {
    html: string;
    id: string;
  };
}

const initialState: CoverLetterState = {
  id: "0",
  coverletterData: {
    html: "",
    id: "",
  },
};

export const coverletterSlice = createSlice({
  name: "coverletter",
  initialState,
  reducers: {
    coverLetterData: (
      state,
      action: PayloadAction<{
        html: string;
        id: string;
      }>
    ) => {
      state.coverletterData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { coverLetterData } = coverletterSlice.actions;

export default coverletterSlice.reducer;
