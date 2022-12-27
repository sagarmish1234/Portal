package com.example.myjwt.payload;

import java.util.Set;

import com.example.myjwt.models.Role;

import lombok.Data;

@Data
public class UsersDetail {
	public long associateId;
	public String email;
	public String associateName;
	public String serviceLine;
	public String grade;
	public Set<Role> roles;
	public Boolean approved;
}
