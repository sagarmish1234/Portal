package com.example.myjwt.payload.response;

import com.example.myjwt.models.enm.ELeaveStatus;
import com.example.myjwt.payload.MonthStatusPOJO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LeaveResponse {
    private boolean success;
    private int year;
    private Long associateId;
    private String fullName;
    private ArrayList<MonthStatusPOJO> monthStatusPOJOS;
}
