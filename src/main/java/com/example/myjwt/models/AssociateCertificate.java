package com.example.myjwt.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.example.myjwt.models.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "associate_certificate", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class AssociateCertificate extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "certificateFamilyId")
	private CertificateFamily certificateFamily;
	
	private String certificateName;
	
	private LocalDate certificationDate;
	
	private Boolean isInternal;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
    private AssociateProfile profile;

	public AssociateProfile getProfile() {
		return profile;
	}

	public void setProfile(AssociateProfile profile) {
		this.profile = profile;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CertificateFamily getCertificateFamily() {
		return certificateFamily;
	}

	public void setCertificateFamily(CertificateFamily certificateFamily) {
		this.certificateFamily = certificateFamily;
	}


	public LocalDate getCertificationDate() {
		return certificationDate;
	}

	public void setCertificationDate(LocalDate certificationDate) {
		this.certificationDate = certificationDate;
	}

	public Boolean getIsInternal() {
		return isInternal;
	}

	public void setIsInternal(Boolean isInternal) {
		this.isInternal = isInternal;
	}

	public String getCertificateName() {
		return certificateName;
	}

	public void setCertificateName(String certificateName) {
		this.certificateName = certificateName;
	}
	
	public String getKey() {
		String key = null; 
		
		if(certificateFamily!=null && certificateFamily.getCertificateFamilyName()!=null && certificateName!=null && !certificateName.trim().isBlank()
				&& certificationDate!=null) {
			return certificateFamily.getId() + " - " + certificateName.trim() + " - " + certificationDate;
		}
		return key;
	}

}
