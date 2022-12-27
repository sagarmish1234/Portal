package com.example.myjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class ExtProfilePanelist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private Long associateId;
	
	@NotNull
	private Long profileId;

	public ExtProfilePanelist() {
		super();
	}

	public ExtProfilePanelist(@NotNull Long associateId, @NotNull Long profileId) {
		super();
		this.associateId = associateId;
		this.profileId = profileId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getassociateId() {
		return associateId;
	}

	public void setassociateId(Long associateId) {
		this.associateId = associateId;
	}

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public ExtProfilePanelist(Long id, @NotNull Long associateId, @NotNull Long profileId) {
		super();
		this.id = id;
		this.associateId = associateId;
		this.profileId = profileId;
	}
	
	

}
