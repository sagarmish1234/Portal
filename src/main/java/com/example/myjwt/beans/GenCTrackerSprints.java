package com.example.myjwt.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GenCTrackerSprints {
    private Long totalSprints;
    private Long completedSprints;
}