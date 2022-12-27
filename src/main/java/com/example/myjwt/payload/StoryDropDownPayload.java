package com.example.myjwt.payload;


import com.example.myjwt.models.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoryDropDownPayload {

    private List<Category> storyPriority;
    private List<Category> storyStatus;
    private List<HashMap> storySkills;
    private List<HashMap<String, Object>> storyEpics;

}