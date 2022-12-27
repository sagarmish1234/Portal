package com.example.myjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "resignationcategory", uniqueConstraints = {@UniqueConstraint(columnNames = "id")})
public class ResignationCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String rescatName;

    @Column
    private String rescatValue;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRescatName() {
        return rescatName;
    }

    public void setRescatName(String rescatName) {
        this.rescatName = rescatName;
    }

    public String getRescatValue() {
        return rescatValue;
    }

    public void setRescatValue(String rescatValue) {
        this.rescatValue = rescatValue;
    }
}
