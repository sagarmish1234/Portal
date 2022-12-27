package com.example.myjwt.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.exception.ResourceNotFoundException;
import com.example.myjwt.models.Grade;
import com.example.myjwt.models.User;
import com.example.myjwt.payload.IdentityExists;
import com.example.myjwt.payload.NativeQueryUser;
import com.example.myjwt.payload.UserIdentityAvailability;
import com.example.myjwt.payload.UserListItem;
import com.example.myjwt.payload.UserProfile;
import com.example.myjwt.payload.UserSummary;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.repo.GradeRepository;
import com.example.myjwt.repo.UserRepository;
import com.example.myjwt.security.CurrentUser;
import com.example.myjwt.security.services.UserPrincipal;
import com.example.myjwt.security.services.UserService;
import com.example.myjwt.util.PMUtils;

@RestController
@RequestMapping("/api")
public class UserController extends BaseController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;


	@Autowired
	private GradeRepository gradeRepository;

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/user/me")
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(),
				currentUser.getAuthorities());
		System.out.println("userSummary -"+userSummary.getUserName());
		return userSummary;
	}

	


	@GetMapping("/user/confirmPDLUserExistence")
	public IdentityExists confirmPDLUserExistence(@RequestParam(value = "pdlUserName") String pdlUserName) {
		List<Long> eligibleGrades = PMUtils.getPDLEligibleGrades();
		Boolean isAvailable = true;
		return new IdentityExists(isAvailable);
	}

	


	// select managerID, group_concat(userID) from hierarchy group by managerID ;
	@GetMapping("/user/getNewUsersToApprove")
	public List<UserListItem> getNewUsersToApprove() {
		Long currentUserId = getCurrentUserId();

		List<UserListItem> userItemList = new ArrayList<UserListItem>();
	

		return userItemList;
	}


}