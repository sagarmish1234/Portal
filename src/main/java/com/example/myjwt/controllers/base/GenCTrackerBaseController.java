package com.example.myjwt.controllers.base;

import com.example.myjwt.beans.*;
import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Role;
import com.example.myjwt.models.Settings;
import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.EGrade;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.repo.*;
import com.example.myjwt.security.services.CustomUserDetailsService;
import com.example.myjwt.security.services.EpicService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.security.services.SprintService;
import com.example.myjwt.security.services.StoryService;
import com.example.myjwt.util.PMUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class GenCTrackerBaseController extends BaseController {

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	private AssignmentUserRepository assignmentUserRepository;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private SettingService settingService;
	
	public List<Long> getMyAssociateScopeGenCList() {
		List<Long> associateList = new ArrayList<Long>();

		
		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		AssignmentUser loggedInAssociate = assignmentUserRepository
				.findByAssignmentReportAndAssociateID(report, getMyAssociateId()).get(0);

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReportAndServiceLine(report,
				loggedInAssociate.getServiceLine());
		List<Settings> settings = null;

		switch (getMyMainRole()) {
		case Admin:
			allAssociates = assignmentUserRepository.findByAssignmentReport(report);

			for (AssignmentUser aUser : allAssociates) {
				associateList.add(aUser.getAssociateID());
			}
			break;
		case PDL: // 231612
			for (AssignmentUser aUser : allAssociates) {
				if (aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name())) {

					associateList.add(aUser.getAssociateID());
				}
			}
			break;
		case EDL: // 254395
			for (AssignmentUser aUser : allAssociates) {
				if (aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name())) {

					associateList.add(aUser.getAssociateID());
				}
			}
			break;
		case LOBLead:
			settings = settingService.getByParamVisibilityValue(ERole.LOBLead.name(),
					loggedInAssociate.getServiceLine(), loggedInAssociate.getAssociateID().toString());

			List<String> lobs = new ArrayList<String>();

			for (Settings setting : settings) {
				lobs.add(setting.getVisibilityTwo());
			}

			for (AssignmentUser aUser : allAssociates) {
				if ((aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name()))
						&& lobs.contains(aUser.getlOB())) {
					associateList.add(aUser.getAssociateID());
				}
			}
			break;
		case AccountLead:
			settings = settingService.getByParamVisibilityValue(ERole.AccountLead.name(),
					loggedInAssociate.getServiceLine(), loggedInAssociate.getAssociateID().toString());

			List<String> accounts = new ArrayList<String>();

			for (Settings setting : settings) {
				accounts.add(setting.getVisibilityTwo());
			}

			for (AssignmentUser aUser : allAssociates) {
				if ((aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name()))
						&& accounts.contains(aUser.getAccountID())) {
					associateList.add(aUser.getAssociateID());
				}
			}

			break;
		case ProjectManager:
			for (AssignmentUser aUser : allAssociates) {
				if ((aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name()))
						&& (loggedInAssociate.getProjectID().equals(aUser.getProjectID()))) {
					associateList.add(aUser.getAssociateID());
				}
			}
			break;
		default:
			System.out.println("I am not found");
			break;
		}

		return associateList;
	}
	
	public List<AssignmentUser> getMyAssociateUsersScopeGenCList() {
		List<AssignmentUser> associateList = new ArrayList<AssignmentUser>();

		
		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		AssignmentUser loggedInAssociate = assignmentUserRepository
				.findByAssignmentReportAndAssociateID(report, getMyAssociateId()).get(0);

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReportAndServiceLine(report,
				loggedInAssociate.getServiceLine());
		List<Settings> settings = null;

		switch (getMyMainRole()) {
		case Admin:
			allAssociates = assignmentUserRepository.findByAssignmentReport(report);

			for (AssignmentUser aUser : allAssociates) {
				associateList.add(aUser);
			}
			break;
		case PDL: // 231612
			for (AssignmentUser aUser : allAssociates) {
				if (aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name())) {

					associateList.add(aUser);
				}
			}
			break;
		case EDL: // 254395
			for (AssignmentUser aUser : allAssociates) {
				if (aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name())) {

					associateList.add(aUser);
				}
			}
			break;
		case LOBLead:
			settings = settingService.getByParamVisibilityValue(ERole.LOBLead.name(),
					loggedInAssociate.getServiceLine(), loggedInAssociate.getAssociateID().toString());

			List<String> lobs = new ArrayList<String>();

			for (Settings setting : settings) {
				lobs.add(setting.getVisibilityTwo());
			}

			for (AssignmentUser aUser : allAssociates) {
				if ((aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name()))
						&& lobs.contains(aUser.getlOB())) {
					associateList.add(aUser);
				}
			}
			break;
		case AccountLead:
			settings = settingService.getByParamVisibilityValue(ERole.AccountLead.name(),
					loggedInAssociate.getServiceLine(), loggedInAssociate.getAssociateID().toString());

			List<String> accounts = new ArrayList<String>();

			for (Settings setting : settings) {
				accounts.add(setting.getVisibilityTwo());
			}

			for (AssignmentUser aUser : allAssociates) {
				if ((aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name()))
						&& accounts.contains(aUser.getAccountID())) {
					associateList.add(aUser);
				}
			}

			break;
		case ProjectManager:
			for (AssignmentUser aUser : allAssociates) {
				if ((aUser.getGradeDescription().equalsIgnoreCase(EGrade.PAT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.P.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PT.name())
						|| aUser.getGradeDescription().equalsIgnoreCase(EGrade.PA.name()))
						&& (loggedInAssociate.getProjectID().equals(aUser.getProjectID()))) {
					associateList.add(aUser);
				}
			}
			break;
		default:
			System.out.println("I am not found");
			break;
		}

		return associateList;
	}

}