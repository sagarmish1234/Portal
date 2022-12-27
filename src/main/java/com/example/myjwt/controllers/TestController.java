package com.example.myjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Profile;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;

@RestController
@RequestMapping("/api")
public class TestController extends BaseController {

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;
	
	
	@Autowired
	private AssignmentUserRepository assignmentUserRepository;
	
	@GetMapping("/dummy/getAssignmentListing")
	public List<AssignmentUser> getAssignmentListing(@RequestParam(value = "selPractice") String selPractice) {
		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository
				.findByAssignmentReportAndServiceLine(report, selPractice);

		return allAssociates;
	}
}
