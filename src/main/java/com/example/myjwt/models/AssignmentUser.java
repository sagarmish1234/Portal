package com.example.myjwt.models;

import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.beans.AsgnmtAssociate;
import com.example.myjwt.models.audit.DateAudit;
import com.example.myjwt.util.PMUtils;

@Entity
@Table(name = "assignmentuser", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class AssignmentUser extends DateAudit {

	public static final int ASSOCIATEID = 0;
	public static final int ASSOCIATENAME = 1;
	public static final int SID = 2;
	public static final int SIDSTATUS = 3;
	public static final int SCREENINGSTATUS = 4;
	public static final int LATESTSTARTDATE = 5;
	public static final int SCREENINGSTATUSDATE = 6;
	public static final int VLAN = 7;
	public static final int ASSIGNMENTID = 8;
	public static final int SOID = 9;
	public static final int SOLINE = 10;
	public static final int PROJECTID = 11;
	public static final int PROJECTDESCRIPTION = 12;
	public static final int PROJECTBILLABILITY = 13;
	public static final int PROJECTTYPE = 14;
	public static final int PROJECTSTATUS = 15;
	public static final int PROJECT_SOLUTION_TYPE = 16;
	public static final int PROJECTMANAGERID = 17;
	public static final int PROJECTMANAGERNAME = 18;
	public static final int ACCOUNTID = 19;
	public static final int ACCOUNTNAME = 20;
	public static final int ACCOUNTMANAGERID = 21;
	public static final int ACCOUNTMANAGERNAME = 22;
	public static final int LOB = 23;
	public static final int REGION = 24;
	public static final int CP = 25;
	public static final int CRM = 26;
	public static final int EDP = 27;
	public static final int EPL_ID = 28;
	public static final int EPL_NAME = 29;
	public static final int VERTICALHORIZONTAL = 30;
	public static final int JOBCODE = 31;
	public static final int DESIGNATION = 32;
	public static final int GRADE = 33;
	public static final int GRADEDESCRIPTION = 34;
	public static final int PAQGRADE = 35;
	public static final int PA_CATEGORY = 36;
	public static final int FINID = 37;
	public static final int DEPARTMENTNAME = 38;
	public static final int SERVICELINE = 39;
	public static final int HCMSETID = 40;
	public static final int HCMSUPERVISORID = 41;
	public static final int PROJECTOWNINGDEPARTMENT = 42;
	public static final int PROJECTOWNINGPRACTICE = 43;
	public static final int BILLABILITYSTATUS = 44;
	public static final int BILLABILITYREASON = 45;
	public static final int SECONDARYSTAGETAG = 46;
	public static final int CRITICALFLAG = 47;
	public static final int LOCATIONID = 48;
	public static final int ONOFF = 49;
	public static final int COUNTRY = 50;
	public static final int STATE = 51;
	public static final int CITY = 52;
	public static final int ASSIGNMENTSTARTDATE = 53;
	public static final int ASSIGNMENTENDDATE = 54;
	public static final int ASSIGNMENTSTATUS = 55;
	public static final int FUTUREASSIGNMENT = 56;
	public static final int PERCENTALLOCATION = 57;
	public static final int ASSIGNMENT_CITY = 58;
	public static final int ASSIGNMENT_LOCATION = 59;
	public static final int ASSGN_STATE = 60;
	public static final int ASSGN_COUNTRY = 61;
	public static final int FTE = 62;
	public static final int ASSOCIATELEVELFTE = 63;
	public static final int CORRECTEDASSOCIATELEVELFTE = 64;
	public static final int PROJECTROLE = 65;
	public static final int OPERATIONALROLE = 66;
	public static final int LOCATIONREASONCODE = 67;
	public static final int PROJECTSTARTDATE = 68;
	public static final int PROJECTENDDATE = 69;
	public static final int SUBVERTICAL = 70;
	public static final int SBU1 = 71;
	public static final int SBU2 = 72;
	public static final int CONTRACTORENDDATE = 73;
	public static final int ESACOMMENTS = 74;
	public static final int BURMA_ID = 75;
	public static final int BURMA_NAME = 76;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long associateID;
	private String associateName;
	private String sID;
	private String sIDStatus;
	private String screeningStatus;
	private Date latestStartDate;
	private Date screeningStatusDate;
	private String vLAN;
	private Long assignmentID;
	private String sOID;
	private String sOLine;
	private Long projectID;
	private String projectDescription;
	private String projectBillability;
	private String projectType;
	private String projectstatus;
	private String project_Solution_Type;
	private Long projectManagerID;
	private String projectManagerName;
	private Long accountID;
	private String accountName;
	private Long accountManagerID;
	private String accountManagerName;
	private String lOB;
	private String region;
	private String cP;
	private String cRM;
	private String eDP;
	private String ePL_ID;
	private String ePL_Name;
	private String verticalHorizontal;
	private String jobCode;
	private String designation;
	private String grade;
	private String gradeDescription;
	private String pAQGrade;
	private String pA_Category;
	private String fINID;
	private String departmentName;
	private String serviceLine;
	private String hCMSetID;
	private Long hCMSupervisorID;
	private String projectOwningDepartment;
	private String projectOwningPractice;
	private Boolean billabilityStatus;
	private String billabilityReason;
	private String secondaryStageTag;
	private String criticalFlag;
	private String locationID;
	private String onOff;
	private String country;
	private String state;
	private String city;
	private Date assignmentStartDate;
	private Date assignmentEnddate;
	private String assignmentStatus;
	private String futureAssignment;
	private Double percentAllocation;
	private String assignment_City;
	private String assignment_location;
	private String assgn_state;
	private String assgn_country;
	private Double fTE;
	private Double associatelevelFTE;
	private Double correctedAssociatelevelFTE;
	private String projectRole;
	private String operationalRole;
	private String locationReasoncode;
	private Date projectStartDate;
	private Date projectEndDate;
	private String subVertical;
	private String sBU1;
	private String sBU2;
	private Date contractorEndDate;
	private String eSAComments;
	private String bURMA_Id;
	private String bURMA_Name;

	@ManyToOne
	@JoinColumn(name = "reportId")
	private AssignmentReport assignmentReport;

	public AssignmentUser() {
	}

	public Long getAssociateID() {
		return associateID;
	}

	public void setAssociateID(Long associateID) {
		this.associateID = associateID;
	}

	public String getAssociateName() {
		return associateName;
	}

	public void setAssociateName(String associateName) {
		this.associateName = associateName;
	}

	public String getsID() {
		return sID;
	}

	public void setsID(String sID) {
		this.sID = sID;
	}

	public String getsIDStatus() {
		return sIDStatus;
	}

	public void setsIDStatus(String sIDStatus) {
		this.sIDStatus = sIDStatus;
	}

	public String getScreeningStatus() {
		return screeningStatus;
	}

	public void setScreeningStatus(String screeningStatus) {
		this.screeningStatus = screeningStatus;
	}

	public Date getLatestStartDate() {
		return latestStartDate;
	}

	public void setLatestStartDate(Date latestStartDate) {
		this.latestStartDate = latestStartDate;
	}

	public Date getScreeningStatusDate() {
		return screeningStatusDate;
	}

	public void setScreeningStatusDate(Date screeningStatusDate) {
		this.screeningStatusDate = screeningStatusDate;
	}

	public String getvLAN() {
		return vLAN;
	}

	public void setvLAN(String vLAN) {
		this.vLAN = vLAN;
	}

	public Long getAssignmentID() {
		return assignmentID;
	}

	public void setAssignmentID(Long assignmentID) {
		this.assignmentID = assignmentID;
	}

	public String getsOID() {
		return sOID;
	}

	public void setsOID(String sOID) {
		this.sOID = sOID;
	}

	public String getsOLine() {
		return sOLine;
	}

	public void setsOLine(String sOLine) {
		this.sOLine = sOLine;
	}

	public Long getProjectID() {
		return projectID;
	}

	public void setProjectID(Long projectID) {
		this.projectID = projectID;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public String getProjectBillability() {
		return projectBillability;
	}

	public void setProjectBillability(String projectBillability) {
		this.projectBillability = projectBillability;
	}

	public String getProjectType() {
		return projectType;
	}

	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}

	public String getProjectstatus() {
		return projectstatus;
	}

	public void setProjectstatus(String projectstatus) {
		this.projectstatus = projectstatus;
	}

	public String getProject_Solution_Type() {
		return project_Solution_Type;
	}

	public void setProject_Solution_Type(String project_Solution_Type) {
		this.project_Solution_Type = project_Solution_Type;
	}

	public Long getProjectManagerID() {
		return projectManagerID;
	}

	public void setProjectManagerID(Long projectManagerID) {
		this.projectManagerID = projectManagerID;
	}

	public String getProjectManagerName() {
		return projectManagerName;
	}

	public void setProjectManagerName(String projectManagerName) {
		this.projectManagerName = projectManagerName;
	}

	public Long getAccountID() {
		return accountID;
	}

	public void setAccountID(Long accountID) {
		this.accountID = accountID;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Long getAccountManagerID() {
		return accountManagerID;
	}

	public void setAccountManagerID(Long accountManagerID) {
		this.accountManagerID = accountManagerID;
	}

	public String getAccountManagerName() {
		return accountManagerName;
	}

	public void setAccountManagerName(String accountManagerName) {
		this.accountManagerName = accountManagerName;
	}

	public String getlOB() {
		return lOB;
	}

	public void setlOB(String lOB) {
		this.lOB = lOB;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getcP() {
		return cP;
	}

	public void setcP(String cP) {
		this.cP = cP;
	}

	public String getcRM() {
		return cRM;
	}

	public void setcRM(String cRM) {
		this.cRM = cRM;
	}

	public String geteDP() {
		return eDP;
	}

	public void seteDP(String eDP) {
		this.eDP = eDP;
	}

	public String getePL_ID() {
		return ePL_ID;
	}

	public void setePL_ID(String ePL_ID) {
		this.ePL_ID = ePL_ID;
	}

	public String getePL_Name() {
		return ePL_Name;
	}

	public void setePL_Name(String ePL_Name) {
		this.ePL_Name = ePL_Name;
	}

	public String getVerticalHorizontal() {
		return verticalHorizontal;
	}

	public void setVerticalHorizontal(String verticalHorizontal) {
		this.verticalHorizontal = verticalHorizontal;
	}

	public String getJobCode() {
		return jobCode;
	}

	public void setJobCode(String jobCode) {
		this.jobCode = jobCode;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getGradeDescription() {
		return gradeDescription;
	}

	public void setGradeDescription(String gradeDescription) {
		this.gradeDescription = gradeDescription;
	}

	public String getpAQGrade() {
		return pAQGrade;
	}

	public void setpAQGrade(String pAQGrade) {
		this.pAQGrade = pAQGrade;
	}

	public String getpA_Category() {
		return pA_Category;
	}

	public void setpA_Category(String pA_Category) {
		this.pA_Category = pA_Category;
	}

	public String getfINID() {
		return fINID;
	}

	public void setfINID(String fINID) {
		this.fINID = fINID;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getServiceLine() {
		return serviceLine;
	}

	public void setServiceLine(String serviceLine) {
		this.serviceLine = serviceLine;
	}

	public String gethCMSetID() {
		return hCMSetID;
	}

	public void sethCMSetID(String hCMSetID) {
		this.hCMSetID = hCMSetID;
	}

	public Long gethCMSupervisorID() {
		return hCMSupervisorID;
	}

	public void sethCMSupervisorID(Long hCMSupervisorID) {
		this.hCMSupervisorID = hCMSupervisorID;
	}

	public String getProjectOwningDepartment() {
		return projectOwningDepartment;
	}

	public void setProjectOwningDepartment(String projectOwningDepartment) {
		this.projectOwningDepartment = projectOwningDepartment;
	}

	public String getProjectOwningPractice() {
		return projectOwningPractice;
	}

	public void setProjectOwningPractice(String projectOwningPractice) {
		this.projectOwningPractice = projectOwningPractice;
	}

	public Boolean getBillabilityStatus() {
		return billabilityStatus;
	}

	public void setBillabilityStatus(Boolean billabilityStatus) {
		this.billabilityStatus = billabilityStatus;
	}

	public String getBillabilityReason() {
		return billabilityReason;
	}

	public void setBillabilityReason(String billabilityReason) {
		this.billabilityReason = billabilityReason;
	}

	public String getSecondaryStageTag() {
		return secondaryStageTag;
	}

	public void setSecondaryStageTag(String secondaryStageTag) {
		this.secondaryStageTag = secondaryStageTag;
	}

	public String getCriticalFlag() {
		return criticalFlag;
	}

	public void setCriticalFlag(String criticalFlag) {
		this.criticalFlag = criticalFlag;
	}

	public String getLocationID() {
		return locationID;
	}

	public void setLocationID(String locationID) {
		this.locationID = locationID;
	}

	public String getOnOff() {
		return onOff;
	}

	public void setOnOff(String onOff) {
		this.onOff = onOff;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Date getAssignmentStartDate() {
		return assignmentStartDate;
	}

	public void setAssignmentStartDate(Date assignmentStartDate) {
		this.assignmentStartDate = assignmentStartDate;
	}

	public Date getAssignmentEnddate() {
		return assignmentEnddate;
	}

	public void setAssignmentEnddate(Date assignmentEnddate) {
		this.assignmentEnddate = assignmentEnddate;
	}

	public String getAssignmentStatus() {
		return assignmentStatus;
	}

	public void setAssignmentStatus(String assignmentStatus) {
		this.assignmentStatus = assignmentStatus;
	}

	public String getFutureAssignment() {
		return futureAssignment;
	}

	public void setFutureAssignment(String futureAssignment) {
		this.futureAssignment = futureAssignment;
	}

	public Double getPercentAllocation() {
		return percentAllocation;
	}

	public void setPercentAllocation(Double percentAllocation) {
		this.percentAllocation = percentAllocation;
	}

	public String getAssignment_City() {
		return assignment_City;
	}

	public void setAssignment_City(String assignment_City) {
		this.assignment_City = assignment_City;
	}

	public String getAssignment_location() {
		return assignment_location;
	}

	public void setAssignment_location(String assignment_location) {
		this.assignment_location = assignment_location;
	}

	public String getAssgn_state() {
		return assgn_state;
	}

	public void setAssgn_state(String assgn_state) {
		this.assgn_state = assgn_state;
	}

	public String getAssgn_country() {
		return assgn_country;
	}

	public void setAssgn_country(String assgn_country) {
		this.assgn_country = assgn_country;
	}

	public Double getfTE() {
		return fTE;
	}

	public void setfTE(Double fTE) {
		this.fTE = fTE;
	}

	public Double getAssociatelevelFTE() {
		return associatelevelFTE;
	}

	public void setAssociatelevelFTE(Double associatelevelFTE) {
		this.associatelevelFTE = associatelevelFTE;
	}

	public Double getCorrectedAssociatelevelFTE() {
		return correctedAssociatelevelFTE;
	}

	public void setCorrectedAssociatelevelFTE(Double correctedAssociatelevelFTE) {
		this.correctedAssociatelevelFTE = correctedAssociatelevelFTE;
	}

	public String getProjectRole() {
		return projectRole;
	}

	public void setProjectRole(String projectRole) {
		this.projectRole = projectRole;
	}

	public String getOperationalRole() {
		return operationalRole;
	}

	public void setOperationalRole(String operationalRole) {
		this.operationalRole = operationalRole;
	}

	public String getLocationReasoncode() {
		return locationReasoncode;
	}

	public void setLocationReasoncode(String locationReasoncode) {
		this.locationReasoncode = locationReasoncode;
	}

	public Date getProjectStartDate() {
		return projectStartDate;
	}

	public void setProjectStartDate(Date projectStartDate) {
		this.projectStartDate = projectStartDate;
	}

	public Date getProjectEndDate() {
		return projectEndDate;
	}

	public void setProjectEndDate(Date projectEndDate) {
		this.projectEndDate = projectEndDate;
	}

	public String getSubVertical() {
		return subVertical;
	}

	public void setSubVertical(String subVertical) {
		this.subVertical = subVertical;
	}

	public String getsBU1() {
		return sBU1;
	}

	public void setsBU1(String sBU1) {
		this.sBU1 = sBU1;
	}

	public String getsBU2() {
		return sBU2;
	}

	public void setsBU2(String sBU2) {
		this.sBU2 = sBU2;
	}

	public Date getContractorEndDate() {
		return contractorEndDate;
	}

	public void setContractorEndDate(Date contractorEndDate) {
		this.contractorEndDate = contractorEndDate;
	}

	public String geteSAComments() {
		return eSAComments;
	}

	public void seteSAComments(String eSAComments) {
		this.eSAComments = eSAComments;
	}

	public String getbURMA_Id() {
		return bURMA_Id;
	}

	public void setbURMA_Id(String bURMA_Id) {
		this.bURMA_Id = bURMA_Id;
	}

	public String getbURMA_Name() {
		return bURMA_Name;
	}

	public void setbURMA_Name(String bURMA_Name) {
		this.bURMA_Name = bURMA_Name;
	}

	public void setValue(int colIndex, String value) {
		switch (colIndex) {
		case ASSOCIATEID:
			setAssociateID(Long.valueOf(value));
			break;
		case ASSOCIATENAME:
			setAssociateName(value);
			break;
		case SID:
			setsID(value);
			break;
		case SIDSTATUS:
			setsIDStatus(value);
			break;
		case SCREENINGSTATUS:
			setScreeningStatus(value);
			break;
		case LATESTSTARTDATE:
			setLatestStartDate(PMUtils.stringToUtilDate(value, 1));
			break;
		case SCREENINGSTATUSDATE:
			setScreeningStatusDate(PMUtils.stringToUtilDate(value, 1));
			break;
		case VLAN:
			setvLAN(value);
			break;
		case ASSIGNMENTID:
			setAssignmentID(Long.valueOf(value));
			break;
		case SOID:
			setsOID(value);
			break;
		case SOLINE:
			setsOLine(value);
			break;
		case PROJECTID:
			setProjectID(Long.valueOf(value));
			break;
		case PROJECTDESCRIPTION:
			setProjectDescription(value);
			break;
		case PROJECTBILLABILITY:
			setProjectBillability(value);
			break;
		case PROJECTTYPE:
			setProjectType(value);
			break;
		case PROJECTSTATUS:
			setProjectstatus(value);
			break;
		case PROJECT_SOLUTION_TYPE:
			setProject_Solution_Type(value);
			break;
		case PROJECTMANAGERID:
			setProjectManagerID(Long.valueOf(value));
			break;
		case PROJECTMANAGERNAME:
			setProjectManagerName(value);
			break;
		case ACCOUNTID:
			setAccountID(Long.valueOf(value));
			break;
		case ACCOUNTNAME:
			setAccountName(value);
			break;
		case ACCOUNTMANAGERID:
			if (value == null || value.equals(""))
				setAccountManagerID(null);
			else
				setAccountManagerID(Long.valueOf(value));
			break;
		case ACCOUNTMANAGERNAME:
			setAccountManagerName(value);
			break;
		case LOB:
			setlOB(value);
			break;

		case REGION:
			setRegion(value);
			break;
		case CP:
			setcP(value);
			break;
		case CRM:
			setcRM(value);
			break;
		case EDP:
			seteDP(value);
			break;

		case EPL_ID:
			setePL_ID(value);
			break;
		case EPL_NAME:
			setePL_Name(value);
			break;
		case VERTICALHORIZONTAL:
			setVerticalHorizontal(value);
			break;
		case JOBCODE:
			setJobCode(value);
			break;
		case DESIGNATION:
			setDesignation(value);
			break;
		case GRADE:
			setGrade(value);
			break;
		case GRADEDESCRIPTION:
			setGradeDescription(value);
			break;
		case PAQGRADE:
			setpAQGrade(value);
			break;

		case PA_CATEGORY:
			setpA_Category(value);
			break;
		case FINID:
			setfINID(value);
			break;
		case DEPARTMENTNAME:
			setDepartmentName(value);
			break;
		case SERVICELINE:
			setServiceLine(value);
			break;
		case HCMSETID:
			sethCMSetID(value);
			break;
		case HCMSUPERVISORID:
			if (value == null || value.equals(""))
				sethCMSupervisorID(null);
			else
				sethCMSupervisorID(Long.valueOf(value));
			break;
		case PROJECTOWNINGDEPARTMENT:
			setProjectOwningDepartment(value);
			break;
		case PROJECTOWNINGPRACTICE:
			setProjectOwningPractice(value);
			break;
		case BILLABILITYSTATUS:
			if (value != null && value.equalsIgnoreCase("Y"))
				setBillabilityStatus(true);
			else
				setBillabilityStatus(false);
			break;
		case BILLABILITYREASON:
			setBillabilityReason(value);
			break;
		case SECONDARYSTAGETAG:
			setSecondaryStageTag(value);
			break;
		case CRITICALFLAG:
			setCriticalFlag(value);
			break;
		case LOCATIONID:
			setLocationID(value);
			break;
		case ONOFF:
			setOnOff(value);
			break;
		case COUNTRY:
			setCountry(value);
			break;
		case STATE:
			setState(value);
			break;
		case CITY:
			setCity(value);
			break;
		case ASSIGNMENTSTARTDATE:
			setAssignmentStartDate(PMUtils.stringToUtilDate(value, 2));
			break;
		case ASSIGNMENTENDDATE:
			setAssignmentEnddate(PMUtils.stringToUtilDate(value, 2));
			break;
		case ASSIGNMENTSTATUS:
			setAssignmentStatus(value);
			break;
		case FUTUREASSIGNMENT:
			setFutureAssignment(value);
			break;
		case PERCENTALLOCATION:
			setPercentAllocation(Double.parseDouble(value));
			break;
		case ASSIGNMENT_CITY:
			setAssignment_City(value);
			break;
		case ASSIGNMENT_LOCATION:
			setAssignment_location(value);
			break;
		case ASSGN_STATE:
			setAssgn_state(value);
			break;
		case ASSGN_COUNTRY:
			setAssgn_country(value);
			break;
		case FTE:
			setfTE(Double.parseDouble(value));
			break;
		case ASSOCIATELEVELFTE:
			setAssociatelevelFTE(Double.parseDouble(value));
			break;
		case CORRECTEDASSOCIATELEVELFTE:
			setCorrectedAssociatelevelFTE(Double.parseDouble(value));
			break;
		case PROJECTROLE:
			setProjectRole(value);
			break;
		case OPERATIONALROLE:
			setOperationalRole(value);
			break;
		case LOCATIONREASONCODE:
			setLocationReasoncode(value);
			break;
		case PROJECTSTARTDATE:
			setProjectStartDate(PMUtils.stringToUtilDate(value, 2));
			break;
		case PROJECTENDDATE:
			setProjectEndDate(PMUtils.stringToUtilDate(value, 2));
			break;
		case SUBVERTICAL:
			setSubVertical(value);
			break;
		case SBU1:
			setsBU1(value);
			break;
		case SBU2:
			setsBU2(value);
			break;
		case CONTRACTORENDDATE:
			setContractorEndDate(PMUtils.stringToUtilDate(value, 3));
			break;
		case ESACOMMENTS:
			seteSAComments(value);
			break;
		case BURMA_ID:
			setbURMA_Id(value);
			break;
		case BURMA_NAME:
			setbURMA_Name(value);
			break;

		}
	}

	/* Comparator for sorting the list by Student Name */
	public static Comparator<AsgnmtAssociate> AssignmentEndComparator = new Comparator<AsgnmtAssociate>() {

		public int compare(AsgnmtAssociate s1, AsgnmtAssociate s2) {

			// ascending order
			return s1.getAssignmentEnddate().compareTo(s2.getAssignmentEnddate());

			// descending order
			// return StudentName2.compareTo(StudentName1);
		}
	};

	/* Comparator for sorting the list by Student Name */
	public static Comparator<Map.Entry<Long, AsgnmtAssociate>> ProjectEndComparator = new Comparator<Map.Entry<Long, AsgnmtAssociate>>() {

		public int compare(Map.Entry<Long, AsgnmtAssociate> s1, Map.Entry<Long, AsgnmtAssociate> s2) {

			// ascending order
			return s1.getValue().getProjectEndDate().compareTo(s2.getValue().getProjectEndDate());

			// descending order
			// return StudentName2.compareTo(StudentName1);
		}
	};

	public AssignmentReport getAssignmentReport() {
		return assignmentReport;
	}

	public void setAssignmentReport(AssignmentReport assignmentReport) {
		this.assignmentReport = assignmentReport;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
