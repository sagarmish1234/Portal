import axios from "axios";
// import { API_URL, ACCESS_TOKEN, CURRENT_USER } from "../common/constants";
import {
  apiGetUserDetails,
  apiForAssignRolesOrApproved,
} from "../utils/AppUtils";

const getAllUser = () => {
  return apiGetUserDetails();
};

const approvedAndAssignRoles = (newObj) => {
  return apiForAssignRolesOrApproved(newObj);
};

const UserService = {
  getAllUser,
  approvedAndAssignRoles,
};

export default UserService;
