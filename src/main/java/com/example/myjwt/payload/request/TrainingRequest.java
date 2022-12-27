package com.example.myjwt.payload.request;

import java.util.Date;

public class TrainingRequest {

  private String title;

  private Date startDate;

  private Date endDate;

  private Boolean isClassroom;

  private long skillId;

  private int participationLimit;

  public TrainingRequest() {

  }

  public TrainingRequest(String title, Date startDate, Date endDate,
      Boolean isClassroom, long skillId, int participationLimit) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isClassroom = isClassroom;
    this.skillId = skillId;
    this.participationLimit = participationLimit;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public Boolean getIsClassroom() {
    return isClassroom;
  }

  public void setIsClassroom(Boolean isClassroom) {
    this.isClassroom = isClassroom;
  }

  public long getSkillId() {
    return skillId;
  }

  public void setSkillId(long skillId) {
    this.skillId = skillId;
  }

  public int getParticipationLimit() {
    return participationLimit;
  }

  public void setParticipationLimit(int participationLimit) {
    this.participationLimit = participationLimit;
  }

}
