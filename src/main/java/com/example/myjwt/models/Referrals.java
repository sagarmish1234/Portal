package com.example.myjwt.models;

import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.myjwt.models.audit.DateAudit;

@Entity
@Table(name = "referrals", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class Referrals extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String candidateName;

	@NotBlank
	@Size(max = 50)
	private String email;

	@Size(max = 80)
	private String phone;

	private Long experience;

	private Long referredById;

	@NotBlank
	@Size(max = 100)
	private String referredByName;


	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id")
	private Skill skill;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "referralStatus")
	private Category status;
	
	

	@Lob
	private byte[] data;

	public byte[] getData() {
		return data;
	}

	public Referrals() {
		
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCandidateName() {
		return candidateName;
	}

	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getExperience() {
		return experience;
	}

	public void setExperience(Long experience) {
		this.experience = experience;
	}

	public Long getReferredById() {
		return referredById;
	}

	public void setReferredById(Long referredById) {
		this.referredById = referredById;
	}

	public String getReferredByName() {
		return referredByName;
	}

	public void setReferredByName(String referredByName) {
		this.referredByName = referredByName;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public Category getStatus() {
		return status;
	}

	public void setStatus(Category status) {
		this.status = status;
	}
	
	


	
	

	

	

}
