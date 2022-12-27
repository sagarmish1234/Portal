package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssociateDetailData {

    private Long associateId;
    private String associateName;
    private String designation;
    private String pAQGrade;
    private String projectDescription;
    private String lOB;
    private Date projectStartDate;
    private Date projectEndDate;
    private String sID;
    private Boolean billabilityStatus;
    private String projectManagerName;

    private List<Double> rampDownDetailList;



}
