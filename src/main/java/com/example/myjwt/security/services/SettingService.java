package com.example.myjwt.security.services;

import com.example.myjwt.models.Settings;
import com.example.myjwt.repo.SettingsRepository;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingService {

	@Autowired
	private SettingsRepository settingsRepository;

	private String getSettingsValue(String param, String serviceLine) {
		Settings setting = settingsRepository.findByParamAndVisibility(param, serviceLine);
		return setting.getValue();
	}
	
	public List<Settings> getByParamVisibilityValue(String param, String visibility, String value) {
		List<Settings> settings = settingsRepository.findByParamAndVisibilityAndValue(param, visibility, value);
		return settings;
	}

	private String getTAGEmailTo(String serviceLine) {
		return getSettingsValue(serviceLine, EmailConstants.TAG_EMAIL_TO);
	}

	private String getTAGEmailCC(String serviceLine) {
		return getSettingsValue(serviceLine, EmailConstants.TAG_EMAIL_CC);
	}

	private String getHREmailTo(String serviceLine) {
		return getSettingsValue(serviceLine, EmailConstants.HR_EMAIL_TO);
	}

	private String getHREmailCC(String serviceLine) {
		return getSettingsValue(serviceLine, EmailConstants.HR_EMAIL_CC);
	}

	private String getLOBLeadAssociateId(String serviceLine, String LOB) {
		return getSettingsValue(serviceLine, LOB);
	}

	private String getEDLAssociateId(String serviceLine) {
		return getSettingsValue(serviceLine, EmailConstants.EDL_EMAIL);
	}

	public String getPDLAssociateId(String serviceLine) {
		return getSettingsValue(serviceLine, EmailConstants.PDL_EMAIL);
	}

	private boolean isCTSEMailWorking() {
		String value = getSettingsValue(AppConstants.APP_SETTINGS_EMAILWORKING, AppConstants.APP_SETTNGS_VISIBILITY_GENERAL);
		boolean flag = Boolean.valueOf(value);
		return flag;
	}

	private String getDefaultEmailId() {
		return getSettingsValue(AppConstants.APP_SETTINGS_DEFAULTEMAIL, AppConstants.APP_SETTNGS_VISIBILITY_GENERAL);
	}

	private String getProjectsEndingTo(String serviceLine) {
		return getSettingsValue( EmailConstants.PROJECTS_ENDING_TO, serviceLine);
	}

	private String getProjectsEndingCC(String serviceLine) {
		return getSettingsValue( EmailConstants.PROJECTS_ENDING_CC, serviceLine);
	}

	private String getAssignmentsEndingTo(String serviceLine) {
		return getSettingsValue( EmailConstants.ASSIGNMENTS_ENDING_TO, serviceLine);
	}

	private String getAssignmentsEndingCC(String serviceLine) {
		return getSettingsValue(EmailConstants.ASSIGNMENTS_ENDING_CC, serviceLine);
	}
	
	
	private String getLOBFromLeadId(String param, String serviceLine, String leadId) {
		return getSettingsValue(EmailConstants.ASSIGNMENTS_ENDING_CC, serviceLine);
	}

	public String getEmailId(String emailOf, String serviceLine, String LOB) {

		if (!isCTSEMailWorking()) {
			System.out.println(
					"-----------------------------------Returning default email id-----------------------------------");
			return getDefaultEmailId();
		}
		System.out
				.println("-----------------------------------Getting true email id-----------------------------------");
		switch (emailOf) {
		case EmailConstants.EDL_EMAIL:
			return getEDLAssociateId(serviceLine) + EmailConstants.DEFAULT_DOMAIN;
		case EmailConstants.PDL_EMAIL:
			return getPDLAssociateId(serviceLine) + EmailConstants.DEFAULT_DOMAIN;
		case EmailConstants.TAG_EMAIL_TO:
			return getTAGEmailTo(serviceLine);
		case EmailConstants.TAG_EMAIL_CC:
			return getTAGEmailCC(serviceLine);
		case EmailConstants.HR_EMAIL_TO:
			return getHREmailTo(serviceLine);
		case EmailConstants.HR_EMAIL_CC:
			return getHREmailCC(serviceLine);
		case EmailConstants.LOB_LEAD_EMAIL:
			return getLOBLeadAssociateId(serviceLine, LOB) + EmailConstants.DEFAULT_DOMAIN;
		case EmailConstants.PROJECTS_ENDING_TO:
			return getProjectsEndingTo(serviceLine);
		case EmailConstants.PROJECTS_ENDING_CC:
			return getProjectsEndingCC(serviceLine);
		case EmailConstants.ASSIGNMENTS_ENDING_TO:
			return getAssignmentsEndingTo(serviceLine);
		case EmailConstants.ASSIGNMENTS_ENDING_CC:
			return getAssignmentsEndingCC(serviceLine);
		case EmailConstants.DEFAULT_FROM:
			return EmailConstants.DEFAULT_FROM;
		default:
			return emailOf + EmailConstants.DEFAULT_DOMAIN;
		}
	}
}