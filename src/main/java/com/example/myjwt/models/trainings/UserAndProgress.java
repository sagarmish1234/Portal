package com.example.myjwt.models.trainings;

public class UserAndProgress {
  private long associateId;
  private String associateName;
  private int progress;
  private boolean loggedIn;

  public UserAndProgress() {
  }

  public UserAndProgress(long associateId, String associateName, int progress, boolean isLoggedIn) {
    this.associateId = associateId;
    this.associateName = associateName;
    this.progress = progress;
    this.loggedIn = isLoggedIn;
  }

  public long getAssociateId() {
    return associateId;
  }

  public void setAssociateId(long associateId) {
    this.associateId = associateId;
  }

  public String getAssociateName() {
    return associateName;
  }

  public void setAssociateName(String associateName) {
    this.associateName = associateName;
  }

  public int getProgress() {
    return progress;
  }

  public void setProgress(int progress) {
    this.progress = progress;
  }

  public boolean isLoggedIn() {
    return loggedIn;
  }

  public void setLoggedIn(boolean loggedIn) {
    this.loggedIn = loggedIn;
  }
  
  
}
