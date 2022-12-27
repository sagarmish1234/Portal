package com.example.myjwt.repo;

import com.example.myjwt.models.ResignationEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResignationEmployeeRepository extends JpaRepository<ResignationEmployee, Long>{
    Optional<ResignationEmployee> findById(Long id);
    Optional<ResignationEmployee> findByEmpID(Long id);
    List<ResignationEmployee> findAll();

}