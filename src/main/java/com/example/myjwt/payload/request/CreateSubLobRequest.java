package com.example.myjwt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class CreateSubLobRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String subLobName;
    
    private Long lobId;
    
    private String subLobLeadUserName;

	public String getSubLobName() {
		return subLobName;
	}

	public void setSubLobName(String subLobName) {
		this.subLobName = subLobName;
	}

	public Long getLobId() {
		return lobId;
	}

	public void setLobId(Long lobId) {
		this.lobId = lobId;
	}

	public String getSubLobLeadUserName() {
		return subLobLeadUserName;
	}

	public void setSubLobLeadUserName(String subLobLeadUserName) {
		this.subLobLeadUserName = subLobLeadUserName;
	}

	
}
