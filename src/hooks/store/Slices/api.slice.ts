/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBanner, IPartner, ITeamMember } from "interface/Server/Home";
import { IJobList } from "interface/Server/jobs";
import { BlogPost } from "pages/Blog/Blog";

interface IHistoryNumber {
  value: number;
  name: string;
}

export interface IFilterJobList {
  data: IJobList[];
  pageNo: number;
  pageSize: number;
  totalRecord: number;
}
export interface blogState {
  homeBannerData: IBanner[];
  partnerData: IPartner[];
  teamMemberList: ITeamMember[];
  addBlogs: BlogPost[];
  jobList: IFilterJobList;
  historyNumbers: IHistoryNumber[];
  sponsoredJobList: IFilterJobList;
  partTimeJobList: IFilterJobList;
  internshipJobList: IFilterJobList;
  graduateProgram: any;
  appliedJob: any;
  saveJob: any;
}

const initialState: blogState = {
  homeBannerData: [],
  partnerData: [],
  teamMemberList: [],
  addBlogs: [],
  jobList: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
  historyNumbers: [],
  sponsoredJobList: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
  partTimeJobList: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
  internshipJobList: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
  graduateProgram: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
  appliedJob: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
  saveJob: {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecord: 0,
  },
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    getBannerData: (state, action: PayloadAction<IBanner[]>) => {
      state.homeBannerData = action.payload;
    },
    getPartnerData: (state, action: PayloadAction<IPartner[]>) => {
      state.partnerData = action.payload;
    },
    getTeamMemberList: (state, action: PayloadAction<ITeamMember[]>) => {
      state.teamMemberList = action.payload;
    },
    getAllBlogs: (state, action: PayloadAction<BlogPost[]>) => {
      state.addBlogs = action.payload;
    },
    getJobList: (state, action: PayloadAction<IFilterJobList>) => {
      state.jobList = action.payload;
    },
    getHistoryNumbers: (state, action: PayloadAction<IHistoryNumber[]>) => {
      state.historyNumbers = action.payload;
    },
    getSponsoredJobList: (state, action: PayloadAction<IFilterJobList>) => {
      state.sponsoredJobList = action.payload;
    },
    getPartTimeJobList: (state, action: PayloadAction<IFilterJobList>) => {
      state.partTimeJobList = action.payload;
    },
    getInternJobList: (state, action: PayloadAction<IFilterJobList>) => {
      state.internshipJobList = action.payload;
    },
    getGraduateProgramJobList: (state, action: PayloadAction<any>) => {
      state.graduateProgram = action.payload;
    },
    getAppliedJobsData: (state, action: PayloadAction<any>) => {
      state.appliedJob = action.payload;
    },

    getSavedJobs: (state, action: PayloadAction<any>) => {
      state.saveJob = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getBannerData,
  getPartnerData,
  getTeamMemberList,
  getAllBlogs,
  getJobList,
  getHistoryNumbers,
  getSponsoredJobList,
  getPartTimeJobList,
  getInternJobList,
  getGraduateProgramJobList,
  getAppliedJobsData,
  getSavedJobs,
} = apiSlice.actions;

export default apiSlice.reducer;
