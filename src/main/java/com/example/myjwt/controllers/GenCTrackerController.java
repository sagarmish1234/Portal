package com.example.myjwt.controllers;

import com.example.myjwt.beans.*;
import com.example.myjwt.controllers.base.GenCTrackerBaseController;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.payload.response.GenCAssociateResponse;
import com.example.myjwt.payload.response.GenCSkillFamilyResponse;
import com.example.myjwt.security.services.EpicService;
import com.example.myjwt.security.services.SprintService;
import com.example.myjwt.security.services.StoryService;
import com.example.myjwt.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class GenCTrackerController extends GenCTrackerBaseController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private EpicService epicService;

    @GetMapping("/gencTracker/dashboard")
    public GenCTrackerDashboard getGencTrackerDashboard(@RequestParam(required = false) String parentAccount,
                                                        @RequestParam(required = false) String lOB, @RequestParam(required = false) Long account,
                                                        @RequestParam(required = false) String project, @RequestParam(required = false) String isEngaged) throws Exception {

        int view = 0;
        if (parentAccount != null) {
            view = 1;
        }
        if (lOB != null) {
            view = 2;
        }
        if (account != null) {
            view = 3;
        }
        if (project != null) {
            view = 4;
        }

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

        Double totalGenCs = 0.0;
        Double billableGenCs = 0.0;

        GenCTrackerDashboard dashboard = new GenCTrackerDashboard();
        GenCTrackerStories storyCompletion = null;
        GenCTrackerSprints sprintsCompletion = null;
        GenCTrackerEpics genCTrackerEpics = null;
        List<GenCGroupDetail> genCGroupDetailsList = new ArrayList<>();

        for (AssignmentUser aUser : associateList) {
            totalGenCs = totalGenCs + aUser.getfTE();
            if (aUser.getBillabilityStatus()) {
                billableGenCs = billableGenCs + aUser.getfTE();
            }
        }

        dashboard.setBillableGenCs(billableGenCs);
        dashboard.setTotalGenCs(totalGenCs);

        storyCompletion = storyService.getStoryCompletion(associateIdList);
        dashboard.setTotalStories(storyCompletion.getTotalStories());
        dashboard.setAcceptedStories(storyCompletion.getAcceptedStories());

        sprintsCompletion = sprintService.getSprintsCompletion(associateIdList);
        dashboard.setTotalSprints(sprintsCompletion.getTotalSprints());
        dashboard.setCompletedSprints(sprintsCompletion.getCompletedSprints());

        genCTrackerEpics = epicService.getEpicsStatus(associateIdList);
        dashboard.setTotalEpics(genCTrackerEpics.getTotalEpics());
        dashboard.setCompletedEpics(genCTrackerEpics.getCompletedEpics());

        dashboard.setCurrentSprintGenCs(sprintService.getActiveSprintsOwnerCount(associateIdList));

        ERole role = getMyMainRole();
        switch (role) {
            case PDL:
            case EDL:
            case LOBLead:
            case AccountLead:
            case ProjectManager:
                dashboard.setGenCGroupDetails(getGenCGroupDetails(associateList, role, view));
                break;
        }

        return dashboard;
    }

    @GetMapping("/gencTracker/associate")
    public List<GenCAssociateResponse> getGencTrackerAssociate(@RequestParam(required = false) String parentAccount,
                                                               @RequestParam(required = false) String lOB, @RequestParam(required = false) Long account,
                                                               @RequestParam(required = false) String project, @RequestParam(required = false) String isBillable, @RequestParam(required = false) String isActive) throws Exception {

        int view = 0;
        if (parentAccount != null) {
            view = 1;
        }
        if (lOB != null) {
            view = 2;
        }
        if (account != null) {
            view = 3;
        }
        if (project != null) {
            view = 4;
        }

        List<AssignmentUser> associateList = getMyAssociateUsersScopeGenCList();

        for (int i = associateList.size() - 1; i >= 0; i--) {
            AssignmentUser aUser = associateList.get(i);
            if (lOB != null && !aUser.getlOB().equalsIgnoreCase(lOB))
                associateList.remove(aUser);
            else if (account != null && !aUser.getAccountID().equals(account))
                associateList.remove(aUser);
            else if (project != null && !aUser.getProjectDescription().equalsIgnoreCase(project))
                associateList.remove(aUser);
        }
        if (isBillable != null && isBillable.equals("1"))
            associateList = associateList.stream().filter(associate -> associate.getBillabilityStatus()).collect(Collectors.toList());
        if (isActive != null && isActive.equals("1"))
            associateList = sprintService.getActiveSprintsOwners(associateList.stream().map(associate -> associate.getAssociateID()).collect(Collectors.toList()));
        return associateList.stream().map(user -> convertToAssociateResponse(user)).collect(Collectors.toList());
    }

    @GetMapping("/gencTracker/associate/{associateId}/skillDetails")
    public ResponseEntity<?> associateSkillDetails(@PathVariable Long associateId) throws Exception {
        List<GenCSkillFamilyResponse> associateSkillDetails = storyService.getAssociateSkillDetails(associateId);
        return ResponseEntity.ok(associateSkillDetails);
    }


    public List<GenCGroupDetail> getGenCGroupDetails(List<AssignmentUser> associateList, ERole role, int view) {

        List<GenCGroupDetail> genCGroupDetailsList = new ArrayList<>();
        HashMap<String, GenCGroupDetail> genCGroupDetailMap = new HashMap<String, GenCGroupDetail>();

        for (AssignmentUser aUser : associateList) {

            String groupName = null;
            if (view == 0) {
                groupName = getGroupName(role, aUser);
            } else {
                groupName = getViewName(view, aUser);
            }

            if (!genCGroupDetailMap.containsKey(groupName)) {
                GenCGroupDetail lobGenCGroupDetail = new GenCGroupDetail();
                genCGroupDetailMap.put(groupName, lobGenCGroupDetail);
            }

            GenCGroupDetail lobGenCGroupDetail = genCGroupDetailMap.get(groupName);

            lobGenCGroupDetail.setGroupName(groupName);
            lobGenCGroupDetail.setGroupId(getGroupId(view, aUser));
            double fte = 0.0;
            double bGenCs = 0.0;
            double tGenCs = 0.0;
            if (aUser.getfTE() != null)
                fte = aUser.getfTE();

            if (lobGenCGroupDetail.getBillableGenCs() != null)
                bGenCs = lobGenCGroupDetail.getBillableGenCs();

            if (lobGenCGroupDetail.getTotalGenCs() != null)
                tGenCs = lobGenCGroupDetail.getTotalGenCs();

            if (aUser.getBillabilityStatus()) {
                lobGenCGroupDetail.setBillableGenCs(fte + bGenCs);
            }
            lobGenCGroupDetail.setTotalGenCs(fte + tGenCs);
            lobGenCGroupDetail.getGenCIds().add(aUser.getAssociateID());
        }

        for (GenCGroupDetail lobGenCGroupDetail : genCGroupDetailMap.values()) {

            ArrayList<Long> associateSet = new ArrayList<>(lobGenCGroupDetail.getGenCIds());

            GenCTrackerStories storyCompletionGroup = storyService.getStoryCompletion(associateSet);
            GenCTrackerSprints sprintsCompletionGroup = sprintService.getSprintsCompletion(associateSet);
            GenCTrackerEpics genCTrackerEpicsGroup = epicService.getEpicsStatus(associateSet);
            lobGenCGroupDetail.setCompletedSprints(sprintsCompletionGroup.getCompletedSprints());
            lobGenCGroupDetail.setTotalSprints(sprintsCompletionGroup.getTotalSprints());
            lobGenCGroupDetail.setTotalStories(storyCompletionGroup.getTotalStories());
            lobGenCGroupDetail.setCompletedStories(storyCompletionGroup.getAcceptedStories());

            lobGenCGroupDetail.setTotalEpics(genCTrackerEpicsGroup.getTotalEpics());
            lobGenCGroupDetail.setCompletedEpics(genCTrackerEpicsGroup.getCompletedEpics());
            lobGenCGroupDetail.setTotalGenCsHaveStories(sprintService.getActiveSprintsOwnerCount(associateSet));
            genCGroupDetailsList.add(lobGenCGroupDetail);
        }

        return genCGroupDetailsList;
    }

    public String getViewName(int view, AssignmentUser aUser) {
        switch (view) {
            case 1: // 254395
                return aUser.getlOB();
            case 2: // 190741
                return aUser.getAccountName();
            case 3: // 343368
                return aUser.getProjectDescription();
            case 4: // 121870
                return aUser.getAssociateName();
        }
        return null;
    }

    public Long getGroupId(int view, AssignmentUser aUser) {
        if (view == 2)
            return aUser.getAccountID();
        else if (view == 4)
            return aUser.getAssociateID();
        return null;
    }

    public String getGroupName(ERole role, AssignmentUser aUser) {
        switch (role) {
            case PDL: // 231612
                return "JPMC";
            case EDL: // 254395
                return aUser.getlOB();
            case LOBLead: // 190741
                return aUser.getAccountName();
            case AccountLead: // 343368
                return aUser.getProjectDescription();
            case ProjectManager: // 219907
                return aUser.getAssociateName();
        }
        return null;
    }

    public GenCAssociateResponse convertToAssociateResponse(AssignmentUser user) {
        GenCAssociateResponse genCAssociateResponse = new GenCAssociateResponse();
        GenCTrackerStories storyCompletion = storyService.getStoryCompletion(Arrays.asList(user.getAssociateID()));
        genCAssociateResponse.setAssociateID(user.getAssociateID());
        genCAssociateResponse.setAssociateName(user.getAssociateName());
        genCAssociateResponse.setLOB(user.getlOB());
        genCAssociateResponse.setBillabilityStatus(user.getBillabilityStatus());
        genCAssociateResponse.setProjectDescription(user.getProjectDescription());
        genCAssociateResponse.setProjectID(user.getProjectID());
        genCAssociateResponse.setGradeDescription(user.getGradeDescription());
        genCAssociateResponse.setTotalStories(storyCompletion.getTotalStories());
        genCAssociateResponse.setCompletedStories(storyCompletion.getAcceptedStories());
        genCAssociateResponse.setSkillProgression(storyService.getStoryFamilyProgression("Java", user, AppConstants.STORY_COMPLETION_THRESHOLD));
        return genCAssociateResponse;
    }


}