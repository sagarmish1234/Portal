package com.example.myjwt.payload.request;

import java.sql.Date;
import java.util.Set;

import javax.validation.constraints.*;
 
public class ProfileFeedbackRequest {

    private Long profileId;
    
    @NotBlank
    private String panelName;

	private Date evaluationDate;
	
	private Long evaluationResult;
	
	private Long evaluationResultCategory;

	@NotBlank
	private String detailedFeedback;

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
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

	public Long getEvaluationResult() {
		return evaluationResult;
	}

	public void setEvaluationResult(Long evaluationResult) {
		this.evaluationResult = evaluationResult;
	}

	public Long getEvaluationResultCategory() {
		return evaluationResultCategory;
	}

	public void setEvaluationResultCategory(Long evaluationResultCategory) {
		this.evaluationResultCategory = evaluationResultCategory;
	}

	public String getDetailedFeedback() {
		return detailedFeedback;
	}

	public void setDetailedFeedback(String detailedFeedback) {
		this.detailedFeedback = detailedFeedback;
	}
    
}
