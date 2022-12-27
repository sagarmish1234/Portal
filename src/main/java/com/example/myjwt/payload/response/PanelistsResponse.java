package com.example.myjwt.payload.response;

import java.sql.Time;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PanelistsResponse {


	@NotNull
	private Long id;
	
	@NotNull
	private String panelistName;
	
	@NotNull
	private Long associateId;
	
	@Size(max = 80)
	@NotNull
	private String panelistEmail;
	
	@NotNull
	private String skill;
	
	@NotNull
	@JsonFormat(pattern="HH:mm")
	private Time availabilityFrom;
	
	@NotNull
	@JsonFormat(pattern="HH:mm")
	private Time availabilityTo;
	
	@NotNull
	private boolean isActive;
	
	private Long totalProfiles;
	
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

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
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
	
	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public PanelistsResponse(@NotNull Long id, @NotNull String panelistName, @NotNull Long associateId,
			@Size(max = 80) @NotNull String panelistEmail, @NotNull String skill, @NotNull Time availabilityFrom,
			@NotNull Time availabilityTo, @NotNull boolean isActive) {
		super();
		this.id = id;
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.skill = skill;
		this.availabilityFrom = availabilityFrom;
		this.availabilityTo = availabilityTo;
		this.isActive = isActive;
	}

	
}
