package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateSbuRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String sbuName;
    
    @NotBlank
    @Size(min = 3, max = 20)
    private String sbuHeadUserName;

	public String getSbuName() {
		return sbuName;
	}

	public void setSbuName(String sbuName) {
		this.sbuName = sbuName;
	}

	public String getSbuHeadUserName() {
		return sbuHeadUserName;
	}

	public void setSbuHeadUserName(String sbuHeadUserName) {
		this.sbuHeadUserName = sbuHeadUserName;
	}

	
   
    
}
