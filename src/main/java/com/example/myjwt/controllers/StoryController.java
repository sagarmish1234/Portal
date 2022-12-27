package com.example.myjwt.controllers;

import com.example.myjwt.controllers.base.GenCTrackerBaseController;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Category;
import com.example.myjwt.models.Story;
import com.example.myjwt.payload.StoryDropDownPayload;
import com.example.myjwt.payload.request.StoryRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.StoryResponse;
import com.example.myjwt.security.services.CustomUserDetailsService;
import com.example.myjwt.security.services.StoryService;
import com.example.myjwt.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/story")
public class StoryController extends GenCTrackerBaseController {

	@Autowired
	private StoryService storyService;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@PostMapping("/createStory")
	public ResponseEntity<?> createStory(@RequestBody StoryRequest request) {
		try {
			storyService.saveStory(request);
			return ResponseEntity.ok(new ApiResponse(true, "Story created successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@PutMapping("/updateStory")
	public ResponseEntity<?> updateStory(@RequestBody StoryRequest request) {
		try {
			storyService.updateStory(request);
			return ResponseEntity.ok(new ApiResponse(true, "Story updated successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@PostMapping("/addComment/{storyId}")
	public ResponseEntity<?> addComments(@RequestBody String comment, @PathVariable Long storyId) {
		try {
			System.out.println(comment);
			storyService.addComments(storyId, comment);
			return ResponseEntity.ok(new ApiResponse(true, "Comment added successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@DeleteMapping("/deleteStory/{storyId}")
	public ResponseEntity<?> deleteStory(@PathVariable Long storyId) {
		try {
			storyService.deleteStory(storyId);
			return ResponseEntity.ok(new ApiResponse(true, "Story deleted successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@GetMapping("/getAssociateStories")
	public ResponseEntity<?> getAssociateStories() throws Exception {
		List<StoryResponse> associateStories = storyService.getAssociateStories();
		return ResponseEntity.ok(associateStories);
	}

	@GetMapping("/getAllStories")
	public ResponseEntity<?> getAllStories(@RequestParam(required = false) Integer isGenc,
			@RequestParam(required = false) String parentAccount, @RequestParam(required = false) String lOB,
			@RequestParam(required = false) Long account, @RequestParam(required = false) String project ,@RequestParam(required = false) Long associate,@RequestParam(required = false) String isCompleted )
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
			else if(associate!= null && !aUser.getAssociateID().equals(associate))
				associateList.remove(aUser);
			else
				associateIdList.add(aUser.getAssociateID());
		}

		
		List<Story> storyList = storyService.getAllStories(associateIdList);
		if(isCompleted!=null && isCompleted.equals("1")){
			storyList = storyList.stream().filter(story -> story.getStoryStatus().getGroupValue().equals(AppConstants.STORY_STATUS_ACCEPTED)).collect(Collectors.toList());
		}


		List<StoryResponse> storyResponses = storyList.stream().map(story -> storyService.convertToStoryResponse(story)).collect(Collectors.toList());
		Collections.reverse(storyResponses);
		return ResponseEntity.ok().body(storyResponses);
	}

	@GetMapping("/getAllStoryDropdowns")
	public ResponseEntity<?> getAllStoryDropdowns(){
		List<Category> allStoryPriorities = storyService.loadAllPriorities();
		List<Category> allStoryStatus = storyService.loadAllStoryStatus();
		List<HashMap> allStorySkills = storyService.loadAllStorySkills();
		List<HashMap<String, Object>> epics = storyService.loadAllEpics();
		StoryDropDownPayload storyDropDownPayload = new StoryDropDownPayload();
		storyDropDownPayload.setStoryPriority(allStoryPriorities);
		storyDropDownPayload.setStoryStatus(allStoryStatus);
		storyDropDownPayload.setStorySkills(allStorySkills);
		storyDropDownPayload.setStoryEpics(epics);
		return ResponseEntity.ok(storyDropDownPayload);
	}


	@GetMapping("/getAllPriorities")
	public ResponseEntity<?> getAllPriorities() {

		List<Category> allStories = storyService.loadAllPriorities();
		return ResponseEntity.ok(allStories);

	}

	@GetMapping("/getAllStoryStatus")
	public ResponseEntity<?> getAllStoryStatus() {

		List<Category> allStories = storyService.loadAllStoryStatus();
		return ResponseEntity.ok(allStories);

	}

	@GetMapping("/getStoryById/{id}")
	public ResponseEntity<?> getStoryById(@PathVariable Long id) {
		try {
			Story storyManagerResponse = storyService.loadStoryById(id);
			return ResponseEntity.ok(storyManagerResponse);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
		}
	}

	@GetMapping("/getAllEpics")
	public ResponseEntity<?> getAllEpics() {
		List<HashMap<String, Object>> epics = storyService.loadAllEpics();
		return ResponseEntity.ok(epics);
	}

	@PutMapping("/updateSprintStories/{sprintId}")
	public ResponseEntity<?> updateSprintStories(@PathVariable Long sprintId, @RequestBody List<Long> storyIds) {
		try {
			storyService.updateSprintStories(sprintId, storyIds);
			return ResponseEntity.ok(new ApiResponse(true, "Sprint Stories Updated Successfully"));
		} catch (Exception e) {
			return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
		}
	}

}