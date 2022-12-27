package com.example.myjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RampdownLobResponse {

    private List<Long> projectIdList;
    private List<AssociateDetailData> associateDetailDataList;
}
