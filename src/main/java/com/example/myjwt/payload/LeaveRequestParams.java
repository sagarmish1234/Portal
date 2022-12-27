package com.example.myjwt.payload;

import com.example.myjwt.models.enm.ECalenderMonth;
import com.example.myjwt.models.enm.ELeaveStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LeaveRequestParams {
    private int day;
    private int year;
    private ECalenderMonth month;
    private String status;
}
