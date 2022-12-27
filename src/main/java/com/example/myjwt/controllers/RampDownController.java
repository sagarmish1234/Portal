package com.example.myjwt.controllers;

import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.payload.response.AssociateDetailData;
import com.example.myjwt.payload.response.RampDownData;
import com.example.myjwt.payload.response.RampdownLobResponse;
import com.example.myjwt.payload.response.RampdownServiceLineResponse;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.security.services.RampDownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")

public class RampDownController {
    @Autowired
    private AssignmentUserRepository assignmentUserRepository;

    @Autowired
    private AssignmentReportRepository assignmentReportRepository;

    @Autowired
    private RampDownService rampDownService;

    @GetMapping("/rampdown/getLobByServiceLine/{serviceLine}")
    public List<String> getLobByServiceLine(@PathVariable String serviceLine) {
        return (assignmentUserRepository.getLobByServiceLine(serviceLine));
    }

    @GetMapping("/rampdown/getProjectIdByLobAndServiceLine/{serviceLine}/{lob}")
    public List<Long> getProjectId(@PathVariable String serviceLine, @PathVariable String lob) {
//        List<Long> x = assignmentUserRepository.findProjectIdByLob(serviceLine,lob);
        return (assignmentUserRepository.getProjectIdByLobAndServiceLine(serviceLine, lob));
    }

    @GetMapping("/rampdown/getProjectNameAndManagerName/{ProjectId}")
    public RampDownData getProjectNameAndManagerName(@PathVariable Long ProjectId) {
        RampDownData rampDownData = new RampDownData();
        rampDownData.setProject_manager_name(assignmentUserRepository.getManagerNameByProjectId(ProjectId));
        rampDownData.setProject_description(assignmentUserRepository.getProjectNameByProjectId(ProjectId));
        return rampDownData;
    }


    @GetMapping("/rampdown/getAssociateIdNameDesignation/{serviceLine}")
    public RampdownServiceLineResponse getAssociateIdNameDesignation(@PathVariable String serviceLine) {
       RampdownServiceLineResponse rampdownServiceLineResponse=rampDownService.associateDetailFromService(serviceLine);
       return rampdownServiceLineResponse;
    }

    @GetMapping("/rampdown/getAssociateIdNameDesignationByServiceLineAndLob/{serviceLine}/{lob}")
    public RampdownLobResponse getAssociateIdNameDesignationByServiceLineAndLob(@PathVariable String serviceLine, @PathVariable String lob) {
        RampdownLobResponse rampdownLobResponse = rampDownService.associateDetailFromServiceLineAndLob(serviceLine, lob);
        return rampdownLobResponse;
    }

    @GetMapping("/rampdown/getAssociateIdNameDesignationByProjectId/{projectId}")
    public List<AssociateDetailData> getAssociateIdNameDesignationByProjectId(@PathVariable Long projectId) {
        List<AssociateDetailData> associateDetailDataList = rampDownService.associateDetailFromProjectId(projectId);
        return associateDetailDataList;
    }


}
