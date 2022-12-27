package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoryManagerResponse {
    private Long id;

    private String subject;

    private String details;

    private Long creatorId;

    private Long storyPointEstimation;

    private String currentStatus;

    private String acceptanceStatus;

    private List<String> comments;

    private String priority;

    private Long epicId;

    private Long ownerId;


}