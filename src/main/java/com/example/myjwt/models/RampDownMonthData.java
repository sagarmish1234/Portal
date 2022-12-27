package com.example.myjwt.models;

import com.example.myjwt.models.enm.ECalenderMonth;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RampDownMonthData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated
    private ECalenderMonth month;

    private Double status;


}
