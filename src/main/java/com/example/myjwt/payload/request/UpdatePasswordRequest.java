package com.example.myjwt.payload.request;

import lombok.Data;

import javax.persistence.Transient;
@Data
public class UpdatePasswordRequest {
    private String currentPassword;
    private String password;
    @Transient
    private String confPassword;
    private Long associateId;
}
