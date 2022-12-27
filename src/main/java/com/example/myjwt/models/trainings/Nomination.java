package com.example.myjwt.models.trainings;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.example.myjwt.models.User;
import com.example.myjwt.models.audit.DateAudit;

import java.util.Date;

@Entity
@Table(name = "nomination")
public class Nomination extends DateAudit{

  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "training_id")
  private Training training;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Min(0)
  @Max(100)
  private int progress = 0;

  private Date emailLastSend = new Date();

  public Nomination() {
  }

  public Nomination(Training training, User user) {
    this.training = training;
    this.user = user;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Training getTraining() {
    return training;
  }

  public void setTraining(Training training) {
    this.training = training;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public int getProgress() {
    return progress;
  }

  public void setProgress(int progress) {
    this.progress = progress;
  }

  public Date getEmailLastSend() {
    return emailLastSend;
  }

  public void setEmailLastSend(Date emailLastSend) {
    this.emailLastSend = emailLastSend;
  }

  @Override
  public String toString() {
    return "Nomination [id=" + id + ", training=" + training + ", user=" + user + ", progress=" + progress + "]";
  }

}
