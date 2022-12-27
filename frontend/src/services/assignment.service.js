import axios from "axios";
import { API_URL } from "../common/constants";
import { apiGetAssignmentReport } from "../utils/AppUtils";

const getAssignmentReport = (reportID, paramId) => {
  return apiGetAssignmentReport(reportID, paramId);
};

const AssignmentService = {
  getAssignmentReport,
};

export default AssignmentService;
