package com.example.myjwt.payload.request;

import com.example.myjwt.payload.AssociateInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssociateGroupRequest {

    private Long GroupId;

    private List<AssociateInfo> associateUsers;
}