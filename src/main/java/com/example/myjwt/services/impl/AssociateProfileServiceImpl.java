package com.example.myjwt.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myjwt.exception.UserNotFoundException;
import com.example.myjwt.models.AssociateProfile;
import com.example.myjwt.repo.AssociateProfileRepo;
import com.example.myjwt.services.AssociateProfileService;

@Service
public class AssociateProfileServiceImpl implements AssociateProfileService {

	@Autowired
	private AssociateProfileRepo associateProfileRepo;

	@Override
	public AssociateProfile saveAssociateProfile(AssociateProfile associateProfile) {
		// TODO Auto-generated method stub
		return associateProfileRepo.save(associateProfile);
	}

	@Override
	public AssociateProfile findByAssociateId(Long associateId)  {
		// TODO Auto-generated method stub

		List<AssociateProfile> list = associateProfileRepo.findByAssociateIdOrderByIdAsc(associateId);

		if (list != null && !list.isEmpty()) {
			return list.get(list.size() - 1);
		} else
			return null;
	}

	@Override
	public List<AssociateProfile> findAll() {
		// TODO Auto-generated method stub
		return associateProfileRepo.findAll();
	}

}
