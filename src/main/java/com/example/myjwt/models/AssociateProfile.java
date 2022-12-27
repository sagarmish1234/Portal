package com.example.myjwt.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.example.myjwt.models.audit.DateAudit;
import com.example.myjwt.models.audit.UserDateAudit;

@Entity
@Table(name = "associate_profile", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class AssociateProfile extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long associateId;

	private LocalDate ctsJoiningDate;

	private LocalDate itJoiningDate;

	@OneToMany(mappedBy = "profile", cascade = CascadeType.PERSIST)
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<AssociateSkill> associateSkill;

	@OneToMany(mappedBy = "profile", cascade = CascadeType.PERSIST)
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<AssociateCertificate> associateCertificate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public void addAssociateSkill(AssociateSkill child) {

		if (this.associateSkill == null) {
			this.associateSkill = new ArrayList<AssociateSkill>();
		}

		child.setProfile(this);
		this.associateSkill.add(child);
	}

	public void addAssociateCertificate(AssociateCertificate child) {

		if (this.associateCertificate == null) {
			this.associateCertificate = new ArrayList<AssociateCertificate>();
		}

		child.setProfile(this);
		this.associateCertificate.add(child);
	}

}
