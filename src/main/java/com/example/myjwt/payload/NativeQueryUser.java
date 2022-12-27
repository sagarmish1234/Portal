package com.example.myjwt.payload;

import java.sql.Date;

import com.example.myjwt.util.PMUtils;

public class NativeQueryUser {
	private Long id;
	private Date createdAt;
	private Date updatedAt;
	private String email;
	private String fullName;
	private Boolean isActive;
	private Boolean isApproved;
	private Boolean isVerified;
	private String password;
	private String userName;
	private Long gradeId;
	private Long managerId;

	public NativeQueryUser() {

	}

	public NativeQueryUser(Object[] arrValues) {

		//// s.id, s.created_at, s.updated_at, s.email, s.full_name, s.is_active,
		//// s.is_approved, s.is_verified, s.password, s.user_name, s.grade_id,
		//// s.manager_id, s.roleid

		int i = 0;
		setId(Long.parseLong(arrValues[i++].toString()));
		setCreatedAt(PMUtils.stringToSQLDate(arrValues[i++].toString()));
		setUpdatedAt(PMUtils.stringToSQLDate(arrValues[i++].toString()));
		setEmail(arrValues[i++].toString());
		setFullName(arrValues[i++].toString());
		setIsActive(Boolean.parseBoolean(arrValues[i++].toString()));
		setIsApproved(Boolean.parseBoolean(arrValues[i++].toString()));
		setIsVerified(Boolean.parseBoolean(arrValues[i++].toString()));
		setPassword(arrValues[i++].toString());
		setUserName(arrValues[i++].toString());
		if (arrValues[i] != null) {
			setGradeId(Long.parseLong(arrValues[i++].toString()));
		} else {
			i++;
		}
		if (arrValues[i] != null) {
			setManagerId(Long.parseLong(arrValues[i++].toString()));
		} else {
			i++;
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

	public Boolean getIsVerified() {
		return isVerified;
	}

	public void setIsVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getGradeId() {
		return gradeId;
	}

	public void setGradeId(Long gradeId) {
		this.gradeId = gradeId;
	}

	public Long getManagerId() {
		return managerId;
	}

	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}
}