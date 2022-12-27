import axios from "axios";
import {
  API_URL,
  ACCESS_TOKEN,
  CURRENT_USER,
  CURRENT_USER_FULLNAME,
  CURRENT_USER_ROLES,
} from "../common/constants";
import {
  apiLogin,
  apiRegister,
  apiForgotPassword,
  apiValidateOTP,
  apiChangePassword,
  apiForChangePassword,
} from "../utils/AppUtils";

const register = (signupRequest) => {
  return apiRegister(signupRequest);
};

const forgotPasswordInput = ({ associateId }) => {
  return apiForgotPassword({ associateId });
};

const verifyUser = (code) => {
  return axios.get(API_URL + "/auth/verify?code=" + code);
};

const verifyOtp = ({ otp }) => {
  return apiValidateOTP({ otp });
};

const changePassword = ({ password, confirmPassword, associateId }) => {
  return apiChangePassword({ password, confirmPassword, associateId });
};
const changepassword= ({currentPassword,password,confirmPassword,associateId})=>
{
  return apiForChangePassword({currentPassword,password, confirmPassword, associateId });
}; 
const login = (loginRequest) => {
  return apiLogin(loginRequest).then((response) => {
    console.log(response.jwt.accessToken);
    console.log(response.associateId);
    console.log(response.userFullName);
    console.log(response.roles);
    localStorage.setItem(ACCESS_TOKEN, response.jwt.accessToken);
    localStorage.setItem(CURRENT_USER, response.associateId);
    localStorage.setItem(CURRENT_USER_FULLNAME, response.userFullName);
    localStorage.setItem(CURRENT_USER_ROLES, response.roles);
  });
};

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(CURRENT_USER);
  localStorage.removeItem(CURRENT_USER_FULLNAME);
  localStorage.removeItem(CURRENT_USER_ROLES);
};

const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER);
};

const getCurrentUserFullName = () => {
  return localStorage.getItem(CURRENT_USER_FULLNAME);
};

const getCurrentUserRoles = () => {
  return localStorage.getItem(CURRENT_USER_ROLES);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserFullName,
  getCurrentUserRoles,
  forgotPasswordInput,
  verifyOtp,
  changePassword,
  verifyUser,
  changepassword,
};

export default AuthService;
