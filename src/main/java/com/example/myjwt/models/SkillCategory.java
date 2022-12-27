
package com.example.myjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.example.myjwt.models.audit.UserDateAudit;

@Entity
@Table(name="skillCategory", uniqueConstraints = {@UniqueConstraint(columnNames = "id")})

public class SkillCategory extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String skillCategory;
	
	private String skillCategoryDetail;
	
	@ManyToOne
	@JoinColumn(name = "familyId")
	private SkillFamily skillfamily;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSkillCategory() {
		return skillCategory;
	}

	public void setSkillCategory(String skillCategory) {
		this.skillCategory = skillCategory;
	}

	public String getSkillCategoryDetail() {
		return skillCategoryDetail;
	}

	public void setSkillCategoryDetail(String skillCategoryDetail) {
		this.skillCategoryDetail = skillCategoryDetail;
	}

	public SkillFamily getSkillfamily() {
		return skillfamily;
	}

	public void setSkillfamily(SkillFamily skillfamily) {
		this.skillfamily = skillfamily;
	}

}
