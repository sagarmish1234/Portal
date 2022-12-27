package com.example.myjwt.repo;

import com.example.myjwt.models.LeaveStatusCSS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveStatusCSSRepository extends JpaRepository<LeaveStatusCSS,String> {
}
