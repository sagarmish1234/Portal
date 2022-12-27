package com.example.myjwt.models.trainings;

public class TrainingAndProgress {

  private Training training;
  private int avgProgress;

  public TrainingAndProgress() {
  }

  public TrainingAndProgress(Training training, int avgProgress) {
    this.training = training;
    this.avgProgress = avgProgress;
  }

  public Training getTraining() {
    return training;
  }

  public void setTraining(Training training) {
    this.training = training;
  }

  public int getAvgProgress() {
    return avgProgress;
  }

  public void setAvgProgress(int avgProgress) {
    this.avgProgress = avgProgress;
  }

}
