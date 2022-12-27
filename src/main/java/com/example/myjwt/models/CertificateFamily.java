package com.example.myjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="certificateFamily", uniqueConstraints = {@UniqueConstraint(columnNames = "id")})

public class CertificateFamily {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String certificateFamilyName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCertificateFamilyName() {
		return certificateFamilyName;
	}

	public void setCertificateFamilyName(String certificateFamilyName) {
		this.certificateFamilyName = certificateFamilyName;
	}
	
}
