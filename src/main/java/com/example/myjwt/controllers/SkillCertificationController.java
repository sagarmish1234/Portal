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
import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.payload.request.BillabilityPlanRequest;
import com.example.myjwt.payload.request.CreateProfileRequest;
import com.example.myjwt.payload.request.CreateReferralRequest;
import com.example.myjwt.payload.request.ProfileFeedbackRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.AssociateProfileResponse;
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
import com.example.myjwt.services.AssociateDetailService;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.myjwt.payload.AssociateProfileRequest;
import com.example.myjwt.payload.request.AddIssueRequest;
import com.example.myjwt.payload.request.UpdateIssue;
import freemarker.template.TemplateException;

@RestController
@RequestMapping("/api")
public class SkillCertificationController extends BaseController {
	@Autowired
	SkillFamilyRepo skillFamilyRepo;

	@Autowired
	SkillCategoryRepo skillCategoryRepo;

	@Autowired
	private AssociateDetailService associateDetailService;

	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	CertificateFamilyRepo certificateFamilyRepo;

	@Autowired
	AssignmentUserRepository assignmentUserRepository;

	@GetMapping("/data/skill/getAllSkillFamilies")
	public List<SkillFamily> getAllSkillFamilies() {
		List<SkillFamily> skillFamilies = skillFamilyRepo.findAll();
		return skillFamilies;
	}
	
	@GetMapping("/data/skill/getAllCertificationFamilies")
	public List<CertificateFamily> getAllCertificationFamilies() {
		List<CertificateFamily> certificateFamilies = certificateFamilyRepo.findAll();
		return certificateFamilies;
	}

	@GetMapping("/data/skill/apiGetAllSkillProficiencies")
	public List<Category> apiGetAllSkillProficiencies() {
		List<Category> skillProficiencies = categoryRepository.findByCatGroupAndGroupKey(
				AppConstants.CATEGORY_SKILLPROFICIENCY_GROUP, AppConstants.CATEGORY_SKILLPROFICIENCY_KEY);

		return skillProficiencies;
	}

	@GetMapping("/data/skill/getSkillCategories/{skillFamilyId}")
	public List<SkillCategory> getSkillCategories(@PathVariable Long skillFamilyId) {

		SkillFamily skillFamily = skillFamilyRepo.findById(skillFamilyId).orElseThrow();

		List<SkillCategory> skillCategories = skillCategoryRepo.findBySkillfamily(skillFamily);
		// System.out.println(issues.get(0));
		return skillCategories;
	}
	
	@GetMapping("/data/skill/getAllSkillCategories")
	public List<SkillCategory> getAllSkillCategories() {

		List<SkillCategory> skillCategories = skillCategoryRepo.findAll();
		// System.out.println(issues.get(0));
		return skillCategories;
	}

	@GetMapping("/skill/getAssociateSkillProfile")
	public AssociateProfile getAssociateSkillProfile() throws Exception {

		AssociateProfile associateProfile = associateDetailService.getAssociateSkillProfile(getMyAssociateId());

		return associateProfile;
	}

	@PostMapping("/skill/saveAssociateSkillProfile")
	public ResponseEntity<?> saveAssociateSkillProfile(@RequestBody AssociateProfileRequest associateProfileRequest) throws Exception {

		Long associateId = getMyAssociateId();
		
		associateDetailService.saveAssociateSkillProfile(associateId, associateProfileRequest);

		return ResponseEntity.ok(new ApiResponse(true, "Associate Details Saved Successfully!"));
	}

	@GetMapping("/getProfile/{associateId}")
	public AssociateProfileResponse getProfile(@PathVariable Long associateId) throws Exception {

		AssociateProfileResponse associateProfileResponse = associateDetailService.findByAssociateId(associateId);

		return associateProfileResponse;
	}

	@GetMapping("/findAll")
	public List<AssociateProfileResponse> findAll() {
		return associateDetailService.findAll();
	}

}
