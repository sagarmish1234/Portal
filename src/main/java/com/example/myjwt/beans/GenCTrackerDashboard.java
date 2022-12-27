package com.example.myjwt.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GenCTrackerDashboard {
	private Double totalGenCs;
	private Double billableGenCs;
	private Long totalSprints;
	private Long completedSprints;
	private Long acceptedStories;
	private Long totalStories;
	private Long totalEpics;
	private Long completedEpics;
	private Long currentSprintGenCs;
	
	private List<GenCGroupDetail> genCGroupDetails;
	
}
