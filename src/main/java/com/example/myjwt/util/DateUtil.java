package com.example.myjwt.util;

import com.example.myjwt.models.enm.ECalenderMonth;

import java.sql.Date;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
import java.util.HashMap;

public class DateUtil {
    public static HashMap<ECalenderMonth, Integer> dataMapping = new HashMap<>();
//    @Value("${current.year")

    static {
        HashMap<ECalenderMonth, Integer> temp = new HashMap<>();
        temp.put(ECalenderMonth.JANUARY, 31);
        temp.put(ECalenderMonth.FEBRUARY, 28);
        temp.put(ECalenderMonth.MARCH, 31);
        temp.put(ECalenderMonth.APRIL, 30);
        temp.put(ECalenderMonth.MAY, 31);
        temp.put(ECalenderMonth.JUNE, 30);
        temp.put(ECalenderMonth.JULY, 31);
        temp.put(ECalenderMonth.AUGUST, 31);
        temp.put(ECalenderMonth.SEPTEMBER, 30);
        temp.put(ECalenderMonth.OCTOBER, 31);
        temp.put(ECalenderMonth.NOVEMBER, 30);
        temp.put(ECalenderMonth.DECEMBER, 31);
        dataMapping = temp;
    }

    public DateUtil() {
    }




    public static boolean isSaturdayOrSunday(int day, ECalenderMonth month, int year) {
        LocalDate someDate = LocalDate.of(year, month.ordinal()+1, day);
        return isWeekend(someDate);
    }
    public static boolean isWeekend(final LocalDate ld)
    {
        DayOfWeek day = DayOfWeek.of(ld.get(ChronoField.DAY_OF_WEEK));
        return day == DayOfWeek.SUNDAY || day == DayOfWeek.SATURDAY;
    }

    public static boolean isLeapYear(int year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
    
    public static LocalDate convertToLocalDate(Date dateToConvert) {
        return dateToConvert.toLocalDate();
    }
}
