package com.example.myjwt.payload.response;

import com.example.myjwt.models.StorySkill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoryResponse {

    private Long id;

    private String subject;

    private String responsible;

    private String epic;

    private Long epicId;

    private String sprint;

    private Long sprintId;

    private Long storyPointEstimation;

    private String storyStatus;

    private String storyPriority;

    private String productOwner;

    private List<StorySkill> storySkills;

}