package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateProfileRequest {
    private Long associateId;
    private Long candidateId;
    private String fullName;
    private String email;
    private String phone;
    private String city;
    private Long skillId;
    private String resumeFile;
    private Boolean isOnsite;
    private Boolean isInternal;
    private Boolean updateIfAlreadyExists;
    
	public Long getAssociateId() {
		return associateId;
	}
	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}
	public Long getCandidateId() {
		return candidateId;
	}
	public void setCandidateId(Long candidateId) {
		this.candidateId = candidateId;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
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
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
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
	public Boolean getIsOnsite() {
		return isOnsite;
	}
	public void setIsOnsite(Boolean isOnsite) {
		this.isOnsite = isOnsite;
	}
	public Boolean getIsInternal() {
		return isInternal;
	}
	public void setIsInternal(Boolean isInternal) {
		this.isInternal = isInternal;
	}
	public Boolean getUpdateIfAlreadyExists() {
		return updateIfAlreadyExists;
	}
	public void setUpdateIfAlreadyExists(Boolean updateIfAlreadyExists) {
		this.updateIfAlreadyExists = updateIfAlreadyExists;
	}
    
}
