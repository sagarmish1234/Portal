package com.example.myjwt.payload.request;

import java.util.List;

public class AssignProfileToPanelistReq {
	
	private List<Long> profileIds;
	
	private long panelistId;

	public AssignProfileToPanelistReq(List<Long> profileIds, long panelistId) {
		super();
		this.profileIds = profileIds;
		this.panelistId = panelistId;
	}

	public List<Long> getProfileIds() {
		return profileIds;
	}

	public void setProfileIds(List<Long> profileIds) {
		this.profileIds = profileIds;
	}

	public long getPanelistId() {
		return panelistId;
	}

	public void setPanelistId(long panelistId) {
		this.panelistId = panelistId;
	}
	
	

}
