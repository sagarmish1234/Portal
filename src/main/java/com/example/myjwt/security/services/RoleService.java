package com.example.myjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.example.myjwt.models.Role;

import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.payload.ListResponse;
import com.example.myjwt.payload.UserListItem;
import com.example.myjwt.repo.RoleRepository;

import com.example.myjwt.repo.UserRepository;
import com.example.myjwt.util.PMUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RoleService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	

	private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

	public Set<Role> getAllRolesFor(ERole eRole) {
		Set<Role> roles = new HashSet<Role>();

		switch (eRole) {
		case Admin:
			roles.add(roleRepository.findByName(ERole.Admin));
			roles.add(roleRepository.findByName(ERole.Associate));
			break;

		case EDL:
			roles.add(roleRepository.findByName(ERole.EDL));
			roles.add(roleRepository.findByName(ERole.Associate));
			break;
		case LOBLead:
			roles.add(roleRepository.findByName(ERole.LOBLead));
			roles.add(roleRepository.findByName(ERole.Associate));
			break;

		case ProjectManager:
			roles.add(roleRepository.findByName(ERole.ProjectManager));
			roles.add(roleRepository.findByName(ERole.Associate));
			break;
		case Associate:
			roles.add(roleRepository.findByName(ERole.Associate));
		}

		return roles;
	}

}
