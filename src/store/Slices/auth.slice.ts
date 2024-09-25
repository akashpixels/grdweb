import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteToken, deleteUser } from "api/services/localServices.service";

export interface CounterState {
  value: number;
  userData: {
    userid: string;
    token: string;
    isSubscribed: boolean;
  };
  primarySkills: string;
  profileImg: string;
}

const initialState: CounterState = {
  value: 0,
  userData: {
    userid: "",
    token: "",
    isSubscribed: false,
  },
  primarySkills: "",
  profileImg: "",
};

export const doLogout = createAsyncThunk("auth/doLogout", () => {
  deleteToken();
  deleteUser();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userToken: (
      state,
      action: PayloadAction<{ userid: string; token: string; isSubscribed: boolean }>
    ) => {
      state.userData = action.payload;
    },
    userPrimarySkills: (state, action: PayloadAction<string>) => {
      state.primarySkills = action.payload;
    },
    getProfileImg: (state, action: PayloadAction<string>) => {
      state.profileImg = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userToken, userPrimarySkills, getProfileImg } = authSlice.actions;

export default authSlice.reducer;
