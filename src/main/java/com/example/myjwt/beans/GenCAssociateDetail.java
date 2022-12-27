package com.example.myjwt.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenCAssociateDetail {
    String associateName;
    Double totalStories;
    Double completedStories;
}
