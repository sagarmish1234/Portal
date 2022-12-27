package com.example.myjwt.controllers;

import com.example.myjwt.payload.AssociateInfo;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.SearchAssociateResponse;
import com.example.myjwt.security.services.SearchAssociateService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SearchAssociateController {
    @Autowired
    private SearchAssociateService searchAssociateService;

    @GetMapping("/getAssociateInfo/{associateId}")
    private ResponseEntity<?> getAssociateInfo(@PathVariable Long associateId) {
        try {
            return ResponseEntity.ok(searchAssociateService.getAssociateInfo(associateId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false,e.getMessage()));
        }

    }
}
