package com.example.myjwt.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myjwt.models.ExtProfilePanelist;

public interface ExtProfilePanelistRepository extends JpaRepository<ExtProfilePanelist, Long> {
	
	public List<ExtProfilePanelist> findByAssociateId(Long associateId);

	public List<ExtProfilePanelist> findByAssociateIdIn(List<Long> panelistIds);

}
