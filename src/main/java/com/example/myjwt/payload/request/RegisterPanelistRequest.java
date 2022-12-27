package com.example.myjwt.payload.request;

import java.sql.Time;
import java.sql.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RegisterPanelistRequest {
	
	@NotNull
	private String panelistName;

	@NotNull
	private Long associateId;

	@Size(max = 80)
	private String panelistEmail;

	@NotNull
	private Long skillId;
	
	private Date availableOn;

	@NotNull
	private Time availabilityFrom;

	@NotNull
	private Time availabilityTo;

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

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

	public Date getAvailableOn() {
		return availableOn;
	}

	public void setAvailableOn(Date availableOn) {
		this.availableOn = availableOn;
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
