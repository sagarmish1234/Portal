package com.example.myjwt.repo;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.myjwt.models.PanelNominee;

public interface PanelistRepository extends JpaRepository<PanelNominee, Long> {
	
	public List<PanelNominee> findByInterviewDriveIdAndIsActive(long driveId,Boolean isActive);
	
	public List<PanelNominee> findByInterviewDriveId(long driveId);
	
	public List<PanelNominee> findByAssociateId(long associateId);
	
	public PanelNominee findByAssociateIdAndInterviewDriveId(long associateId,Long driveId);
	
	public PanelNominee findByAssociateIdAndInterviewDriveIdAndIsActive(long associateId,Long driveId,boolean isActive);
	
	public List<PanelNominee> findByAssociateIdAndIsActive(long associateId,boolean isActive);
	
	public List<PanelNominee> findByAvailableOnAndInterviewDriveId(Date driveDate,Long driveId);
	
	public List<PanelNominee> findByIsActive(boolean isActive);
	
	public int countByAssociateId(Long associateId);
	
	public List<PanelNominee> findByAssociateId(Long associateId);
	
	@Query(value="SELECT id,panelist_name,associate_id,panelist_email,skill_id,is_active, COUNT(interview_drive_id) as totalNominations "+
			"FROM panel_nominee GROUP BY associate_id",nativeQuery=true)
					List<Object[]> countTotalPanelistsByDrives();
				
	@Query(value="SELECT * from panel_nominee where associate_id=?2 and interview_drive_id=?1 and is_active=1",nativeQuery = true)				
	public PanelNominee findByInterviewDriveIdAssociateId(long driveId,Long associateId);
	
	public List<PanelNominee> findByInterviewDriveIdInAndIsActive(List<Long> driveIdes,Boolean isActive);

	@Query(value="SELECT * from panel_nominee where available_on>?1 and available_on<?2 AND is_active=1",nativeQuery=true)
	public List<PanelNominee> findPanelistsBetweenDates(Date fromDate, Date toDate);
	
	@Query(value="SELECT * from panel_nominee where interview_drive_id IN (?1) OR available_on=?2 AND is_active=1",nativeQuery = true)
	public List<PanelNominee> getPanelistForCalendarDate(List<Long> driveIdes,Date availableOn);

	@Query(value="Select * from panel_nominee where available_on=?1 AND associate_id=?4 AND ((availability_from between ?2 and ?3) OR (availability_to between ?2 and ?3))",nativeQuery = true)
	public PanelNominee checkPanelistAvailability(Date availableOn,Time availabilityFrom,Time availabilityTo,Long associateId);
}
