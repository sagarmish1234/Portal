package com.example.myjwt.repo;

import java.util.List;
// import java.util.Optional;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
// import org.springframework.data.repository.query.Param;

import com.example.myjwt.models.User;
import com.example.myjwt.models.trainings.Nomination;
import com.example.myjwt.models.trainings.Training;

@Repository
public interface NominationRepository extends JpaRepository<Nomination, Long>{

	Optional<Nomination> findByTrainingAndUser(Training training, User user);

	int findProgressByTrainingAndUser(Training training, User user);
	
	List<Nomination> findByTraining(Training training);

	List<Nomination> findByUser(User user);

	long deleteByTrainingId(long trainingId);

	@Query("select avg(progress) from Nomination where training_id = ?1")
	Optional<Double> getAvgProgressByTraining(long trainingId);

	long countByTraining(Training theTraining);
  // List<Training> findAllByOrderByIdDesc();
	
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
