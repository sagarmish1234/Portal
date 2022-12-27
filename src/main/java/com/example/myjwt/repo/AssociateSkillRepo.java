package com.example.myjwt.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.AssociateProfile;
import com.example.myjwt.models.AssociateSkill;

@Repository
public interface AssociateSkillRepo extends JpaRepository<AssociateSkill, Long> {

	

}
