import { apiGetProfileInfo, apiAddProfileFeedback } from "../utils/AppUtils";

const getProfileInfo = (profileId) => {
  return apiGetProfileInfo(profileId);
};

const addProfileFeedback = (createProfileFeedback) => {
  return apiAddProfileFeedback(createProfileFeedback);
};

const ProfileService = {
  getProfileInfo,
  addProfileFeedback,
};

export default ProfileService;
