package com.example.myjwt.payload;

public class UpdateResult {
	private Boolean isUpdated;

    public UpdateResult(Boolean isUpdated) {
        this.isUpdated = isUpdated;
    }

	public Boolean getIsUpdated() {
		return isUpdated;
	}

	public void setIsUpdated(Boolean isUpdated) {
		this.isUpdated = isUpdated;
	}

   
}
