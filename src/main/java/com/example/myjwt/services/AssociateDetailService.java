package com.example.myjwt.services;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myjwt.models.AssociateCertificate;
import com.example.myjwt.models.AssociateProfile;
import com.example.myjwt.models.AssociateSkill;
import com.example.myjwt.models.Category;
import com.example.myjwt.models.CertificateFamily;
import com.example.myjwt.models.SkillCategory;
import com.example.myjwt.payload.AssociateProfileRequest;
import com.example.myjwt.payload.response.AssociateProfileResponse;
import com.example.myjwt.repo.AssociateProfileRepo;
import com.example.myjwt.repo.AssociateSkillRepo;
import com.example.myjwt.repo.CategoryRepository;
import com.example.myjwt.repo.CertificateFamilyRepo;
import com.example.myjwt.repo.SkillCategoryRepo;
import com.example.myjwt.services.impl.AssociateProfileServiceImpl;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.AssociateProfileMapper;

@Service
public class AssociateDetailService {

	@Autowired
	private AssociateProfileRepo associateProfileRepo;

	@Autowired
	private AssociateProfileServiceImpl associateProfileServiceImpl;

	@Autowired
	private AssociateProfileMapper associateProfileMapper;

	@Autowired
	SkillCategoryRepo skillCategoryRepo;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	CertificateFamilyRepo certificateFamilyRepo;

	@Autowired
	AssociateSkillRepo associateSkillRepo;

	public void saveAssociateSkillProfile(Long associateId, AssociateProfileRequest associateProfileRequest) {

		List<SkillCategory> skillCategories = skillCategoryRepo.findAll();
		List<Category> skillProficiencies = categoryRepository.findByCatGroupAndGroupKey(
				AppConstants.CATEGORY_SKILLPROFICIENCY_GROUP, AppConstants.CATEGORY_SKILLPROFICIENCY_KEY);
		List<CertificateFamily> certificateFamilies = certificateFamilyRepo.findAll();

		HashMap<Long, SkillCategory> skillCategoryMap = new HashMap<Long, SkillCategory>();
		HashMap<Long, Category> skillProficiencyMap = new HashMap<Long, Category>();
		HashMap<Long, CertificateFamily> certificateFamilyMap = new HashMap<Long, CertificateFamily>();

		for (SkillCategory skillCategory : skillCategories) {
			skillCategoryMap.put(skillCategory.getId(), skillCategory);
		}

		for (Category category : skillProficiencies) {
			skillProficiencyMap.put(category.getId(), category);
		}

		for (CertificateFamily certificateFamily : certificateFamilies) {
			certificateFamilyMap.put(certificateFamily.getId(), certificateFamily);
		}

		AssociateProfile previousProfile = associateProfileServiceImpl.findByAssociateId(associateId);

		HashMap<String, AssociateSkill> associateSkillMap = new HashMap<String, AssociateSkill>();

		if (previousProfile!=null && previousProfile.getAssociateSkill() != null) {
			for (AssociateSkill associateSkill : previousProfile.getAssociateSkill()) {
				associateSkillMap.put(associateSkill.getKey(), associateSkill);
			}
		}

		AssociateProfile associateProfile = new AssociateProfile();
		associateProfile.setAssociateId(associateId);

		associateProfileMapper.associateRequestToProfile(associateProfile, associateProfileRequest, skillCategoryMap,
				skillProficiencyMap, certificateFamilyMap);
		
		if(associateProfile.getAssociateSkill()!=null) {
			for (AssociateSkill associateSkill : associateProfile.getAssociateSkill()) {
				AssociateSkill associateSkillFromMap = associateSkillMap.get(associateSkill.getKey());
				if(associateSkillFromMap!=null) {
					associateSkill.setIsApproved(associateSkillFromMap.getIsApproved());
				}
			}
		}
			

		associateProfileRepo.saveAndFlush(associateProfile);

	}

	public AssociateProfileResponse findByAssociateId(Long associateId) throws Exception {

		AssociateProfile associateProfile = associateProfileServiceImpl.findByAssociateId(associateId);

		LocalDate cogDate = null;
		LocalDate itDate = null;

		cogDate = associateProfile.getCtsJoiningDate();
		itDate = associateProfile.getItJoiningDate();

		return associateProfileMapper.profileToAssociateResponse(associateId, associateProfile, cogDate, itDate);
	}

	public AssociateProfile getAssociateSkillProfile(Long associateId) throws Exception {

		AssociateProfile associateProfile = associateProfileServiceImpl.findByAssociateId(associateId);

		return associateProfile;
	}

	public List<AssociateProfileResponse> findAll() {
		List<AssociateProfile> associateList = associateProfileServiceImpl.findAll();
		System.out.println(associateList.size());
		List<AssociateProfileResponse> associateResponseList = new ArrayList<>();
		System.out.println(associateResponseList);
		for (AssociateProfile item : associateList) {
			System.out.println(item.getCtsJoiningDate());
			LocalDate cogDate = item.getCtsJoiningDate();
			LocalDate itDate = item.getItJoiningDate();

			AssociateProfileResponse responseItem = associateProfileMapper
					.profileToAssociateResponse(item.getAssociateId(), item, cogDate, itDate);
			System.out.println(responseItem.getCtsJoiningDate());
			associateResponseList.add(responseItem);

		}

		return associateResponseList;
	}

}