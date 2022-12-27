package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenCAssociateResponse {
    private Long associateID;
    private String associateName;
    private Long projectID;
    private String projectDescription;
    private String lOB;
    private String gradeDescription;
    private Boolean billabilityStatus;
    private Long completedStories;
    private Long totalStories;
    private Long skillProgression;
}