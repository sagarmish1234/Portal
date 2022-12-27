package com.example.myjwt.payload.response;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.example.myjwt.models.AssociateCertificate;
import com.example.myjwt.models.AssociateSkill;

public class AssociateProfileResponse {

	private Long associateId;

	private LocalDate ctsJoiningDate;

	private LocalDate itJoiningDate;

	private List<AssociateSkill> associateSkill;

	private List<AssociateCertificate> associateCertificate;

	public Long getAssociateId() {
		return associateId;
	}

	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}

	public LocalDate getCtsJoiningDate() {
		return ctsJoiningDate;
	}

	public void setCtsJoiningDate(LocalDate ctsJoiningDate) {
		this.ctsJoiningDate = ctsJoiningDate;
	}

	public LocalDate getItJoiningDate() {
		return itJoiningDate;
	}

	public void setItJoiningDate(LocalDate itJoiningDate) {
		this.itJoiningDate = itJoiningDate;
	}

	public List<AssociateSkill> getAssociateSkill() {
		return associateSkill;
	}

	public void setAssociateSkill(List<AssociateSkill> associateSkill) {
		this.associateSkill = associateSkill;
	}

	public List<AssociateCertificate> getAssociateCertificate() {
		return associateCertificate;
	}

	public void setAssociateCertificate(List<AssociateCertificate> associateCertificate) {
		this.associateCertificate = associateCertificate;
	}
	
}
