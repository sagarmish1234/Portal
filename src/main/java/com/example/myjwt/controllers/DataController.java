package com.example.myjwt.controllers;

import com.example.myjwt.beans.BillablePlanData;
import com.example.myjwt.beans.Email;
import com.example.myjwt.beans.KeyValue;
import com.example.myjwt.beans.Mapping;
import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.*;
import com.example.myjwt.models.enm.EGrade;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.payload.CategoryStatus;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.BillablePlanHistory;
import com.example.myjwt.payload.response.CreateReferralResponse;
import com.example.myjwt.payload.response.FileUploadResponse;
import com.example.myjwt.repo.*;
import com.example.myjwt.security.services.CustomUserDetailsService;
import com.example.myjwt.security.services.EmailService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DataController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(DataController.class);

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	EvaluationResultRepository evaluationResultRepository;

	@Autowired
	EvaluationResultCategoryRepository evaluationResultCategoryRepository;

	@Autowired
	private AssignmentUserRepository assignmentUserRepository;

	@Autowired
	private BillablePlanRepository billablePlanRepository;

	@Autowired
	public SettingsRepository settingsRepository;

	@Autowired
	public CustomUserDetailsService customUserDetailsService;

	@Autowired
	ReferralRepository referralRepository;

	@Autowired
	EmailService emailService;

	@Autowired
	SettingService settingService;


	@Autowired
	public ResignationCategoryRepository resignationCategoryRepository;

	@Autowired
	public ResignationEmployeeRepository resignationEmployeeRepository;

	@GetMapping("/data/getAssignmentReports")
	public List<AssignmentReport> getAssignmentReports() {

		Long currentUserId = getCurrentUserId();

		List<AssignmentReport> asgnmtAssociateList = assignmentReportRepository.findAll();
		Collections.sort(asgnmtAssociateList, AssignmentReport.AssignmentReportComparator);

		System.out.println(asgnmtAssociateList);

		return asgnmtAssociateList;
	}

	@GetMapping("/data/getAssignmentReport")
	public List<AssignmentUser> getAssignmentReport(@RequestParam(value = "reportID") int reportID,
			@RequestParam(value = "paramId") String paramId) {

		Long currentUserId = getCurrentUserId();

		System.out.println("paramId=========================" + paramId);

		Long pid = Long.parseLong(paramId);

		AssignmentReport assignmentReport = assignmentReportRepository.findById(pid)
				.orElseThrow(() -> new UsernameNotFoundException("Assignment report not found"));

		List<AssignmentUser> asgnmtAssociateList = assignmentUserRepository.findByAssignmentReport(assignmentReport);

		System.out.println("asgnmtAssociateList size=========================" + asgnmtAssociateList.size());

		return asgnmtAssociateList;
	}

	@GetMapping("/data/getResume")
	public ResponseEntity<byte[]> getResume(@RequestParam(value = "resumeId") String resumeId) {
		Profile profile = profileRepository.findById(Long.parseLong(resumeId))
				.orElseThrow(() -> new UsernameNotFoundException("Resume not found"));

		String fileName = "resume.pdf";

		if (profile.getIsInternal())
			fileName = profile.getAssociateId() + "";
		else
			fileName = profile.getCandidateId() + "";

		HttpHeaders header = new HttpHeaders();

		// header.setContentType(MediaType.valueOf(profile.getData().getContentType()));
		header.setContentLength(profile.getData().length);
		header.set("Content-Disposition", "attachment; filename=" + fileName);

		return new ResponseEntity<>(profile.getData(), header, HttpStatus.OK);
	}

	@GetMapping("/data/getAllProfilesFromServer")
	public List<Profile> getAllProfilesFromServer() {

		Long currentUserId = getCurrentUserId();

		List<Profile> allProfileList = profileRepository.findAllByOrderByIdDesc();

		for (Profile proflile : allProfileList) {
//			System.out.println("proflile.skill() = " + proflile.getSkill().getSkillName());
//			System.out.println("proflile.getFeedbacks().size() = " + proflile.getFeedbacks().size());
		}

		return allProfileList;
	}

	// --------------------------------------------------------------------------------------------

//	@GetMapping("/data/getAllReferralsFromServer")
//	public List<Referrals> getAllReferralsFromServer() {
//		List<Referrals> allReferralList = referralRepository.findAllByOrderByIdDesc();
//		return allReferralList;
//	}

	@GetMapping("/data/getAllReferralsFromServer")
	public List<CreateReferralResponse> getAllReferralsFromServer() {

		List<CreateReferralResponse> referralListResponse = new ArrayList<CreateReferralResponse>();
//		List<CreateReferralResponse> reverseReferralListResponse = new ArrayList<CreateReferralResponse>();
		List<Referrals> allReferralList = referralRepository.findAllByOrderByIdDesc();

		for (Referrals referrals : allReferralList) {

			Category categoryName = categoryRepository.findById(referrals.getStatus().getId()).get();
			System.out.println("Status : " + categoryName.getGroupValue());
			CreateReferralResponse createreferralResponse = new CreateReferralResponse(referrals.getId(),
					referrals.getCandidateName(), referrals.getEmail(), referrals.getPhone(), referrals.getExperience(),
					referrals.getReferredById(), referrals.getReferredByName(), referrals.getSkill(),
					categoryName.getGroupValue(), referrals.getData());
			referralListResponse.add(createreferralResponse);
		}

		return referralListResponse;

//		int size = referralListResponse.size();
//		CreateReferralResponse createReferralResponse = referralListResponse.get(size - 1);
//		createReferralResponse.setId(1L);
//		reverseReferralListResponse.add(createReferralResponse);
//		for (int i = 0; i < size - 1; i++) {
//			createReferralResponse = referralListResponse.get(i);
//			createReferralResponse.setId(createReferralResponse.getId() + 1);
//			reverseReferralListResponse.add(createReferralResponse);
//		}
//
//		return reverseReferralListResponse;

	}

	// -------------------------------------------------------------------------------------------

	@GetMapping("/data/getAllEvaluationResults")
	public List<EvaluationResult> getAllEvaluationResults() {

		List<EvaluationResult> allEvaluationResultList = evaluationResultRepository.findAll();

		return allEvaluationResultList;
	}

	@GetMapping("/data/getAllEvaluationResultCategory")
	public List<EvaluationResultCategory> getAllEvaluationResultCategory() {

		List<EvaluationResultCategory> allEvaluationResultCategoryList = evaluationResultCategoryRepository.findAll();

		return allEvaluationResultCategoryList;
	}

	@GetMapping("/data/getProfileInfo")
	public Profile getProfileInfo(@RequestParam(value = "profileId") String profileId) {

		System.out.println("proflile.getProfileInfo() = ");

		Profile profile = profileRepository.findById(Long.parseLong(profileId))
				.orElseThrow(() -> new UsernameNotFoundException("Profile not found"));

		if (profile.getFeedbacks() != null)
			System.out.println("---->" + profile.getFeedbacks().size());
		else
			System.out.println("----> profile.getFeedbacks()" + profile.getFeedbacks());

		return profile;
	}

	// --------------------------------------------------------------------------------------------
//	
	@GetMapping("/data/getReferralInfo")
	public Referrals getReferralInfo(@RequestParam(value = "referralId") String referralId) {
		Referrals referral = referralRepository.findById(Long.parseLong(referralId))
				.orElseThrow(() -> new UsernameNotFoundException("Profile not found"));
		return referral;
	}

//	@GetMapping("/data/getReferralInfo")
//	public Referrals getReferralInfo(@RequestParam(value = "referralId") String referralId) {
//
//		List<Referrals> list = referralRepository.findAll();
//		int size = list.size();
//		int id = Integer.parseInt(referralId);
//		if (id == 1) {
//			id = size;
//		} else {
//			id--;
//		}
//		referralId = String.valueOf(id);
//
//		Referrals referral = referralRepository.findById(Long.parseLong(referralId))
//				.orElseThrow(() -> new UsernameNotFoundException("referral not found"));
//
//		return referral;
//	}

	@PutMapping("/data/updateReferralStatus")
	public ResponseEntity<?> updateReferralStatus(@RequestParam(value = "referralStatus") String referralStatus,
			@RequestParam(value = "referralId") Long referralId) throws Exception {

		Category category = categoryRepository.findByStatusId(referralStatus);
		Referrals referrals = referralRepository.findById(referralId).get();
//		if (referralId == 1) {
//			List<Referrals> list = referralRepository.findAll();
//			long size = list.size();
//			referralId = size;
//		} else {
//			referralId--;
//		}

		referralRepository.updateStatus(referralId, category);
		sendEmailToTag(category, referrals);

		return ResponseEntity.ok().body(new ApiResponse(true, "Status changed successfully!!"));

	}

	private void sendEmailToTag(Category category, Referrals referrals)
			throws MessagingException, TemplateException, IOException {
		Email email = new Email();
		email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
		email.setTo(settingService.getEmailId(EmailConstants.TAG_EMAIL_TO, "ADM", null));
		email.setCc(settingService.getEmailId(EmailConstants.TAG_EMAIL_CC, "ADM", null));
		email.setSubject("!! Alert !! - Candidate Status Updated");

		Map<String, Object> model = new HashMap<String, Object>();
		model.put("categoryList", category);
		model.put("referralName", referrals);

		email.setModel(model);
		emailService.sendUpdatedStatusEmail(email);

	}

	@GetMapping("/data/getStatusFromId")
	public CategoryStatus getStatusFromId(@RequestParam(value = "categoryId") Long categoryId) {
		return new CategoryStatus(categoryRepository.findGroupValueByGroupId(categoryId));
	}

	// ------------------------------------------------------------------------------------------------

	@GetMapping("/data/filteredbillableplans")
	public List<BillablePlanData> apiGetFilteredBillablePlans(@RequestParam(value = "selPractice") String selPractice,
			@RequestParam(value = "categoryId") Long categoryId, @RequestParam(value = "grade") String grade,
			@RequestParam(value = "location") String location) {

		System.out.println("I am here: apiGetFilteredBillablePlans:" + selPractice + ":" + categoryId + ":" + grade
				+ ":" + location);
		List<BillablePlanData> billablePlanDataList = new ArrayList<BillablePlanData>();
		List<String> grades = Mapping.getOriginalGradesFromMapped(grade);
		HashMap<Long, List<BillablePlan>> mapBillableAllPlans = new HashMap<Long, List<BillablePlan>>();

		Category noPlanCategory = categoryRepository.findByCatGroupAndGroupKeyAndGroupValue(
				AppConstants.CATEGORY_BILLABILITY, AppConstants.CATEGORY_BILLABILITY, AppConstants.NO_BILLABILITY_PLAN);

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository
				.findByAssignmentReportAndServiceLineAndOnOff(report, selPractice, location);

		System.out.println("allAssociates.size():" + allAssociates.size());

		List<BillablePlan> billableAllPlans = billablePlanRepository.findAllByOrderByIdDesc();

		for (BillablePlan billablePlan : billableAllPlans) {
			List<BillablePlan> associateBillablePlans = mapBillableAllPlans.get(billablePlan.getAssociateId());

			if (associateBillablePlans == null) {
				associateBillablePlans = new ArrayList<BillablePlan>();
			}
			associateBillablePlans.add(billablePlan);
			mapBillableAllPlans.put(billablePlan.getAssociateId(), associateBillablePlans);
		}

		System.out.println("mapBillableAllPlans.size():" + mapBillableAllPlans.size());

		for (AssignmentUser associate : allAssociates) {

			if (grades.contains(associate.getGradeDescription())) {

				System.out.println("matched for:" + associate.getAssociateName() + ":" + associate.getAssociateID());

				BillablePlanData billablePlanData = new BillablePlanData(associate);

				List<BillablePlan> associateBillablePlans = mapBillableAllPlans.get(associate.getAssociateID());

				System.out.println("associateBillablePlans:" + associateBillablePlans);

				if (associateBillablePlans == null) {
					System.out.println(
							"noPlanCategory.getId() == categoryId" + noPlanCategory.getId() + ":" + categoryId);
					if ((noPlanCategory.getId() == categoryId)) {
						associateBillablePlans = new ArrayList<BillablePlan>();

						BillablePlan billablePlan = new BillablePlan(associate.getAssociateID(), true);
						associateBillablePlans.add(billablePlan);
					}
					System.out.println("associateBillablePlans is null");
				} else {
					System.out.println("associateBillablePlans:" + associateBillablePlans.size());
				}

				System.out.println("associate.getAssociateID() = " + associate.getAssociateID());
				boolean result = billablePlanData.setBillablePlans(associateBillablePlans, categoryId,
						noPlanCategory.getId());

				if (result) {
					billablePlanDataList.add(billablePlanData);
				}

			}
		}

		return billablePlanDataList;
	}

	@GetMapping("/data/apiGetBillablePlan")
	public List<BillablePlanData> apiGetBillablePlan(@RequestParam(value = "selPractice") String selPractice,
			@RequestParam(value = "selLOB") String selLOB) {

		System.out.println("I am here: apiGetBillablePlan");

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReportAndServiceLineAndLOB(report,
				selPractice, selLOB);

		List<Long> activeAssociates = new ArrayList<Long>();

		List<BillablePlanData> billablePlanDataList = new ArrayList<BillablePlanData>();

		List<BillablePlan> billableAllPlans = billablePlanRepository.findAllByOrderByIdDesc();

		HashMap<Long, List<BillablePlan>> mapBillableAllPlans = new HashMap<Long, List<BillablePlan>>();

		for (BillablePlan billablePlan : billableAllPlans) {
			List<BillablePlan> associateBillablePlans = mapBillableAllPlans.get(billablePlan.getAssociateId());

			if (associateBillablePlans == null) {
				associateBillablePlans = new ArrayList<BillablePlan>();
			}
			associateBillablePlans.add(billablePlan);
			mapBillableAllPlans.put(billablePlan.getAssociateId(), associateBillablePlans);
		}

		for (AssignmentUser associate : allAssociates) {
			BillablePlanData billablePlanData = new BillablePlanData(associate);

			billablePlanDataList.add(billablePlanData);

			if (!activeAssociates.contains(associate.getAssociateID()))
				activeAssociates.add(associate.getAssociateID());

			List<BillablePlan> associateBillablePlans = mapBillableAllPlans.get(associate.getAssociateID());

			if (associateBillablePlans == null) {
				associateBillablePlans = new ArrayList<BillablePlan>();

				BillablePlan billablePlan = new BillablePlan(associate.getAssociateID(), true);
				associateBillablePlans.add(billablePlan);

			} else {
				for (BillablePlan billablePlan : associateBillablePlans) {
					if (!billablePlan.getIsActive()) {
						billablePlan.setIsActive(true);
						billablePlanRepository.save(billablePlan);
					}
				}
			}

			billablePlanData.setBillablePlans(associateBillablePlans);
		}

		// Set active false for non active associates
		List<BillablePlan> activeBillablePlans = billablePlanRepository.findByIsActive(true);
		for (BillablePlan billablePlan : activeBillablePlans) {
			if (!activeAssociates.contains(billablePlan.getAssociateId())) {
				billablePlan.setIsActive(false);
				billablePlanRepository.save(billablePlan);
			}
		}

		billablePlanRepository.flush();

		return billablePlanDataList;
	}

	@GetMapping("/data/apiGetPracticeList")
	public SortedSet<String> apiGetPracticeList() {
		SortedSet<String> practiceList = new TreeSet<String>();

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReport(report);

		for (AssignmentUser user : allAssociates) {
			practiceList.add(user.getServiceLine());
		}

		return practiceList;
	}

	@GetMapping("/data/getSettingsData")
	public List<Settings> apiGetSettingsData() {

		Long currentUserId = getCurrentUserId();
		System.out.println("currentUserId ------------------------------------> " + currentUserId);

		List<Settings> settings = settingsRepository.findAll();

		return settings;
	}

	@GetMapping("/data/apiGetLOBList")
	public SortedSet<String> apiGetLOBList() {
		SortedSet<String> lobList = new TreeSet<String>();

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReport(report);

		for (AssignmentUser user : allAssociates) {
			lobList.add(user.getlOB());
		}

		return lobList;
	}

	@GetMapping("/data/apiGetServiceLineList")
	public SortedSet<String> apiGetServiceLineList() {
		SortedSet<String> serviceLineList = new TreeSet<String>();

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReport(report);

		for (AssignmentUser user : allAssociates) {
			serviceLineList.add(user.getServiceLine());
		}

		return serviceLineList;
	}

	@GetMapping("/data/getAssignmentUserIds/serviceLine/{serviceLine}")
	public ResponseEntity<?> getAssignmentUserIdsFromServiceLine(@PathVariable String serviceLine) {

		try {
			AssignmentReport assignmentReport = assignmentReportRepository.findFirstByOrderByIdDesc()
					.orElseThrow(() -> new Exception("No reports found"));
			List<HashMap> list = assignmentUserRepository
					.findByAssignmentReportAndServiceLine(assignmentReport, serviceLine).stream()
					.map(associate -> new HashMap(
							Map.of("label", associate.getAssociateName(), "value", associate.getAssociateID())))
					.collect(Collectors.toList());
			return ResponseEntity.ok(list);
		} catch (Exception e) {
			return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
		}

	}

	@GetMapping("/data/getAssignmentUserGenCIds/serviceLine/{serviceLine}")
	public ResponseEntity<?> getAssignmentUserGenCIdsFromServiceLine(@PathVariable String serviceLine) {

		try {
			ArrayList<String> gradeList = new ArrayList<String>();
			gradeList.add(EGrade.PAT.name());
			gradeList.add(EGrade.PA.name());
			gradeList.add(EGrade.P.name());
			gradeList.add(EGrade.PT.name());

			AssignmentReport assignmentReport = assignmentReportRepository.findFirstByOrderByIdDesc()
					.orElseThrow(() -> new Exception("No reports found"));
			List<HashMap> list = assignmentUserRepository
					.findByAssignmentReportAndServiceLineAndGradeDescriptionIn(assignmentReport, serviceLine, gradeList)
					.stream()
					.map(associate -> new HashMap(
							Map.of("label", associate.getAssociateName(), "value", associate.getAssociateID())))
					.collect(Collectors.toList());
			return ResponseEntity.ok(list);
		} catch (Exception e) {
			return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
		}

	}

	@GetMapping("/data/apiGetBillableCategories")
	public List<Category> apiGetBillableCategories() {

		List<Category> billableCategories = categoryRepository.findByCatGroup("BillabilityPlan");

		System.out.println("billableCategories size" + billableCategories.size());

		return billableCategories;
	}

	@GetMapping("/data/apiGetBillablePlanHistory")
	public List<BillablePlanHistory> apiGetBillablePlanHistory(@RequestParam(value = "associateId") Long associateId) {

		List<BillablePlanHistory> historyOfPlans = new ArrayList<BillablePlanHistory>();
		List<BillablePlan> associatePlans = billablePlanRepository.findByAssociateId(associateId);

		for (BillablePlan plan : associatePlans) {
			BillablePlanHistory planHistory = new BillablePlanHistory(plan);

			historyOfPlans.add(planHistory);
		}
		return historyOfPlans;
	}

	@PostMapping("/data/settings/update")
	public ResponseEntity<?> updateSettingsData(@Valid @RequestBody ArrayList<KeyValue> changedData,
			HttpServletRequest request) throws Exception {

		System.out.println("Update Settings =" + changedData.size());

		try {

			for (KeyValue keyValue : changedData) {
				Settings setting = settingsRepository.findById(Long.valueOf(keyValue.getKey()))
						.orElseThrow(() -> new BadRequestException("Setting not found"));
				setting.setValue(keyValue.getValue());
				settingsRepository.save(setting);
			}
			settingsRepository.flush();

			URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/sbu/{profileFeedbackRequest.getId()}").buildAndExpand("1").toUri();

			return ResponseEntity.created(location).body(new ApiResponse(true, "Settings updated successfully!!"));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}
	}


	@PostMapping("/data/resignation/update")
	public ResponseEntity<?> updateResignationData(@Valid @RequestBody ArrayList<KeyValue> changedData,
												   HttpServletRequest request) throws Exception{
		System.out.println("Update Resignation Changes =" + changedData.size());
		try{
			for (KeyValue keyValue : changedData) {
				ResignationEmployee resignationEmployee = resignationEmployeeRepository.findByEmpID(Long.valueOf(keyValue.getKey()))
						.orElseThrow(() -> new BadRequestException("Update not found"));

				resignationEmployee.setResignationStatus(keyValue.getValue());
				resignationEmployeeRepository.save(resignationEmployee);
			}
			//resignationEmployeeRepository.flush();

			URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/sbu/{profileFeedbackRequest.getId()}").buildAndExpand("1").toUri();
			return ResponseEntity.created(location).body(new ApiResponse(true,"Updated Successfully"));
		}
		catch (Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new FileUploadResponse("Exception to Update fields"));
		}
	}


	@GetMapping("/data/assignmentUser/{associateID}")
	public ResponseEntity<?> getAssignmentUser(@PathVariable Long associateID) {
		try {
			AssignmentUser assignmentUser = customUserDetailsService.loadAssignmentUserFromAssociateId(associateID);
			return ResponseEntity.ok(assignmentUser);

		} catch (Exception e) {
			return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
		}
	}
}