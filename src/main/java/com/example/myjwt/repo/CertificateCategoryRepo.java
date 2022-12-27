package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.CertificateCategory;


@Repository
public interface CertificateCategoryRepo extends JpaRepository<CertificateCategory, Long>{
	Optional<CertificateCategory> findById(Long id);
	List<CertificateCategory> findAll();
	

}
