package com.example.myjwt.beans;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GenCGroupDetail {

    private Long groupId;
    private String groupName;
    private Double totalGenCs;
    private Double billableGenCs;
    private Long totalEpics;
    private Long completedEpics;
    private Long totalSprints;
    private Long completedSprints;
    private Long totalStories;
    private Long completedStories;
    private Long totalGenCsHaveStories;
    
    private Set<Long> genCIds = new HashSet<>();
}