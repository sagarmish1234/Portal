package com.example.myjwt.payload;

import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.EGrade;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

public class UserListItem {
	private Long id;
	private String userName;
	private String grade;
	private String gradeId;
	private String email;
	private Boolean isVerified;
	private String manager;
	private Boolean isApproved;
	private String accountName;
	private String projectName;
	private Long managerId;


}
