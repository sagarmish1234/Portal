package com.example.myjwt.repo;

import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.AssociateGroup;
import com.example.myjwt.models.AssociateGroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssociateGroupMemberRepository extends JpaRepository<AssociateGroupMember,Long> {

    boolean existsByUser(AssignmentUser user);

    void deleteByGroup(AssociateGroup group);

    Optional<List<AssociateGroupMember>> findByUser(AssignmentUser user);

    Optional<List<AssociateGroupMember>> findByGroup(AssociateGroup group);
}