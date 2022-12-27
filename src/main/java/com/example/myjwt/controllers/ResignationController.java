package com.example.myjwt.controllers;

import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.models.ResignationEmployee;
import com.example.myjwt.repo.ResignationEmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ResignationController extends BaseController{

    private ResignationEmployeeRepository resignationEmployeeRepository;

    public ResignationController(ResignationEmployeeRepository resignationEmployeeRepository) {
        this.resignationEmployeeRepository = resignationEmployeeRepository;
    }
    public static ResignationEmployee dtoToEntity(ResignationEmployee resignationEmployee){
        ResignationEmployee resignationEmployeeEntity = new ResignationEmployee();
        resignationEmployeeEntity.setEmpID(resignationEmployee.getEmpID());
        resignationEmployeeEntity.setEmployeeName(resignationEmployee.getEmployeeName());
        resignationEmployeeEntity.setResignedOn(resignationEmployee.getResignedOn());
        resignationEmployeeEntity.setLastWorkingDate(resignationEmployee.getLastWorkingDate());
        resignationEmployeeEntity.setResignationReason(resignationEmployee.getResignationReason());
        resignationEmployeeEntity.setResignationStatus(resignationEmployee.getResignationStatus());

        return resignationEmployeeEntity;
    }


    @GetMapping("/resignation")
    public List<ResignationEmployee> getUploadedSheetData(){
        return resignationEmployeeRepository.findAll();
    }

    @PostMapping("/upload-resignation-data")
    public List<ResignationEmployee> uploadSheetData(@RequestBody List<ResignationEmployee> resignationEmployeeListData){
        List<ResignationEmployee> resignationEmployeeEntities = new ArrayList<>();

        for (ResignationEmployee resignationEmployee : resignationEmployeeListData) {
            resignationEmployeeEntities.add(dtoToEntity(resignationEmployee));
        }

        resignationEmployeeRepository.deleteAll();
        Iterable<ResignationEmployee> persistedUser = resignationEmployeeRepository.saveAll(resignationEmployeeEntities);
        System.out.println(persistedUser);
        return resignationEmployeeListData;
    }

    public static ResignationEmployee dtoToResStatus(ResignationEmployee resignationEmployee) {
        ResignationEmployee resignationEmployeeResStatus = new ResignationEmployee();
        resignationEmployeeResStatus.setResignationStatus(resignationEmployee.getResignationStatus());
        return resignationEmployeeResStatus;
    }

    @PostMapping("/update-all-resignation-employee-status")
    public ResignationEmployee getAllUserProfile(@RequestBody List<ResignationEmployee> resignationEmployeeSaveList){
        List<ResignationEmployee> resignationEmployeeUpdateAll = new ArrayList<>();

        for (ResignationEmployee resignationEmployee : resignationEmployeeSaveList) {
            resignationEmployeeUpdateAll.add(dtoToResStatus(resignationEmployee));
        }

        Iterable<ResignationEmployee> persistedUser = resignationEmployeeRepository.saveAll(resignationEmployeeUpdateAll);
        System.out.println(persistedUser);
        return (ResignationEmployee) resignationEmployeeSaveList;
    }

    @PostMapping("/update-resignation-employee-status")
    public ResignationEmployee getUserProfile(@RequestBody ResignationEmployee resignationEmployeeUpdateObject) {
        resignationEmployeeRepository.save(resignationEmployeeUpdateObject);
        return resignationEmployeeUpdateObject;
    }

}