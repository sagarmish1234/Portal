import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AuthService from "./services/auth.service";
import SearchAssociate from "./reports/SearchAssociate";
import Layout from "./structure/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import VerifyUser from "./auth/VerifyUser";
import Home from "./general/Home";
import Test from "./general/Test";
import Profile from "./general/Profile";
import {
  ROLE_ASSOCIATE,
  ROLE_PM,
  ROLE_ACCOUNTLEAD,
  ROLE_LOBLEAD,
  ROLE_EDL,
  ROLE_ADMIN,
  ROLE_HR,
  ROLE_TAG,
} from "./common/constants";
import { Outlet } from "react-router-dom";
import Header from "./structure/Header";
import Navbar from "./structure/Navbar";
import AssociateGroup from "./forms/associateGroup/AssociateGroup";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import MultilevelMenu from "./structure/MultilevelMenu";
import { menuData } from "./menuItems";
import Logout from "./auth/Logout";
import UploadAssignment from "./forms/uploadassignment";
import InternalProfile from "./forms/profiles/internalprofile";
import AllProfiles from "./reports/ProfileList";
import ProfileFeedback from "./forms/profiles/feedback";
import ExternalProfile from "./forms/profiles/externalprofile";
import PyramidByProject from "./reports/PyramidByProject";
import PyramidByLOB from "./reports/PyramidByLOB";
import PyramidByPractice from "./reports/PyramidByPractice";
import BillabilityReport from "./reports/billabilityreport";
import PrivateRoute from "./common/PrivateRoute";
import PublicRoute from "./common/PublicRoute";
import BillabilityPlan from "./forms/billability/BillabilityPlan";
import FilteredBillabilityPlan from "./forms/billability/FilteredBillabilityPlan";
import BillabilityPlanHistory from "./forms/billability/BillabilityPlanHistory";
import DriveListAssociate from "./drives/DriveListAssociate";
import InterviewDriveForm from "./drives/InterviewDriveForm";
import PanelNomineeForm from "./drives/PanelNomineeForm";
import DrivePanelists from "./drives/DrivePanelists";
import DriveListManager from "./drives/DriveListManager";
import AllPanelists from "./drives/AllPanelists";
import AllAssociates from "./drives/AllAssociates";
import EditPanelistForm from "./drives/EditPanelistForm";
import Calendar from "./drives/CalendarView/Calendar";
import RegisterPanelist from "./drives/RegisterPanelist";
import OnDatePanelist from "./drives/OnDatePanelist";
import Leave from "./forms/leave/Leave";
import Settings from "./forms/admin/settings";
import AdminLeavesPanel from "./reports/AdminLeavesPanel";
import LOBdashboard from "./reports/LOBdashboard";
import Edldashboard from "./reports/edldashboard";
import ForgetPassword from "./auth/ForgetPassword";
import UpdatePassword from "./auth/UpdatePassword";
import AdminApproval from "./components/AdminApproval";
import CheckedExample from "./components/CheckedExample";
import AddTraining from "./forms/training/AddTraining";
import Rampdown from "./forms/Rampdown/Rampdown";
import Rampproject from "./forms/Rampdown/Rampproject";
import ListOfTrainings from "./forms/training/ListOfTrainings";
import TrainingDetail from "./forms/training/TrainingDetail";
import NominateTraining from "./forms/training/NominateTraining";
import TrainingProgress from "./forms/training/TrainingProgress";
import Referrals from "./forms/referrals/referrals";
import AllReferrals from "./reports/ReferralList";
import ReferralInfo from "./forms/referrals/updateStatus";
import ChangePassword from "./auth/ChangePassword";
import PanelistProfileList from "./drives/PanelistProfileList";
import AssignedProfiles from "./drives/AssignedProfiles";
import ListOnly from "./templates/listonly";
import AllStories from "./genCTracker/AllStories";
import StoryDetails from "./genCTracker/StoryDetails";
import NewStory from "./genCTracker/NewStory";
import AllSprints from "./genCTracker/AllSprints";
import NewSprint from "./genCTracker/NewSprint";
import SprintDetails from "./genCTracker/SprintDetails";
import EpicForm from "./genCTracker/EpicForm";
import EpicList from "./genCTracker/EpicList";
import ParentAccountList from "./genCTracker/ParentAccountList";
import PDLList from "./genCTracker/PDLList";
import SBUList from "./genCTracker/SBUList";
import GenCTrackerDashboard from "./genCTracker/dashboard";
import EpicDetail from "./genCTracker/EpicDetail";
import ResignationUploadSheet from "./reports/resignation/ResignationUploadSheet";
import ResignationData from "./reports/resignation/ResignationData";
import MyStories from "./genCTracker/MyStories";
import GenCAssociate from "./genCTracker/GenCAssociate";
import SkillFamilyDetails from "./genCTracker/SkillFamilyDetails";
import AddIssue from "./forms/issues/AddIssue";
import ViewIssues from "./forms/issues/ViewIssues";
import EditIssues from "./forms/issues/EditIssues";

import AddSkills from "./forms/skill/AddSkills";
import AssociateSkills from "./forms/skill/AssociateSkills";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const userFullName = AuthService.getCurrentUserFullName();
    const userRoles = AuthService.getCurrentUserRoles();

    // console.log(userFullName);
    // console.log(userRoles);
    // console.log(user);

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div className="App">
      <MultilevelMenu data={menuData} currentUser={currentUser} />

      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute user={currentUser}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/verify"
            element={
              <PublicRoute user={currentUser}>
                <VerifyUser />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/login"
            element={
              <PublicRoute user={currentUser}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/data/LOBdashboard"
            element={
              <PrivateRoute user={currentUser}>
                <LOBdashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/data/Edldashboard"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ADMIN}>
                <Edldashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/groupPanel"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <AssociateGroup />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/register"
            element={
              <PublicRoute user={currentUser}>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/update-password"
            element={
              <PublicRoute user={currentUser}>
                <UpdatePassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/forget-password"
            element={
              <PublicRoute user={currentUser}>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/Admin/approval"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ADMIN}>
                <AdminApproval />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/leaves/adminPanel"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <AdminLeavesPanel />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/leaves/userPanel"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <Leave />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/home"
            element={
              <PrivateRoute user={currentUser}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/test"
            element={
              <PrivateRoute user={currentUser}>
                <Test />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/logout"
            element={
              <PrivateRoute user={currentUser}>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/profiles/internalprofile"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <InternalProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/admin/settings"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ADMIN}>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/data/searchAssociate"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <SearchAssociate />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/profiles/externalprofile"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <ExternalProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/referrals"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <Referrals />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/uploadAssignment"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <UploadAssignment />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/data/getAllProfiles"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <AllProfiles />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/data/getAllReferrals"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <AllReferrals />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/feedback/:profileId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <ProfileFeedback />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/data/getReferralInfo/:referralId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <ReferralInfo />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/pyramidbyprojects"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <PyramidByProject />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/pyramidbylob"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <PyramidByLOB />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/pyramidbypractice"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <PyramidByPractice />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/billability/billableplans"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <BillabilityPlan />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/billability/filteredbillableplans/:selPractice/:categoryId/:grade/:location/"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <FilteredBillabilityPlan />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/billability/billableplanhistory/:associateId/:associateName/"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <BillabilityPlanHistory />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/billabilityreport"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <BillabilityReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/reports/interview/drives"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <DriveListAssociate />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/reports/interview/alldrives"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <DriveListManager />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/forms/interview/newdrive"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <InterviewDriveForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/forms/interview/registerpanelist"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <RegisterPanelist />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/add-panelist/:driveId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <PanelNomineeForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/reports/interview/assignedprofiles"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <AssignedProfiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/panelists/:driveId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <DrivePanelists />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/panelistProfileList/:panelistId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <PanelistProfileList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/updatePanelist/:driveId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <EditPanelistForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/allPanelists"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <AllPanelists />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/allAssociates"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <AllAssociates />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/calendarView"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/calendarView/panelist"
            element={
              <PrivateRoute user={currentUser} role={ROLE_TAG}>
                <OnDatePanelist />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/trainings/add"
            element={
              <PrivateRoute user={currentUser} role={ROLE_HR}>
                <AddTraining />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/Rampdown/Rampproject"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <Rampproject />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/ui/forms/Rampdown/Rampdown"
            element={
              <PrivateRoute user={currentUser} role={ROLE_LOBLEAD}>
                <Rampdown />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/trainings"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <ListOfTrainings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/trainings/:trainingId"
            element={
              <PrivateRoute user={currentUser} role={ROLE_HR}>
                <TrainingDetail />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/trainings/:trainingId/nominate"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <NominateTraining />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/trainings/:trainingId/update-progress"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <TrainingProgress />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/dummy/assignmentlisting"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <ListOnly />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="*"
            element={
              <PublicRoute user={currentUser}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/change-password"
            element={
              <PrivateRoute user={currentUser}>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/stories/allStories"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <AllStories />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/mystories"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <MyStories />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/stories/:id/storyDetails"
            element={
              <PrivateRoute user={currentUser} role={ROLE_ASSOCIATE}>
                <StoryDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/stories/newStory"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <NewStory />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/sprint/allSprints"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <AllSprints />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/sprint/newSprint"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <NewSprint />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/sprint/:id/sprintDetail"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <SprintDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/addepic"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <EpicForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/epics"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <EpicList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/epic/:epicId/stories"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <EpicDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/parent-accounts"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <ParentAccountList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/pdls"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <PDLList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/sbus"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <SBUList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/dashboard"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <GenCTrackerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/gencTracker/associates"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <GenCAssociate />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/gencTracker/associates/:id/skillDetails"
            element={
              <PrivateRoute user={currentUser} role={ROLE_PM}>
                <SkillFamilyDetails />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/resignation/resignationuploadsheet"
            element={
              <PrivateRoute user={currentUser}>
                <ResignationUploadSheet />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/resignation/resignationdata"
            element={
              <PrivateRoute user={currentUser}>
                <ResignationData />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/issues/add"
            element={
              <PrivateRoute user={currentUser}>
                <AddIssue />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/issues/viewIssues"
            element={
              <PrivateRoute user={currentUser}>
                <ViewIssues />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/issues/EditIssues/:id"
            element={
              <PrivateRoute user={currentUser}>
                <EditIssues />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/ui/forms/skill/myskills"
            element={
              <PrivateRoute user={currentUser}>
                <AddSkills />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/ui/forms/skill/details"
            element={
              <PrivateRoute user={currentUser}>
                <AssociateSkills />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
