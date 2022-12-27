package com.example.myjwt.payload.request;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateInterviewDriveRequest {
	
	@NotNull
	private String interviewDriveName;
	
	@NotNull
	private Boolean isVirtual;
	
	private List<Long> panelistIds;
	
	public List<Long> getPanelistIds() {
		return panelistIds;
	}

	public void setPanelistIds(List<Long> panelistIds) {
		this.panelistIds = panelistIds;
	}

	public Boolean getIsVirtual() {
		return isVirtual;
	}

	public void setIsVirtual(Boolean isVirtual) {
		this.isVirtual = isVirtual;
	}

	@NotNull
	private Date interviewDriveDate;
	
	@NotNull
	private Long skillId;
	
	public String getInterviewDriveName() {
		return interviewDriveName;
	}

	public void setInterviewDriveName(String interviewDriveName) {
		this.interviewDriveName = interviewDriveName;
	}

	public Date getInterviewDriveDate() {
		return interviewDriveDate;
	}

	public void setInterviewDriveDate(Date interviewDriveDate) {
		this.interviewDriveDate = interviewDriveDate;
	}

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

	
}
