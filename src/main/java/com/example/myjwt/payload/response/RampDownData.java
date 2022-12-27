package com.example.myjwt.payload.response;

public class RampDownData {
private String project_description;
private String project_manager_name;




    public String getProject_description() {
        return project_description;
    }

    public void setProject_description(String project_description) {
        this.project_description = project_description;
    }

    public String getProject_manager_name() {
        return project_manager_name;
    }

    public void setProject_manager_name(String project_manager_name) {
        this.project_manager_name = project_manager_name;
    }



    public RampDownData(String project_description, String project_manager_name) {
        this.project_description = project_description;
        this.project_manager_name = project_manager_name;
    }

    public RampDownData() {
    }
}

