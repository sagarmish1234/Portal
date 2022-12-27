package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateLobRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String lobName;
    
    private Long accountId;
    
    private String lobLeadUserName;

	public String getLobName() {
		return lobName;
	}

	public void setLobName(String lobName) {
		this.lobName = lobName;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getLobLeadUserName() {
		return lobLeadUserName;
	}

	public void setLobLeadUserName(String lobLeadUserName) {
		this.lobLeadUserName = lobLeadUserName;
	}



}
