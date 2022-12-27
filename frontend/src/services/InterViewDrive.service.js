import {
    createInterviewDrive,
    addPanelistToDrive,
    getDrivePanelist,
    getDriveById,
    getAllPanelists,
    getAllAssociates,
    updatePanelistOfDrive,
    getDrivePanelistById,
    deleteDrivePanelistById,
    registerPanelist,
    getCalendarView,
    getPanelistForDate,
    getScheduledPanelistForDate,
    getNotScheduledPanelistForDate,
    getDriveListNominatedByUser,
    getPenalistByAssociateIdDriveId,
    getAllDriveForAssociate,
    linkExtProfileToPanel,
    getProfileListOfPanelist,
    getAssignedProfiles,
    getAssignedProfileListOfPanelist
} from "../utils/AppUtils";

const newDrive = (interviewDriveObj) => {
    return createInterviewDrive(interviewDriveObj);
}

const getInterviewDriveById = (driveId) => {
    return getDriveById(driveId);
}

const addPanelist = (panelistObj) => {
    return addPanelistToDrive(panelistObj);
}

const registerPanelistt = (panelistObj) => {
    return registerPanelist(panelistObj);
}

const getDrivePanelists = (driveId) => {
    return getDrivePanelist(driveId);
}

const getDrivesNominatedByUser = (associateId) => {
    return getDriveListNominatedByUser(associateId);
}

const getAllDriveForAAssociate = (associateId) => {
    return getAllDriveForAssociate(associateId);
}

const getPenalistByAssociateIdAndDriveId = (associateId, driveId) => {
    return getPenalistByAssociateIdDriveId(associateId, driveId);
}

const getAllPanelist = () => {
    return getAllPanelists();
}

const getAllAssociate = (selServiceLine, selLOB) => {
    return getAllAssociates(selServiceLine, selLOB);
}

const updatePanelist = (panelistObj) => {
    return updatePanelistOfDrive(panelistObj);
}

const getPanelistById = (panelistId) => {
    return getDrivePanelistById(panelistId);
}

const deletePanelistById = (driveId, penalistId) => {
    return deleteDrivePanelistById(driveId, penalistId);
}

const getCalenderViewForDrivePanelist = (serviceLine) => {
    return getCalendarView(serviceLine);
}

const getPanelistForADate = (serviceLine, driveDate) => {
    return getPanelistForDate(serviceLine, driveDate);
}

const getPanelistNotScheduledForADate = (driveDate) => {
    return getNotScheduledPanelistForDate(driveDate);
}

const getPanelistScheduledForADate = (driveDate) => {
    return getScheduledPanelistForDate(driveDate);
}

const linkExternalProfileToPanel = (assignProfileToPanelist) => {
    return linkExtProfileToPanel(assignProfileToPanelist);
}

const getAllAssignedProfiles = () => {
    return getAssignedProfiles();
}

const getProfileListOfAPanelist = (panelId) => {
    return getProfileListOfPanelist(panelId);
}

const getAssignedProfileListOfPanelistForAssociate = (associateId) => {
    return getAssignedProfileListOfPanelist(associateId);
}

const InterviewDriveService = {
    newDrive,
    addPanelist,
    getDrivePanelists,
    getInterviewDriveById,
    getAllPanelist,
    getAllAssociate,
    updatePanelist,
    getPanelistById,
    deletePanelistById,
    registerPanelistt,
    getCalenderViewForDrivePanelist,
    getPanelistForADate,
    getPanelistNotScheduledForADate,
    getPanelistScheduledForADate,
    getDrivesNominatedByUser,
    getPenalistByAssociateIdAndDriveId,
    getAllDriveForAAssociate,
    linkExternalProfileToPanel,
    getProfileListOfAPanelist,
    getAllAssignedProfiles,
    getAssignedProfileListOfPanelistForAssociate
};

export default InterviewDriveService;
