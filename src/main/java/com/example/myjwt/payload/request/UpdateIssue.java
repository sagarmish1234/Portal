package com.example.myjwt.payload.request;

import com.example.myjwt.controllers.DataController;

import java.util.Date;

public class UpdateIssue
{
    private Long id;
    private String subject;
    private String description;
    private String ownerOfTheIssue;
    private String actionToBeTaken;
    private String remarks;
    private String impact;
    private String issueStatus;
    private String impactCategory;
    private Date eta;
    private Date issueReslovedDate;

    public Date getIssueReslovedDate() {
        return issueReslovedDate;
    }

    public void setIssueReslovedDate(Date issueReslovedDate) {
        this.issueReslovedDate = issueReslovedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwnerOfTheIssue() {
        return ownerOfTheIssue;
    }

    public void setOwnerOfTheIssue(String ownerOfTheIssue) {
        this.ownerOfTheIssue = ownerOfTheIssue;
    }

    public String getActionToBeTaken() {
        return actionToBeTaken;
    }

    public void setActionToBeTaken(String actionToBeTaken) {
        this.actionToBeTaken = actionToBeTaken;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getImpact() {
        return impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }

    public String getIssueStatus() {
        return issueStatus;
    }

    public void setIssueStatus(String issueStatus) {
        this.issueStatus = issueStatus;
    }

    public String getImpactCategory() {
        return impactCategory;
    }

    public void setImpactCategory(String impactCategory) {
        this.impactCategory = impactCategory;
    }

    public Date getEta() {
        return eta;
    }

    public void setEta(Date eta) {
        this.eta = eta;
    }

    public UpdateIssue() {
        super();
    }

    public UpdateIssue(Long id, String subject, String description, String ownerOfTheIssue, String actionToBeTaken, String remarks, String impact, String issueStatus, String impactCategory, Date eta,Date issueReslovedDate) {
        this.id = id;
        this.subject = subject;
        this.description = description;
        this.ownerOfTheIssue = ownerOfTheIssue;
        this.actionToBeTaken = actionToBeTaken;
        this.remarks = remarks;
        this.impact = impact;
        this.issueStatus = issueStatus;
        this.impactCategory = impactCategory;
        this.eta = eta;
        this.issueReslovedDate=issueReslovedDate;
    }
}
