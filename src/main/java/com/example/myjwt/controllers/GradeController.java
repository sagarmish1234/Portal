package com.example.myjwt.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.models.Grade;
import com.example.myjwt.repo.GradeRepository;

@RestController
@RequestMapping("/api/grade")
public class GradeController extends BaseController {

	@Autowired
	private GradeRepository gradeRepository;

	private static final Logger logger = LoggerFactory.getLogger(GradeController.class);

	@GetMapping("/getAllGrades")
	public List<Grade> getAllGrades() {
		List<Grade> grades = gradeRepository.findAll();
		
		return grades;
	}

}