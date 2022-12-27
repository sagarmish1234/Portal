package com.example.myjwt.repo;

import com.example.myjwt.models.StorySkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorySkillRepository extends JpaRepository<StorySkill,Long> {

    List<StorySkill> findByIdIn(List<Long> ids);

    List<StorySkill> findBySkillFamily(String skillFamily);
}