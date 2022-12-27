package com.example.myjwt.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ParentAccountRequest {
    private String name;

    private Long edlId;

    private String eldName;

    private long pdlId;
}
