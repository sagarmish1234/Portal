package com.example.myjwt.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.example.myjwt.models.audit.DateAudit;
import com.example.myjwt.models.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name ="associate_skills", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class AssociateSkill extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "skillCatId")
	private SkillCategory skillCategory;
	
	@ManyToOne
	@JoinColumn(name = "skillProficiency")
	private Category skillProficiency;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
    private AssociateProfile profile;
	
	public AssociateProfile getProfile() {
		return profile;
	}

	public void setProfile(AssociateProfile profile) {
		this.profile = profile;
	}

	private Boolean isApproved;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public SkillCategory getSkillCategory() {
		return skillCategory;
	}

	public void setSkillCategory(SkillCategory skillCategory) {
		this.skillCategory = skillCategory;
	}

	public Category getSkillProficiency() {
		return skillProficiency;
	}

	public void setSkillProficiency(Category skillProficiency) {
		this.skillProficiency = skillProficiency;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

	public String getKey() {
		String key = null; 
		
		if(skillCategory!=null && skillCategory.getSkillCategory()!=null && skillCategory.getSkillfamily()!=null 
				&& skillCategory.getSkillfamily().getSkillFamily()!=null && skillProficiency!=null && skillProficiency.getGroupValue()!=null ) {
			return skillCategory.getSkillfamily().getId() + " - " + skillCategory.getId() + " - " + skillProficiency.getId();
		}
		return key;
	}

}
