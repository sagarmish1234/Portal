package com.example.myjwt.util;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.myjwt.models.AssociateCertificate;
import com.example.myjwt.models.AssociateProfile;
import com.example.myjwt.models.AssociateSkill;
import com.example.myjwt.models.Category;
import com.example.myjwt.models.CertificateFamily;
import com.example.myjwt.models.SkillCategory;
import com.example.myjwt.payload.AssociateProfileCertificateRequest;
import com.example.myjwt.payload.AssociateProfileRequest;
import com.example.myjwt.payload.AssociateProfileSkillRequest;
import com.example.myjwt.payload.response.AssociateProfileResponse;

@Component
public class AssociateProfileMapper {

	public AssociateProfile associateRequestToProfile(AssociateProfile associateProfile,
			AssociateProfileRequest associateProfileRequest, HashMap<Long, SkillCategory> skillCategoryMap,
			HashMap<Long, Category> skillProficiencyMap, HashMap<Long, CertificateFamily> certificateFamilyMap) {

		associateProfile.setCtsJoiningDate(associateProfileRequest.getCtsJoiningDate());
		associateProfile.setItJoiningDate(associateProfileRequest.getItJoiningDate());

		for (AssociateProfileSkillRequest associateProfileSkillRequest : associateProfileRequest.getAssociateSkill()) {

			if (associateProfileSkillRequest.getSkillCategoryId() > 0
					&& associateProfileSkillRequest.getSkillProficiencyId() > 0) {

				AssociateSkill associateSkill = new AssociateSkill();
				associateSkill.setIsApproved(false);

				associateSkill
						.setSkillCategory(skillCategoryMap.get(associateProfileSkillRequest.getSkillCategoryId()));
				associateSkill.setSkillProficiency(
						skillProficiencyMap.get(associateProfileSkillRequest.getSkillProficiencyId()));
				associateProfile.addAssociateSkill(associateSkill);
			}

		}

		for (AssociateProfileCertificateRequest associateProfileCertificateRequest : associateProfileRequest
				.getAssociateCertificate()) {

			if (associateProfileCertificateRequest.getCertificationDate() != null
					&& associateProfileCertificateRequest.getCertificationFamilyId() > 0
					&& !associateProfileCertificateRequest.getCertificationName().trim().equals("")) {
				AssociateCertificate associateCertificate = new AssociateCertificate();

				associateCertificate.setCertificationDate(
						DateUtil.convertToLocalDate(associateProfileCertificateRequest.getCertificationDate()));
				associateCertificate.setCertificateFamily(
						certificateFamilyMap.get(associateProfileCertificateRequest.getCertificationFamilyId()));
				associateCertificate.setCertificateName(associateProfileCertificateRequest.getCertificationName());
				associateCertificate.setIsInternal(!associateProfileCertificateRequest.getIsExternal());
				associateProfile.addAssociateCertificate(associateCertificate);
			}
		}

		return associateProfile;

	}

	public AssociateProfileResponse profileToAssociateResponse(Long associateId, AssociateProfile associateProfile,
			LocalDate ctsJoiningDate, LocalDate itJoiningDate) {

		AssociateProfileResponse associateProfileResponse = new AssociateProfileResponse();
		associateProfile.setAssociateId(associateId);
		associateProfileResponse.setCtsJoiningDate(ctsJoiningDate);
		associateProfileResponse.setItJoiningDate(itJoiningDate);
		associateProfileResponse.setAssociateSkill(associateProfile.getAssociateSkill());
		// associateProfileResponse.setAssociateCertificate(associateProfile.getAssociateCertificate());

		return associateProfileResponse;
	}
}
