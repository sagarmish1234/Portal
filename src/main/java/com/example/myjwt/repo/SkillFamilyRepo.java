package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.SkillFamily;

@Repository
public interface SkillFamilyRepo extends JpaRepository<SkillFamily, Long>  {
		Optional<SkillFamily> findById(Integer id);
		List<SkillFamily> findAll();
		
}
