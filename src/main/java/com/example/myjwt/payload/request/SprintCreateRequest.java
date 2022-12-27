package com.example.myjwt.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SprintCreateRequest {
    private String name;

    private Instant startDate;

    private Instant endDate;

    private Long scrumMasterId;

    private String scrumMasterName;

    private List<Long> storyIds;
}