package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

import lombok.Data;

@Data
public class SignupRequest {
	private Long associateId;

	@NotBlank
	@Size(min = 6, max = 100)
	private String password;

	@Size(min = 6, max = 100)
	private String cpassword;
}
