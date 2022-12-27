package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import com.example.myjwt.models.Category;
import com.example.myjwt.models.Referrals;

@Repository
public interface ReferralRepository extends JpaRepository<Referrals, Long> {
	
	Optional<Referrals> findById(Long id);
	Referrals findByCandidateName(String candidateName);
	List<Referrals> findAllByOrderByIdDesc();
	List<Referrals> findAllByReferredById(Long AssociateId);
	
	
	@Modifying
	@Transactional 
	@Query(value = "UPDATE Referrals r set r.referral_status = ?2  where r.id = ?1 ",nativeQuery = true)
    void updateStatus(@Param("id") Long id, @Param("referral_status") Category referral_status);
}
