package com.example.myjwt.security.services;

import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.User;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	AssignmentReportRepository assignmentReportRepository;

	@Autowired
	AssignmentUserRepository assignmentUserRepository;


	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByAssociateId(Long.valueOf(username))
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserPrincipal.build(user);
	}

	@Transactional
	public UserDetails loadUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));

		return UserPrincipal.build(user);
	}

	@Transactional
	public User getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
		return user;
	}

	public User loadUserFromContext() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return userRepository.findById(((UserPrincipal) authentication.getPrincipal()).getId()).get();
	}

	public AssignmentUser loadAssignmentUserFromAssociateId(Long associateId) throws Exception{
		AssignmentReport first = assignmentReportRepository.findFirstByOrderByIdDesc().orElseThrow(()-> new Exception("No assignment report found"));
		List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssignmentReportAndAssociateID(first, associateId);
		return assignmentUsers.get(0);
	}

	public User loadUserFromAssociateId(Long associateId) throws Exception{
		User user = userRepository.findByAssociateId(Long.valueOf(associateId))
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + associateId));
	return user;
	}





}