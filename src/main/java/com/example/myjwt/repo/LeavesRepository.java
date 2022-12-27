package com.example.myjwt.repo;

import com.example.myjwt.models.Leave;
import com.example.myjwt.models.enm.ECalenderMonth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface LeavesRepository extends JpaRepository<Leave, Long> {

    Optional<ArrayList<Leave>> findByUserIdAndYear(long associateId, int year);

    Optional<Leave> findFirstByUserIdAndYearAndMonthAndDayOrderByIdDesc(Long associateId, int year, ECalenderMonth month,Integer day);

}