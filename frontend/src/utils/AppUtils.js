import { ACCESS_TOKEN } from "../common/constants";
import { API_URL } from "../common/constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function apiGetCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_URL + "/user/me",
    method: "GET",
  });
}

export function apiLogin(loginRequest) {
  return request({
    url: API_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function apiRegister(signupRequest) {
  return request({
    url: API_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function apiGetAssignmentReportNames() {
  return request({
    url: API_URL + "/data/getAssignmentReports",
    method: "GET",
  });
}

export function apiForAssignRolesOrApproved(newObj) {
  return request({
    url: API_URL + "/approval",
    method: "POST",
    body: JSON.stringify(newObj),
  });
}

export function apiGetUserDetails() {
  return request({
    url: API_URL + "/userdetail",
    method: "GET",
  });
}

export function apiGetAllSkillFamilies() {
  return request({
    url: API_URL + "/data/skill/getAllSkillFamilies",
    method: "GET",
  });
}

export function apiGetAllCertificationFamilies() {
  return request({
    url: API_URL + "/data/skill/getAllCertificationFamilies",
    method: "GET",
  });
}

export function apiGetAssignmentReportStat(reportID, paramId, serviceLine) {
  return request({
    url:
      API_URL +
      "/stat/getReportData/" +
      serviceLine +
      "?reportID=" +
      reportID +
      "&paramId=" +
      paramId,
    method: "GET",
  });
}

export function apiGetAllProfiles() {
  return request({
    url: API_URL + "/data/getAllProfilesFromServer",
    method: "GET",
  });
}

export function getProfileListOfPanelist(panelistId) {
  return request({
    url: API_URL + `/getProfileListOfPanelist/${panelistId}`,
    method: "GET",
  });
}

export function apiGetBillablePlan(selPractice, selLOB) {
  return request({
    url:
      API_URL +
      "/data/apiGetBillablePlan?selPractice=" +
      selPractice +
      "&selLOB=" +
      selLOB,
    method: "GET",
  });
}

export function apiGetFilteredBillablePlan(
  selPractice,
  categoryId,
  grade,
  location
) {
  return request({
    url:
      API_URL +
      "/data/filteredbillableplans?selPractice=" +
      selPractice +
      "&categoryId=" +
      categoryId +
      "&grade=" +
      grade +
      "&location=" +
      location,
    method: "GET",
  });
}

export function apiEvalautionResults() {
  return request({
    url: API_URL + "/data/getAllEvaluationResults",
    method: "GET",
  });
}

export function apiProfileRejectionCategories() {
  return request({
    url: API_URL + "/data/getAllEvaluationResultCategory",
    method: "GET",
  });
}

export function apiGetProfileInfo(profileId) {
  return request({
    url: API_URL + "/data/getProfileInfo?profileId=" + profileId,
    method: "GET",
  });
}

export function apiAddProfileFeedback(createProfileFeedback) {
  return request({
    url: API_URL + "/forms/addProfilefeedback",
    method: "POST",
    body: JSON.stringify(createProfileFeedback),
  });
}

export function apiGetAssignmentReport(reportID, paramId) {
  return request({
    url:
      API_URL +
      "/data/getAssignmentReport?reportID=" +
      reportID +
      "&paramId=" +
      paramId,
    method: "GET",
  });
}

export function apiGetBillableCategories() {
  return request({
    url: API_URL + "/data/apiGetBillableCategories",
    method: "GET",
  });
}

export function apiGetPracticeList() {
  return request({
    url: API_URL + "/data/apiGetPracticeList",
    method: "GET",
  });
}

export function apiGetLOBList() {
  return request({
    url: API_URL + "/data/apiGetLOBList",
    method: "GET",
  });
}

export function getAssociateIdNameDesignationByServiceLine(serviceLine) {
  return request({
    url: API_URL + "/rampdown/getAssociateIdNameDesignation/" + serviceLine,
    method: "GET",
  });
}

export function getAssociateIdNameDesignationByServiceLineAndLob(
  serviceLine,
  lob
) {
  return request({
    url:
      API_URL +
      "/rampdown/getAssociateIdNameDesignationByServiceLineAndLob/" +
      serviceLine +
      "/" +
      lob,
    method: "GET",
  });
}

export function getAssociateIdNameDesignationByServiceLineAndLobAndProjectId(
  projectId
) {
  return request({
    url:
      API_URL +
      "/rampdown/getAssociateIdNameDesignationByProjectId/" +
      projectId,
    method: "GET",
  });
}

export function getProjectIdByServiceLineAndLob(serviceLine, lob) {
  return request({
    url:
      API_URL +
      "/rampdown/getProjectIdByLobAndServiceLine/" +
      serviceLine +
      "/" +
      lob,
    method: "GET",
  });
}
export function getProjectNameAndManagerName(ProjectId) {
  return request({
    url: API_URL + "/rampdown/getProjectNameAndManagerName/" + ProjectId,
    method: "GET",
  });
}
export function apiAddBillabilityPlan(objBillabilityPlan) {
  return request({
    url: API_URL + "/forms/addbillabilityplan",
    method: "POST",
    body: JSON.stringify(objBillabilityPlan),
  });
}

export function apiGetBillabilityReportData(selPractice) {
  return request({
    url: API_URL + "/report/apiGetBillableReport?selPractice=" + selPractice,
    method: "GET",
  });
}

export function apiGetAssociateBillabilityHistory(associateId) {
  return request({
    url: API_URL + "/data/apiGetBillablePlanHistory?associateId=" + associateId,
    method: "GET",
  });
}

export function getAllServiceLines() {
  return request({
    url: API_URL + "/getAllServiceLines",
    method: "GET",
  });
}

export function getAllDrives() {
  return request({
    url: API_URL + "/getAllDrives",
    method: "GET",
  });
}

export function getAllPanelists() {
  return request({
    url: API_URL + "/panelists",
    method: "GET",
  });
}

export function getAllAssociates(selServiceLine, selLOB) {
  return request({
    url: API_URL + `/allAssociates/${selServiceLine}/${selLOB}`,
    method: "GET",
  });
}

export function getDriveById(driveId) {
  return request({
    url: API_URL + `/drive/${driveId}`,
    method: "GET",
  });
}

export function createInterviewDrive(interviewDriveObj) {
  return request({
    url: API_URL + "/create-interview-drive",
    method: "POST",
    body: JSON.stringify(interviewDriveObj),
  });
}

export function addPanelistToDrive(panelistObj) {
  return request({
    url: API_URL + "/add-panelist",
    method: "POST",
    body: JSON.stringify(panelistObj),
  });
}

export function registerPanelist(panelistObj) {
  return request({
    url: API_URL + "/register-panelist",
    method: "POST",
    body: JSON.stringify(panelistObj),
  });
}

export function updatePanelistOfDrive(panelistObj) {
  console.log(panelistObj);
  return request({
    url: API_URL + "/updatePanelist",
    method: "PUT",
    body: JSON.stringify(panelistObj),
  });
}

export function getDrivePanelist(driveId) {
  return request({
    url: API_URL + `/getAllPanelist/${driveId}`,
    method: "GET",
  });
}

export function getDriveListNominatedByUser(associateId) {
  return request({
    url: API_URL + `/getDriveListNominatedByUser/${associateId}`,
    method: "GET",
  });
}

export function getDrivePanelistById(penalistId) {
  return request({
    url: API_URL + `/getPenalistByid/${penalistId}`,
    method: "GET",
  });
}

export function getPenalistByAssociateIdDriveId(associateId, driveId) {
  return request({
    url: API_URL + `/getPenalistByAssociateIdDriveId/${associateId}/${driveId}`,
    method: "GET",
  });
}

export function getAllDriveForAssociate(associateId) {
  return request({
    url: API_URL + `/getAllDriveForAssociate/${associateId}`,
    method: "GET",
  });
}

export function deleteDrivePanelistById(driveId, penalistId) {
  return request({
    url: API_URL + `/deletePanelist/${driveId}/${penalistId}`,
    method: "DELETE",
  });
}

export function getCalendarView(serviceLine) {
  return request({
    url: API_URL + `/calendar-view/${serviceLine}`,
    method: "GET",
  });
}

export function getPanelistForDate(serviceLine, driveDate) {
  return request({
    url: API_URL + `/panelist-calendar-view/${serviceLine}/${driveDate}`,
    method: "GET",
  });
}

export function getScheduledPanelistForDate(driveDate) {
  return request({
    url: API_URL + `/scheduled-panelist/${driveDate}`,
    method: "GET",
  });
}

export function getNotScheduledPanelistForDate(driveDate) {
  return request({
    url: API_URL + `/not-scheduled-panelist/${driveDate}`,
    method: "GET",
  });
}

export function linkExtProfileToPanel(assignProfileToPanelist) {
  return request({
    url: API_URL + `/linkExtProfileToPanel`,
    method: "POST",
    body: JSON.stringify(assignProfileToPanelist),
  });
}

export function getAssignedProfiles() {
  return request({
    url: API_URL + `/getAssignedProfiles`,
    method: "GET",
  });
}

export function getAssignedProfileListOfPanelist(associateId) {
  return request({
    url: API_URL + `/getAssignedProfileListOfPanelist/${associateId}`,
    method: "GET",
  });
}

export function apiGetLeaves(year) {
  return request({
    url: API_URL + "/leaves/getLeaveDetails/" + year,
    method: "GET",
  });
}

export function apiSetLeaves(objLeaves, year) {
  return request({
    url: API_URL + "/leaves/setLeaveDetails/" + year,
    method: "PUT",
    body: JSON.stringify(objLeaves),
  });
}

export function apiGetAllUserLeaves(year, LOB, serviceLine) {
  return request({
    url:
      API_URL +
      "/leaves/getAllUserLeaveDetails/" +
      year +
      "/" +
      LOB +
      "/" +
      serviceLine,
    method: "GET",
  });
}

export function apiGetAllUserLeavesByServiceLine(year, serviceLine) {
  return request({
    url:
      API_URL +
      "/leaves/getAllLeaveDetailsByServiceLine/" +
      year +
      "/" +
      serviceLine,
    method: "GET",
  });
}

export function apiGetAllLeavesCategory() {
  return request({
    url: API_URL + "/leaves/getAllLeaveCategory",
    //-----------Training APIs-----------
    method: "GET",
  });
}
export function apiAddTraining(objTraining) {
  return request({
    url: API_URL + "/forms/trainings",
    method: "POST",
    body: JSON.stringify(objTraining),
  });
}

export function apiGetTrainings() {
  return request({
    url: API_URL + "/forms/trainings",
    method: "GET",
  });
}

export function apiGetServiceLineList() {
  return request({
    url: API_URL + "/data/apiGetServiceLineList",
    method: "GET",
  });
}
export function apiGetPersonalisedTrainings() {
  return request({
    url: API_URL + "/forms/personalised-trainings",
    method: "GET",
  });
}

export function apiGetTraining(trainingId, userDetails) {
  return request({
    url: API_URL + "/forms/trainings/" + trainingId,
    method: "GET",
  });
}

export function apiGetPersonalisedTraining(trainingId, userDetails) {
  return request({
    url: API_URL + "/forms/personalised-trainings/" + trainingId,
    method: "GET",
  });
}

export function apiDeleteTraining(trainingId) {
  return request({
    url: API_URL + "/forms/trainings/" + trainingId,
    method: "Delete",
  });
}

export function apiNominateTraining(trainingId) {
  return request({
    url: API_URL + "/forms/trainings/" + trainingId + "/nominate",
    method: "POST",
  });
}

export function apiGetTrainingNominations(trainingId) {
  return request({
    url: API_URL + "/forms/trainings/" + trainingId + "/nominations",
    method: "GET",
  });
}

export function apiGetSettingsData() {
  return request({
    url: API_URL + "/data/getSettingsData",
    method: "GET",
  });
}

export function apiUpdateTrainingProgress(trainingId, progress) {
  return request({
    url: API_URL + "/forms/trainings/" + trainingId + "/updateprogress",
    method: "POST",
    body: JSON.stringify({ progress }),
  });
}

export function apiSaveSettingsData(changedData) {
  return request({
    url: API_URL + "/data/settings/update",
    method: "POST",
    body: JSON.stringify(changedData),
  });
}

export function apiGetAssociateGroup() {
  return request({
    url: API_URL + "/associateGroup/getGroup",
    method: "GET",
  });
}

export function apiGetAssociateData(associateId) {
  return request({
    url: API_URL + "/data/assignmentUser/" + associateId,
    method: "GET",
  });
}

export function apiGetSearchAssociateData(associateId) {
  return request({
    url: API_URL + "/getAssociateInfo/" + associateId,
    method: "GET",
  });
}

export function apiSaveAssociateGroup(group) {
  return request({
    url: API_URL + "/associateGroup/saveGroup",
    method: "POST",
    body: JSON.stringify(group),
  });
}
export function apiForgotPassword({ associateId }) {
  return request({
    url: API_URL + "/auth/forgotpassword",
    method: "POST",
    body: JSON.stringify({ associateId }),
  });
}

export function apiValidateOTP({ otp }) {
  return request({
    url: API_URL + "/auth/verify-otp",
    method: "POST",
    body: JSON.stringify({ otp }),
  });
}

export function apiChangePassword({ password, confirmPassword, associateId }) {
  return request({
    url: API_URL + "/auth/update-password",
    method: "POST",
    body: JSON.stringify({ password, confirmPassword, associateId }),
  });
}
export function apiForChangePassword({
  currentPassword,
  password,
  confirmPassword,
  associateId,
}) {
  return request({
    url: API_URL + "/auth/change-password",
    method: "POST",
    body: JSON.stringify({
      currentPassword,
      password,
      confirmPassword,
      associateId,
    }),
  });
}

export function apiCreateAssociateGroup(groupName) {
  return request({
    url: API_URL + "/associateGroup/create/" + groupName,
    method: "GET",
  });
}

export function apiDeleteAssociateGroup(groupId) {
  return request({
    url: API_URL + "/associateGroup/deleteGroup/" + groupId,
    method: "DELETE",
  });
}

//---------------------------------------------------------

export function apiGetAllReferrals() {
  return request({
    url: API_URL + "/data/getAllReferralsFromServer",
    method: "GET",
  });
}

export function apiCreateReferralDrive(createReferralRequest) {
  return request({
    url: API_URL + "/forms/createReferralRequest",
    method: "POST",
    body: JSON.stringify(createReferralRequest),
  });
}

export function apiGetStatusFromId(categoryId) {
  return request({
    url: API_URL + "/data/getStatusFromId?categoryId=" + categoryId,
    method: "GET",
  });
}

export function apiGetReferralInfo(referralId) {
  return request({
    url: API_URL + "/data/getReferralInfo?referralId=" + referralId,
    method: "GET",
  });
}

export function apiUpdateReferralStatus(referralStatus, referralId) {
  return request({
    url:
      API_URL +
      "/data/updateReferralStatus?referralStatus=" +
      referralStatus +
      "&referralId=" +
      referralId,
    method: "PUT",
  });
}

export function apiGetAllCategoryFamily() {
  return request({
    url: API_URL + "/forms/categoryFamilies",
    method: "GET",
  });
}

export function apiGetLeaveConflictDetails(leaves, year) {
  return request({
    url: API_URL + "/leaves/getLeaveConflict/" + year,
    method: "POST",
    body: JSON.stringify(leaves),
  });
}

export function apiGetAssignmentListing(selPractice) {
  return request({
    url: API_URL + "/dummy/getAssignmentListing?selPractice=" + selPractice,
    method: "GET",
  });
}

export function apiCreateStory(storyRequest) {
  return request({
    url: API_URL + "/story/createStory",
    method: "POST",
    body: JSON.stringify(storyRequest),
  });
}

export function apiUpdateStory(storyRequest) {
  return request({
    url: API_URL + "/story/updateStory",
    method: "PUT",
    body: JSON.stringify(storyRequest),
  });
}

export function apiAddStoryComments(storyId, comment) {
  return request({
    url: API_URL + "/story/addComment/" + storyId,
    method: "POST",
    body: JSON.stringify(comment),
  });
}

export function apiDeleteStory(storyId) {
  return request({
    url: API_URL + "/story/deleteStory/" + storyId,
    method: "DELETE",
  });
}

export function apiUpdateStoryStatus(storyId, status) {
  return request({
    url: API_URL + "/story/updateStatus/" + storyId,
    method: "PUT",
    body: JSON.stringify(status),
  });
}

export function apiGetAssociateStories() {
  return request({
    url: API_URL + "/story/getAssociateStories",
    method: "GET",
  });
}

export function apiGetAllStories(searchParams) {
  return request({
    url: API_URL + "/story/getAllStories?" + searchParams,
    method: "GET",
  });
}

export function apiGetStoryById(storyId) {
  return request({
    url: API_URL + "/story/getStoryById/" + storyId,
    method: "GET",
  });
}

// export function apiGetAllEpics() {
//   return request({
//     url: API_URL + "/story/getAllEpics",
//     method: "GET",
//   });
// }

export function apiGetAllPriorities() {
  return request({
    url: API_URL + "/story/getAllPriorities",
    method: "GET",
  });
}

export function apiGetAllStoryStatus() {
  return request({
    url: API_URL + "/story/getAllStoryStatus",
    method: "GET",
  });
}

export function apiCreateSprint(sprint) {
  return request({
    url: API_URL + "/sprint/createSprint",
    method: "POST",
    body: JSON.stringify(sprint),
  });
}

export function apiUpdateSprint(id, sprint) {
  return request({
    url: API_URL + "/sprint/createSprint",
    method: "PUT",
    body: JSON.stringify(sprint),
  });
}

export function apiDeleteSprint(sprintId) {
  return request({
    url: API_URL + "/sprint/deleteSprint/" + sprintId,
    method: "DELETE",
  });
}

export function apiGetAllSprints(searchParams) {
  return request({
    url: API_URL + "/sprint/getAllSprints?" + searchParams,
    method: "GET",
  });
}

export function apiGetAssignUsersFromServiceLine(serviceLine) {
  return request({
    url: API_URL + "/data/getAssignmentUserIds/serviceLine/" + serviceLine,
    method: "GET",
  });
}

export function apiGetAssignUsersGenCFromServiceLine(serviceLine) {
  return request({
    url: API_URL + "/data/getAssignmentUserGenCIds/serviceLine/" + serviceLine,
    method: "GET",
  });
}
export function apiGetAllParentAccounts() {
  return request({
    url: API_URL + "/parent-account",
    method: "GET",
  });
}

export function apiGetSprintById(id) {
  return request({
    url: API_URL + "/sprint/getSprintById/" + id,
    method: "GET",
  });
}

export function apiGetSprintStoriesById(id) {
  return request({
    url: API_URL + "/sprint/getSprintById/" + id + "/stories",
    method: "GET",
  });
}

export function apiCreateEpic(epic) {
  return request({
    url: API_URL + "/epic",
    method: "POST",
    body: JSON.stringify(epic),
  });
}

export function apiGetAllEpics(searchParams = "") {
  return request({
    url: API_URL + "/epic?" + searchParams,
    method: "GET",
  });
}
export function apiResignationGroupValueDropDown() {
  return request({
    url: API_URL + "/dropdown-resignation-group-values",
    method: "GET",
  });
}

export function apiGetAllResignationEmployee() {
  return request({
    url: API_URL + "/resignation",
    method: "GET",
  });
}

export function apiPostResignationEmployeeListData(data) {
  return request({
    url: API_URL + "/upload-resignation-data",
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function apiPostUpdateResignationEmployeeStatus(data) {
  return request({
    url: API_URL + "/update-resignation-employee-status",
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function apiGetAllResignationCategories() {
  return request({
    url: API_URL + "/forms/getAllResignationCategories",
    method: "GET",
  });
}
export function apiGetAssociateStoryDetails(associateId) {
  return request({
    url: API_URL + `/gencTracker/associate/${associateId}/skillDetails`,
    method: "GET",
  });
}
export function apisaveResignationUpdateDataAll(changedData) {
  return request({
    url: API_URL + "/data/resignation/update",
    method: "POST",
    body: JSON.stringify(changedData),
  });
}
export function apiGetAllPDLs() {
  return request({
    url: API_URL + "/pdl",
    method: "GET",
  });
}

export function apiGetAllSBUs() {
  return request({
    url: API_URL + "/sbu",
    method: "GET",
  });
}

export function apiGetGenCDashboardMetrics(query) {
  return request({
    url: API_URL + "/gencTracker/dashboard" + "?" + query,
    method: "GET",
  });
}

export function apiGetEpic(epicId) {
  return request({
    url: API_URL + "/epic/" + epicId,
    method: "GET",
  });
}

export function apiGetEpicStories(epicId, params = "") {
  return request({
    url: API_URL + "/epic/" + epicId + "/stories?" + params,
    method: "GET",
  });
}

export function apiGetGenCAssociate(query) {
  return request({
    url: API_URL + "/gencTracker/associate" + "?" + query,
    method: "GET",
  });
}

export function apiGetStoryDropdowns() {
  return request({
    url: API_URL + "/story/getAllStoryDropdowns",
    method: "GET",
  });
}
export function apiGetAllImpactCategories() {
  return request({
    url: API_URL + "/forms/getAllImpactCategories",
    method: "GET",
  });
}
export function apiGetAllIssueStatus() {
  return request({
    url: API_URL + "/forms/getAllIssueStatus",
    method: "GET",
  });
}
export function apiAddIssue(obj) {
  return request({
    url: API_URL + "/forms/addIssue",
    method: "POST",
    body: JSON.stringify(obj),
  });
}
export function apiGetIssuesData(serviceline) {
  return request({
    url: API_URL + "/forms/getIssuesData/" + serviceline,
    method: "GET",
  });
}
export function apiGetProjectIdList(serviceline, lobname) {
  return request({
    url: API_URL + "/forms/getProjectIds/" + serviceline + "/" + lobname,
    method: "GET",
  });
}
export function apiGetProjectName(serviceline, lobname, projectId) {
  return request({
    url:
      API_URL +
      "/forms/getProjectName/" +
      serviceline +
      "/" +
      lobname +
      "/" +
      projectId,
    method: "GET",
  });
}
export function apiGetIssues(id) {
  return request({
    url: API_URL + "/forms/issues/getIssues/" + id,
    method: "GET",
  });
}

export function apiUpdateIssue(updatedIssue) {
  return request({
    url: API_URL + "/forms/issues/updateIssue",
    method: "POST",
    body: JSON.stringify(updatedIssue),
  });
}

export function apigetAllSkillTrackFam() {
  return request({
    url: API_URL + "/forms/getAllSkillTrackFam",
    method: "GET",
  });
}

export function apigetAllSkillTrackCat() {
  return request({
    url: API_URL + "/forms/getAllSkillTrackCat",
    method: "GET",
  });
}

export function apiGetSkillCategories(skillFamilyId) {
  return request({
    url: API_URL + "/data/skill/getSkillCategories/" + skillFamilyId,
    method: "GET",
  });
}

export function apiGetAllSkillCategories() {
  return request({
    url: API_URL + "/data/skill/getAllSkillCategories",
    method: "GET",
  });
}

export function apiGetMySkillProfile() {
  return request({
    url: API_URL + "/skill/getAssociateSkillProfile",
    method: "GET",
  });
}

export function apiGetAllSkillProficiencies() {
  return request({
    url: API_URL + "/data/skill/apiGetAllSkillProficiencies",
    method: "GET",
  });
}

export function apiSaveAssociateSkillProfile(associateSkillProfile) {
  return request({
    url: API_URL + "/skill/saveAssociateSkillProfile",
    method: "POST",
    body: JSON.stringify(associateSkillProfile),
  });
}
