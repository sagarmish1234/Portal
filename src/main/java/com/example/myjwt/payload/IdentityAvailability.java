package com.example.myjwt.payload;

public class IdentityAvailability {
	private Boolean available;

    public IdentityAvailability(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
