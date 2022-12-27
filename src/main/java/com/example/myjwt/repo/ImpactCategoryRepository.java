package com.example.myjwt.repo;

import com.example.myjwt.models.ImpactCategory;
import com.example.myjwt.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImpactCategoryRepository extends JpaRepository<ImpactCategory,Long>
{
    Optional<ImpactCategory> findById(Long id);
    List<ImpactCategory> findAll();
}
