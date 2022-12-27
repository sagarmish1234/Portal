package com.example.myjwt.controllers;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


import com.example.myjwt.models.*;
import com.example.myjwt.repo.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.myjwt.beans.Email;
import com.example.myjwt.models.BillablePlan;
import com.example.myjwt.models.Category;
import com.example.myjwt.models.EvaluationResult;
import com.example.myjwt.models.EvaluationResultCategory;
import com.example.myjwt.models.Feedback;
import com.example.myjwt.models.Profile;
import com.example.myjwt.models.Referrals;
import com.example.myjwt.models.Skill;
import com.example.myjwt.payload.request.BillabilityPlanRequest;
import com.example.myjwt.payload.request.CreateProfileRequest;
import com.example.myjwt.payload.request.CreateReferralRequest;
import com.example.myjwt.payload.request.ProfileFeedbackRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.FileUploadResponse;
import com.example.myjwt.repo.BillablePlanRepository;
import com.example.myjwt.repo.CategoryRepository;
import com.example.myjwt.repo.EvaluationResultCategoryRepository;
import com.example.myjwt.repo.EvaluationResultRepository;
import com.example.myjwt.repo.ProfileFeedbackRepository;
import com.example.myjwt.repo.ProfileRepository;
import com.example.myjwt.repo.ReferralRepository;
import com.example.myjwt.repo.SkillRepository;
import com.example.myjwt.security.services.EmailService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.util.EmailConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.myjwt.payload.request.AddIssueRequest;
import com.example.myjwt.payload.request.UpdateIssue;
import freemarker.template.TemplateException;

@RestController
@RequestMapping("/api")
public class FormController {
	@Autowired
	SkillRepository skillRepository;

	@Autowired
	ProfileRepository profileRepository;

	@Autowired
	EvaluationResultRepository evaluationResultRepository;

	@Autowired
	EvaluationResultCategoryRepository evaluationResultCategoryRepository;

	@Autowired
	ProfileFeedbackRepository profileFeedbackRepository;

	@Autowired
	BillablePlanRepository billablePlanRepository;

	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	ReferralRepository referralRepository;
	
	@Autowired
	EmailService emailService;

	@Autowired
	SettingService settingService;


	@Autowired
	ResignationCategoryRepository resignationCategoryRepository;
    @Autowired
	AssignmentUserRepository assignmentUserRepository;
	@Autowired
	ImpactCategoryRepository impactcategoryrepository;
	@Autowired
	IssueStatusRepository issuestatusrepository;
	@Autowired
	IssuesRepository issuesRepository;

	@PostMapping("/forms/createProfileRequest")
	public ResponseEntity<FileUploadResponse> createProfileRequest(@RequestParam("file") MultipartFile[] files,
			@RequestParam("createProfileRequest") String createProfileRequestStr) throws Exception {

		CreateProfileRequest createProfileRequest = null;

		System.out.println("createProfileRequestStr = " + createProfileRequestStr);

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

			System.out.println("createProfileRequest.getIsOnsite() = " + createProfileRequest.getIsOnsite());
			profile.setIsOnsite(createProfileRequest.getIsOnsite());
			profile.setPhone(createProfileRequest.getPhone());
			profile.setIsInternal(createProfileRequest.getIsInternal());

			Skill skill = skillRepository.findById(createProfileRequest.getSkillId())
					.orElseThrow(() -> new UsernameNotFoundException("Skill not found"));

			profile.setSkill(skill);

			profileRepository.save(profile);

			return ResponseEntity.status(HttpStatus.OK).body(new FileUploadResponse("Files uploaded successfully: "));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}
	}
	
	//---------------------------------------------------------------------------------------------------//
	
	@PostMapping("/forms/createReferralRequest")
	public ResponseEntity<FileUploadResponse> createReferralRequest(@RequestParam("file") MultipartFile[] files,
			@Valid @RequestParam("createReferralRequest") String createReferralRequestStr) throws Exception {
	
		   CreateReferralRequest createReferralRequest=null;
		   
		   System.out.println("createReferralRequestStr = " + createReferralRequestStr);
		   try {

			createReferralRequest = new ObjectMapper().readValue(createReferralRequestStr.toString(),
					CreateReferralRequest.class);

			byte[] fileBytes = null;

			for (int i = 0; i < files.length; i++) {
				fileBytes = files[i].getBytes();
				break;
			}
			

			Referrals referrals = new Referrals();
			
			Long id =(long) 10;
			
				Category category = categoryRepository.findById(id)
						.orElseThrow(() -> new UsernameNotFoundException("Referral Category doesn't exist"));
				 referrals.setStatus(category);
			
			referrals.setCandidateName(createReferralRequest.getCandidateName());
			referrals.setEmail(createReferralRequest.getEmail());
			referrals.setPhone(createReferralRequest.getPhone());
			referrals.setExperience(createReferralRequest.getExperience());
			referrals.setReferredById(createReferralRequest.getReferredById());
			referrals.setReferredByName(createReferralRequest.getReferredByName());
			referrals.setData(fileBytes);
			
			Skill skill = skillRepository.findById(createReferralRequest.getSkillId())
					.orElseThrow(() -> new UsernameNotFoundException("Skill not found"));
			referrals.setSkill(skill);

			referralRepository.save(referrals);
			sendEmailToHR(referrals);
			return ResponseEntity.status(HttpStatus.OK).body(new FileUploadResponse("Files uploaded successfully: "));


		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}

	}
	
	private void sendEmailToHR(Referrals referrals) throws MessagingException, TemplateException, IOException {
		Email email = new Email();
		email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
		email.setTo(settingService.getEmailId(EmailConstants.TAG_EMAIL_TO, "ADM", null));
		email.setCc(settingService.getEmailId(EmailConstants.TAG_EMAIL_CC, "ADM", null));
		email.setSubject("!! Alert !! - Candidate Referral Information");

		Map<String, Object> model = new HashMap<String, Object>();
		model.put("referralList", referrals);
//		model.put("referralData", new String(referrals.getData(),StandardCharsets.UTF_8));
		
		email.setModel(model);
		emailService.sendReferralListEmail(email);

	}

	
	//---------------------------------------------------------------------------------------------------//

	@PostMapping("/forms/addProfilefeedback")
	public ResponseEntity<?> addProfilefeedback(@Valid @RequestBody ProfileFeedbackRequest profileFeedbackRequest,
			HttpServletRequest request) throws Exception {

		System.out.println("profileFeedbackRequest.getProfileId()=" + profileFeedbackRequest.getProfileId());
		Profile profile = profileRepository.findById(profileFeedbackRequest.getProfileId())
				.orElseThrow(() -> new UsernameNotFoundException("Profile not found"));

		System.out.println("profile id" + profile.getId());

		Feedback feedback = new Feedback();
		try {

			feedback.setComments(profileFeedbackRequest.getDetailedFeedback());
			feedback.setEvaluationDate(profileFeedbackRequest.getEvaluationDate());
			feedback.setPanelName(profileFeedbackRequest.getPanelName());
			feedback.setProfile(profile);

			EvaluationResult evaluationResult = evaluationResultRepository
					.findById(profileFeedbackRequest.getEvaluationResult())
					.orElseThrow(() -> new UsernameNotFoundException("Evaluation Result not found"));
			feedback.setResult(evaluationResult);

			if (profileFeedbackRequest.getEvaluationResultCategory() != null
					&& profileFeedbackRequest.getEvaluationResultCategory() > 0) {
				EvaluationResultCategory evaluationResultCategory = evaluationResultCategoryRepository
						.findById(profileFeedbackRequest.getEvaluationResultCategory())
						.orElseThrow(() -> new UsernameNotFoundException("Evaluation Result Category not found"));
				feedback.setResultCategory(evaluationResultCategory);
			}

			profileFeedbackRepository.save(feedback);

			URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/sbu/{profileFeedbackRequest.getId()}").buildAndExpand(feedback.getId()).toUri();

			return ResponseEntity.created(location).body(new ApiResponse(true, "Feedback added successfully!!"));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}
	}

	@PostMapping("/forms/addbillabilityplan")
	public ResponseEntity<?> addBillabilityPlan(@Valid @RequestBody BillabilityPlanRequest objBillabilityPlan,
			HttpServletRequest request) throws Exception {

		System.out.println("objBillabilityPlan.getAssociateId() =" + objBillabilityPlan.getAssociateId());

		try {

			//BillablePlan billablePlan = billablePlanRepository
				//	.findFirstByAssociateIdByOrderByIdDesc(objBillabilityPlan.getAssociateId());

			BillablePlan billablePlan = new BillablePlan();

			Category category = categoryRepository.findById(objBillabilityPlan.getBillabilityCategory())
					.orElseThrow(() -> new UsernameNotFoundException("Billable Category doesn't exist"));

			billablePlan.setBillableCategory(category);
			billablePlan.setAssociateId(objBillabilityPlan.getAssociateId());
			billablePlan.setRemarks(objBillabilityPlan.getRemarks());
			billablePlan.setOwner(objBillabilityPlan.getOwner());
			billablePlan.setEta(objBillabilityPlan.getEtaDate());
			billablePlan.setIsActive(true);
			billablePlanRepository.save(billablePlan);

			URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/sbu/{profileFeedbackRequest.getId()}")
					.buildAndExpand(objBillabilityPlan.getAssociateId()).toUri();

			return ResponseEntity.created(location)
					.body(new ApiResponse(true, "Billability plan added successfully!!"));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}
	}
	
	@GetMapping("/forms/categoryFamilies")
	public List<Category> getAllCategoryFamilies() {

		List<Category> categoryFamilies = categoryRepository.findAll();

		return categoryFamilies;
	}
	
	//----------------------------------------------------------------
	

	@GetMapping("/forms/getAllResignationCategories")
	public List<ResignationCategory> getAllResignationCategories() {

		List<ResignationCategory> resignationCategories = resignationCategoryRepository.findAll();

		return resignationCategories;
	}
	@GetMapping("/forms/getAllImpactCategories")
	public List<ImpactCategory> getAllImpactCategories()
	{

		List<ImpactCategory> impactCategory=impactcategoryrepository.findAll();

		return impactCategory;
	}
	@GetMapping("/forms/getAllIssueStatus")
	public List<IssueStatus> getAllIssueStatus()
	{
		List<IssueStatus> issueStatusList=issuestatusrepository.findAll();

		return issueStatusList;
	}
	@PostMapping("/forms/addIssue")
	public ApiResponse addIssue(@RequestBody AddIssueRequest addIssueRequest)
	{
		Issues newIssue=new Issues(addIssueRequest.getServiceLine(),addIssueRequest.getLobName(),addIssueRequest.getProjectId(),
				addIssueRequest.getProjectName(),addIssueRequest.getSubject(),addIssueRequest.getDescription(),addIssueRequest.getOwnerOfTheIssue(),addIssueRequest.getEta(),addIssueRequest.getActionToBeTaken(),addIssueRequest.getRemarks(),
				addIssueRequest.getImpact(),addIssueRequest.getIssueStatus(),addIssueRequest.getIssueRaisedDate(),addIssueRequest.getIssueReslovedDate(),addIssueRequest.getImpactCategory());
		issuesRepository.save(newIssue);
		return new ApiResponse(true,newIssue.getId().toString());

	}
	@GetMapping("/forms/getIssuesData/{serviceline}")
	public List<Issues> getIssuesData(@PathVariable String serviceline)
	{
		System.out.println(serviceline);
		List<Issues> issues=issuesRepository.findAllByServiceLine(serviceline);
		//System.out.println(issues.get(0));
		return issues;
	}
	@GetMapping("/forms/getProjectIds/{serviceline}/{lobname}")
	public List<Long> getProjectIds(@PathVariable String serviceline,@PathVariable String lobname)
	{

		List<Long> l=assignmentUserRepository.getAllProjectIdsInServiceLineAndLoB(serviceline,lobname);
		System.out.println(l);
		return l;
	}
	@GetMapping("/forms/getProjectName/{serviceline}/{lobname}/{projectId}")
	public List<String> getProjectName(@PathVariable String serviceline,@PathVariable String lobname,@PathVariable Long projectId)
	{
		String x=assignmentUserRepository.getProjectName(serviceline,lobname,projectId);
		//System.out.println(x);
		List<String> l=new ArrayList<>();
		l.add(x);
		return l;
	}
	@GetMapping("/forms/issues/getIssues/{id}")
	public Issues getIssues(@PathVariable Long id)
	{
		Issues issues=issuesRepository.findIssuesById(id);
		return issues;
	}
	@PostMapping("/forms/issues/updateIssue")
	public ApiResponse updateIssues(@RequestBody UpdateIssue updateIssue)
	{
		Issues issue=issuesRepository.findIssuesById(updateIssue.getId());
		issue.setIssueStatus(updateIssue.getIssueStatus());
		issue.setEta(updateIssue.getEta());
		issue.setActionToBeTaken(updateIssue.getActionToBeTaken());
		issue.setSubject(updateIssue.getSubject());
		issue.setDescription(updateIssue.getDescription());
		issue.setImpact(updateIssue.getImpact());
		issue.setImpactCategory(updateIssue.getImpactCategory());
		issue.setRemarks(updateIssue.getRemarks());
		issue.setOwnerOfTheIssue(updateIssue.getOwnerOfTheIssue());
		issue.setIssueReslovedDate(updateIssue.getIssueReslovedDate());
		issuesRepository.save(issue);
		return new ApiResponse(true,issue.getId().toString());

	}
}
