package com.example.myjwt.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EpicRequest {

    private String name;

    private String description;

    private Long expectedStoryPoint;

    private Date eta;
}
