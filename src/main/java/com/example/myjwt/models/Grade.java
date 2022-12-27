package com.example.myjwt.models;

import javax.persistence.*;

import com.example.myjwt.models.audit.UserDateAudit;
import com.example.myjwt.models.enm.EGrade;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

@Entity
@Table(name = "grade")
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Grade extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private EGrade name;
	
	@Column(length = 30)
	private String description;

	public Grade() {

	}

	public Grade(EGrade name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EGrade getName() {
		return name;
	}

	public void setName(EGrade name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}