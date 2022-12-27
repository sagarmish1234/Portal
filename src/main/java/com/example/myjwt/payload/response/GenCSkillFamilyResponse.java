package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenCSkillFamilyResponse {

    private String skill;

    private Long completedStories;

}