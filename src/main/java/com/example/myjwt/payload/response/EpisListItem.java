package com.example.myjwt.payload.response;

import com.example.myjwt.models.enm.ELeaveStatus;
import com.example.myjwt.payload.MonthStatusPOJO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EpisListItem {
	private Long id;
	private String name;
	private String description;
	private Long expectedStoryPoint;
	private Date eta;
	private long stories;
	private long acceptedStories;
	private long storyPoints;
	private boolean isCompleted;

}
