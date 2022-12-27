package com.example.myjwt.security.services;

import com.example.myjwt.beans.GenCTrackerStories;
import com.example.myjwt.payload.response.GenCSkillFamilyResponse;
import com.example.myjwt.payload.response.StoryResponse;
import com.example.myjwt.models.*;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.payload.request.StoryRequest;
import com.example.myjwt.repo.*;
import com.example.myjwt.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private EpicRepository epicRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AssignmentUserRepository assignmentUserRepository;

    @Autowired
    private StorySkillRepository storySkillRepository;

    public void saveStory(StoryRequest request) throws Exception {
        Story story = new Story();
        story.setComments(new ArrayList<>());
        User user = customUserDetailsService.loadUserFromContext();
        story.setSubject(request.getSubject());
        story.setDetails(request.getDetails());
        story.setOwner(customUserDetailsService.loadAssignmentUserFromAssociateId(request.getOwnerId()));
        story.setEpic(epicRepository.findById(request.getEpicId()).orElseThrow(() -> new Exception("No Epics found")));
        if (request.getSprintId() != null)
            story.setSprint(sprintRepository.findById(request.getSprintId()).orElseThrow(() -> new Exception("No sprints found")));
        story.setStoryStatus(categoryRepository.findByStatusId(AppConstants.STORY_STATUS_BACKLOG));
        story.setStoryPriority(categoryRepository.findById(request.getStoryPriority()).orElseThrow(() -> new Exception("No priority found")));
        story.setProductOwner(customUserDetailsService.loadAssignmentUserFromAssociateId(user.getAssociateId()));
        story.setStorySkills(new HashSet<>(storySkillRepository.findByIdIn(request.getStorySkills())));
        System.out.println(story);
        story = storyRepository.save(story);
    }

    @Transactional
    public void updateStory(StoryRequest request) throws Exception {

        Story story = storyRepository.findById(request.getId()).orElseThrow(() -> new Exception("No story found"));
        User user = customUserDetailsService.loadUserFromContext();

        Set<Role> roles = user.getRoles();

        if (roles.size() == 1) {
            for (Role role : roles) {
                if (role.getName() == ERole.Associate) {
                    story.setStoryStatus(categoryRepository.findById(request.getStoryStatus()).orElseThrow(() -> new Exception("No story status found")));
                }
            }
        } else {

            story.setSubject(request.getSubject());
            story.setDetails(request.getDetails());
            story.setOwner(customUserDetailsService.loadAssignmentUserFromAssociateId(request.getOwnerId()));
            story.setEpic(epicRepository.findById(request.getEpicId()).orElseThrow(() -> new Exception("No Epics found")));
            if (request.getSprintId() != null)
                story.setSprint(sprintRepository.findById(request.getSprintId()).orElseThrow(() -> new Exception("No sprints found")));
            story.setStoryStatus(categoryRepository.findById(request.getStoryStatus()).orElseThrow(() -> new Exception("No story status found")));
            story.setStoryPriority(categoryRepository.findById(request.getStoryPriority()).orElseThrow(() -> new Exception("No priority found")));
            if (request.getStoryPointEstimation() != null)
                story.setStoryPointEstimation(request.getStoryPointEstimation());
        }
    }

    @Transactional
    public void addComments(Long id, String comment) throws Exception {
        Story story = storyRepository.findById(id).orElseThrow(() -> new Exception("No story found"));
        if (!comment.isBlank())
            story.getComments().add(comment);
    }

//    @Transactional
//    public void updateStatus(Long id, String status) throws Exception {
//        Story story = storyRepository.findById(id).orElseThrow(() -> new Exception("No story found"));
//        if (!status.isBlank())
//            story.setCurrentStatus(status);
//    }


    @Transactional
    public void deleteStory(Long id) throws Exception {
        storyRepository.deleteById(id);
    }

    @Transactional
    public List<StoryResponse> getAssociateStories() throws Exception {
        User user = customUserDetailsService.loadUserFromContext();
        List<Story> stories = storyRepository.findByOwner(customUserDetailsService.loadAssignmentUserFromAssociateId(user.getAssociateId())).orElse(new ArrayList<>());
        return stories.stream().map(this::convertToStoryResponse).collect(Collectors.toList());
    }

    @Transactional
    public List<Story> getAllStories() throws Exception {
        List<Story> stories = storyRepository.findAll();
        stories.forEach(story -> story.getOwner());
        return stories;
    }

    public List<Story> getAllStories(List<Long> associates) throws Exception {
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        List<Story> stories = storyRepository.findByOwnerIn(assignmentUsers);
        stories.forEach(story -> story.getOwner());
        return stories;
    }


    @Transactional
    public Story loadStoryById(Long id) throws Exception {
        Story story = storyRepository.findById(id).orElseThrow(() -> new Exception("No story found"));
        return story;
    }

    @Transactional
    public List<HashMap<String, Object>> loadAllEpics() {
        List<Epic> epicList = epicRepository.findAll();
        List<HashMap<String, Object>> response = new ArrayList<>();
        for (Epic epic : epicList) {
            HashMap<String, Object> temp = new HashMap<>();
            temp.put("id", epic.getId());
            temp.put("name", epic.getName());
            response.add(temp);
        }
        return response;
    }

    @Transactional
    public List<Category> loadAllPriorities() {
        List<Category> byCatGroup = categoryRepository.findByCatGroup(AppConstants.STORY_PRIORITY);

        return byCatGroup;
    }

    @Transactional
    public List<Category> loadAllStoryStatus() {
        List<Category> byCatGroup = categoryRepository.findByCatGroup(AppConstants.STORY_STATUS);
        return byCatGroup;
    }

    @Transactional
    public List<HashMap> loadAllStorySkills() {
        List<HashMap<String,Object>> storySkills = new ArrayList<>();
        List<StorySkill> skills = storySkillRepository.findAll();
        List<HashMap> collect = skills.stream().map(skill -> new HashMap(Map.of("label", skill.getSkill(), "value", skill.getId()))).collect(Collectors.toList());
        return collect;
    }

    @Transactional
    public List<StoryResponse> loadStoriesBySprint(Long id) throws Exception {
        Sprint sprint = sprintRepository.findById(id).orElseThrow(() -> new Exception("No sprint found"));
        List<Story> stories = storyRepository.findBySprint(sprint).orElse(new ArrayList<>());

        return stories.stream().map(this::convertToStoryResponse).collect(Collectors.toList());
    }


    @Transactional
    public void updateSprintStories(Long sprintId, List<Long> storyIds) throws Exception {
        Sprint sprint = sprintRepository.findById(sprintId).orElseThrow(() -> new Exception("No sprint found"));
        List<Story> stories = storyRepository.findAll();
        for (Story story : stories) {
            if (storyIds.contains(story.getId())) {
                story.setSprint(sprint);
            }
        }
    }

    @Transactional
    public GenCTrackerStories getStoryCompletion(List<Long> associates) {
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssociateIDIn(associates);
        List<Story> storyList = storyRepository.findByOwnerIn(assignmentUsers);
        List<Story> completed = storyList.stream().filter(story -> story.getStoryStatus().getGroupValue().equals(AppConstants.STORY_STATUS_ACCEPTED)).collect(Collectors.toList());
        storyList.forEach(story -> story.getOwner());
        GenCTrackerStories genCTrackerStories = new GenCTrackerStories();
        genCTrackerStories.setAcceptedStories(Long.valueOf(completed.size()));
        genCTrackerStories.setTotalStories(Long.valueOf(storyList.size()));
        return genCTrackerStories;
    }

//    public Long getAllStoriesByOwner(Long associateId){
//        return storyRepository.countByOwnerId(associateId);
//    }
//
//
//    public Long getCompletedStoriesByOwner(Long associateId){
//        return storyRepository.countByOwnerId(associateId);
//    }

    public StoryResponse convertToStoryResponse(Story story){
        StoryResponse storyResponse = new StoryResponse();
        storyResponse.setId(story.getId());
        storyResponse.setSubject(story.getSubject());
        storyResponse.setResponsible(story.getOwner().getAssociateName());
        storyResponse.setEpic(story.getEpic().getName());
        storyResponse.setEpicId(story.getEpic().getId());
        storyResponse.setSprint(story.getSprint()!=null ? story.getSprint().getName() :"");
        storyResponse.setSprintId(story.getSprint()!=null ? story.getSprint().getId() : null);
        storyResponse.setStoryPointEstimation(story.getStoryPointEstimation());
        storyResponse.setStoryStatus(story.getStoryStatus().getGroupValue());
        storyResponse.setStoryPriority(story.getStoryPriority().getGroupValue());
        storyResponse.setProductOwner(story.getProductOwner().getAssociateName());
        storyResponse.setStorySkills(new ArrayList<>(story.getStorySkills()));
        return storyResponse;
    }

    public Long getStorySkillCompletion(StorySkill skill,AssignmentUser user){
        List<Story> storyList = storyRepository.findByOwnerAndStoryStatus(user, categoryRepository.findByStatusId(AppConstants.STORY_STATUS_ACCEPTED));
        List<Story> completedStories = storyList.stream().filter(story -> story.getStorySkills().stream().filter(sSkill -> sSkill.getId().equals(skill.getId())).collect(Collectors.toList()).size() != 0).collect(Collectors.toList());
        return Long.valueOf(completedStories.size());
    }

    public Long getStoryFamilyProgression(String family, AssignmentUser user, Long threshold){
        List<StorySkill> skills = storySkillRepository.findBySkillFamily(family);
        Long completed = skills.stream().filter(skill -> getStorySkillCompletion(skill,user) >= threshold).count();
        return (completed * 100)/skills.size();
    }


    public List<GenCSkillFamilyResponse> getAssociateSkillDetails(Long associateId) throws Exception {
        AssignmentUser assignmentUser = customUserDetailsService.loadAssignmentUserFromAssociateId(associateId);
        String skillFamily = "Java";
        List<StorySkill> skills = storySkillRepository.findBySkillFamily(skillFamily);
        List<GenCSkillFamilyResponse> response = new ArrayList<>();
        for(StorySkill skill : skills){
            GenCSkillFamilyResponse genCSkillFamilyResponse = new GenCSkillFamilyResponse();
            genCSkillFamilyResponse.setSkill(skill.getSkill());
            genCSkillFamilyResponse.setCompletedStories(getStorySkillCompletion(skill,assignmentUser));
            response.add(genCSkillFamilyResponse);
        }
        return response;
    }


}