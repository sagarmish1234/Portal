package com.example.myjwt.payload;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Set;

import com.example.myjwt.models.Role;
import com.example.myjwt.payload.response.JwtAuthenticationResponse;

public class UserProfile {
	private Long id;
    private Long associateId;
    private Instant joinedAt;
    private JwtAuthenticationResponse jwt;
    private String userFullName;
    private ArrayList<String> roles;

    public UserProfile(Long id, Long associateId, Instant joinedAt) {
        this.id = id;
        this.associateId = associateId;
        this.joinedAt = joinedAt;
    }
    
    public UserProfile(Long id, Long associateId, JwtAuthenticationResponse jwt) {
        this.id = id;
        this.associateId = associateId;
        this.jwt = jwt;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAssociateId() {
		return associateId;
	}

	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}

	public Instant getJoinedAt() {
		return joinedAt;
	}

	public void setJoinedAt(Instant joinedAt) {
		this.joinedAt = joinedAt;
	}

	public JwtAuthenticationResponse getJwt() {
		return jwt;
	}

	public void setJwt(JwtAuthenticationResponse jwt) {
		this.jwt = jwt;
	}

	public String getUserFullName() {
		return userFullName;
	}

	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}

	public ArrayList<String> getRoles() {
		return roles;
	}

	public void setRoles(ArrayList<String> roles) {
		this.roles = roles;
	}

}
