package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Category;
import com.example.myjwt.models.Grade;

import com.example.myjwt.models.Skill;
import com.example.myjwt.models.User;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	Optional<Category> findById(Long id);
	List<Category> findAll();
	List<Category> findByCatGroup(String catGroup);

	boolean existsByCatGroupAndGroupKeyAndGroupValue(String catGroup, String groupKey, String groupValue);

	List<Category> findByCatGroupAndGroupKey(String catGroup, String groupKey);
	Category findByCatGroupAndGroupKeyAndGroupValue(String catGroup, String groupKey, String groupValue);
	
	//---------------------------------------------------------------------------------------------
	@Query(value = "SELECT * FROM category c WHERE c.group_value =?", nativeQuery = true)
	public Category findByStatusId(String groupValue);
	
	@Query(value = "select group_value from category where category.id=?1", nativeQuery = true)
	public String findGroupValueByGroupId(Long id);
	//----------------------------------------------------------------------------------------------
}
