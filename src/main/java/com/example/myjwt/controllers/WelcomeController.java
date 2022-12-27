package com.example.myjwt.controllers;

import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.*;
import com.example.myjwt.models.enm.ECalenderMonth;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.payload.UsersDetail;
import com.example.myjwt.payload.request.ApproveUser;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.repo.*;
import com.example.myjwt.security.services.CustomUserDetailsService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.security.services.UserService;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api")
public class WelcomeController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;

	@Autowired
	AssignmentUserRepository assignmentUserRepo;

	@Autowired
	HexCodeRepository hexCodeRepository;

	@Autowired
	EvaluationResultRepository evaluationResultRepository;

	@Autowired
	EvaluationResultCategoryRepository evaluationResultCategoryRepository;

	@Autowired
	SkillRepository skillRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private SettingsRepository settingsRepository;

	@Autowired
	private LeaveStatusCSSRepository leaveStatusCSSRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	SettingService settingService;

	@Autowired
	HolidayRepository holidayRepository;

	@Autowired
	private EpicRepository epicRepository;

	@Autowired
	ResignationCategoryRepository resignationCategoryRepository;

	@Autowired
	private SprintRepository sprintRepository;
	@Autowired
	private StoryRepository storyRepository;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private StorySkillRepository storySkillRepository;
	@Autowired
	ImpactCategoryRepository impactcategoryrepository;

	@Autowired
	IssueStatusRepository issuestatusrepository;

	@Autowired
	SkillFamilyRepo skillFamilyRepo;

	@Autowired
	SkillCategoryRepo skillCategoryRepo;

	@Autowired
	CertificateFamilyRepo certificateFamilyRepo;
	
	@Autowired
	CertificateCategoryRepo certificateCategoryRepo;

	@GetMapping("/welcome/all")
	public String initiateWelcomePageCall() throws Exception {
		String msg = "Welcome to the App. " + "Let's Login or SignUp";
		setInitialValuesInDB();
		return msg;
	}

	@GetMapping("/welcome/all/story")
	public String initiateAssignStories() throws Exception {
		String msg = "Stories assigned";
		assignStories();
		return msg;
	}

	@GetMapping("/welcome")
	public String welcome() {
		String msg = "Welcome to the App. ";
		return msg;
	}

	private Role getFirstRole(Set<Role> roles) {
		Role firstRole = null;
		while (roles.iterator().hasNext()) {
			firstRole = roles.iterator().next();
			break;
		}

		return firstRole;
	}

	private boolean isAdmin(Set<Role> roles) {

		for (Role role : roles) {
			System.out.println("role.getName().name() = " + role.getName().name());
			if (role.getName().name().equalsIgnoreCase(ERole.Admin.name()))
				return true;
		}

		return false;
	}

	@GetMapping("/userdetail")
	public List<UsersDetail> getAllUser() {

		List<User> list = userRepository.findAll();
		List<UsersDetail> userList = new ArrayList<UsersDetail>();

		for (int i = 0; i < list.size(); i++) {

			User user = list.get(i);
			Long associateId = user.getAssociateId();

			System.out.println(
					"----------------------------------------:" + list.size() + ":::::" + user.getAssociateId());
			for (Role role : user.getRoles()) {
				System.out.println(role.getName().name() + "::"
						+ getFirstRole(user.getRoles()).getName().name().equalsIgnoreCase(ERole.HR.name()));
			}

			System.out.println("----------------------------------------::::");

			if (user.getRoles().size() == 1
					&& getFirstRole(user.getRoles()).getName().name().equalsIgnoreCase(ERole.HR.name())) {
				System.out.println("----------------------------------------HR");
				UsersDetail userDetail = new UsersDetail();
				userDetail.setAssociateId(associateId);
				userDetail.setAssociateName("HR");
				userDetail.setEmail(settingService.getEmailId(user.getAssociateId() + "", null, null));
				userDetail.setServiceLine("-");
				userDetail.setGrade("-");
				userDetail.setRoles(user.getRoles());
				userDetail.setApproved(user.getIsApproved());
				userList.add(userDetail);
			} else if (user.getRoles().size() == 1
					&& getFirstRole(user.getRoles()).getName().name().equalsIgnoreCase(ERole.TAG.name())) {
				System.out.println("----------------------------------------TAG");
				UsersDetail userDetail = new UsersDetail();
				userDetail.setAssociateId(associateId);
				userDetail.setAssociateName("TAG");
				userDetail.setEmail(settingService.getEmailId(user.getAssociateId() + "", null, null));
				userDetail.setServiceLine("-");
				userDetail.setGrade("-");
				userDetail.setRoles(user.getRoles());
				userDetail.setApproved(user.getIsApproved());
				userList.add(userDetail);
			} else if (isAdmin(user.getRoles())) {
				System.out.println("----------------------------------------ADMIN");
				UsersDetail userDetail = new UsersDetail();
				userDetail.setAssociateId(associateId);
				userDetail.setAssociateName("Admin");
				userDetail.setEmail(settingService.getEmailId(user.getAssociateId() + "", null, null));
				userDetail.setServiceLine("-");
				userDetail.setGrade("-");
				userDetail.setRoles(user.getRoles());
				userDetail.setApproved(user.getIsApproved());
				userList.add(userDetail);
			} else {
				System.out.println("----------------------------------------USER");
				List<AssignmentUser> assignmentUserList = assignmentUserRepo.findByAssociateID(associateId);
				AssignmentUser assignmentUser = assignmentUserList.get(0);
				// Map<String,String> map = new HashMap<String,String>();
				UsersDetail userDetail = new UsersDetail();
				userDetail.setAssociateId(associateId);
				userDetail.setAssociateName(assignmentUser.getAssociateName());
				userDetail.setEmail(settingService.getEmailId(user.getAssociateId() + "", null, null));
				userDetail.setServiceLine(assignmentUser.getServiceLine());
				userDetail.setGrade(assignmentUser.getGradeDescription());
				userDetail.setRoles(user.getRoles());
				userDetail.setApproved(user.getIsApproved());
				userList.add(userDetail);
			}

		}

		System.out.println("userList size = " + userList.size());

		return userList;
	}

	@PostMapping("/approval")
	public ResponseEntity<?> approveUser(@Valid @RequestBody List<ApproveUser> approveUser) {

		System.out.println(approveUser);
		for (int i = 0; i < approveUser.size(); i++) {
			Long associateId = approveUser.get(i).getAssociateId();
			Boolean approved = approveUser.get(i).getApproved();
			System.out.println(associateId);
			User user = userRepository.findByAssociateId(associateId).get();
			Set<Role> dbRoles = user.getRoles();

			String[] roles = approveUser.get(i).getRoles();

			Set<Role> userRole = new HashSet<Role>();

			for (int j = 0; j < roles.length; j++) {
				userRole.add(getRole(roles[j]));
			}
			userRole.addAll(dbRoles);
			user.setRoles(userRole);
			if (!user.getIsApproved()) {
				user.setIsApproved(approved);
			}
			userRepository.save(user);

		}

		return ResponseEntity.ok().body(new ApiResponse(true, "successfully"));
	}

	public Role getRole(String name) {
		return roleRepository.findByName(ERole.valueOf(name));
	}

	@GetMapping("/verify/{vcode}")
	public String verifyUser(@PathVariable String vcode) {
		System.out.println(vcode);
		Hexcode hexCode = hexCodeRepository.findByCode(vcode);
		if (hexCode == null) {
			return "verify_failed! Verification invalid or already verified!";
		} else {

			switch (hexCode.getTableName()) {
			case AppConstants.TBL_USER:
				switch (hexCode.getAction()) {
				case AppConstants.HEXCODE_ACTION_VALIDATE:
					switch (hexCode.getSubAction()) {
					case AppConstants.HEXCODE_SUBACTION_EMAIL:

						User user = userRepository.findById(hexCode.getRefId())
								.orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

						// user.setIsVerified(true);
						updateUserAndDeleteHexCode(user, hexCode);

						return "verify_success!!!   Login to explore!!!";
					}
					break;
				}
				break;
			}

			return "Could not find relevant authentication !!!";
		}

	}

	@Transactional
	private void updateUserAndDeleteHexCode(User user, Hexcode hexCode) {
		userRepository.save(user);
		hexCodeRepository.delete(hexCode);
	}

	private void createDefaultRoles() {
		ERole roles[] = ERole.values();
		for (ERole role : roles) {
			Role r = new Role(role);
			roleRepository.save(r);
		}
		roleRepository.flush();
	}

	private void createDefaultBillableCategories() {

		String[] billabilityCategories = { "Billable", "Planned Billable (NBL)", "Planned Billable (Billable)",
				"Training (NBL)", "Training (Billable)", "Planned to Release", "Release Initiated",
				AppConstants.NO_BILLABILITY_PLAN, "Duplicate Allocation" };

		for (int i = 0; i < billabilityCategories.length; i++) {
			Category category = new Category();
			category.setCatGroup(AppConstants.CATEGORY_BILLABILITY);
			category.setGroupKey(AppConstants.CATEGORY_BILLABILITY);
			category.setGroupValue(billabilityCategories[i]);
			categoryRepository.save(category);
			categoryRepository.flush();
		}
	}

	private Category createDefaultStoryStatusCategories() {

		String[] statusCategories = { AppConstants.STORY_STATUS_BACKLOG, AppConstants.STORY_STATUS_READY,
				AppConstants.STORY_STATUS_INPROGRESS, AppConstants.STORY_STATUS_ACCEPTED };

		Category defaultCategory = null;

		for (int i = 0; i < statusCategories.length; i++) {
			Category category = new Category();
			if (i == 0)
				defaultCategory = category;
			category.setCatGroup(AppConstants.STORY_STATUS);
			category.setGroupKey(AppConstants.STORY_STATUS);
			category.setGroupValue(statusCategories[i]);
			categoryRepository.save(category);
			categoryRepository.flush();
		}
		return defaultCategory;
	}

	private void createDefaultReferredCategories() {

		String[] referralCategories = { "Referred", "Interview scheduled", "Screen Reject", "Interview Rejected",
				"Interview Selected", "Client Interview scheduled", "Client Screen Reject", "Client Interview Rejected",
				"Client Interview Selected", "Offer in progress", "Offered", "Joined", "Offer Declined",
				"Rejected: No approval" };

		for (int i = 0; i < referralCategories.length; i++) {
			Category category = new Category();
			category.setCatGroup(AppConstants.CATEGORY_STATUS);
			category.setGroupKey(AppConstants.CATEGORY_STATUS);
			category.setGroupValue(referralCategories[i]);
			categoryRepository.save(category);
			categoryRepository.flush();
		}

	}
	
	private void createDefaultSkillProficiencies() {

		String[] skillProficiencies = { "1 (0 to 1 year)","2 (0 to 2 years)","3 (1 to 3 years)","4 (2 to 4 years)", "5 (3+ years)" };

		for (int i = 0; i < skillProficiencies.length; i++) {
			Category category = new Category();
			category.setCatGroup(AppConstants.CATEGORY_SKILLPROFICIENCY_GROUP);
			category.setGroupKey(AppConstants.CATEGORY_SKILLPROFICIENCY_KEY);
			category.setGroupValue(skillProficiencies[i]);
			categoryRepository.save(category);
			categoryRepository.flush();
		}

	}

	private void createLeaveCategories() {

		String[] leaveCategories = { "W", "L", "H", "HD", "S" };

		for (int i = 0; i < leaveCategories.length; i++) {
			Category category = new Category();
			category.setCatGroup(AppConstants.LEAVE_STATUS);
			category.setGroupKey(AppConstants.LEAVE_STATUS);
			category.setGroupValue(leaveCategories[i]);
			categoryRepository.save(category);

		}
		categoryRepository.flush();
	}

	private void createLeaveStatus() {

		Object[][] leaveCategories = { { "W", new HashMap<>(Map.of("backgroundColor", "white", "color", "#D2D1D1")) },
				{ "L", new HashMap<>(Map.of("backgroundColor", "#FF0000", "color", "white")) },
				{ "H", new HashMap<>(Map.of("backgroundColor", "#f5db93", "cursor", "context-menu", "color", "blue")) },
				{ "HD", new HashMap<>(Map.of("backgroundColor", "#FF9696", "color", "white")) }, { "S", new HashMap<>(
						Map.of("backgroundColor", "#EDEDED", "cursor", "context-menu", "color", "#C2C2C2")) } };

		for (int i = 0; i < leaveCategories.length; i++) {
			LeaveStatusCSS leaveStatusCSS = new LeaveStatusCSS();
			leaveStatusCSS.setLeaveCategory(String.valueOf(leaveCategories[i][0]));
			leaveStatusCSS.setCss((HashMap<String, String>) leaveCategories[i][1]);
			leaveStatusCSSRepository.save(leaveStatusCSS);
		}
		leaveStatusCSSRepository.flush();

	}

	private void createResignationCategoriesTable() {
		String[] resignationCategories = { "Compensation", "Promotion", "Role Change", "Education", "Oppurtunities" };
		for (int i = 0; i < resignationCategories.length; i++) {
			ResignationCategory resignationCategory = new ResignationCategory();
			resignationCategory.setRescatName(resignationCategories[i]);
			resignationCategory.setRescatValue(resignationCategories[i]);
			resignationCategoryRepository.save(resignationCategory);
		}
	}

	private void createSettings() {

		String[][] settings = {
				{ "ADM", "TAG Team Email (to)", "Gada.Naveena" + EmailConstants.DEFAULT_DOMAIN, "text", "" },
				{ "ADM", "TAG Team Email (cc)", "Sindhuja.S.S" + EmailConstants.DEFAULT_DOMAIN, "text", "" },
				{ "ADM", "HR Team Email (to)", "Madhumita.Ghosh" + EmailConstants.DEFAULT_DOMAIN, "text", "" },
				{ "ADM", "HR Team Email (cc)", "Garima.Ojha" + EmailConstants.DEFAULT_DOMAIN, "text", "" },
				{ "ADM", "LOBLead", "190741", "text", "CIB - BT" }, { "ADM", "LOBLead", "190741", "text", "CIB - CMS" },
				{ "ADM", "LOBLead", "190741", "text", "CIB - Digital" },
				{ "ADM", "LOBLead", "190741", "text", "CIB - MI" },
				{ "ADM", "LOBLead", "190741", "text", "CIB - Tavisca" }, { "ADM", "LOBLead", "121870", "text", "AM" },
				{ "ADM", "LOBLead", "106716", "text", "CCB" }, { "ADM", "LOBLead", "122539", "text", "CB" },
				{ "ADM", "LOBLead", "106716", "text", "GTI" }, { "ADM", "LOBLead", "106716", "text", "CT" },
				{ "ADM", "LOBLead", "106716", "text", "CyberSecurity" }, { "ADM", "EDL", "254395", "text", "JPMC" },
				{ "ADM", "PDL", "231612", "text", "JPMC" },
				{ AppConstants.APP_SETTNGS_VISIBILITY_GENERAL, AppConstants.APP_SETTINGS_EMAILWORKING, "false",
						"boolean", "" },
				{ AppConstants.APP_SETTNGS_VISIBILITY_GENERAL, AppConstants.APP_SETTINGS_DEFAULTEMAIL,
						"narenkgcts@outlook.com", "text", "" },
				{ "ADM", "Projects Ending (to)", "JPMCLOBLeads" + EmailConstants.DEFAULT_DOMAIN, "text", "" },
				{ "ADM", "Projects Ending (cc)",
						"Narendra.Gupta" + EmailConstants.DEFAULT_DOMAIN + ";Abir.Chatterjee"
								+ EmailConstants.DEFAULT_DOMAIN,
						"text", "" },
				{ "ADM", "Assignment Ending (to)", "JPMCLOBLeads" + EmailConstants.DEFAULT_DOMAIN, "text", "" },
				{ "ADM", "Assignment Ending (cc)", "Narendra.Gupta" + EmailConstants.DEFAULT_DOMAIN + ";Abir.Chatterjee"
						+ EmailConstants.DEFAULT_DOMAIN, "text", "" }, };

		for (int i = 0; i < settings.length; i++) {
			Settings setting = new Settings();
			setting.setVisibility(settings[i][0]);
			setting.setParam(settings[i][1]);
			setting.setValue(settings[i][2]);
			setting.setType(settings[i][3]);
			setting.setVisibilityTwo(settings[i][4]);
			settingsRepository.save(setting);

		}
		settingsRepository.flush();
	}

	private void createDefaultUser() {
		User user = new User();
		user.setAssociateId(999L);
		user.setIsActive(true);
		user.setIsApproved(true);
		user.setIsVerified(true);
		user.setPassword(passwordEncoder.encode("India@123"));
		user.setRoles(new HashSet(roleRepository.findAll()));

		userRepository.save(user);
		userRepository.flush();
	}

	private void createADMHRUser() {
		User user = new User();
		user.setAssociateId(359901L);
		user.setIsActive(true);
		user.setIsApproved(true);
		user.setIsVerified(true);
		user.setPassword(passwordEncoder.encode("India@123"));
		user.setRoles(Collections.singleton(roleRepository.findByName(ERole.HR)));
		userRepository.save(user);
		userRepository.flush();
	}

	private void createADMTAGUser() {
		User user = new User();
		user.setAssociateId(2107512L);
		user.setIsActive(true);
		user.setIsApproved(true);
		user.setIsVerified(true);
		user.setPassword(passwordEncoder.encode("India@123"));
		user.setRoles(Collections.singleton(roleRepository.findByName(ERole.TAG)));
		userRepository.save(user);
		userRepository.flush();
	}

	private void createHolidays() {
		List<Holiday> holidayList = new ArrayList<>(
				Arrays.asList(new Holiday(null, 2022, ECalenderMonth.JANUARY, 1, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.JANUARY, 14, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.JANUARY, 26, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.MARCH, 1, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.APRIL, 15, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.MAY, 3, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.AUGUST, 15, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.AUGUST, 31, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.OCTOBER, 5, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.OCTOBER, 24, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.NOVEMBER, 1, "Bangalore"),
						new Holiday(null, 2022, ECalenderMonth.DECEMBER, 25, "Bangalore")));
		holidayRepository.saveAll(holidayList);
	}

	private void createSkillTables() {
		String[] skillFamiliesArr = { "Java", "Java Springboot", "Java Springboot Microservices",
				"Java Springboot Microservices AWS", "Java Springboot AWS", "Java Springboot React" };

		String[] skillDetailsArr = { "Java", "Java Springboot", "Java Springboot Microservices",
				"Java Springboot Microservices AWS", "Java Springboot AWS", "Java Springboot React" };

		for (int i = 0; i < skillFamiliesArr.length; i++) {
			Skill skill = new Skill();
			skill.setSkillName(skillFamiliesArr[i]);
			skill.setSkillDetails(skillDetailsArr[i]);
			skillRepository.save(skill);
		}

		String[] evaluationResultArr = { "Rejected", "Selected", "Recommended for Next Round" };
		String[] evaluationResultCategoryArr = { "Rejected Remote Only", "Screen Reject", "Internal Reject",
				"Client Reject", "Less Experience", "Not Reachable", "Not Interested/Available" };

		for (int i = 0; i < evaluationResultArr.length; i++) {
			EvaluationResult result = new EvaluationResult();
			result.setResult(evaluationResultArr[i]);
			evaluationResultRepository.save(result);
		}

		for (int i = 0; i < evaluationResultCategoryArr.length; i++) {
			EvaluationResultCategory resultCategory = new EvaluationResultCategory();
			resultCategory.setResultCategory(evaluationResultCategoryArr[i]);
			evaluationResultCategoryRepository.save(resultCategory);
		}
	}

	public void createEmployeeUsers() {
		List<Long> associateIdList = new ArrayList<>(
				Arrays.asList(231612L, 2068147L, 159266L, 230257L, 839468L, 2130352L, 2121141L));
		List<User> userList = new ArrayList<>();
		for (Long i : associateIdList) {
			User user = new User();
			user.setAssociateId(i);
			user.setIsActive(true);
			user.setIsApproved(true);
			user.setIsVerified(true);
			user.setPassword(passwordEncoder.encode("India@123"));
			user.setRoles(Collections.singleton(roleRepository.findByName(ERole.Associate)));
			userList.add(user);
		}
		userRepository.saveAll(userList);
	}

//    public void createDefaultEpics() {
//        List<Epic> epicList = new ArrayList<>();
//        List<ParentAccount> parentAccounts = parentAccountRepository.findAll();
//        epicList.add(new Epic(null, "Epic1", 10, 45D, parentAccounts.get(0)));
//        epicList.add(new Epic(null, "Epic2", 10, 45D, parentAccounts.get(1)));
//        epicList.add(new Epic(null, "Epic3", 10, 45D, parentAccounts.get(2)));
//        epicList.add(new Epic(null, "Epic4", 10, 45D, parentAccounts.get(3)));
//        epicRepository.saveAll(epicList);
//    }
//
//	public void createDefaultSprints() {
//		List<Sprint> sprintList = new ArrayList<>();
//		List<Epic> epicList = epicRepository.findAll();
//		sprintList.add(new Sprint(null, "Sprint1", Instant.now(), Instant.now(), 254395L, "ScrumMaster1"));
//		sprintList.add(new Sprint(null, "Sprint2", Instant.now(), Instant.now(), 254395L, "ScrumMaster2"));
//		sprintList.add(new Sprint(null, "Sprint3", Instant.now(), Instant.now(), 254395L, "ScrumMaster3"));
//		sprintList.add(new Sprint(null, "Sprint4", Instant.now(), Instant.now(), 254395L, "ScrumMaster4"));
//		sprintRepository.saveAll(sprintList);
//	}

	public Category createDefaultStoryPriority() {
		List<String> storyPriority = new ArrayList<>(Arrays.asList("High", "Medium", "Low"));
		List<Category> categoryList = new ArrayList<>();

		Category defaultCategory = null;

		int i = 0;
		for (String status : storyPriority) {
			Category temp = new Category();

			if (i == 0)
				defaultCategory = temp;
			i++;
			temp.setGroupKey(AppConstants.STORY_PRIORITY);
			temp.setCatGroup(AppConstants.STORY_PRIORITY);
			temp.setGroupValue(status);
			categoryList.add(temp);
		}
		categoryRepository.saveAll(categoryList);

		return defaultCategory;
	}

	public List<Epic> createDefaultEpics() {
		List<Epic> epicList = new ArrayList<Epic>();

		List<String> epicNames = new ArrayList<>(Arrays.asList("Utility", "Revenue Analysis", "Referrals",
				"Rampdown Tracker", "Pyramid", "Skill Metrics", "Search Associate", "Resignation", "Others",
				"Interview Panels", "CMTR", "User", "L&D", "Demand", "Dashboard", "Admin", "Leave Tracker", "Forecast",
				"Contract", "Billability"));

		Random random = new Random();
		for (String name : epicNames) {
			Epic epic = new Epic();
			epic.setDescription(name + " epic Description ");
			epic.setEta(new Date());
			int answer = random.nextInt(20);
			epic.setExpectedStoryPoint(Long.valueOf(answer));
			epic.setName(name);
			epicList.add(epic);
		}

		epicRepository.saveAll(epicList);
		return epicList;
	}

	public void createDefaultStories(List<Epic> epicList, Category defaultStatus, Category defaultPriority)
			throws Exception {
		List<StorySkill> storySkills = storySkillRepository.findAll();
		List<Story> storyList = new ArrayList<Story>();
		List<String> storyNames = new ArrayList<>(Arrays.asList("Search Associate", "Demand Tracker", "Action Tracker",
				"Revenue Upload and Analysis", "Rate Inputs", "Update status of referral by HR and associate",
				"Refer candidate + Email", "Referrals", "Skill Tracker", "Resignation Sheet",
				"Resignation sheet upload and update", "Contracts", "Link profile tagging to panels", "Logout",
				"Security of roles", "Appreciation", "Bootstrap", "L&D Tracker", "Demand tracking", "LobLead Dashboard",
				"PDL/EDL Dashboard", "Academy Dashboard", "Associate Dashboard", "LoB Lead Dashboard", "TAG Dashboard",
				"HR Dashboard", "Email to Multiple participants", "External Candidate Status", "Issue List",
				"Change password", "Raise Change Request", "Email to multiple participants", "Leave Tracker",
				"Contracts", "GenC allocations"));
		Random random = new Random();
		for (String name : storyNames) {
			Story story = new Story();
			story.setComments(null);
			story.setDetails(name + " Detail");
			int epicIndex = random.nextInt(epicList.size() - 1);
			story.setEpic(epicList.get(epicIndex));
			Long storyPoint = Long.valueOf(random.nextInt(10));
			story.setStoryPointEstimation(storyPoint);
			story.setSubject(name);
			story.setStoryStatus(defaultStatus);
			story.setStoryPriority(defaultPriority);
			Collections.shuffle(storySkills);
			story.setStorySkills(new HashSet<>(storySkills));
			storyList.add(story);

		}

		storyRepository.saveAll(storyList);
	}

	public void createDefaultStorySkills() {
		List<StorySkill> storySkills = new ArrayList<>(Arrays.asList(
				new StorySkill(null, "Java", "Spring Scheduling", null),
				new StorySkill(null, "Java", "Microservices", null), new StorySkill(null, "Java", "Hibernate", null),
				new StorySkill(null, "Java", "Sprint MVC", null), new StorySkill(null, "Java", "Spring Security", null),
				new StorySkill(null, "Java", "Spring Boot", null), new StorySkill(null, "Java Script", "React", null),
				new StorySkill(null, "Java Script", "React Router", null)));
		storySkillRepository.saveAll(storySkills);
	}

	private void createImpactCategoryTable() {
		String[] impactCategories = { "Low", "Medium", "High" };
		for (int i = 0; i < impactCategories.length; i++) {
			ImpactCategory impactcategory = new ImpactCategory();
			impactcategory.setCategory(impactCategories[i]);
			impactcategoryrepository.save(impactcategory);
		}
	}

	private void createIssueStatusTable() {
		String[] issuestatus = { "Reported", "Under Process", "Resloved" };
		for (int i = 0; i < issuestatus.length; i++) {
			IssueStatus Issuestatus = new IssueStatus();
			Issuestatus.setStatus(issuestatus[i]);
			issuestatusrepository.save(Issuestatus);
		}
	}

	@Transactional
	public void assignStories() throws Exception {
		System.out.println("Creating initial database");
		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));
		List<AssignmentUser> usersList = assignmentUserRepo
				.findByAssignmentReportAndServiceLineAndGradeDescription(report, "ADM", "PAT");
//		System.out.println(usersList);
		List<Story> storyList = storyRepository.findAll();

		Random random = new Random();
		AssignmentUser user = customUserDetailsService.loadAssignmentUserFromAssociateId(231612L);

		for (Story story : storyList) {

			int answer = random.nextInt(usersList.size() - 1);
			System.out.println(usersList.get(answer));
			story.setOwner(usersList.get(answer));
			story.setProductOwner(user);
		}
		storyRepository.saveAll(storyList);
	}

	private void createSkillFamilyTables() {
		SkillFamily family = new SkillFamily();

		String[] skillFamiliesArr = { "Java", ".Net", "Python", "Cloud" };

		for (int i = 0; i < skillFamiliesArr.length; i++) {
			SkillFamily skillFamily = new SkillFamily();
			skillFamily.setSkillFamily(skillFamiliesArr[i]);
			skillFamilyRepo.save(skillFamily);
		}
	}

	private void createSkillCategoryTables() {
		List<SkillFamily> skillFamilies = skillFamilyRepo.findAll();

		for (SkillFamily skillFamily : skillFamilies) {

			if (skillFamily.getSkillFamily().equals("Java")) {
				String[] categories = { "Spring Boot", "Microservices", "JavaScript", "Full Stack" };

				for (int i = 0; i < categories.length; i++) {
					SkillCategory skillCategory = new SkillCategory();
					skillCategory.setSkillCategory(categories[i]);
					skillCategory.setSkillCategoryDetail(categories[i]);
					skillCategory.setSkillfamily(skillFamily);
					skillCategoryRepo.save(skillCategory);
				}

			} else if (skillFamily.getSkillFamily().equals(".Net")) {
				String[] categories = { "Core", "Microservices", "AS Script", "Full Stack" };
				for (int i = 0; i < categories.length; i++) {
					SkillCategory skillCategory = new SkillCategory();
					skillCategory.setSkillCategory(categories[i]);
					skillCategory.setSkillCategoryDetail(categories[i]);
					skillCategory.setSkillfamily(skillFamily);
					skillCategoryRepo.save(skillCategory);
				}

			} else if (skillFamily.getSkillFamily().equals("Python")) {
				String[] categories = { "Pythnon Backend", "Pythnon Frontend" };
				for (int i = 0; i < categories.length; i++) {
					SkillCategory skillCategory = new SkillCategory();
					skillCategory.setSkillCategory(categories[i]);
					skillCategory.setSkillCategoryDetail(categories[i]);
					skillCategory.setSkillfamily(skillFamily);
					skillCategoryRepo.save(skillCategory);
				}

			} else if (skillFamily.getSkillFamily().equals("Cloud")) {

				String[] categories = { "AWS", "Google", "Azure" };
				for (int i = 0; i < categories.length; i++) {
					SkillCategory skillCategory = new SkillCategory();
					skillCategory.setSkillCategory(categories[i]);
					skillCategory.setSkillCategoryDetail(categories[i]);
					skillCategory.setSkillfamily(skillFamily);
					skillCategoryRepo.save(skillCategory);
				}

			}

		}

	}

	private void createCerFamilyTables() {

		String[] cerFamiliesArr = { "Java", "Python", "Cloud" };

		for (int i = 0; i < cerFamiliesArr.length; i++) {
			CertificateFamily certificateFamily = new CertificateFamily();
			certificateFamily.setCertificateFamilyName(cerFamiliesArr[i]);
			certificateFamilyRepo.save(certificateFamily);
		}
	}

	private void createCerCategoryTables() {

		List<CertificateFamily> certFamilies = certificateFamilyRepo.findAll();

		
		for (CertificateFamily certificateFamily : certFamilies) {
			
			
			switch (certificateFamily.getCertificateFamilyName()) {
			case "Java":
				String[] javaCategories = { "Java 8", "Spring Booot", "Microservices"};

				for (int i = 0; i < javaCategories.length; i++) {
					CertificateCategory certificateCategory = new CertificateCategory();
					certificateCategory.setCertificateCatName(javaCategories[i]);
					certificateCategory.setCertificateFamily(certificateFamily);
					certificateCategoryRepo.save(certificateCategory);
				}
				
				
				break;
			case "Python":
				String[] pythonCategories = { "Python Backend", "Python Frontend"};

				for (int i = 0; i < pythonCategories.length; i++) {
					CertificateCategory certificateCategory = new CertificateCategory();
					certificateCategory.setCertificateCatName(pythonCategories[i]);
					certificateCategory.setCertificateFamily(certificateFamily);
					certificateCategoryRepo.save(certificateCategory);
				}
				break;
			case "Cloud":
				String[] awsCategories = { "AWS", "Google", "Azure"};

				for (int i = 0; i < awsCategories.length; i++) {
					CertificateCategory certificateCategory = new CertificateCategory();
					certificateCategory.setCertificateCatName(awsCategories[i]);
					certificateCategory.setCertificateFamily(certificateFamily);
					certificateCategoryRepo.save(certificateCategory);
				}
				break;

			}
			
		}

		
	}

	public void setInitialValuesInDB() throws Exception {
		System.out.println("Creating initial database");
		User user = userRepository.findByAssociateId(999L).orElse(null);
		System.out.println("Checking admin user exists or not before running default values:" + user);
		if (user == null) {
			createDefaultRoles();
			createDefaultUser();
			createADMHRUser();
			createADMTAGUser();
			createSkillTables();
			createDefaultBillableCategories();
			createDefaultReferredCategories();
			createSettings();
			createLeaveCategories();
			createLeaveStatus();
			createHolidays();
			createResignationCategoriesTable();
			Category defaultStatus = createDefaultStoryStatusCategories();
			Category defaultPriority = createDefaultStoryPriority();
			createDefaultStorySkills();
			List<Epic> epicList = createDefaultEpics();
			createDefaultStories(epicList, defaultStatus, defaultPriority);
			createImpactCategoryTable();
			createIssueStatusTable();
			createSkillFamilyTables();
			createSkillCategoryTables();
			createCerFamilyTables();
			createCerCategoryTables();
			createDefaultSkillProficiencies();
			
		}
		
	}

}