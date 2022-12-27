package com.example.myjwt.payload.response;

import java.sql.Date;
import java.sql.Time;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DriveListAssociate {

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
	
	@NotNull
	@JsonFormat(pattern="HH:mm")
	private Time availabilityFrom;
	
	private boolean isActive;
	
	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	@NotNull
	@JsonFormat(pattern="HH:mm")
	private Time availabilityTo;

	
	
	public DriveListAssociate(@NotBlank Long id, @NotBlank String interviewDriveName, @NotBlank Date interviewDriveDate,
			@Size(max = 80) @NotBlank String interviewPocEmail, @NotBlank String skill, @NotNull Boolean isVirtual,
			@NotNull Time availabilityFrom, boolean isActive, @NotNull Time availabilityTo) {
		super();
		this.id = id;
		this.interviewDriveName = interviewDriveName;
		this.interviewDriveDate = interviewDriveDate;
		this.interviewPocEmail = interviewPocEmail;
		this.skill = skill;
		this.isVirtual = isVirtual;
		this.availabilityFrom = availabilityFrom;
		this.isActive = isActive;
		this.availabilityTo = availabilityTo;
	}

	public DriveListAssociate(@NotBlank Long id, @NotBlank String interviewDriveName, @NotBlank Date interviewDriveDate,
			@Size(max = 80) @NotBlank String interviewPocEmail, @NotBlank String skill, @NotNull Boolean isVirtual) {
		super();
		this.id = id;
		this.interviewDriveName = interviewDriveName;
		this.interviewDriveDate = interviewDriveDate;
		this.interviewPocEmail = interviewPocEmail;
		this.skill = skill;
		this.isVirtual = isVirtual;
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

	public Boolean getIsVirtual() {
		return isVirtual;
	}

	public void setIsVirtual(Boolean isVirtual) {
		this.isVirtual = isVirtual;
	}

	public Time getAvailabilityFrom() {
		return availabilityFrom;
	}

	public void setAvailabilityFrom(Time availabilityFrom) {
		this.availabilityFrom = availabilityFrom;
	}

	public Time getAvailabilityTo() {
		return availabilityTo;
	}

	public void setAvailabilityTo(Time availabilityTo) {
		this.availabilityTo = availabilityTo;
	}
	
	
}
