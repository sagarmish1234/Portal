package com.example.myjwt.payload.request;

import java.util.Set;
import lombok.Data;

import com.example.myjwt.models.Role;

@Data
public class ApproveUser {

	public long associateId;
	public String roles[];
	public Boolean approved;
}
