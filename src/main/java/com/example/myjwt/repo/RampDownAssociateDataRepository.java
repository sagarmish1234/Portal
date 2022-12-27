package com.example.myjwt.repo;

import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.RampDownAssociateData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RampDownAssociateDataRepository extends JpaRepository<RampDownAssociateData,Long> {
   Optional<RampDownAssociateData> findByAssociate(AssignmentUser associate);
}
