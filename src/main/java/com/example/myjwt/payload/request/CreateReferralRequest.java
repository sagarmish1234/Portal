package com.example.myjwt.payload.request;

public class CreateReferralRequest {

	private Long id;
	private String candidateName;
	private String email;
	private String phone;
	private Long experience;

	private Long referredById;
	private String referredByName;
	private Long skillId;
	private String resumeFile;

	private Long referralStatus;
	
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
	public Long getSkillId() {
		return skillId;
	}
	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}
	public String getResumeFile() {
		return resumeFile;
	}
	public void setResumeFile(String resumeFile) {
		this.resumeFile = resumeFile;
	}
	public Long getReferralStatus() {
		return referralStatus;
	}
	public void setReferralStatus(Long referralStatus) {
		this.referralStatus = referralStatus;
	}
	
	
	
}
