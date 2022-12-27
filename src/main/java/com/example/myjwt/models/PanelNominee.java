package com.example.myjwt.models;

import java.time.LocalTime;
import java.sql.Date;
import java.sql.Time;

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
public class PanelNominee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String panelistName;

	@NotNull
	private Long associateId;

	@Size(max = 80)
	private String panelistEmail;

//	@NotNull
	private Long interviewDriveId;

	@NotNull
	private Long skillId;

	private Date availableOn;

	public Date getAvailableOn() {
		return availableOn;
	}

	public void setAvailableOn(Date availableOn) {
		this.availableOn = availableOn;
	}

	@NotNull
	private Time availabilityFrom;

	@NotNull
	private Time availabilityTo;

	@NotNull
	private boolean isActive;

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public PanelNominee() {
	}

	public PanelNominee(@NotNull String panelistName, @NotNull Long associateId, @Size(max = 80) String panelistEmail,
			Long interviewDriveId, @NotNull Long skillId, @NotNull Time availabilityFrom,
			@NotNull Time availabilityTo, @NotNull boolean isActive) {
		super();
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.interviewDriveId = interviewDriveId;
		this.skillId = skillId;
		this.availabilityFrom = availabilityFrom;
		this.availabilityTo = availabilityTo;
		this.isActive = isActive;
	}

	public PanelNominee(@NotNull String panelistName, @NotNull Long associateId, @Size(max = 80) String panelistEmail,
			@NotNull Long skillId, Date availableOn, @NotNull Time availabilityFrom,
			@NotNull Time availabilityTo, @NotNull boolean isActive) {
		super();
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.skillId = skillId;
		this.availableOn = availableOn;
		this.availabilityFrom = availabilityFrom;
		this.availabilityTo = availabilityTo;
		this.isActive = isActive;
	}

	public PanelNominee(Long id, @NotNull String panelistName, @NotNull Long associateId,
			@Size(max = 80) String panelistEmail, Long interviewDriveId, @NotNull Long skillId,
			@NotNull Time availabilityFrom, @NotNull Time availabilityTo, @NotNull boolean isActive) {
		super();
		this.id = id;
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.interviewDriveId = interviewDriveId;
		this.skillId = skillId;
		this.availabilityFrom = availabilityFrom;
		this.availabilityTo = availabilityTo;
		this.isActive = isActive;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPanelistName() {
		return panelistName;
	}

	public void setPanelistName(String panelistName) {
		this.panelistName = panelistName;
	}

	public Long getAssociateId() {
		return associateId;
	}

	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}

	public String getPanelistEmail() {
		return panelistEmail;
	}

	public void setPanelistEmail(String panelistEmail) {
		this.panelistEmail = panelistEmail;
	}

	public Long getInterviewDriveId() {
		return interviewDriveId;
	}

	public void setInterviewDriveId(Long interviewDriveId) {
		this.interviewDriveId = interviewDriveId;
	}

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
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
