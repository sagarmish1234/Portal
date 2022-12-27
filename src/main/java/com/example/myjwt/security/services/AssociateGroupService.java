package com.example.myjwt.security.services;

import com.example.myjwt.models.*;
import com.example.myjwt.payload.AssociateInfo;
import com.example.myjwt.payload.request.AssociateGroupRequest;
import com.example.myjwt.payload.response.AssociateGroupResponse;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.AssociateGroupMemberRepository;
import com.example.myjwt.repo.AssociateGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AssociateGroupService {

    @Autowired
    private AssociateGroupRepository associateGroupRepository;

    @Autowired
    private AssignmentReportRepository assignmentReportRepository;

    @Autowired
    private AssignmentUserRepository assignmentUserRepository;


    @Autowired
    CustomUserDetailsService customUserDetailsService;


    @Autowired
    private AssociateGroupMemberRepository associateGroupMemberRepository;


    public AssociateGroup createGroup(String groupName) throws Exception {
        User user = customUserDetailsService.loadUserFromContext();
        String name = groupName.substring(0, 1).toUpperCase() + groupName.substring(1).toLowerCase();
        if (associateGroupRepository.existsByGroupNameAndUserId(name,user.getId()))
            throw new Exception("Group Already Exists");
        AssociateGroup associateGroup = new AssociateGroup();
        associateGroup.setGroupName(name);
        associateGroup.setUserId(user.getId());
        AssociateGroup group = associateGroupRepository.save(associateGroup);
        return group;
    }


    @Transactional
    public void saveAssociateGroup(AssociateGroupRequest request) throws Exception {
        User user = customUserDetailsService.loadUserFromContext();
        AssociateGroup group = associateGroupRepository.findById(request.getGroupId()).orElseThrow(()-> new Exception("No Group found"));
        associateGroupMemberRepository.deleteByGroup(group);
        AssignmentReport first = assignmentReportRepository.findFirstByOrderByIdDesc().orElseThrow(()-> new Exception("No Assignment report found"));
        List<AssociateGroupMember> members = new ArrayList<>();
        for(AssociateInfo i : request.getAssociateUsers()){
            AssociateGroupMember member = new AssociateGroupMember();
            AssignmentUser associate = assignmentUserRepository.findByAssignmentReportAndAssociateID(first, i.getAssociateId()).get(0);
            member.setUser(associate);
            member.setGroup(group);
            members.add(member);
        }
        associateGroupMemberRepository.saveAll(members);
    }

    public List<AssociateGroupResponse> getAssociateGroup() {
        User user = customUserDetailsService.loadUserFromContext();
        Optional<List<AssociateGroup>> associateGroup = associateGroupRepository.findByUserId(user.getId());
        List<AssociateGroupResponse> response = new ArrayList<>();
        if (associateGroup.isEmpty()) {
            return response;
        }
        for (AssociateGroup i : associateGroup.get()) {
            AssociateGroupResponse associateGroupResponse = new AssociateGroupResponse();
            associateGroupResponse.setGroupId(i.getId());
            associateGroupResponse.setGroupName(i.getGroupName());
            Optional<List<AssociateGroupMember>> byGroup = associateGroupMemberRepository.findByGroup(i);
            associateGroupResponse.setInfo(new ArrayList<>());
            if (byGroup.isPresent()) {
                for (AssociateGroupMember j : byGroup.get()) {
                    AssociateInfo associateInfo = new AssociateInfo();
                    associateInfo.setAssociateId(j.getUser().getAssociateID());
                    associateInfo.setAssociateName(j.getUser().getAssociateName());
                    associateGroupResponse.getInfo().add(associateInfo);
                }
            }
            response.add(associateGroupResponse);
        }
        return response;
    }


    public void deleteGroup(Long groupId){
        associateGroupRepository.deleteById(groupId);
    }


}