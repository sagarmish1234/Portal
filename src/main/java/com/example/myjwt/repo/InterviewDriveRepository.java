package com.example.myjwt.repo;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.myjwt.models.InterviewDrive;

@Repository
public interface InterviewDriveRepository extends JpaRepository<InterviewDrive, Long> {
	
	@Query(value = "select id from interview_drive where interview_drive_date < cast(now() as date)",nativeQuery = true)
	public List<Long>  getPastDrivesData();
	
	@Query(value = "select id from interview_drive where interview_drive_date > cast(now() as date)",nativeQuery = true)
	public List<Long> getUpcomingDrivesData();
	
	@Query(value="select * from interview_drive where interview_drive_date>?1 and interview_drive_date<?2",nativeQuery=true)
	List<InterviewDrive> findInterviewDrivesBetweenDates(Date fromDate, Date toDate);
	
	public List<InterviewDrive> findByInterviewDriveDate(Date driveDate);
}
