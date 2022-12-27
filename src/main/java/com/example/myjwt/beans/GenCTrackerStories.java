package com.example.myjwt.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GenCTrackerStories {
    private Long acceptedStories;
    private Long totalStories;

    @Override
    public String toString() {
        return "GenCTrackerStories{" +
                "acceptedStories=" + acceptedStories +
                ", totalStories=" + totalStories +
                '}';
    }
}