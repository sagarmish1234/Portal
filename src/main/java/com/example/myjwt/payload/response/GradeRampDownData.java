package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GradeRampDownData {
  private String gradeDescription;
  private Long bTM;
  private Long bFD;
  private Long nBL;
  private Long bTB;
}
