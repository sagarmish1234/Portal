package com.example.myjwt.repo;


import com.example.myjwt.models.RampDownMonthData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RampDownMonthDataRepository extends JpaRepository<RampDownMonthData,Long> {

}
