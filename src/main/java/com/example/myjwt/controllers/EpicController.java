package com.example.myjwt.controllers;

import com.example.myjwt.controllers.base.GenCTrackerBaseController;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.payload.request.EpicRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.security.services.EpicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/epic")
public class EpicController extends GenCTrackerBaseController {

	@Autowired
	EpicService epicService;

	@PostMapping("")
	public ResponseEntity<?> addEpic(@RequestBody EpicRequest epicRequest) {
		epicService.addService(epicRequest);
		return ResponseEntity.ok().body(new ApiResponse(true, "Epic created"));
	}

	@GetMapping("")
	public ResponseEntity<List<?>> getEpics(@RequestParam(required = false) Integer isGenc,
			@RequestParam(required = false) String parentAccount, @RequestParam(required = false) String lOB,
			@RequestParam(required = false) Long account, @RequestParam(required = false) String project,@RequestParam(required = false) String isCompleted)
			throws Exception {
		List<?> epicList = new ArrayList<>();

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
		if(isCompleted != null && isCompleted.equals("1"))
		epicList = epicService.getAllCompletedEpics(associateIdList);
		else
			epicList = epicService.getAllEpics(associateIdList);
		return ResponseEntity.ok().body(epicList);
	}

	@GetMapping("/{epicId}")
	public ResponseEntity<?> getEpic(@PathVariable long epicId) throws Exception {
		return ResponseEntity.ok().body(epicService.getEpic(epicId));
	}

	@GetMapping("/{epicId}/stories")
	public ResponseEntity<List<?>> getEpicStories(@PathVariable long epicId, @RequestParam(required = false) Integer isAccepted) throws Exception {
		if(isAccepted != null && isAccepted == 1){
			return ResponseEntity.ok().body(epicService.getEpicAcceptedStories(epicId));
		}
		return ResponseEntity.ok().body(epicService.getEpicStories(epicId));
	}
}