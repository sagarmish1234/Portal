

package com.example.myjwt.models;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.example.myjwt.models.audit.UserDateAudit;

@Entity
@Table(name="skillFamily", uniqueConstraints = {@UniqueConstraint(columnNames = "id")})

public class SkillFamily extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String skillFamily;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSkillFamily() {
		return skillFamily;
	}

	public void setSkillFamily(String skillFamily) {
		this.skillFamily = skillFamily;
	}

}

