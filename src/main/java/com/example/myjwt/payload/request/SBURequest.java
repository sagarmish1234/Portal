package com.example.myjwt.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SBURequest {

    private String name;

    private Long headId;

    private String headName;
}
