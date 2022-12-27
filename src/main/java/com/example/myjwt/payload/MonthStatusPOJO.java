package com.example.myjwt.payload;

import com.example.myjwt.models.enm.ECalenderMonth;
import com.example.myjwt.util.DateUtil;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@NoArgsConstructor
@Getter
@Setter
public class MonthStatusPOJO  {
    private ECalenderMonth month;
    private ArrayList<String> statusArrayList;

    public MonthStatusPOJO(ECalenderMonth month,int year) {
        this.month = month;
        int days = DateUtil.dataMapping.get(month);
        if(month==ECalenderMonth.FEBRUARY && DateUtil.isLeapYear(year))
            days++;
        this.statusArrayList = new ArrayList<>();
        for(int i=1;i<=days;i++){
            if(DateUtil.isSaturdayOrSunday(i,month,year)){
                this.statusArrayList.add("S");
            }
            else{
                this.statusArrayList.add("W");
            }
        }
    }
}