package com.example.myjwt.payload.request;

import java.sql.Date;
import java.util.Set;

import javax.validation.constraints.*;
 
public class BillabilityPlanRequest {

    private Long associateId;
    
    private Long billabilityCategory;

	private Date etaDate;
	
	private String owner;
	
	private String remarks;

	public Long getAssociateId() {
		return associateId;
	}

	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}

	public Long getBillabilityCategory() {
		return billabilityCategory;
	}

	public void setBillabilityCategory(Long billabilityCategory) {
		this.billabilityCategory = billabilityCategory;
	}

	public Date getEtaDate() {
		return etaDate;
	}

	public void setEtaDate(Date etaDate) {
		this.etaDate = etaDate;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

}
