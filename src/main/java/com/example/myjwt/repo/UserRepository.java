package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.example.myjwt.models.Grade;

import com.example.myjwt.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	List<User> findByIsActive(Boolean isActive);
	
	Optional<User> findByAssociateId(Long id);

}
