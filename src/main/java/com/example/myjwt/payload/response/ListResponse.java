package com.example.myjwt.payload.response;

import java.util.List;

public class ListResponse<T> {
  private Boolean success;
  private String message;
  private List<T> data;
  
  public ListResponse() {
    
  }
  
  public ListResponse(Boolean success, String message, List<T> list) {
    this.success = success;
    this.message = message;
    this.data = list;
  }
  
  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
	public List<T> getData() {
		return data;
	}

	public void setData(List<T> list) {
		this.data = list;
	}

}
