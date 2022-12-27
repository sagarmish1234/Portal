package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SprintListItem {
    long id;
    String name;
    Instant startDate;
    Instant endDate;
    String scrumMaster;
    long storyPoints;
    String status;
    long stories;
}
