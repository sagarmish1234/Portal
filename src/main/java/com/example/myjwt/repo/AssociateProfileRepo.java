package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.AssociateProfile;

@Repository
public interface AssociateProfileRepo extends JpaRepository<AssociateProfile, Long> {

	List<AssociateProfile> findByAssociateIdOrderByIdAsc(Long associateId);
	
}
