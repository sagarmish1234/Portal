package com.example.myjwt.payload.request;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
//	@NotBlank
//	private String userName;
	
//	@NotBlank
	private Long associateId;

	@NotBlank
	private String password;
	
	public Long getAssociateId() {
		return associateId;
	}

	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}

//	public String getUserName() {
//		return userName;
//	}
//
//	public void setUserName(String userName) {
//		this.userName = userName;
//	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
