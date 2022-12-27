import axios from "axios";
import { API_URL } from "../common/constants";
import {


  getProjectNameAndManagerName,
  getAssociateIdNameDesignationByServiceLine,
  getAssociateIdNameDesignationByServiceLineAndLob,
  getAssociateIdNameDesignationByServiceLineAndLobAndProjectId,
} from "../utils/AppUtils";

const ProjectNameAndManagerName = (ProjectId) => {
  return getProjectNameAndManagerName(ProjectId);
};

const RampdownService = {
  ProjectNameAndManagerName,
  getAssociateIdNameDesignationByServiceLine,
  getAssociateIdNameDesignationByServiceLineAndLob,
  getAssociateIdNameDesignationByServiceLineAndLobAndProjectId,

};

export default RampdownService;
