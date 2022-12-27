package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


import com.example.myjwt.models.AssignmentUser;

import com.example.myjwt.models.EvaluationResultCategory;
import com.example.myjwt.models.Grade;
import com.example.myjwt.models.Profile;

import com.example.myjwt.models.Skill;
import com.example.myjwt.models.User;

@Repository
public interface EvaluationResultCategoryRepository extends JpaRepository<EvaluationResultCategory, Long> {
	Optional<EvaluationResultCategory> findById(Long id);
	List<EvaluationResultCategory> findAll();
}
