import axios from "axios";
import { API_URL } from "../common/constants";
import {
  apiGetAssignmentReportNames,
  apiGetAssignmentReportStat,
} from "../utils/AppUtils";

const getHomeContent = () => {
  return apiGetAssignmentReportNames();
};

const getAssignmentReportStat = (reportID, paramId,serviceLine) => {
  return apiGetAssignmentReportStat(reportID, paramId,serviceLine);
};

const HomeService = {
  getHomeContent,
  getAssignmentReportStat,
};

export default HomeService;
