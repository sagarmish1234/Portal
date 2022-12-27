package com.example.myjwt.models;

import javax.persistence.*;

import com.example.myjwt.models.audit.UserDateAudit;
import com.example.myjwt.models.enm.ERole;

@Entity
@Table(name = "role")
public class Role extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole name;

	public Role() {

	}

	public Role(ERole name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}
}