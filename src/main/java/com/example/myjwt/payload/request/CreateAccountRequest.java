package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateAccountRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String accountName;
    
    @NotBlank
    @Size(min = 3, max = 20)
    private String pdlUserName;
    
    @NotBlank
    @Size(min = 3, max = 20)
    private String sbuName;

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}


	public String getPdlUserName() {
		return pdlUserName;
	}

	public void setPdlUserName(String pdlUserName) {
		this.pdlUserName = pdlUserName;
	}

	public String getSbuName() {
		return sbuName;
	}

	public void setSbuName(String sbuName) {
		this.sbuName = sbuName;
	}

	
 
   
    
}
