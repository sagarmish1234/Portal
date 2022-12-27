package com.example.myjwt.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Lob;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.models.audit.DateAudit;

@Entity
@Table(name = "billableplan", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class BillablePlan extends DateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long associateId;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "billableCategory")
	private Category billableCategory;
	
	private Date eta;
	
	@Size(max = 500)
	private String owner;
	
	@Size(max = 500)
	private String remarks;
	
	private Boolean isActive;

	public BillablePlan() {
	}
	
	public BillablePlan(Long associateId, Boolean isActive) {
		this.associateId = associateId;
		this.isActive = isActive;
	}

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

	public Category getBillableCategory() {
		return billableCategory;
	}

	public void setBillableCategory(Category billableCategory) {
		this.billableCategory = billableCategory;
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

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}


}
