package com.example.myjwt.security.services;

import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.RampDownAssociateData;
import com.example.myjwt.models.RampDownMonthData;
import com.example.myjwt.payload.response.AssociateDetailData;
import com.example.myjwt.payload.response.RampDownData;
import com.example.myjwt.payload.response.RampdownLobResponse;
import com.example.myjwt.payload.response.RampdownServiceLineResponse;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.RampDownAssociateDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service

public class RampDownService {
    @Autowired
    private AssignmentUserRepository assignmentUserRepository;

    @Autowired
    private AssignmentReportRepository assignmentReportRepository;

    @Autowired
    private RampDownAssociateDataRepository rampDownAssociateDataRepository;

    public List<AssociateDetailData> getAssociateDetailsFromAssignmentUsers(List<AssignmentUser> associateList) {
        List<AssociateDetailData> associateDetailDataList = new ArrayList<>();
        for (AssignmentUser user : associateList) {
            AssociateDetailData associateDetailData = new AssociateDetailData();
            associateDetailData.setAssociateId(user.getAssociateID());
            associateDetailData.setAssociateName(user.getAssociateName());
            associateDetailData.setDesignation(user.getDesignation());
            associateDetailData.setPAQGrade(user.getpAQGrade());
            associateDetailData.setProjectDescription(user.getProjectDescription());
            associateDetailData.setLOB(user.getlOB());
            associateDetailData.setProjectStartDate(user.getProjectStartDate());
            associateDetailData.setProjectEndDate(user.getProjectEndDate());
            associateDetailData.setSID(user.getsID());
            associateDetailData.setBillabilityStatus(user.getBillabilityStatus());
            associateDetailData.setProjectManagerName(user.getProjectManagerName());
            Optional<RampDownAssociateData> byAssociate = rampDownAssociateDataRepository.findByAssociate(user);
            if (byAssociate.isEmpty()) {
                associateDetailData.setRampDownDetailList(new ArrayList<Double>(Arrays.asList(1D,1D,1D,1D,1D,1D,1D,1D,1D,1D,1D,1D)));
            }
            else{
                associateDetailData.setRampDownDetailList(getListFromRampDownAssociateData(byAssociate.get()));
            }
            associateDetailDataList.add(associateDetailData);
        }
        return associateDetailDataList;
    }

    public void SaveRampDownDetail (AssociateDetailData associateDetailData){

    }
    public List<Double> getListFromRampDownAssociateData(RampDownAssociateData data){
        TreeSet<RampDownMonthData> obj= new TreeSet<>((a,b)-> a.getMonth().compareTo(b.getMonth()));
        obj.addAll(data.getRampDownMonthDataList());
        return obj.stream().map(d->d.getStatus()).collect(Collectors.toList());

    }
    public RampdownServiceLineResponse associateDetailFromService(String serviceLine){
        AssignmentReport assignmentReport=assignmentReportRepository.findFirstByOrderByIdDesc().get();
        List<AssignmentUser> byAssignmentReportAndServiceLine = assignmentUserRepository.findByAssignmentReportAndServiceLine(assignmentReport, serviceLine);
        List<AssociateDetailData> associateDetailsFromAssignmentUsers = getAssociateDetailsFromAssignmentUsers(byAssignmentReportAndServiceLine);

        List<String> lobByServiceLine = assignmentUserRepository.getLobByServiceLine(serviceLine);
        RampdownServiceLineResponse rampdownServiceLineResponse = new RampdownServiceLineResponse();
        rampdownServiceLineResponse.setLobList(lobByServiceLine);
        rampdownServiceLineResponse.setAssociateDetailDataList(associateDetailsFromAssignmentUsers);
        return rampdownServiceLineResponse;
    }

    public RampdownLobResponse associateDetailFromServiceLineAndLob(String serviceLine, String lob) {
        AssignmentReport assignmentReport = assignmentReportRepository.findFirstByOrderByIdDesc().get();
        List<AssignmentUser> byAssignmentReportAndServiceLineAndLob = assignmentUserRepository.findByAssignmentReportAndServiceLineAndLOB(assignmentReport, serviceLine, lob);
        List<AssociateDetailData> associateDetailsFromAssignmentUsers = getAssociateDetailsFromAssignmentUsers(byAssignmentReportAndServiceLineAndLob);

        List<Long> projectIdByLob = assignmentUserRepository.getProjectIdByLobAndServiceLine(serviceLine, lob);
        RampdownLobResponse rampdownLobResponse = new RampdownLobResponse();
        rampdownLobResponse.setProjectIdList(projectIdByLob);
        rampdownLobResponse.setAssociateDetailDataList(associateDetailsFromAssignmentUsers);
        return rampdownLobResponse;

    }

    public List<AssociateDetailData> associateDetailFromProjectId(Long projectId) {
        List<AssignmentUser> byAssignmentReportProjectId = assignmentUserRepository.findByProjectID(projectId);
        List<AssociateDetailData> associateDetailsFromAssignmentUsers = getAssociateDetailsFromAssignmentUsers(byAssignmentReportProjectId);
        return associateDetailsFromAssignmentUsers;
    }
}
