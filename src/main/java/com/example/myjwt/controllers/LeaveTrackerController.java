package com.example.myjwt.controllers;

import com.example.myjwt.models.Holiday;
import com.example.myjwt.models.LeaveStatusCSS;
import com.example.myjwt.payload.LeaveRequestParams;
import com.example.myjwt.payload.request.LeaveRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.LeaveResponse;
import com.example.myjwt.repo.HolidayRepository;
import com.example.myjwt.security.services.LeavesTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/leaves")
public class LeaveTrackerController {

    @Autowired
    private LeavesTrackerService leavesTrackerService;
    @Autowired
    private HolidayRepository holidayRepository;

    @GetMapping("/getLeaveDetails/{year}")
    public ResponseEntity<?> getLeaveDetails(@PathVariable int year) throws Exception {
        LeaveResponse leave = leavesTrackerService.getLeaveByAssociateId(year);
        return ResponseEntity.ok(leave);
    }

    @PutMapping("/setLeaveDetails/{year}")
    public ResponseEntity<?> setLeaveDetails(@RequestBody LeaveRequest leaveRequest, @PathVariable int year) {
        try {
            LeaveResponse leaveResponse = leavesTrackerService.updateLeaves(leaveRequest.getLeaveRequestParamsArrayList(), year);
            return ResponseEntity.ok(leaveResponse);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
    @PostMapping("/getLeaveConflict/{year}")
    public ResponseEntity<?> getLeaveConflict(@RequestBody LeaveRequest leaveRequest, @PathVariable int year) {
        try {
            Set<LeaveRequestParams> leaveResponse = leavesTrackerService.getLeaveConflictDetails(leaveRequest.getLeaveRequestParamsArrayList(), year);
            return ResponseEntity.ok(leaveResponse);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
    @GetMapping("/getAllUserLeaveDetails/{year}/{lOB}/{serviceLine}")
    public ResponseEntity<?> getAllUserLeaveDetails(@PathVariable int year, @PathVariable String lOB, @PathVariable String serviceLine) {
        try {
            ArrayList<LeaveResponse> allUserLeaves = leavesTrackerService.getAllUserLeavesByLOBAndServiceLine(year, lOB, serviceLine);
            return ResponseEntity.ok(allUserLeaves);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/getAllLeaveDetailsByServiceLine/{year}/{serviceLine}")
    public ResponseEntity<?> getAllUserLeaveDetailsByServiceLine(@PathVariable int year,@PathVariable String serviceLine) {
        try {
            ArrayList<LeaveResponse> allUserLeaves = leavesTrackerService.getAllUserLeavesByServiceLine(year,serviceLine);
            return ResponseEntity.ok(allUserLeaves);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PostMapping("/setHoliday")
    public ResponseEntity<?> getHolidays(@Valid @RequestBody Holiday holiday) {
        holiday.setCity(holiday.getCity().toLowerCase());
        holidayRepository.save(holiday);
        return ResponseEntity.ok(new ApiResponse(true, "Holiday saved successfully"));
    }

    @PostMapping("/addLeaveCategory/{groupValue}")
    public ResponseEntity<?> addLeaveCategory(@PathVariable String groupValue, @RequestBody HashMap<String,String> css) {
        try {
            leavesTrackerService.saveLeaveCategory(groupValue,css);
            return ResponseEntity.ok(new ApiResponse(true, "Leave Category Saved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/getAllLeaveCategory")
    public ResponseEntity<?> getAllLeaveCategory(){
        try {

            List<LeaveStatusCSS> leaveCategory = leavesTrackerService.getAllLeaveCategory();
            return ResponseEntity.ok(leaveCategory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false,e.getMessage()));
        }
    }



}