package com.example.myjwt.payload.request;

import java.sql.Date;
import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateProjectRequest {
    @NotBlank
    @Size(min = 10, max = 50, message = "Project name should be between 10 and 50 range")
    private String projectName;
    
    private Date startDate;
    
    private Date endDate;
    
    @NotBlank
    @Size(min = 3, max = 20, message = "Username should be between 3 and 20 range")
    private String pmUserName;
    
    private Long subLobId;

    private Long customerId;

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getPmUserName() {
		return pmUserName;
	}

	public void setPmUserName(String pmUserName) {
		this.pmUserName = pmUserName;
	}

	public Long getSubLobId() {
		return subLobId;
	}

	public void setSubLobId(Long subLobId) {
		this.subLobId = subLobId;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
    
}
