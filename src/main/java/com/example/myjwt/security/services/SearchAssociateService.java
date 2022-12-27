package com.example.myjwt.security.services;

import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.PanelNominee;
import com.example.myjwt.models.trainings.Nomination;
import com.example.myjwt.payload.response.SearchAssociateResponse;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.NominationRepository;
import com.example.myjwt.repo.PanelistRepository;
import com.example.myjwt.repo.ReferralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SearchAssociateService {

    @Autowired
    private PanelistRepository panelistRepository;

    @Autowired
    private NominationRepository nominationRepository;

    @Autowired
    private AssignmentUserRepository assignmentUserRepository;


    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ReferralRepository referralRepository;

    public SearchAssociateResponse getAssociateInfo(Long associateId) throws Exception {
    	
    	System.out.println("associateId == :"+associateId);
    	
        List<AssignmentUser> user = assignmentUserRepository.findByAssociateID(associateId);
        String associateName = user.get(0).getAssociateName();
        Long projectId = user.get(0).getProjectID();
        String projectName = user.get(0).getAccountName();
        Date projectStartDate = user.get(0).getProjectStartDate();
        Date projectEndDate = user.get(0).getProjectEndDate();
        String departmentName = user.get(0).getDepartmentName();
        String designation = user.get(0).getDesignation();
        String lob = user.get(0).getlOB();
        
        System.out.println("lob == :"+lob);
        
        Long referrals = (long)referralRepository.findAllByReferredById(associateId).size();
        
        System.out.println("referrals == :"+referrals);

        List<PanelNominee> nominees =  panelistRepository.findByAssociateId(associateId);
        
        System.out.println("nominees == :"+nominees);

        List<Nomination> nominations = nominationRepository.findByUser(customUserDetailsService.loadUserFromAssociateId(associateId));
        
        System.out.println("nominations == :"+nominations);
        
        Long interviewsTaken = Long.valueOf(nominees.size());
        
        System.out.println("interviewsTaken == :"+interviewsTaken);
        
        SearchAssociateResponse associateResponse = new SearchAssociateResponse(associateId,associateName,Long.valueOf(nominations.size()),interviewsTaken,referrals ,false,projectId,projectName,projectStartDate,projectEndDate,departmentName,designation,lob,nominations);
        return associateResponse;
    }
}
