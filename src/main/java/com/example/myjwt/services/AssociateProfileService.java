package com.example.myjwt.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.myjwt.models.AssociateProfile;



@Service
public interface AssociateProfileService {
	
	AssociateProfile saveAssociateProfile(AssociateProfile associateProfile);
	
	AssociateProfile findByAssociateId(Long associateId) throws Exception;
	
	List<AssociateProfile> findAll();

}
