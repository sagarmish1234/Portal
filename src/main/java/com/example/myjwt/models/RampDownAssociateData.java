package com.example.myjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RampDownAssociateData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private AssignmentUser associate;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<RampDownMonthData> rampDownMonthDataList;



}
