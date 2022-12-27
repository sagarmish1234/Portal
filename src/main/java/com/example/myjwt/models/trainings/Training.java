package com.example.myjwt.models.trainings;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
// import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.myjwt.models.Skill;
import com.example.myjwt.models.audit.DateAudit;

@Entity
@Table(name = "training")
public class Training extends DateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Size(max = 100)
  private String title;

  @NotNull
  private Date startDate;

  @NotNull
  private Date endDate;

  @NotNull
  private Boolean isClassroom;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "skill_id", nullable = true)
  private Skill skill = null;

  // @OneToMany(fetch = FetchType.LAZY)
  // private List<Nomination> nominationList;

  @NotNull
  @Min(0)
  private int participationLimit;

  @Column
  private int nominations = 0;

  public Training() {

  }

  public Training(String title, Date startDate, Date endDate,
      Boolean isClassroom, Skill skill, int participationLimit) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isClassroom = isClassroom;
    this.skill = skill;
    this.participationLimit = participationLimit;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public Skill getSkill() {
    return skill;
  }

  public void setSkill(Skill skill) {
    this.skill = skill;
  }

  public int getParticipationLimit() {
    return participationLimit;
  }

  public void setPraticipationLimit(int participationLimit) {
    this.participationLimit = participationLimit;
  }

  public int getNominations() {
    return nominations;
  }

  public void setNominations(int nominations) {
    this.nominations = nominations;
  }

  @Override
  public String toString() {
    return "Training [id=" + id + ", title=" + title + ", startDate=" + startDate + ", endDate=" + endDate
        + ", isClassroom=" + isClassroom + ", skill=" + skill + ", participationLimit=" + participationLimit
        + ", nominations=" + nominations + "]";
  }

}
