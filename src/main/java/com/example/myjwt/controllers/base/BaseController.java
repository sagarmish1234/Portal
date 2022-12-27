package com.example.myjwt.controllers.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.repo.SettingsRepository;
import com.example.myjwt.repo.UserRepository;
import com.example.myjwt.security.services.UserPrincipal;
import com.example.myjwt.util.PMUtils;

public class BaseController {
	
	@Autowired
	UserRepository userRepository;
	
	public Long getCurrentUserId() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = Long.valueOf(0);
		if (principal instanceof UserPrincipal) {
			userId = ((UserPrincipal)principal).getId();
		} 
		return userId;
	}
	
	public ERole getMyMainRole() {
		Long currentUserId = getCurrentUserId();
		User user = userRepository.findById(currentUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		return PMUtils.getMainRole(user.getRoles());
	}
	
	public Long getMyAssociateId() {
		Long currentUserId = getCurrentUserId();
		User user = userRepository.findById(currentUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		return user.getAssociateId();
	}

}