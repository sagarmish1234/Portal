package com.example.myjwt.models;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class InterviewDrive {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String interviewDriveName;
	
	private Date interviewDriveDate;
	
	@Size(max = 80)
	@NotNull
	private String interviewPocEmail;
	
	@NotNull
	private Long skillId;
	
	@NotNull
	private Boolean isVirtual;
	
	public Boolean isVirtual() {
		return isVirtual;
	}

	public void setVirtual(Boolean isVirtual) {
		this.isVirtual = isVirtual;
	}

	public InterviewDrive() {
		
	}

	public InterviewDrive(@NotNull String interviewDriveName, @NotNull Date interviewDriveDate,
			@Size(max = 80) @NotNull String interviewPocEmail, @NotNull Long skillId, @NotNull boolean isVirtual) {
		super();
		this.interviewDriveName = interviewDriveName;
		this.interviewDriveDate = interviewDriveDate;
		this.interviewPocEmail = interviewPocEmail;
		this.skillId = skillId;
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

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

	
	

}
