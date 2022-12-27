package com.example.myjwt.payload.request;

import java.util.Date;

public class AddIssueRequest
{

    private Long id;
    private String serviceLine;
    private String lobName;
    private Long projectId;
    private String projectName;
    private String subject;
    private String description;
    private String ownerOfTheIssue;
    private Date eta;
    private String actionToBeTaken;
    private String remarks;
    private String impact;
    private String issueStatus;
    private Date issueRaisedDate;
    private Date issueReslovedDate;
    private String impactCategory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceLine() {
        return serviceLine;
    }

    public void setServiceLine(String serviceLine) {
        this.serviceLine = serviceLine;
    }

    public String getLobName() {
        return lobName;
    }

    public void setLobName(String lobName) {
        this.lobName = lobName;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
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

    public Date getEta() {
        return eta;
    }

    public void setEta(Date eta) {
        this.eta = eta;
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

    public Date getIssueRaisedDate() {
        return issueRaisedDate;
    }

    public void setIssueRaisedDate(Date issueRaisedDate) {
        this.issueRaisedDate = issueRaisedDate;
    }

    public Date getIssueReslovedDate() {
        return issueReslovedDate;
    }

    public void setIssueReslovedDate(Date issueReslovedDate) {
        this.issueReslovedDate = issueReslovedDate;
    }

    public String getImpactCategory() {
        return impactCategory;
    }

    public void setImpactCategory(String impactCategory) {
        this.impactCategory = impactCategory;
    }
}
