import {
    apiGetReferralInfo,
    apiUpdateReferralStatus,
    apiGetStatusFromId, 
} from "../utils/AppUtils";

const getReferralInfo = (referralId) => {
    return apiGetReferralInfo(referralId);
  }
  
  const updateReferralStatus = (referralStatus,referralId) => {
    return apiUpdateReferralStatus(referralStatus,referralId);
  }
  
  const getStatusFromId = (categoryId) => {
    return apiGetStatusFromId(categoryId);
  }

const ReferralService = {
    getReferralInfo,
    updateReferralStatus,
    getStatusFromId,
};

export default ReferralService;
