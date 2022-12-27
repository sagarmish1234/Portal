package com.example.myjwt.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Lob;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.models.audit.DateAudit;

@Entity
@Table(name = "category", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class Category extends DateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String catGroup;
	
	@NotBlank
	@Size(max = 100)
	private String groupKey;

	@NotBlank
	@Size(max = 100)
	private String groupValue;

	public Category() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(String groupKey) {
		this.groupKey = groupKey;
	}

	public String getGroupValue() {
		return groupValue;
	}

	public void setGroupValue(String groupValue) {
		this.groupValue = groupValue;
	}

	public String getCatGroup() {
		return catGroup;
	}

	public void setCatGroup(String catGroup) {
		this.catGroup = catGroup;
	}


}
