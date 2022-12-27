package com.example.myjwt.repo;

import com.example.myjwt.models.AssociateGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssociateGroupRepository extends JpaRepository<AssociateGroup,Long> {
    Optional<List<AssociateGroup>> findByUserId(Long aLong);
    boolean existsByGroupNameAndUserId(String groupName,Long userId);
}