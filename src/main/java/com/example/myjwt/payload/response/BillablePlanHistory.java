package com.example.myjwt.payload.response;

import java.sql.Date;

import com.example.myjwt.models.BillablePlan;
import com.example.myjwt.util.PMUtils;

public class BillablePlanHistory {
	private Long billableCategoryId;
	private String billableCategoryName;
	private Date etaDate;
	private String owner;
	private String remarkrs;
	private Date dateAdded;
	
	public BillablePlanHistory() {}
	
	public BillablePlanHistory(BillablePlan plan) {
		setBillableCategoryId(plan.getBillableCategory().getId());
		setBillableCategoryName(plan.getBillableCategory().getGroupValue());
		setEtaDate(plan.getEta());
		setOwner(plan.getOwner());
		setRemarkrs(plan.getRemarks());
		setDateAdded(PMUtils.instantToSqlDate(plan.getCreatedAt()));
	}
	
	
	
	public Long getBillableCategoryId() {
		return billableCategoryId;
	}
	public void setBillableCategoryId(Long billableCategoryId) {
		this.billableCategoryId = billableCategoryId;
	}
	public String getBillableCategoryName() {
		return billableCategoryName;
	}
	public void setBillableCategoryName(String billableCategoryName) {
		this.billableCategoryName = billableCategoryName;
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
	public String getRemarkrs() {
		return remarkrs;
	}
	public void setRemarkrs(String remarkrs) {
		this.remarkrs = remarkrs;
	}
	public Date getDateAdded() {
		return dateAdded;
	}
	public void setDateAdded(Date dateAdded) {
		this.dateAdded = dateAdded;
	}
	
}
