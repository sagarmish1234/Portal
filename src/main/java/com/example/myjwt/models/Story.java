package com.example.myjwt.models;

import com.example.myjwt.models.audit.UserDateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Story extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private String details;

    @ManyToOne(fetch = FetchType.EAGER)
    private AssignmentUser owner;

    @ManyToOne(fetch = FetchType.LAZY)
    private Epic epic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;

    private Long storyPointEstimation;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category storyStatus;

    private ArrayList<String> comments;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category storyPriority;

    @ManyToOne(fetch = FetchType.EAGER)
    private AssignmentUser productOwner;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "story_skill_mapping",joinColumns = @JoinColumn(name="story_skill_id"),inverseJoinColumns = @JoinColumn(name = "story_id"))
    private Set<StorySkill> storySkills;
}