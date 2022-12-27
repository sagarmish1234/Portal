package com.example.myjwt.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.myjwt.models.audit.DateAudit;

import lombok.Data;

@Entity
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(columnNames = "associateId")})
@Data
public class User extends DateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long associateId;

	@NotBlank
	@Size(max = 100)
	private String password;

	@Size(max = 100)
	@Transient
	private String cpassword;

	private Boolean isVerified;

	private Boolean isActive;

	private Boolean isApproved;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "userroles", joinColumns = @JoinColumn(name = "userId"), inverseJoinColumns = @JoinColumn(name = "roleId"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public void addRole(Role role) {
		System.out.println(":>>"+role.getName().name());
		roles.add(role);
	}
}
