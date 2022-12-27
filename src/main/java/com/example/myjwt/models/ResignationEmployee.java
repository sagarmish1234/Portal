package com.example.myjwt.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "resignationemployee", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class ResignationEmployee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long empID;

    @Column
    private String employeeName;

    @Column
    private Date resignedOn;

    @Column
    private Date lastWorkingDate;

    @Column
    private String resignationReason;

    @Column
    private String resignationStatus;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmpID() {
        return empID;
    }

    public void setEmpID(Long empID) {
        this.empID = empID;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Date getResignedOn() {
        return resignedOn;
    }

    public void setResignedOn(Date resignedOn) {
        this.resignedOn = resignedOn;
    }

    public Date getLastWorkingDate() {
        return lastWorkingDate;
    }

    public void setLastWorkingDate(Date lastWorkingDate) {
        this.lastWorkingDate = lastWorkingDate;
    }

    public String getResignationReason() {
        return resignationReason;
    }

    public void setResignationReason(String resignationReason) {
        this.resignationReason = resignationReason;
    }

    public String getResignationStatus() {
        return resignationStatus;
    }

    public void setResignationStatus(String resignationStatus) {
        this.resignationStatus = resignationStatus;
    }




}