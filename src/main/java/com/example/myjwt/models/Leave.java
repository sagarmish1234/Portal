package com.example.myjwt.models;

import com.example.myjwt.models.enm.ECalenderMonth;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Leaves")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int year;

    @Enumerated
    private ECalenderMonth month;

    private Integer day;

    private String status;

    @Override
    public String toString() {
        return "Leave{" +
                "id=" + id +
                ", user=" + user +
                ", year=" + year +
                ", month=" + month +
                ", day=" + day +
                ", status='" + status + '\'' +
                '}';
    }
}