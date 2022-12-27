package com.example.myjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StorySkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillFamily;

    private String skill;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "storySkills")
    private Set<Story> stories;

    @Override
    public String toString() {
        return "StorySkill{" +
                "id=" + id +
                ", skillFamily='" + skillFamily + '\'' +
                ", skill='" + skill + '\'' +
                '}';
    }
}