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
@Table(name = "settings", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class Settings extends DateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Size(max = 100)
	private String visibility;
	
	@Size(max = 100)
	private String visibilityTwo;
	
	@NotBlank
	@Size(max = 200)
	private String param;
	
	@NotBlank
	@Size(max = 500)
	private String value;
	
	@NotBlank
	@Size(max = 100)
	private String type;

	public Settings() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVisibility() {
		return visibility;
	}

	public void setVisibility(String visibility) {
		this.visibility = visibility;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVisibilityTwo() {
		return visibilityTwo;
	}

	public void setVisibilityTwo(String visibilityTwo) {
		this.visibilityTwo = visibilityTwo;
	}
}
