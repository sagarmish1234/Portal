package com.example.myjwt.payload;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.example.myjwt.models.AssociateCertificate;
import com.example.myjwt.models.AssociateSkill;

public class AssociateProfileCertificateRequest {

	Long certificationFamilyId;
	String certificationName;
	Date certificationDate;
	Boolean isExternal;
	Boolean showSymbol;

	public Long getCertificationFamilyId() {
		return certificationFamilyId;
	}

	public void setCertificationFamilyId(Long certificationFamilyId) {
		this.certificationFamilyId = certificationFamilyId;
	}

	public String getCertificationName() {
		return certificationName;
	}

	public void setCertificationName(String certificationName) {
		this.certificationName = certificationName;
	}

	public Date getCertificationDate() {
		return certificationDate;
	}

	public void setCertificationDate(Date certificationDate) {
		this.certificationDate = certificationDate;
	}

	public Boolean getIsExternal() {
		return isExternal;
	}

	public void setIsExternal(Boolean isExternal) {
		this.isExternal = isExternal;
	}

	public Boolean getShowSymbol() {
		return showSymbol;
	}

	public void setShowSymbol(Boolean showSymbol) {
		this.showSymbol = showSymbol;
	}

}
