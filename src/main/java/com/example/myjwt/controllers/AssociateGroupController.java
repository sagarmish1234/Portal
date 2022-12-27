package com.example.myjwt.controllers;

import com.example.myjwt.models.AssociateGroup;
import com.example.myjwt.payload.request.AssociateGroupRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.security.services.AssociateGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AssociateGroupController {

    @Autowired
    AssociateGroupService associateGroupService;


    @GetMapping("/associateGroup/create/{groupName}")
    public ResponseEntity<?> createGroup(@PathVariable String groupName) {
        try {
            AssociateGroup group = associateGroupService.createGroup(groupName);
            return ResponseEntity.ok(group);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false, "Group already exists"));
        }
    }


    @GetMapping("/associateGroup/getGroup")
    public ResponseEntity<?> getAssociateGroup() {
        return ResponseEntity.ok(associateGroupService.getAssociateGroup());
    }

    @DeleteMapping("/associateGroup/deleteGroup/{groupId}")
    public ResponseEntity<?> deleteAssociateGroup(@PathVariable Long groupId) {
        associateGroupService.deleteGroup(groupId);
        return ResponseEntity.ok(new ApiResponse(true, "Group deleted successfully"));
    }

    @PostMapping("/associateGroup/saveGroup")
    public ResponseEntity<?> saveAssociateGroup(@RequestBody AssociateGroupRequest associateGroupRequest) {
        try {
            associateGroupService.saveAssociateGroup(associateGroupRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Group Saved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, e.getMessage()));
        }
    }

}