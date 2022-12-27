package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.CertificateFamily;


@Repository
public interface CertificateFamilyRepo extends JpaRepository<CertificateFamily, Long>{
	Optional<CertificateFamily> findById(Long id);
	List<CertificateFamily> findAll();
//	void save(String[] );

}
