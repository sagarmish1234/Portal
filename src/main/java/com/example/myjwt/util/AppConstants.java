package com.example.myjwt.util;

public interface AppConstants {

	String UI_URL = "http://localhost:3000";
	String TBL_USER = "USER";
	String HEXCODE_ACTION_VALIDATE = "VALIDATE";
	String HEXCODE_SUBACTION_EMAIL = "EMAIL";
	
	String ONSITE = "Onsite";
	String OFFSHORE = "Offshore";
	
	String BILLABILITY_STATUS_Y = "Y";
	String BILLABILITY_STATUS_N = "N";
	
	String NO_BILLABILITY_PLAN = "None";
	String CATEGORY_BILLABILITY = "BillabilityPlan";
	
	String CATEGORY_STATUS = "ReferralStatus";

	String LEAVE_STATUS = "LeaveStatus";
	
	int ASSIGNMENT_ENDING_CAP = 30;
	int PROJECT_ENDING_CAP = 30;

	String STORY_STATUS = "StoryStatus";
	
	String STORY_STATUS_ACCEPTED = "Accepted";
	String STORY_STATUS_BACKLOG = "Backlog";
	String STORY_STATUS_READY = "Ready";
	String STORY_STATUS_INPROGRESS = "In Progress";

	String STORY_PRIORITY = "StoryPriority";

	String SPRINT_STATUS_NOTSTARTED = "Not Started";
	String SPRINT_STATUS_INPROGRESS = "In Progress";
	String SPRINT_STATUS_COMPLETED = "Completed";
	
	String APP_SETTNGS_VISIBILITY_GENERAL = "General";
	
	String APP_SETTINGS_EMAILWORKING = "Cognizant Email Working?";
	
	String APP_SETTINGS_DEFAULTEMAIL = "Default Email";

	Long 	STORY_COMPLETION_THRESHOLD = 1L;
	
	String CATEGORY_SKILLPROFICIENCY_GROUP = "Skill Proficiency";
	String CATEGORY_SKILLPROFICIENCY_KEY = "Skill Proficiency";
	
}