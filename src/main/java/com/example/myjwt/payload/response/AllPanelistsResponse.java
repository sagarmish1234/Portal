package com.example.myjwt.payload.response;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


public class AllPanelistsResponse {
	
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
	private int totalNominations;
	
	@NotNull
	private boolean isActive;

	private String driveName;

	public String getDriveName() {
		return driveName;
	}

	public void setDriveName(String driveName) {
		this.driveName = driveName;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
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

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public int getTotalNominations() {
		return totalNominations;
	}

	public void setTotalNominations(int totalNominations) {
		this.totalNominations = totalNominations;
	}

	public AllPanelistsResponse(@NotNull Long id, @NotNull String panelistName, @NotNull Long associateId,
			@Size(max = 80) @NotNull String panelistEmail, @NotNull String skill, @NotNull int totalNominations,
			@NotNull boolean isActive) {
		super();
		this.id = id;
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.skill = skill;
		this.totalNominations = totalNominations;
		this.isActive = isActive;
	}

	public AllPanelistsResponse(@NotNull Long id, @NotNull String panelistName, @NotNull Long associateId,
			@Size(max = 80) @NotNull String panelistEmail, @NotNull String skill, String driveName) {
		super();
		this.id = id;
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.skill = skill;
		this.driveName = driveName;
	}

	public AllPanelistsResponse(@NotNull Long id, @NotNull String panelistName, @NotNull Long associateId,
			@Size(max = 80) @NotNull String panelistEmail, @NotNull String skill) {
		super();
		this.id = id;
		this.panelistName = panelistName;
		this.associateId = associateId;
		this.panelistEmail = panelistEmail;
		this.skill = skill;
	}

	
	
	
	
	
}
