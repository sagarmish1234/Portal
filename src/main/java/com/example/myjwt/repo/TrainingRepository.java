package com.example.myjwt.repo;

import java.util.List;
// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
// import org.springframework.data.repository.query.Param;
import com.example.myjwt.models.trainings.Training;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long>{

  List<Training> findAllByOrderByIdDesc();
	
	// Optional<User> findByUserName(String userName);

	// User findByEmail(String email);

	// Boolean existsByUserName(String userName);

	// Boolean existsByEmail(String email);

	// // TODO: Remove native queries

	// @Query(value = "SELECT * FROM user v where v.grade_id in :gradeIds", nativeQuery = true)
	// List<User> findEligibleSBUHeads(@Param("gradeIds") List<Long> gradeIds);

	// // TODO: Remove native queries
	// @Query(value = "SELECT * FROM user v where v.user_name=:userName and v.grade_id in :gradeIds", nativeQuery = true)
	// List<User> findByUserNameAndGradeIds(String userName, List<Long> gradeIds);
  
}
