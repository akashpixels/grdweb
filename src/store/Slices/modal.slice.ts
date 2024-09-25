/* eslint-disable max-len */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IModelState {
  isWelcomeModal: boolean;
  isSubscribeModal: boolean;
  isTrialPopupModal: boolean;
  isExpiredTrialPopup: boolean; 
}

const initialState: IModelState = {
  isWelcomeModal: false,
  isSubscribeModal: false,
  isTrialPopupModal: false,
  isExpiredTrialPopup: false
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleWelcomeModel: (state, action: PayloadAction<boolean>) => {
      state.isWelcomeModal = action.payload;
    },
    handleSubscribeModel: (state, action: PayloadAction<boolean>) => {
      state.isSubscribeModal = action.payload;
    },
    handleFreeSubscribeModel: (state, action: PayloadAction<boolean>) => {
      state.isTrialPopupModal = action.payload;
    },
    handleExpiredSubscribeModel: (state, action: PayloadAction<boolean>) => {
      state.isExpiredTrialPopup = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleWelcomeModel, handleSubscribeModel, handleFreeSubscribeModel, handleExpiredSubscribeModel } = modalSlice.actions;

export default modalSlice.reducer;
