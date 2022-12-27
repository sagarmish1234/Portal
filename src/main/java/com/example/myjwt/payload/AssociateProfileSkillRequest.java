package com.example.myjwt.payload;

import java.time.LocalDate;
import java.util.List;

import com.example.myjwt.models.AssociateCertificate;
import com.example.myjwt.models.AssociateSkill;

public class AssociateProfileSkillRequest {

	Long skillFamilyId;
	Long skillCategoryId;
	Long skillProficiencyId;
	Boolean showSymbol;

	public Long getSkillFamilyId() {
		return skillFamilyId;
	}

	public void setSkillFamilyId(Long skillFamilyId) {
		this.skillFamilyId = skillFamilyId;
	}

	public Long getSkillCategoryId() {
		return skillCategoryId;
	}

	public void setSkillCategoryId(Long skillCategoryId) {
		this.skillCategoryId = skillCategoryId;
	}

	public Long getSkillProficiencyId() {
		return skillProficiencyId;
	}

	public void setSkillProficiencyId(Long skillProficiencyId) {
		this.skillProficiencyId = skillProficiencyId;
	}

	public Boolean getShowSymbol() {
		return showSymbol;
	}

	public void setShowSymbol(Boolean showSymbol) {
		this.showSymbol = showSymbol;
	}

}
