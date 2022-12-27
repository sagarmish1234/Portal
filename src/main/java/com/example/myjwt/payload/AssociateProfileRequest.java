package com.example.myjwt.payload;

import java.time.LocalDate;
import java.util.List;

import com.example.myjwt.models.AssociateCertificate;
import com.example.myjwt.models.AssociateSkill;

public class AssociateProfileRequest {

	private LocalDate ctsJoiningDate;

	private LocalDate itJoiningDate;

	private List<AssociateProfileSkillRequest> associateSkill;

	private List<AssociateProfileCertificateRequest> associateCertificate;

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

	public List<AssociateProfileSkillRequest> getAssociateSkill() {
		return associateSkill;
	}

	public void setAssociateSkill(List<AssociateProfileSkillRequest> associateSkill) {
		this.associateSkill = associateSkill;
	}

	public List<AssociateProfileCertificateRequest> getAssociateCertificate() {
		return associateCertificate;
	}

	public void setAssociateCertificate(List<AssociateProfileCertificateRequest> associateCertificate) {
		this.associateCertificate = associateCertificate;
	}

}
