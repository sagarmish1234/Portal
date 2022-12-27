package com.example.myjwt.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.Hexcode;
import com.example.myjwt.models.User;

@Repository
public interface HexCodeRepository extends JpaRepository<Hexcode, Long> {
	Hexcode findByCode(String code);
	
}
