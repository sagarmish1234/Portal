package com.example.myjwt.security.services;

import com.example.myjwt.beans.Email;
import com.example.myjwt.models.*;
import com.example.myjwt.models.enm.ECalenderMonth;
import com.example.myjwt.payload.LeaveRequestParams;
import com.example.myjwt.payload.MonthStatusPOJO;
import com.example.myjwt.payload.response.LeaveResponse;
import com.example.myjwt.repo.*;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeavesTrackerService {

    @Autowired
    private LeavesRepository leavesRepository;

    @Autowired
    private AssignmentUserRepository assignmentUserRepository;

    @Autowired
    private AssignmentReportRepository assignmentReportRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LeaveStatusCSSRepository leaveStatusCSSRepository;

    @Autowired
    private AssociateGroupMemberRepository associateGroupMemberRepository;

    @Autowired
    private AssociateGroupRepository associateGroupRepository;

    @Autowired
    SettingService settingService;

    public LeaveResponse getLeaveByAssociateId(int year) throws Exception {
        User user = customUserDetailsService.loadUserFromContext();
        List<AssignmentUser> assignmentUserList = assignmentUserRepository.findByAssociateID(user.getAssociateId());
        AssignmentUser assignmentUser = assignmentUserList.get(0);
        Optional<ArrayList<Leave>> byAssociateIdAndYear = leavesRepository.findByUserIdAndYear(user.getId(), year);
        LeaveResponse leaveResponse = getDefaultLeaveResponse(year);
        if (byAssociateIdAndYear.isPresent()) {
            leaveResponse = getLeaveResponse(byAssociateIdAndYear.get(), year);
        }
        leaveResponse.setAssociateId(user.getId());
        leaveResponse.setFullName(user.getAssociateId() + "");

        return setHolidays(year, leaveResponse, assignmentUser.getCity());

    }

    public LeaveResponse getLeaveByAssociateId(Long associateId, int year) throws Exception {
        User user = customUserDetailsService.getUserById(associateId);
        List<AssignmentUser> assignmentUserList = assignmentUserRepository.findByAssociateID(user.getAssociateId());
        AssignmentUser assignmentUser = assignmentUserList.get(0);
        Optional<ArrayList<Leave>> byAssociateIdAndYear = leavesRepository.findByUserIdAndYear(associateId, year);
        LeaveResponse leaveResponse = getDefaultLeaveResponse(year);
        if (byAssociateIdAndYear.isPresent()) {
            leaveResponse = getLeaveResponse(byAssociateIdAndYear.get(), year);
        }
        leaveResponse.setAssociateId(user.getAssociateId());
        leaveResponse.setFullName(assignmentUser.getAssociateName());

        return setHolidays(year, leaveResponse, assignmentUser.getCity());

    }

    public LeaveResponse getDefaultLeaveResponse(int year) {
        LeaveResponse leaveResponse = new LeaveResponse();
        leaveResponse.setYear(year);
        leaveResponse.setSuccess(true);
        ArrayList<MonthStatusPOJO> statusPOJOS = new ArrayList<>();
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.JANUARY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.FEBRUARY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.MARCH, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.APRIL, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.MAY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.JUNE, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.JULY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.AUGUST, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.SEPTEMBER, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.OCTOBER, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.NOVEMBER, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.DECEMBER, year));
        leaveResponse.setMonthStatusPOJOS(statusPOJOS);
        return leaveResponse;
    }

    public LeaveResponse getLeaveResponse(ArrayList<Leave> leaves, int year) {
        LeaveResponse leaveResponse = getDefaultLeaveResponse(year);
        for (Leave i : leaves) {
            leaveResponse.getMonthStatusPOJOS().get(i.getMonth().ordinal()).getStatusArrayList().set(i.getDay() - 1,
                    i.getStatus());
        }
        return leaveResponse;
    }


    public LeaveResponse setHolidays(int year, LeaveResponse leaveResponse, String city) {
        Optional<ArrayList<Holiday>> holidayList = holidayRepository.findByYearAndCity(year, city.toLowerCase());
        if (holidayList.isPresent())
            for (Holiday i : holidayList.get()) {
                leaveResponse.getMonthStatusPOJOS().get(i.getMonth().ordinal()).getStatusArrayList().set(i.getDay() - 1,
                        "H");
            }
        return leaveResponse;
    }

    public LeaveResponse updateLeaves(ArrayList<LeaveRequestParams> leaveRequestParams, int year) throws Exception {
        User user = customUserDetailsService.loadUserFromContext();
        ArrayList<Leave> temp = new ArrayList<>();
        for (LeaveRequestParams i : leaveRequestParams) {
            Leave leave = new Leave();
            leave.setYear(year);
            leave.setDay(i.getDay());
            leave.setMonth(i.getMonth());
            leave.setStatus(i.getStatus());
            leave.setUser(user);
            temp.add(leave);
        }

        leavesRepository.saveAll(temp);
        sendConflictMail(temp);
        LeaveResponse leaveResponse = getLeaveByAssociateId(year);
        return leaveResponse;
    }

    private void sendConflictMail(ArrayList<Leave> temp) throws Exception {
        Set<AssociateGroup> groups = getAllGroups(temp.get(0).getUser());
        System.out.println("groups - " + groups);
        for (AssociateGroup g : groups) {
            boolean flag = false;
            Map<Leave, List<AssignmentUser>> leaveListMap = new HashMap<>();
            for (Leave l : temp) {
                List<AssignmentUser> userList = checkConflict(l, g);
                if ((l.getStatus().equals("L") || l.getStatus().equals("HD")) && userList.size() > 1) {
                    flag = true;
                    leaveListMap.put(l, userList);
                }
            }
            if (flag) {
                System.out.println("Conflict in group " + g.getGroupName());
                sendEmailToManager(leaveListMap, g,g.getUserId());
            }
        }
    }

    private List<AssignmentUser> checkConflict(Leave leave, AssociateGroup group) throws Exception {
        Optional<List<AssociateGroupMember>> groupMembers = associateGroupMemberRepository.findByGroup(group);
        int sameDate = 0;
        int threshold = 1;
        List<AssignmentUser> conflictingUsers = new ArrayList<>();
        if (groupMembers.isPresent()) {
            for (AssociateGroupMember member : groupMembers.get()) {
                User user = userRepository.findByAssociateId(member.getUser().getAssociateID()).orElseThrow(() -> new Exception("No user found"));
                Optional<Leave> byUserIdAndYearAndMonthAndDay = leavesRepository.findFirstByUserIdAndYearAndMonthAndDayOrderByIdDesc(user.getId(), leave.getYear(), leave.getMonth(), leave.getDay());
                if (byUserIdAndYearAndMonthAndDay.isPresent() && byUserIdAndYearAndMonthAndDay.get().getStatus().equals("L")) {
                    System.out.println(byUserIdAndYearAndMonthAndDay.get());
                    AssignmentUser assignmentUser = customUserDetailsService.loadAssignmentUserFromAssociateId(user.getAssociateId());
                    conflictingUsers.add(assignmentUser);
                    sameDate++;
                }
            }
        }
        return conflictingUsers;
    }

    private Set<AssociateGroup> getAllGroups(User user) throws Exception {
        AssignmentReport first = assignmentReportRepository.findFirstByOrderByIdDesc().orElseThrow(() -> new Exception("No assignment report found"));
        AssignmentUser byAssignmentReportAndAssociateID = assignmentUserRepository.findByAssignmentReportAndAssociateID(first, user.getAssociateId()).get(0);
        Optional<List<AssociateGroupMember>> byUser = associateGroupMemberRepository.findByUser(byAssignmentReportAndAssociateID);
        HashSet<AssociateGroup> associateGroups = new HashSet<>();
        if (byUser.isPresent()) {
            for (AssociateGroupMember i : byUser.get()) {
                associateGroups.add(i.getGroup());
            }
        }
        return associateGroups;
    }

    @Async
    private void sendEmailToManager(Map<Leave, List<AssignmentUser>> leaveListMap, AssociateGroup group,Long userId) throws Exception {
        Email email = new Email();
        email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
        email.setTo(settingService.getEmailId(EmailConstants.TAG_EMAIL_TO, "ADM", null));
        email.setCc(settingService.getEmailId(EmailConstants.TAG_EMAIL_CC, "ADM", null));
        email.setSubject("!! Alert !! - Leave conflict in group - " + group.getGroupName());
        System.out.println("Entered");
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("leaveListMap", leaveListMap);
        model.put("manager",customUserDetailsService.loadAssignmentUserFromAssociateId(userRepository.findById(userId).get().getAssociateId()).getAssociateName());
        email.setModel(model);
        emailService.sendLeaveConflictEmail(email);
    }


    public ArrayList<LeaveResponse> getAllUserLeavesByLOBAndServiceLine(int year, String lOB, String serviceLine)
            throws Exception {
        AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
                .orElseThrow(() -> new Exception("No assignment users found"));
        List<AssignmentUser> assignmentUsers = assignmentUserRepository
                .findByAssignmentReportAndServiceLineAndLOB(report, serviceLine, lOB);
        List<User> users = new ArrayList<>();
        Set<Long> associateIds = assignmentUsers.stream().map(user -> user.getAssociateID()).collect(Collectors.toSet());
        for (Long i : associateIds) {
            Optional<User> user = userRepository.findByAssociateId(i);
            if (user.isPresent()) {
                users.add(user.get());
            }
        }
        ArrayList<LeaveResponse> leaveResponses = new ArrayList<>();
        for (User u : users) {
            LeaveResponse leaveByAssociateId = getLeaveByAssociateId(u.getId(), year);
            leaveResponses.add(leaveByAssociateId);
        }
        if (leaveResponses.size() == 0)
            throw new Exception("No Users found for the filter");
        return leaveResponses;
    }

    public ArrayList<LeaveResponse> getAllUserLeavesByServiceLine(int year, String serviceLine)
            throws Exception {
        AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
                .orElseThrow(() -> new Exception("No assignment users found"));
        List<AssignmentUser> assignmentUsers = assignmentUserRepository
                .findByAssignmentReportAndServiceLine(report, serviceLine);
        List<User> users = new ArrayList<>();
        Set<Long> associateIds = assignmentUsers.stream().filter(user -> user.getBillabilityStatus()).map(user -> user.getAssociateID()).collect(Collectors.toSet());
        for (Long i : associateIds) {
            Optional<User> user = userRepository.findByAssociateId(i);
            if (user.isPresent()) {
                users.add(user.get());
            }
        }
        ArrayList<LeaveResponse> leaveResponses = new ArrayList<>();
        for (User u : users) {
            LeaveResponse leaveByAssociateId = getLeaveByAssociateId(u.getId(), year);
            leaveResponses.add(leaveByAssociateId);
        }
        System.out.println(users);
        if (leaveResponses.size() == 0)
            throw new Exception("No Users found for the filter");
        return leaveResponses;
    }

    @Transactional
    public void saveLeaveCategory(String groupValue, HashMap<String, String> css) throws Exception {
        String catGroup = AppConstants.LEAVE_STATUS;
        groupValue = groupValue.toUpperCase();
        if (categoryRepository.existsByCatGroupAndGroupKeyAndGroupValue(catGroup, catGroup, groupValue)) {
            Category catTuple = categoryRepository.findByCatGroupAndGroupKeyAndGroupValue(catGroup, catGroup,
                    groupValue);
            LeaveStatusCSS statusCSS = leaveStatusCSSRepository.findById(groupValue)
                    .orElseThrow(() -> new Exception("No css present for this"));
            statusCSS.setCss(css);
            return;
        }
        Category category = new Category();
        category.setCatGroup(catGroup);
        category.setGroupKey(catGroup);
        category.setGroupValue(groupValue.toUpperCase());
        category = categoryRepository.save(category);
        leaveStatusCSSRepository.save(new LeaveStatusCSS(category.getGroupValue(), css));
    }

    public List<LeaveStatusCSS> getAllLeaveCategory() throws Exception {
        String catGroup = AppConstants.LEAVE_STATUS;
        List<Category> byCatGroup = categoryRepository.findByCatGroup(catGroup);
        if (byCatGroup.isEmpty()) {
            throw new Exception("No Leave Category Found");
        }
        List<LeaveStatusCSS> leaveStatuses = new ArrayList<>();
        for (Category i : byCatGroup) {
            Optional<LeaveStatusCSS> byId = leaveStatusCSSRepository.findById(i.getGroupValue());
            leaveStatuses.add(byId.get());
        }
        return leaveStatuses;
    }

    public Set<LeaveRequestParams> getLeaveConflictDetails(ArrayList<LeaveRequestParams> leaveRequestParamsArrayList, int year) throws Exception {
        User user = customUserDetailsService.loadUserFromContext();
        Set<AssociateGroup> allGroups = getAllGroups(user);
		Set<LeaveRequestParams> response = new HashSet<>();
        if (!allGroups.isEmpty()) {
            for (AssociateGroup group : allGroups) {
                Optional<List<AssociateGroupMember>> groupMembers = associateGroupMemberRepository.findByGroup(group);
                for (AssociateGroupMember member : groupMembers.get()) {
                    User user1 = userRepository.findByAssociateId(member.getUser().getAssociateID()).orElseThrow(() -> new Exception("No user found"));
                    for (LeaveRequestParams leave : leaveRequestParamsArrayList) {
                        if(leave.getStatus().equals("W"))
                            continue;
                        Optional<Leave> byUserIdAndYearAndMonthAndDay = leavesRepository.findFirstByUserIdAndYearAndMonthAndDayOrderByIdDesc(user1.getId(), leave.getYear(), leave.getMonth(), leave.getDay());
                        if (byUserIdAndYearAndMonthAndDay.isPresent() && byUserIdAndYearAndMonthAndDay.get().getStatus().equals("L")) {
							response.add(leave);
                        }
                    }
                }
            }
        }
		return response;
    }

}