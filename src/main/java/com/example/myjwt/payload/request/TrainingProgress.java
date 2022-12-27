package com.example.myjwt.payload.request;

public class TrainingProgress {
  private int progress;

  public TrainingProgress(){

  }

  public TrainingProgress(int progress) {
    this.progress = progress;
  }

  public int getProgress() {
    return progress;
  }

  public void setProgress(int progress) {
    this.progress = progress;
  }

  
}
