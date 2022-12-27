export const APP_NAME = "JPMC Portal";

export const ANYNAME_MIN_LENGTH = 5;
export const ANYNAME_MAX_LENGTH = 80;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

//export const BACKEND_URL = "https://10.242.220.197";
//export const BACKEND_URL = "https://192.168.0.5";
// export const BACKEND_URL = `http://${window.location.host}`;
export const BACKEND_URL = "http://localhost:8080/firstDeploy"

export const API_URL = BACKEND_URL + "/api";
export const STORY_COMPLETION_THRESHOLD = 1;

export const ACCESS_TOKEN = "accessToken";
export const CURRENT_USER = "currentUser";
export const CURRENT_USER_FULLNAME = "fullname";
export const CURRENT_USER_ROLES = "roles";

export const ROLE_ASSOCIATE = "Associate";
export const ROLE_PM = "ProjectManager";
export const ROLE_ACCOUNTLEAD = "AccountLead";
export const ROLE_LOBLEAD = "LOBLead";
export const ROLE_EDL = "EDL";
export const ROLE_PDL = "PDL";
export const ROLE_ADMIN = "Admin";
export const ROLE_HR = "HR";
export const ROLE_TAG = "TAG";

export const RES_URL = "/ui/report/resignation/";

export const command =
  "npx create-react-app@latest jpmcportal" + // create project
  "npm install react-router-dom --save" +
  "npm i react-router-dom" +
  "npm install bootstrap --save" +
  "npm install --save react-bootstrap-validation" +
  "npm i -S reactstrap" +
  "npm install axios" +
  "npm install react-datepicker --save" +
  "npm i react-select" +
  "npm install react-validation" +
  "npm install react-hook-form" +
  "npm i sweetalert --save" +
  "npm i react-toastify@8.2.0";

export const UI_URL = "/ui/";
