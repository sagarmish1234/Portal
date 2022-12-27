package com.example.myjwt.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Lob;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.models.audit.DateAudit;

@Entity
@Table(name = "skill", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class Skill extends DateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String skillName;
	
	@NotBlank
	@Size(max = 100)
	private String skillDetails;

	public Skill() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public String getSkillDetails() {
		return skillDetails;
	}

	public void setSkillDetails(String skillDetails) {
		this.skillDetails = skillDetails;
	}

}
