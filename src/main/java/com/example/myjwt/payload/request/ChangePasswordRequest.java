package com.example.myjwt.payload.request;

import javax.persistence.Transient;

import lombok.Data;

@Data
public class ChangePasswordRequest {
	
	private String password;
	@Transient
	private String confPassword;
	private Long associateId;
}
