import {
  bannerAPI,
  numberAPI,
  partnerAPI,
  specificStoryAPI,
  storiesAPI,
  teamMemberAPI,
} from "api/apis";
import axios from "axios";
import { IBanner, IPartner, IStory, ITeamMember, Metrics } from "interface/Server/Home";

/** Banner API */
export const getBannerDetails = (): Promise<IBanner[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(bannerAPI)
      .then((response) => {
        resolve(response.data as IBanner[]);
      })
      .catch((err) => reject(err));
  });
};

/** Partner API */
export const getPartnerDetails = (): Promise<IPartner[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(partnerAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

/** Stories API */
export const getStories = (): Promise<IStory[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(storiesAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

/**  Specific Stories API*/
export const getSpecificStory = (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(specificStoryAPI(id))
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};

/**  Team Member */
export const getTeamMember = (): Promise<ITeamMember[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(teamMemberAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export const getStudentHistoryNumbers = (): Promise<Metrics> => {
  return new Promise((resolve, reject) => {
    axios
      .get(numberAPI)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};
