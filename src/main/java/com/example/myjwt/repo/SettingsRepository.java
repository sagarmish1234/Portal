package com.example.myjwt.repo;

import com.example.myjwt.models.Holiday;
import com.example.myjwt.models.Settings;
import com.example.myjwt.models.Skill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface SettingsRepository extends JpaRepository<Settings,Long> {

	List<Settings> findAll();
	
	Settings findByParamAndVisibility(String param, String visibility);
	
	List<Settings> findByParamAndVisibilityAndValue(String param, String visibility, String value);
}
