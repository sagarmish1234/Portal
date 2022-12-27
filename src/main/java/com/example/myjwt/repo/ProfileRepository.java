package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


import com.example.myjwt.models.AssignmentUser;

import com.example.myjwt.models.Grade;
import com.example.myjwt.models.Profile;

import com.example.myjwt.models.Skill;
import com.example.myjwt.models.User;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
	Optional<Profile> findById(Long id);
	Profile findByAssociateId(Long associateId);
	Profile findByCandidateId(Long candidateId);
	List<Profile> findAllByOrderByIdDesc();
	List<Profile> findByIdIn(List<Long> candidateIds);
}
