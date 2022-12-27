package com.example.myjwt.payload.response;

import com.example.myjwt.payload.AssociateInfo;
import lombok.Data;

import java.util.List;

@Data
public class AssociateGroupResponse {

    private Long groupId;

    private String groupName;

    private List<AssociateInfo> info;

}