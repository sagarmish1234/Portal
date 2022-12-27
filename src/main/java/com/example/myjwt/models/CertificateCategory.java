package com.example.myjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="certificateCategory", uniqueConstraints = {@UniqueConstraint(columnNames = "id")})

public class CertificateCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String certificateCatName;
	
	@ManyToOne
	@JoinColumn(name = "certificateFamilyId")
	private CertificateFamily certificateFamily;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCertificateCatName() {
		return certificateCatName;
	}

	public void setCertificateCatName(String certificateCatName) {
		this.certificateCatName = certificateCatName;
	}

	public CertificateFamily getCertificateFamily() {
		return certificateFamily;
	}

	public void setCertificateFamily(CertificateFamily certificateFamily) {
		this.certificateFamily = certificateFamily;
	}
	
	

}
