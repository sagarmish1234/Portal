package com.example.myjwt.payload;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class UserSummary {
    private Long id;
    private String userName;
    private Collection<? extends GrantedAuthority> authorities; 

    public UserSummary(Long id, String userName, Collection<? extends GrantedAuthority> authorities) {
        this.id = id; 
        this.userName = userName;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

}