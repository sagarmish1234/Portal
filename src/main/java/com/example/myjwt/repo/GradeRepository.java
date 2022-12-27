package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import com.example.myjwt.models.Grade;
import com.example.myjwt.models.User;


@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
	List<Grade> findAll();
	Optional<Grade> findById(Long id);
}
