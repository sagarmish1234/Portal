package com.example.myjwt.repo;

import com.example.myjwt.models.ResignationCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResignationCategoryRepository extends JpaRepository<ResignationCategory, Long> {
    Optional<ResignationCategory> findById(Long id);
    List<ResignationCategory> findAll();
}
