package com.example.myjwt.beans;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.BillablePlan;
import com.example.myjwt.util.PMUtils;
import java.util.Comparator;

public class BillablePlanData {

	private Long associateID;

	private String associateName;

	private String sID;

	private String sIDStatus;

	private Long projectID;

	private String projectDescription;

	private String projectBillability;

	private Long projectManagerID;
	private String projectManagerName;

	private Long accountID;

	private String accountName;

	private String lOB;

	private String region;

	private String grade;

	private String serviceLine;

	private Boolean billabilityStatus;

	private String billabilityReason;

	private String onOff;

	private String country;

	private Double fTE;

	private Long numberOfPlans;

	private Long categoryId;

	private Date eta;
	private String owner;
	private String remarks;

	public BillablePlanData() {

	}

	public BillablePlanData(AssignmentUser assignmentUser) {
		setAssociateID(assignmentUser.getAssociateID());
		setAssociateName(assignmentUser.getAssociateName());
		setsID(assignmentUser.getsID());
		setsIDStatus(assignmentUser.getsIDStatus());
		setProjectID(assignmentUser.getProjectID());
		setProjectDescription(assignmentUser.getProjectDescription());
		setProjectBillability(assignmentUser.getProjectBillability());
		setProjectManagerID(assignmentUser.getProjectManagerID());
		setProjectManagerName(assignmentUser.getProjectManagerName());
		setAccountID(assignmentUser.getAccountID());
		setAccountName(assignmentUser.getAccountName());
		setlOB(assignmentUser.getlOB());
		setRegion(assignmentUser.getRegion());
		setGrade(assignmentUser.getGradeDescription());
		setServiceLine(assignmentUser.getServiceLine());
		setBillabilityStatus(assignmentUser.getBillabilityStatus());
		setBillabilityReason(assignmentUser.getBillabilityReason());
		setOnOff(assignmentUser.getOnOff());
		setCountry(assignmentUser.getCountry());
		setfTE(assignmentUser.getfTE());
	}

	public Long getAssociateID() {
		return associateID;
	}

	public void setAssociateID(Long associateID) {
		this.associateID = associateID;
	}

	public String getAssociateName() {
		return associateName;
	}

	public void setAssociateName(String associateName) {
		this.associateName = associateName;
	}

	public String getsID() {
		return sID;
	}

	public void setsID(String sID) {
		this.sID = sID;
	}

	public String getsIDStatus() {
		return sIDStatus;
	}

	public void setsIDStatus(String sIDStatus) {
		this.sIDStatus = sIDStatus;
	}

	public Long getProjectID() {
		return projectID;
	}

	public void setProjectID(Long projectID) {
		this.projectID = projectID;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public String getProjectBillability() {
		return projectBillability;
	}

	public void setProjectBillability(String projectBillability) {
		this.projectBillability = projectBillability;
	}

	public Long getProjectManagerID() {
		return projectManagerID;
	}

	public void setProjectManagerID(Long projectManagerID) {
		this.projectManagerID = projectManagerID;
	}

	public String getProjectManagerName() {
		return projectManagerName;
	}

	public void setProjectManagerName(String projectManagerName) {
		this.projectManagerName = projectManagerName;
	}

	public Long getAccountID() {
		return accountID;
	}

	public void setAccountID(Long accountID) {
		this.accountID = accountID;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getlOB() {
		return lOB;
	}

	public void setlOB(String lOB) {
		this.lOB = lOB;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getServiceLine() {
		return serviceLine;
	}

	public void setServiceLine(String serviceLine) {
		this.serviceLine = serviceLine;
	}

	public Boolean getBillabilityStatus() {
		return billabilityStatus;
	}

	public void setBillabilityStatus(Boolean billabilityStatus) {
		this.billabilityStatus = billabilityStatus;
	}

	public String getBillabilityReason() {
		return billabilityReason;
	}

	public void setBillabilityReason(String billabilityReason) {
		this.billabilityReason = billabilityReason;
	}

	public String getOnOff() {
		return onOff;
	}

	public void setOnOff(String onOff) {
		this.onOff = onOff;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Double getfTE() {
		return fTE;
	}

	public void setfTE(Double fTE) {
		this.fTE = fTE;
	}

	public Long getNumberOfPlans() {
		return numberOfPlans;
	}

	public void setNumberOfPlans(Long numberOfPlans) {
		this.numberOfPlans = numberOfPlans;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public Date getEta() {
		return eta;
	}

	public void setEta(Date eta) {
		this.eta = eta;
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

	public void setBillablePlans(List<BillablePlan> associateBillablePlans) {
		// this.numberOfPlans = Long.valueOf(associateBillablePlans.size());
		if (associateBillablePlans.get(0).getBillableCategory() != null) {
			this.categoryId = associateBillablePlans.get(0).getBillableCategory().getId();
			this.numberOfPlans = Long.valueOf(associateBillablePlans.size());
		} else {
			this.numberOfPlans = Long.valueOf(0);
		}
		this.eta = associateBillablePlans.get(0).getEta();
		this.owner = associateBillablePlans.get(0).getOwner();
		this.remarks = associateBillablePlans.get(0).getRemarks();
	}

	public boolean setBillablePlans(List<BillablePlan> associateBillablePlans, Long categoryId, Long noPlanCategory) {

		this.numberOfPlans = Long.valueOf(0);
		if (associateBillablePlans == null)
			return false;

		if (associateBillablePlans.get(0).getBillableCategory() == null && categoryId == noPlanCategory) {
			return true;
		} else {
			
			if(associateBillablePlans.get(0).getBillableCategory()!=null)
				this.numberOfPlans = Long.valueOf(associateBillablePlans.size());
			
			if (associateBillablePlans.get(0).getBillableCategory()!=null && associateBillablePlans.get(0).getBillableCategory().getId() == categoryId) {
				this.categoryId = associateBillablePlans.get(0).getBillableCategory().getId();
				this.eta = associateBillablePlans.get(0).getEta();
				this.owner = associateBillablePlans.get(0).getOwner();
				this.remarks = associateBillablePlans.get(0).getRemarks();
				return true;
			}
		}

		return false;

	}

}
