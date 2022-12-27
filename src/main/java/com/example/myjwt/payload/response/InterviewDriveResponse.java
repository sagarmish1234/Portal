package com.example.myjwt.payload.response;

import java.sql.Date;
import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;


public class InterviewDriveResponse {
	
	@NotBlank
	private Long id;
	
	@NotBlank
	private String interviewDriveName;
	
	@NotBlank
	private Date interviewDriveDate;
	
	@Size(max = 80)
	@NotBlank
	private String interviewPocEmail;
	
	@NotBlank
	private String skill;
	
	@NotNull
	private Boolean isVirtual;
	
	public Boolean getIsVirtual() {
		return isVirtual;
	}

	public void setIsVirtual(Boolean isVirtual) {
		this.isVirtual = isVirtual;
	}

	private Long totalPanelists;

	public InterviewDriveResponse(@NotBlank Long id, @NotBlank String interviewDriveName,
			@NotBlank Date interviewDriveDate, @Size(max = 80) @NotBlank String interviewPocEmail,
			@NotBlank String skill, @NotNull Boolean isVirtual, Long totalPanelists) {
		super();
		this.id = id;
		this.interviewDriveName = interviewDriveName;
		this.interviewDriveDate = interviewDriveDate;
		this.interviewPocEmail = interviewPocEmail;
		this.skill = skill;
		this.isVirtual = isVirtual;
		this.totalPanelists = totalPanelists;
	}

	public InterviewDriveResponse(@NotBlank Long id, @NotBlank String driveName, @NotBlank Date driveDate,
			@Size(max = 80) @NotBlank String pocEmail) {
		super();
		this.id = id;
		this.interviewDriveName = driveName;
		this.interviewDriveDate = driveDate;
		this.interviewPocEmail = pocEmail;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getInterviewPocEmail() {
		return interviewPocEmail;
	}

	public void setInterviewPocEmail(String interviewPocEmail) {
		this.interviewPocEmail = interviewPocEmail;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public Long getTotalPanelists() {
		return totalPanelists;
	}

	public void setTotalPanelists(Long totalPanelists) {
		this.totalPanelists = totalPanelists;
	}

}
