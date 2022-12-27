package com.example.myjwt.models.trainings;

public class UserTraining {

  private Training training;
  private int avgProgress;
  private int progress;
  private boolean isNominated;

  public UserTraining() {
  }

  public UserTraining(Training training, int avgProgress, int progress, boolean isNominated) {
    this.training = training;
    this.avgProgress = avgProgress;
    this.progress = progress;
    this.isNominated = isNominated;
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

  public int getProgress() {
    return progress;
  }

  public void setProgress(int progress) {
    this.progress = progress;
  }

  public boolean getIsNominated() {
    return isNominated;
  }

  public void setIsNominated(boolean isNominated) {
    this.isNominated = isNominated;
  }

}
