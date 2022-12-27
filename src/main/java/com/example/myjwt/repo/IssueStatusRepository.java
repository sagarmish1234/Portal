package com.example.myjwt.repo;

import com.example.myjwt.models.ImpactCategory;
import com.example.myjwt.models.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IssueStatusRepository extends JpaRepository<IssueStatus,Long>
{
    Optional<IssueStatus> findById(Long id);
    List<IssueStatus> findAll();
}
