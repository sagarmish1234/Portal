package com.example.myjwt.payload.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StoryRequest {
    private Long id;

    private String subject;

    private String details;

    private Long ownerId;

    private Long epicId;

    private Long sprintId;

    private Long storyPointEstimation;

    private Long storyStatus;

    private Long StoryPriority;

    private List<Long> storySkills;


}