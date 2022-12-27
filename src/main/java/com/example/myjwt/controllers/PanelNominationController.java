package com.example.myjwt.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.myjwt.beans.Email;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.ExtProfilePanelist;
import com.example.myjwt.models.InterviewDrive;
import com.example.myjwt.models.PanelNominee;
import com.example.myjwt.models.Profile;
import com.example.myjwt.models.Skill;
import com.example.myjwt.payload.request.AddPanelistRequest;
import com.example.myjwt.payload.request.AssignProfileToPanelistReq;
import com.example.myjwt.payload.request.CreateInterviewDriveRequest;
import com.example.myjwt.payload.request.CreateProfileRequest;
import com.example.myjwt.payload.request.RegisterPanelistRequest;
import com.example.myjwt.payload.response.AllAssociatesResponse;
import com.example.myjwt.payload.response.AllPanelistsResponse;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.DriveListAssociate;
import com.example.myjwt.payload.response.FileUploadResponse;
import com.example.myjwt.payload.response.InterviewDriveResponse;
import com.example.myjwt.payload.response.PanelistsResponse;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.ExtProfilePanelistRepository;
import com.example.myjwt.repo.InterviewDriveRepository;
import com.example.myjwt.repo.PanelistRepository;
import com.example.myjwt.repo.ProfileRepository;
import com.example.myjwt.repo.SkillRepository;
import com.example.myjwt.security.services.EmailService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.util.EmailConstants;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class PanelNominationController {

	@Autowired
	private InterviewDriveRepository interviewDriveRepository;

	@Autowired
	private PanelistRepository panelistRepository;

	@Autowired
	private SkillRepository skillRepository;

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;

	@Autowired
	private AssignmentUserRepository assignmentUserRepository;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private EmailService emailService;

	@Autowired
	private SettingService settingService;

	@Autowired
	private ExtProfilePanelistRepository extProfilePanelistRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@GetMapping("/getAllServiceLines")
	private List<String> getAllServiceLines() {
		return assignmentUserRepository.getAllServiceLine();
	}

	@PostMapping("/create-interview-drive")
	private ResponseEntity<?> createInterviewDrive(
			@RequestBody @Valid CreateInterviewDriveRequest interviewDriveRequest) {
		InterviewDrive interviewDrive = new InterviewDrive(interviewDriveRequest.getInterviewDriveName(),
				interviewDriveRequest.getInterviewDriveDate(), settingService.getEmailId("TAG_EMAIL_TO", null, null),
				interviewDriveRequest.getSkillId(), interviewDriveRequest.getIsVirtual());

		interviewDriveRepository.saveAndFlush(interviewDrive);
		if (interviewDriveRequest.getPanelistIds() != null) {
			List<Long> panelistIds = interviewDriveRequest.getPanelistIds();
			for (Long id : panelistIds) {
				PanelNominee nominee = panelistRepository.findById(id).orElse(null);
				nominee.setAvailableOn(interviewDriveRequest.getInterviewDriveDate());
				nominee.setInterviewDriveId(interviewDrive.getId());
				panelistRepository.saveAndFlush(nominee);
			}
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ApiResponse(true, "Interview drive created successfully!!"));
	}

	@GetMapping("/getAllDrives")
	private List<InterviewDriveResponse> getAllDrives() {

		List<InterviewDriveResponse> interviewDriveListResponse = new ArrayList<>();
		List<InterviewDrive> interviewDrives = interviewDriveRepository.findAll();

		for (InterviewDrive interviewDrive : interviewDrives) {

			long count = panelistRepository.findByInterviewDriveIdAndIsActive(interviewDrive.getId(), true).size();
			Skill skill = skillRepository.findById(interviewDrive.getSkillId()).orElse(null);
			InterviewDriveResponse interviewDriveResponse = new InterviewDriveResponse(interviewDrive.getId(),
					interviewDrive.getInterviewDriveName(), interviewDrive.getInterviewDriveDate(),
					interviewDrive.getInterviewPocEmail(), skill.getSkillName(), interviewDrive.isVirtual(), count);
			interviewDriveListResponse.add(interviewDriveResponse);
		}
		Collections.reverse(interviewDriveListResponse);
		return interviewDriveListResponse;
	}

	@GetMapping("/getAllDriveForAssociate/{associateId}")
	private List<DriveListAssociate> getDriveListForAssociate(@PathVariable long associateId) {
		List<PanelNominee> nominations = panelistRepository.findByAssociateId(associateId);
		List<InterviewDrive> interviewDrives = interviewDriveRepository.findAll();
		List<DriveListAssociate> driveListAss = new ArrayList<DriveListAssociate>();
		for (InterviewDrive drive : interviewDrives) {
			Skill skill = skillRepository.findById(drive.getSkillId()).orElse(null);
			DriveListAssociate dAssociate = new DriveListAssociate(drive.getId(), drive.getInterviewDriveName(),
					drive.getInterviewDriveDate(), drive.getInterviewPocEmail(), skill.getSkillName(),
					drive.isVirtual());
			driveListAss.add(dAssociate);
		}
		for (DriveListAssociate dAssociate : driveListAss) {
			for (PanelNominee nominee : nominations) {
				if (dAssociate.getId() == nominee.getInterviewDriveId()) {
					dAssociate.setAvailabilityFrom(nominee.getAvailabilityFrom());
					dAssociate.setAvailabilityTo(nominee.getAvailabilityTo());
					dAssociate.setActive(nominee.isActive());
				}
			}
		}
		Collections.reverse(driveListAss);
		return driveListAss;

	}

	@GetMapping("/getDriveListNominatedByUser/{associateId}")
	private List<Long> getDriveListNominatedByUser(@PathVariable long associateId) {
		List<PanelNominee> nominees = panelistRepository.findByAssociateIdAndIsActive(associateId, true);
//		if(nominees.isEmpty())
//			return null;
		List<Long> driveParticipationList = new ArrayList<Long>();
		for (PanelNominee pn : nominees) {
			driveParticipationList.add(pn.getInterviewDriveId());
		}
		return driveParticipationList;
	}

	@GetMapping("/drive/{driveId}")
	private InterviewDriveResponse getDriveById(@PathVariable long driveId) {
		InterviewDrive interviewDrive = interviewDriveRepository.findById(driveId).orElse(null);
		InterviewDriveResponse interviewDriveResponse = new InterviewDriveResponse(interviewDrive.getId(),
				interviewDrive.getInterviewDriveName(), interviewDrive.getInterviewDriveDate(),
				interviewDrive.getInterviewPocEmail());
		return interviewDriveResponse;
	}

	@PostMapping("/add-panelist")
	private ResponseEntity<?> addPanelist(@RequestBody @Valid AddPanelistRequest addPanelistReq) {

//		PanelNominee nominee = panelistRepository.findByInterviewDriveIdAssociateId(
//				addPanelistReq.getInterviewDriveId(), addPanelistReq.getAssociateId());
//
//		if (nominee == null) {

		try {
			Email email = new Email();
			email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
			email.setTo(settingService.getEmailId(EmailConstants.TAG_EMAIL_TO, "ADM", null));
			email.setCc(settingService.getEmailId(EmailConstants.TAG_EMAIL_CC, "ADM", null));
			email.setSubject("!! Alert !! - Associate nominated for Interview Drive");

			Map<String, Object> model = new HashMap<String, Object>();
			model.put("panelist", addPanelistReq);

			email.setModel(model);
			emailService.sendPanelistsEmail(email);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		PanelNominee panelNominee = new PanelNominee(addPanelistReq.getPanelistName(), addPanelistReq.getAssociateId(),
				addPanelistReq.getPanelistEmail(), addPanelistReq.getInterviewDriveId(), addPanelistReq.getSkillId(),
				addPanelistReq.getAvailabilityFrom(), addPanelistReq.getAvailabilityTo(), true);
		panelistRepository.saveAndFlush(panelNominee);
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Panelist added successfully!!"));
//		}
//
//		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Panelist already present!!"));

	}

	@PostMapping("/register-panelist")
	private ResponseEntity<?> registerPanelist(@RequestBody @Valid RegisterPanelistRequest regPanelistRequest) {
		PanelNominee nominee = panelistRepository.checkPanelistAvailability(regPanelistRequest.getAvailableOn(),
				regPanelistRequest.getAvailabilityFrom(), regPanelistRequest.getAvailabilityTo(),
				regPanelistRequest.getAssociateId());
		if (nominee == null) {
			PanelNominee panelNominee = new PanelNominee(regPanelistRequest.getPanelistName(),
					regPanelistRequest.getAssociateId(), regPanelistRequest.getPanelistEmail(),
					regPanelistRequest.getSkillId(), regPanelistRequest.getAvailableOn(),
					regPanelistRequest.getAvailabilityFrom(), regPanelistRequest.getAvailabilityTo(), true);
			panelistRepository.saveAndFlush(panelNominee);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ApiResponse(true, "Panelist registered successfully!!"));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Panelist already present!!"));

	}

	@GetMapping("/getPenalistByid/{penalistId}")
	private PanelistsResponse getDrivePenalistById(@PathVariable long penalistId) {
		PanelNominee panelNominee = panelistRepository.findById(penalistId).orElse(null);
		Skill skill = skillRepository.findById(panelNominee.getSkillId()).orElse(null);
		PanelistsResponse panelistResObj = new PanelistsResponse(panelNominee.getId(), panelNominee.getPanelistName(),
				panelNominee.getAssociateId(), panelNominee.getPanelistEmail(), skill.getSkillName(),
				panelNominee.getAvailabilityFrom(), panelNominee.getAvailabilityTo(), true);
		return panelistResObj;
	}

	@GetMapping("/getPenalistByAssociateIdDriveId/{penalistId}/{driveId}")
	private PanelistsResponse getDrivePenalistByAssociateIdAndDriveId(@PathVariable long penalistId,
			@PathVariable long driveId) {
		PanelNominee panelNominee = panelistRepository.findByAssociateIdAndInterviewDriveIdAndIsActive(penalistId,
				driveId, true);
		Skill skill = skillRepository.findById(panelNominee.getSkillId()).orElse(null);
		PanelistsResponse panelistResObj = new PanelistsResponse(panelNominee.getId(), panelNominee.getPanelistName(),
				panelNominee.getAssociateId(), panelNominee.getPanelistEmail(), skill.getSkillName(),
				panelNominee.getAvailabilityFrom(), panelNominee.getAvailabilityTo(), true);
		return panelistResObj;
	}

	@PutMapping("/updatePanelist")
	private ResponseEntity<?> updateDrivePanelist(@RequestBody AddPanelistRequest addPanelistReq) {

		PanelNominee nominee = panelistRepository.findByInterviewDriveIdAssociateId(
				addPanelistReq.getInterviewDriveId(), addPanelistReq.getAssociateId());

		nominee.setAvailabilityFrom(addPanelistReq.getAvailabilityFrom());
		nominee.setAvailabilityTo(addPanelistReq.getAvailabilityTo());
		nominee.setSkillId(addPanelistReq.getSkillId());

		panelistRepository.saveAndFlush(nominee);

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Panelist updated successfully!!"));
	}

	@DeleteMapping("/deletePanelist/{driveId}/{panelistId}")
	private ResponseEntity<?> deleteDrivePanelist(@PathVariable long driveId, @PathVariable long panelistId) {
		PanelNominee panelNominee = panelistRepository.findByAssociateIdAndInterviewDriveIdAndIsActive(panelistId,
				driveId, true);

		panelNominee.setActive(false);
		panelistRepository.saveAndFlush(panelNominee);

//		panelistRepository.deleteById(panelistId);

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Panelist deleted successfully!!"));
	}

	@GetMapping("/getAllPanelist/{driveId}")
	private List<PanelistsResponse> getAllPanelistsForDrive(@PathVariable long driveId) {
		List<PanelistsResponse> allPanelistList = new ArrayList<>();
		List<PanelNominee> panelNominees = panelistRepository.findByInterviewDriveId(driveId);
		List<ExtProfilePanelist> allExtProfiles = extProfilePanelistRepository.findAll();

		for (PanelNominee panelNominee : panelNominees) {

			Skill skill = skillRepository.findById(panelNominee.getSkillId()).orElse(null);

			Long totalProfiles = 0L;
			for (ExtProfilePanelist extProfileData : allExtProfiles) {
				if (panelNominee.getId() == extProfileData.getassociateId()) {
					totalProfiles += 1;
				}
			}

			PanelistsResponse panelistResObj = new PanelistsResponse(panelNominee.getId(),
					panelNominee.getPanelistName(), panelNominee.getAssociateId(), panelNominee.getPanelistEmail(),
					skill.getSkillName(), panelNominee.getAvailabilityFrom(), panelNominee.getAvailabilityTo(),
					panelNominee.isActive(), totalProfiles);
			allPanelistList.add(panelistResObj);
		}
		return allPanelistList;

	}

	@GetMapping("/panelists")
	private List<AllPanelistsResponse> getAllPanelists() {
		List<AllPanelistsResponse> allPanelistList = new ArrayList<>();
		List<Object[]> panelistsArray = panelistRepository.countTotalPanelistsByDrives();
		for (Object[] obj : panelistsArray) {
			Long id = Long.valueOf(obj[0].toString());
			String panelistName = (String) obj[1];
			Long associateId = Long.valueOf(obj[2].toString());
			String panelistEmail = (String) obj[3];
			Long skillId = Long.valueOf(obj[4].toString());

			boolean isActive = true;
			if (!(boolean) obj[5])
				isActive = true;
			int totalNominations = Integer.valueOf(obj[6].toString());
			String skill = skillRepository.findById(skillId).orElse(null).getSkillName();
			AllPanelistsResponse allPanelistResObj = new AllPanelistsResponse(id, panelistName, associateId,
					panelistEmail, skill, totalNominations, isActive);
			allPanelistList.add(allPanelistResObj);
		}
		return allPanelistList;
	}

	@GetMapping("/allAssociates/{selServiceLine}/{selLOB}")
	private List<AllAssociatesResponse> getAllAssociates(@PathVariable String selServiceLine,
			@PathVariable String selLOB) {

		HashMap<Long, AllAssociatesResponse> associatesMap = new HashMap<Long, AllAssociatesResponse>();
		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));
		List<AssignmentUser> usersList = assignmentUserRepository.findByAssignmentReportAndServiceLineAndLOB(report,
				selServiceLine, selLOB);

		List<Long> pastDrives = interviewDriveRepository.getPastDrivesData();
		List<Long> upcomingDrives = interviewDriveRepository.getUpcomingDrivesData();

		List<PanelNominee> nomineesOfPastDrives = panelistRepository.findByInterviewDriveIdInAndIsActive(pastDrives,
				true);
		List<PanelNominee> nomineesOfUpcomingDrives = panelistRepository
				.findByInterviewDriveIdInAndIsActive(upcomingDrives, true);

		HashMap<Long, Long> pastDrivesPanelistMap = new HashMap<Long, Long>();
		HashMap<Long, Long> upcomingDrivesPanelistMap = new HashMap<Long, Long>();

		for (PanelNominee nominee : nomineesOfPastDrives) {
			if (pastDrivesPanelistMap.containsKey(nominee.getAssociateId())) {
				pastDrivesPanelistMap.put(nominee.getAssociateId(),
						pastDrivesPanelistMap.get(nominee.getAssociateId()) + 1);
			} else
				pastDrivesPanelistMap.put(nominee.getAssociateId(), 1L);
		}

		for (PanelNominee nominee : nomineesOfUpcomingDrives) {
			if (upcomingDrivesPanelistMap.containsKey(nominee.getAssociateId())) {
				upcomingDrivesPanelistMap.put(nominee.getAssociateId(),
						upcomingDrivesPanelistMap.get(nominee.getAssociateId()) + 1);
			} else
				upcomingDrivesPanelistMap.put(nominee.getAssociateId(), 1L);
		}

		ArrayList<AllAssociatesResponse> associateList = new ArrayList<AllAssociatesResponse>();

		for (AssignmentUser user : usersList) {
			Long associateID = user.getAssociateID();
			String associateName = user.getAssociateName();
			String serviceLine = user.getServiceLine();
			String lOB = user.getlOB();
			String onOff = user.getOnOff();
			Long noOfPastDrives = pastDrivesPanelistMap.get(associateID);
			Long noOfUpcomingDrives = upcomingDrivesPanelistMap.get(associateID);
			AllAssociatesResponse allAssociateResObj = new AllAssociatesResponse(associateID, associateName,
					serviceLine, lOB, onOff, noOfUpcomingDrives, noOfPastDrives);

			if (associatesMap.get(associateID) == null)
				associatesMap.put(associateID, allAssociateResObj);
		}
		associateList = new ArrayList(associatesMap.values());
		Collections.sort(associateList);

		return associateList;
	}

	@GetMapping("/calendar-view/{selServiceLine}")
	private HashMap<String, HashMap<Date, Long>> getDataForCalendarView(@PathVariable String selServiceLine) {
		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));
		List<AssignmentUser> usersList = assignmentUserRepository.findByAssignmentReportAndServiceLine(report,
				selServiceLine);

		LocalDate date = LocalDate.now();
		int year = date.getYear();

		String firstDateOfTheYearString = Integer.toString(year) + "-01-01";
		String LastDateOfTheYearString = Integer.toString(year) + "-12-31";

		java.sql.Date firstDateOfTheYear = java.sql.Date.valueOf(firstDateOfTheYearString);
		java.sql.Date LastDateOfTheYear = java.sql.Date.valueOf(LastDateOfTheYearString);

		List<InterviewDrive> drivesOfTheYear = interviewDriveRepository
				.findInterviewDrivesBetweenDates(firstDateOfTheYear, LastDateOfTheYear);

		HashMap<String, HashMap<Date, Long>> responseMap = new HashMap<String, HashMap<Date, Long>>();
		
		HashMap<Date, Long> availablePanelsForThisYearDrive = new HashMap<Date, Long>();
		HashMap<Date, Long> panelsForThisYearDrive = new HashMap<Date, Long>();
		ArrayList<Long> driveIds = new ArrayList<Long>();

		for (InterviewDrive drive : drivesOfTheYear) {
			driveIds.add(drive.getId());
		}

		List<PanelNominee> panelListByDriveIds = panelistRepository.findByInterviewDriveIdInAndIsActive(driveIds, true);
		List<PanelNominee> panelListByDates = panelistRepository.findPanelistsBetweenDates(firstDateOfTheYear,
				LastDateOfTheYear);

		for (PanelNominee nominee : panelListByDates) {
			if (nominee.getAvailableOn() != null) {
				if (panelsForThisYearDrive.get(nominee.getAvailableOn()) == null) {
					panelsForThisYearDrive.put(nominee.getAvailableOn(), 1L);
					availablePanelsForThisYearDrive.put(nominee.getAvailableOn(), 1L);
				} else {
					panelsForThisYearDrive.put(nominee.getAvailableOn(),
							panelsForThisYearDrive.get(nominee.getAvailableOn()) + 1);
					availablePanelsForThisYearDrive.put(nominee.getAvailableOn(),
							panelsForThisYearDrive.get(nominee.getAvailableOn()) + 1);

				}
			}
		}

		HashMap<Long, Long> panelsByDrive = new HashMap<Long, Long>();

		for (PanelNominee nominee : panelListByDriveIds) {
			if (nominee.getAvailableOn() == null) {
				if (panelsByDrive.get(nominee.getInterviewDriveId()) == null) {
					panelsByDrive.put(nominee.getInterviewDriveId(), 1L);
				} else {
					panelsByDrive.put(nominee.getInterviewDriveId(),
							panelsByDrive.get(nominee.getInterviewDriveId()) + 1);

				}
			}
		}

		for (InterviewDrive drive : drivesOfTheYear) {
			if (panelsForThisYearDrive.get(drive.getInterviewDriveDate()) == null) {
				panelsForThisYearDrive.put(drive.getInterviewDriveDate(), panelsByDrive.get(drive.getId()));
			} else {
				Long value = panelsForThisYearDrive.get(drive.getInterviewDriveDate());
				Long value2 = 0L;
				if (panelsByDrive.get(drive.getId()) != null)
					value2 = panelsByDrive.get(drive.getId());
				panelsForThisYearDrive.put(drive.getInterviewDriveDate(), value + value2);

			}
		}
		
		responseMap.put("Available", availablePanelsForThisYearDrive);
		responseMap.put("Total", panelsForThisYearDrive);
		
		return responseMap;
	}

	@GetMapping("/panelist-calendar-view/{selServiceLine}/{driveDate}")
	private List<AllPanelistsResponse> getPanelistForCalendarView(@PathVariable Date driveDate,
			@PathVariable String selServiceLine) {

		List<InterviewDrive> drivesOfTheDate = interviewDriveRepository.findByInterviewDriveDate(driveDate);
		ArrayList<Long> driveIds = new ArrayList<Long>();
		for (InterviewDrive drive : drivesOfTheDate) {
			driveIds.add(drive.getId());
		}

		List<PanelNominee> panelListTemp = new ArrayList<PanelNominee>();

		if (!driveIds.isEmpty()) {
			panelListTemp = panelistRepository.getPanelistForCalendarDate(driveIds, driveDate);
		} else {
			panelListTemp = panelistRepository.findByAvailableOnAndInterviewDriveId(driveDate, null);
		}

		List<AllPanelistsResponse> panelList = new ArrayList<AllPanelistsResponse>();

		for (PanelNominee nominee : panelListTemp) {
			String skill = skillRepository.findById(nominee.getSkillId()).orElse(null).getSkillName();
			AllPanelistsResponse obj = new AllPanelistsResponse(nominee.getId(), nominee.getPanelistName(),
					nominee.getAssociateId(), nominee.getPanelistEmail(), skill);
			panelList.add(obj);
		}

		return panelList;

	}

	@GetMapping("/not-scheduled-panelist/{driveDate}")
	private List<AllPanelistsResponse> getNotScheduledPanelist(@PathVariable Date driveDate) {
		List<PanelNominee> panelListTemp = panelistRepository.findByAvailableOnAndInterviewDriveId(driveDate, null);
		List<AllPanelistsResponse> panelList = new ArrayList<AllPanelistsResponse>();

		for (PanelNominee nominee : panelListTemp) {
			String skill = skillRepository.findById(nominee.getSkillId()).orElse(null).getSkillName();
			AllPanelistsResponse obj = new AllPanelistsResponse(nominee.getId(), nominee.getPanelistName(),
					nominee.getAssociateId(), nominee.getPanelistEmail(), skill);
			panelList.add(obj);
		}

		return panelList;

	}

	@GetMapping("/scheduled-panelist/{driveDate}")
	private List<AllPanelistsResponse> getScheduledPanelist(@PathVariable Date driveDate) {
		List<InterviewDrive> drivesOfTheDate = interviewDriveRepository.findByInterviewDriveDate(driveDate);
		ArrayList<Long> driveIds = new ArrayList<Long>();
		for (InterviewDrive drive : drivesOfTheDate) {
			driveIds.add(drive.getId());
		}

		List<PanelNominee> panelListTemp = panelistRepository.findByInterviewDriveIdInAndIsActive(driveIds, true);

		List<AllPanelistsResponse> panelList = new ArrayList<AllPanelistsResponse>();

		for (PanelNominee nominee : panelListTemp) {
			String skill = skillRepository.findById(nominee.getSkillId()).orElse(null).getSkillName();
			AllPanelistsResponse obj = new AllPanelistsResponse(nominee.getId(), nominee.getPanelistName(),
					nominee.getAssociateId(), nominee.getPanelistEmail(), skill, interviewDriveRepository
							.findById(nominee.getInterviewDriveId()).orElse(null).getInterviewDriveName());
			panelList.add(obj);
		}

		return panelList;

	}

	@PostMapping("/linkExtProfileToPanel")
	private ResponseEntity<?> linkExtProfileToPanel(
			@RequestBody AssignProfileToPanelistReq assignProfileToPanelistReq) {
		List<Long> profileIds = assignProfileToPanelistReq.getProfileIds();
		for (Long profileId : profileIds) {
			ExtProfilePanelist extProfilePanelist = new ExtProfilePanelist(assignProfileToPanelistReq.getPanelistId(),
					profileId);
			extProfilePanelistRepository.saveAndFlush(extProfilePanelist);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ApiResponse(true, "Candidate profile submitted successfully to Panelist!!"));
	}

	@GetMapping("/getProfileListOfPanelist/{panelistId}")
	private List<Profile> getProfileListOfPanelist(@PathVariable Long panelistId) {
		List<ExtProfilePanelist> extProfilePanelists = extProfilePanelistRepository.findByAssociateId(panelistId);
		List<Long> candidateIds = new ArrayList<Long>();
		for (ExtProfilePanelist list : extProfilePanelists) {
			candidateIds.add(list.getProfileId());
		}
		List<Profile> profileList = profileRepository.findByIdIn(candidateIds);
		return profileList;
	}
	
	@GetMapping("/getAssignedProfileListOfPanelist/{associateId}")
	private List<Profile> getAssignedProfileListOfPanelist(@PathVariable long associateId) {
		List<PanelNominee> nominees=panelistRepository.findByAssociateId(associateId);
		List<Long> panelistIds=new ArrayList<Long>();
		for(PanelNominee nominee:nominees) {
			panelistIds.add(nominee.getId());
		}
		List<ExtProfilePanelist> extProfilePanelists = extProfilePanelistRepository.findByAssociateIdIn(panelistIds);
		List<Long> candidateIds = new ArrayList<Long>();
		for (ExtProfilePanelist list : extProfilePanelists) {
			candidateIds.add(list.getProfileId());
		}
		List<Profile> profileList = profileRepository.findByIdIn(candidateIds);
		return profileList;
	}

	@GetMapping("/getAssignedProfiles")
	private List<Long> getAssignedProfiles() {
		List<ExtProfilePanelist> extProfilePanelists = extProfilePanelistRepository.findAll();
		List<Long> profileIds = new ArrayList<Long>();
		for (ExtProfilePanelist profile : extProfilePanelists) {
			profileIds.add(profile.getProfileId());
		}
		return profileIds;
	}

	@PostMapping("/forms/createProfileRequestAlongAssignToPanelist/{panelistId}")
	public ResponseEntity<FileUploadResponse> createProfileRequest(@RequestParam("file") MultipartFile[] files,
			@RequestParam("createProfileRequestAlongAssignToPanelist") String createProfileRequestStr, @PathVariable Long panelistId)
			throws Exception {
		CreateProfileRequest createProfileRequest = null;

		try {
			createProfileRequest = new ObjectMapper().readValue(createProfileRequestStr.toString(),
					CreateProfileRequest.class);

			byte[] fileBytes = null;

			for (int i = 0; i < files.length; i++) {
				fileBytes = files[i].getBytes();
				break;
			}

			Profile profile = null;

			if (createProfileRequest.getIsInternal()) {
				profile = profileRepository.findByAssociateId(createProfileRequest.getAssociateId());
			} else {
				profile = profileRepository.findByCandidateId(createProfileRequest.getCandidateId());
			}

			if (profile == null) {
				profile = new Profile();
			} else if (!createProfileRequest.getUpdateIfAlreadyExists()) {
				return ResponseEntity.status(HttpStatus.OK).body(new FileUploadResponse("Profile already exists ! "));
			}
			profile.setAssociateId(createProfileRequest.getAssociateId());
			profile.setCandidateId(createProfileRequest.getCandidateId());
			profile.setCity(createProfileRequest.getCity());
			profile.setData(fileBytes);
			profile.setEmail(createProfileRequest.getEmail());
			profile.setEntryDate(new Date(new java.util.Date().getTime()));
			profile.setFullName(createProfileRequest.getFullName());

			profile.setIsOnsite(createProfileRequest.getIsOnsite());
			profile.setPhone(createProfileRequest.getPhone());
			profile.setIsInternal(createProfileRequest.getIsInternal());

			Skill skill = skillRepository.findById(createProfileRequest.getSkillId())
					.orElseThrow(() -> new UsernameNotFoundException("Skill not found"));

			profile.setSkill(skill);

			profileRepository.save(profile);

			ExtProfilePanelist extProfilePanelist = new ExtProfilePanelist(panelistId, profile.getId());
			extProfilePanelistRepository.saveAndFlush(extProfilePanelist);

			return ResponseEntity.status(HttpStatus.OK)
					.body(new FileUploadResponse("Profile saved successfully and assigned to the panelist ! "));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}
	}

}
