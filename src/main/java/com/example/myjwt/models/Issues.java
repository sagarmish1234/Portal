package com.example.myjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Issues
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    private String serviceLine;
    @NotNull
    @Size(max = 100)
    private String lobName;
    @NotNull
    private Long projectId;
    @NotNull
    private String projectName;
    @NotNull
    private String subject;
    @NotNull
    private String description;
    @NotNull
    private String ownerOfTheIssue;
    @NotNull
    private Date eta;
    @NotNull
    private String actionToBeTaken;
    @NotNull
    private String remarks;
    @NotNull
    private String impact;
    @NotNull
    private String issueStatus;
    @NotNull
    private Date issueRaisedDate;

    private Date issueReslovedDate;
    @NotNull
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

    public Issues() {
    }

    public Issues( String serviceLine, String lobName, Long projectId, String projectName, String subject, String description, String ownerOfTheIssue, Date eta, String actionToBeTaken, String remarks, String impact, String issueStatus, Date issueRaisedDate, Date issueReslovedDate, String impactCategory) {
        this.serviceLine = serviceLine;
        this.lobName = lobName;
        this.projectId = projectId;
        this.projectName = projectName;
        this.subject = subject;
        this.description = description;
        this.ownerOfTheIssue = ownerOfTheIssue;
        this.eta = eta;
        this.actionToBeTaken = actionToBeTaken;
        this.remarks = remarks;
        this.impact = impact;
        this.issueStatus = issueStatus;
        this.issueRaisedDate = issueRaisedDate;
        this.issueReslovedDate = issueReslovedDate;
        this.impactCategory = impactCategory;
    }
}
