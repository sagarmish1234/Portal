package com.example.myjwt.payload.response;

import com.example.myjwt.models.trainings.Nomination;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchAssociateResponse {
    private Long associateId;
    private String associateName;
    private Long trainingsNominated;
    private Long interviewsTaken;
    private Long referrals;
    private Boolean resignationStatus;

    private Long projectId;
    private String projectName;
    private Date projectStartDate;
    private Date projectEndDate;
    private String departmentName;
    private String designation;
    private String lob;

    private List<Nomination> trainingDetails;


}
