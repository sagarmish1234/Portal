package com.example.myjwt.payload.request;

import com.example.myjwt.payload.LeaveRequestParams;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {
    private ArrayList<LeaveRequestParams> leaveRequestParamsArrayList;
    private int year;
}
