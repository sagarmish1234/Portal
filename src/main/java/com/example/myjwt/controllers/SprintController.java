package com.example.myjwt.controllers;

import com.example.myjwt.controllers.base.GenCTrackerBaseController;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Sprint;
import com.example.myjwt.payload.request.SprintCreateRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.SprintListItem;
import com.example.myjwt.security.services.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/sprint")
public class SprintController extends GenCTrackerBaseController {

	@Autowired
	private SprintService sprintService;

	@PostMapping("/createSprint")
	public ResponseEntity<?> createSprint(@RequestBody SprintCreateRequest sprint) {
		try {
			sprintService.createSprint(sprint);
			return ResponseEntity.ok(new ApiResponse(true, "Sprint created successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@PutMapping("/updateSprint/{id}")
	public ResponseEntity<?> updateSprint(@RequestBody SprintCreateRequest sprint, @PathVariable Long id) {
		try {
			sprintService.updateSprint(id, sprint);
			return ResponseEntity.ok(new ApiResponse(true, "Sprint updated successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@PutMapping("/deleteSprint/{id}")
	public ResponseEntity<?> deleteSprint(@PathVariable Long id) {
		try {
			sprintService.deleteSprint(id);
			return ResponseEntity.ok(new ApiResponse(true, "Sprint deleted successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@GetMapping("/getAllSprints")
	public ResponseEntity<?> getAllSprints(@RequestParam(required = false) Integer isGenc,
			@RequestParam(required = false) String parentAccount, @RequestParam(required = false) String lOB,
			@RequestParam(required = false) Long account, @RequestParam(required = false) String project, @RequestParam(required = false) String isCompleted)
			throws Exception {
		List<AssignmentUser> associateList = getMyAssociateUsersScopeGenCList();

		List<Long> associateIdList = new ArrayList<Long>();

		for (int i = associateList.size() - 1; i >= 0; i--) {
			AssignmentUser aUser = associateList.get(i);
			if (lOB != null && !aUser.getlOB().equalsIgnoreCase(lOB))
				associateList.remove(aUser);
			else if (account != null && !aUser.getAccountID().equals(account))
				associateList.remove(aUser);
			else if (project != null && !aUser.getProjectDescription().equalsIgnoreCase(project))
				associateList.remove(aUser);
			else
				associateIdList.add(aUser.getAssociateID());
		}

		List<SprintListItem> sprintList = new ArrayList<>();
		if(isCompleted!=null && isCompleted.equals("1"))
			sprintList = sprintService.getCompletedSprints(associateIdList);
		else
			sprintList = sprintService.loadAllSprints(associateIdList);
		return ResponseEntity.ok().body(sprintList);
	}

//
	@GetMapping("/getSprintById/{id}")
	public ResponseEntity<?> getSprintById(@PathVariable Long id) {
		try {
			SprintListItem sprint = sprintService.loadSprintById(id);
			return ResponseEntity.ok(sprint);
		} catch (Exception e) {
			return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@GetMapping("/getSprintById/{id}/stories")
	public ResponseEntity<?> getSprintStoriesById(@PathVariable Long id){
		return ResponseEntity.ok().body(sprintService.getStoriesBySprint(id));
	}

}