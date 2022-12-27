package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.SkillCategory;
import com.example.myjwt.models.SkillFamily;

@Repository
public interface SkillCategoryRepo extends JpaRepository<SkillCategory, Long>{
	Optional<SkillCategory> findById(Long id);
	List<SkillCategory> findAll();
	
	List<SkillCategory> findBySkillfamily(SkillFamily skillFamily);

}
