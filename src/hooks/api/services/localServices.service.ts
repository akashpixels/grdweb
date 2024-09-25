import Cookies from "js-cookie";

export const deleteToken = (): void => {
  Cookies.remove("token");
};

export const deleteUser = (): void => {
  Cookies.remove("userId");
  Cookies.remove("isUser");
  Cookies.remove("persist:root");
  localStorage.clear();
  sessionStorage.clear();
};

export const removeCVBuilderData = (): void => {
  Cookies.remove("persist:root");
  Cookies.remove("verifiedEducation");
  Cookies.remove("verifiedExperience");
};

export const getUserIsSubscribe = (isSubscribed = false) => {
  if (isSubscribed) Cookies.set("isUser", `${isSubscribed}`);
  const userId = Cookies.get("userId") ?? "";
  const isSubscribe = JSON.parse(Cookies.get("isUser") ?? "false") ?? false;
  const isTrailExpired = Cookies.get("isTrailExpired") || "false";

  const isExpired = JSON.parse(Cookies.get("isExpired") ?? "false") ?? false;
  return { userId, isSubscribe, isExpired, isTrailExpired };
};

export const setProfileImage = (img: string) => {
  Cookies.set("ProfileImage", img);
};

export const validatePremium = (
  isExpired: boolean,
  isSubscribed: boolean,
  isTrailExpired: boolean
) => {
  if (isExpired && !isSubscribed && !isTrailExpired) {
    return "pendingTrial";
  } else if (!isExpired && isSubscribed && !isTrailExpired) {
    return "activeTrial";
  } else if (isExpired && !isSubscribed && isTrailExpired) {
    return "expiredTrial";
  } else if (!isExpired && isSubscribed && isTrailExpired) {
    return "premiumActive";
  } else if (!isExpired && !isSubscribed && !isTrailExpired) {
    return "pendingTrial";
  }
};

export const setPremiumKeys = (
  isExpired: boolean,
  isSubscribed: boolean,
  isTrailExpired: boolean
) => {
  Cookies.set("isExpired", JSON.stringify(isExpired));
  Cookies.set("isUser", JSON.stringify(isSubscribed));
  Cookies.set("isTrailExpired", JSON.stringify(isTrailExpired));
};
