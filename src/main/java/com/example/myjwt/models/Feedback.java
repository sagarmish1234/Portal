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
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "feedback", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class Feedback extends DateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String panelName;
	
	private Date evaluationDate;

	@ManyToOne
    //Adding the name
    @JoinColumn(name = "result_id")
    EvaluationResult result;
	
	@ManyToOne
    //Adding the name
    @JoinColumn(name = "resultCategory_id")
    EvaluationResultCategory resultCategory;
	
	@NotBlank
	@Size(max = 500)
	private String comments;
	

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profileId", nullable = false)
	@JsonBackReference
    private Profile profile;

	public Feedback() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPanelName() {
		return panelName;
	}

	public void setPanelName(String panelName) {
		this.panelName = panelName;
	}

	public Date getEvaluationDate() {
		return evaluationDate;
	}

	public void setEvaluationDate(Date evaluationDate) {
		this.evaluationDate = evaluationDate;
	}



	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public EvaluationResult getResult() {
		return result;
	}

	public void setResult(EvaluationResult result) {
		this.result = result;
	}

	public EvaluationResultCategory getResultCategory() {
		return resultCategory;
	}

	public void setResultCategory(EvaluationResultCategory resultCategory) {
		this.resultCategory = resultCategory;
	}
}
