package com.example.myjwt.payload;

public class IdentityExists {
	private Boolean available;

    public IdentityExists(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
