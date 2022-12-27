package com.example.myjwt.repo;

import com.example.myjwt.models.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday,Long> {

    Optional<ArrayList<Holiday>> findByYearAndCity(Integer year, String city);
}
