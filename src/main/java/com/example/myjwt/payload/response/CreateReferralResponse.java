package com.example.myjwt.payload.response;

import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.models.Category;
import com.example.myjwt.models.Skill;

public class CreateReferralResponse {
	@Id
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

	@NotBlank
	private Skill skill;
	

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	@Lob
	private byte[] data;
	
	private String referralStatus;

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

	public String getReferralStatus() {
		return referralStatus;
	}

	public void setReferralStatus(String referralStatus) {
		this.referralStatus = referralStatus;
	}

	public CreateReferralResponse(Long id, @NotBlank @Size(max = 100) String candidateName,
			@NotBlank @Size(max = 50) String email, @Size(max = 80) String phone, Long experience, Long referredById,
			@NotBlank @Size(max = 100) String referredByName, @NotBlank Skill skill, String referralStatus,byte[] data) {
		super();
		this.id = id;
		this.candidateName = candidateName;
		this.email = email;
		this.phone = phone;
		this.experience = experience;
		this.referredById = referredById;
		this.referredByName = referredByName;
		this.skill = skill;
		this.referralStatus = referralStatus;
		this.data=data;
	}

	public CreateReferralResponse() {
		super();
		// TODO Auto-generated constructor stub
	} 
	
	
	

	

   
}
