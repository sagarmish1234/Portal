package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateCustomerRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String customerName;
    
    private Long accountId;
    
    private String customerLeadUserName;

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getCustomerLeadUserName() {
		return customerLeadUserName;
	}

	public void setCustomerLeadUserName(String customerLeadUserName) {
		this.customerLeadUserName = customerLeadUserName;
	}
}
