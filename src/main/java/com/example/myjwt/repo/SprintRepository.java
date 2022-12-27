package com.example.myjwt.repo;

import com.example.myjwt.models.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint,Long> {
        List<Sprint> findAllByIdIn(List<Long>sprintIds);
}