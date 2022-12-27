package com.example.myjwt.security.services;

import com.example.myjwt.beans.GenCTrackerSprints;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Sprint;
import com.example.myjwt.models.Story;
import com.example.myjwt.payload.request.SprintCreateRequest;
import com.example.myjwt.payload.response.SprintListItem;
import com.example.myjwt.payload.response.StoryResponse;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.SprintRepository;
import com.example.myjwt.repo.StoryRepository;
import com.example.myjwt.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SprintService {


    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private StoryService storyService;

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private AssignmentUserRepository assignmentUserRepository;


    public void createSprint(SprintCreateRequest request) throws Exception {
        Sprint sprint  = new Sprint();
        sprint.setName(request.getName());
        sprint.setStartDate(request.getStartDate());
        sprint.setEndDate(request.getEndDate());
        sprint.setScrumMaster(customUserDetailsService.loadAssignmentUserFromAssociateId(request.getScrumMasterId()));
        sprint = sprintRepository.save(sprint);
        System.out.println("Reached");
        storyService.updateSprintStories(sprint.getId(),request.getStoryIds());
        System.out.println("Reached 2");
    }

    @Transactional
    public void updateSprint(Long id,SprintCreateRequest request) throws Exception {
        Sprint sprint = sprintRepository.findById(id).orElseThrow(() -> new Exception("No sprints found"));
        sprint.setName(request.getName());
        sprint.setStartDate(request.getStartDate());
        sprint.setEndDate(request.getEndDate());
        sprint.setScrumMaster(customUserDetailsService.loadAssignmentUserFromAssociateId(request.getScrumMasterId()));
        storyService.updateSprintStories(id,request.getStoryIds());
    }

    @Transactional
    public SprintListItem loadSprintById(Long id) throws Exception {
        Sprint sprint = sprintRepository.findById(id).orElseThrow(() -> new Exception("No sprints found"));
        return getCustomSprint(sprint);
    }

    @Transactional
    public void deleteSprint(Long id){
        sprintRepository.deleteById(id);
    }

    public List<SprintListItem> loadAllSprints(){
        List<Sprint> sprints = sprintRepository.findAll();
        List<SprintListItem> customSprints = new ArrayList<>();
        for (Sprint sprint : sprints) {
            customSprints.add(getCustomSprint(sprint));
        }
        return customSprints;
    }

	public List<SprintListItem> loadAllSprints(List<Long> associates){
        Set<Long> sprintList = new HashSet<>();
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        List<Story> storyList = storyRepository.findByOwnerIn(assignmentUsers);
        storyList.forEach(story -> {
            if(story.getSprint() != null)
                sprintList.add(story.getSprint().getId());
        });

        List<Sprint> sprints = sprintRepository.findAllById(sprintList);
        List<SprintListItem> customSprints = new ArrayList<>();
        for (Sprint sprint : sprints) {
            customSprints.add(getCustomSprint(sprint));
        }
        return customSprints;
    }

    @Transactional
    public GenCTrackerSprints getSprintsCompletion(List<Long> associates)  {
        Set<Long> sprintList = new HashSet<>();
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        List<Story> storyList = storyRepository.findByOwnerIn(assignmentUsers);
        storyList.forEach(story -> {
            if(story.getSprint() != null)
            sprintList.add(story.getSprint().getId());
        });
        Long completed = 0L;
        for(Long sprint : sprintList){
            List<Story> stories = storyRepository.findBySprintId(sprint);
            if(stories.stream().filter(story -> story.getStoryStatus().getGroupValue().equals(AppConstants.STORY_STATUS_ACCEPTED)).collect(Collectors.toList()).size()==stories.size()){
                completed++;
            }
        }
        GenCTrackerSprints genCTrackerSprints = new GenCTrackerSprints();
        genCTrackerSprints.setTotalSprints((long) sprintList.size());
        genCTrackerSprints.setCompletedSprints(completed);
        return genCTrackerSprints;

    }

    @Transactional
    public List<SprintListItem> getCompletedSprints(List<Long> associates)  {
        Set<Long> sprintList = new HashSet<>();
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        List<Story> storyList = storyRepository.findByOwnerIn(assignmentUsers);
        storyList.forEach(story -> {
            if(story.getSprint() != null)
                sprintList.add(story.getSprint().getId());
        });
        Long completed = 0L;
        List<Long> completedSprints = new ArrayList<>();
        for(Long sprint : sprintList){
            List<Story> stories = storyRepository.findBySprintId(sprint);
            if(stories.stream().filter(story -> story.getStoryStatus().getGroupValue().equals(AppConstants.STORY_STATUS_ACCEPTED)).collect(Collectors.toList()).size()==stories.size()){
                completedSprints.add(sprint);
            }
        }

        List<Sprint> sprints = sprintRepository.findAllByIdIn(completedSprints);
        List<SprintListItem> customSprints = new ArrayList<>();
        for (Sprint sprint : sprints) {
            customSprints.add(getCustomSprint(sprint));
        }
        return customSprints;

    }

    public List<Sprint> getActiveSprints(List<Long> associates){
        Set<Long> sprintList = new HashSet<>();
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        List<Story> storyList = storyRepository.findByOwnerIn(assignmentUsers);
        storyList.forEach(story -> {
            if(story.getSprint() != null)
                sprintList.add(story.getSprint().getId());
        });
        List<Sprint> activeSprints = new ArrayList<>();

        sprintList.forEach(sprintId -> {
            Sprint sprint = sprintRepository.findById(sprintId).get();
            Instant current = Instant.now();
            Instant startDate = sprint.getStartDate();
            Instant endDate = sprint.getEndDate();
            if(current.isAfter(startDate) && current.isBefore(endDate)){
                activeSprints.add(sprint);
            }
        });

        return activeSprints;
    }

    public long getActiveSprintsOwnerCount(List<Long> associates){
        List<Sprint> activeSprints = getActiveSprints(associates);
        Set<Long> owners = new HashSet<>();
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        activeSprints.forEach(sprint -> {
            storyRepository.findBySprintAndOwnerIn(sprint,assignmentUsers).forEach(story -> {
                owners.add(story.getOwner().getAssociateID());
            });
        });
        System.out.println(owners);

        return (long) owners.size();
    }

    public List<AssignmentUser> getActiveSprintsOwners(List<Long> associates){
        List<Sprint> activeSprints = getActiveSprints(associates);
        Set<AssignmentUser> owners = new HashSet<>();
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        activeSprints.forEach(sprint -> {
            storyRepository.findBySprintAndOwnerIn(sprint,assignmentUsers).forEach(story -> {
                owners.add(story.getOwner());
            });
        });
//        System.out.println(owners);

        return owners.stream().collect(Collectors.toList());
    }
    
    public List<StoryResponse> getStoriesBySprint(long sprintId){

        List<Story> stories = storyRepository.findBySprintId(sprintId);
        List<StoryResponse> customStories = new ArrayList<>();
        stories.forEach(story -> {
            customStories.add(storyService.convertToStoryResponse(story));
        });

        return customStories;
    }

    private SprintListItem getCustomSprint(Sprint sprint){
        SprintListItem customSprint = new SprintListItem();
        customSprint.setId(sprint.getId());
        customSprint.setName(sprint.getName());
        customSprint.setStartDate(sprint.getStartDate());
        customSprint.setEndDate(sprint.getEndDate());
        customSprint.setScrumMaster(sprint.getScrumMaster().getAssociateName());

        List<Story> stories = storyRepository.findBySprint(sprint).orElse(new ArrayList<>());
        long storyPoints = 0;
        for(Story story : stories){
            storyPoints += story.getStoryPointEstimation();
        }

        customSprint.setStories(stories.size());
        customSprint.setStoryPoints(storyPoints);

        Instant current = Instant.now();

        if (current.isBefore(sprint.getStartDate())){
            customSprint.setStatus(AppConstants.SPRINT_STATUS_NOTSTARTED);
        } else if(current.isAfter(sprint.getEndDate())){
            customSprint.setStatus(AppConstants.SPRINT_STATUS_COMPLETED);
        } else{
            customSprint.setStatus(AppConstants.SPRINT_STATUS_INPROGRESS);
        }

        return customSprint;
    }

}