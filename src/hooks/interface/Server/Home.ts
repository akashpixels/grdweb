export interface IPartner {
  partnerId: number;
  title: string;
  description: string;
  logo: string;
  screenName: string;
}

export interface IBanner {
  bannerId: number;
  title: string;
  description: string;
  bannerImage: string;
  screenName: string;
}

export interface ITeamMember {
  teamMemberId: number;
  name: string;
  designation: string;
  profileImage: string;
  socialMediaLink1?: string; // Optional property
  socialMediaLink2?: string; // Optional property
  socialMediaLink3?: string; // Optional property
  socialMediaLink4?: string; // Optional property
}

export interface IStory {
  storyId: number;
  title: string;
  description: string;
  userID: string; // May need adjustment based on your user ID format
}

export interface IFont {
  fontID: string;
  fontName: string;
  fileName: string;
}

export interface Metrics {
  studentPlaced: number;
  multinationalCompanies: number;
  globalUniversityTieups: number;
  countryOutreach: number;
}
