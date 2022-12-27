import { apiGetGenCDashboardMetrics } from "../utils/AppUtils";

const getGenCDashboardMetrics = (query) => {
  // console.log("associateId=" + associateId);
  return apiGetGenCDashboardMetrics(query);
};

const GenCTrackerService = {
  getGenCDashboardMetrics,
};

export default GenCTrackerService;
