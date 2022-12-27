package com.example.myjwt.security.services;

import java.io.Console;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

// import java.util.logging.Logger;
import com.example.myjwt.beans.Email;
import com.example.myjwt.util.EmailConstants;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Role;
import com.example.myjwt.models.Skill;
import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.models.trainings.Nomination;
import com.example.myjwt.models.trainings.Training;
import com.example.myjwt.models.trainings.TrainingAndProgress;
import com.example.myjwt.models.trainings.UserAndProgress;
import com.example.myjwt.models.trainings.UserTraining;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.NominationRepository;
import com.example.myjwt.repo.TrainingRepository;
import com.example.myjwt.repo.UserRepository;

@Service
@Slf4j
public class TrainingService {

  @Autowired
  private TrainingRepository trainingRepo;

  @Autowired
  private NominationRepository nominationRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AssignmentReportRepository assignmentReportRepository;

  @Autowired
  private AssignmentUserRepository assignmentUserRepository;

  @Autowired
  private SettingService settingService;

  @Autowired
  private CustomUserDetailsService customUserDetailsService;

  @Autowired
  private EmailService emailService;

  private static final Logger logger = LoggerFactory.getLogger(TrainingService.class);

  public Training addTraining(Training theTraining) {
    logger.info(theTraining.toString());
    return trainingRepo.save(theTraining);
  }

  public List<UserTraining> getUserTrainingList(long associateId) {

    List<Training> trainingList = trainingRepo.findAllByOrderByIdDesc();

    List<UserTraining> userTrainingList = new ArrayList<>();

    for (Training training : trainingList) {
      userTrainingList.add(getUserTraining(training.getId(), associateId));
    }
    return userTrainingList;
  }

  public List<TrainingAndProgress> getTrainingList() {

    List<Training> trainingList = trainingRepo.findAllByOrderByIdDesc();

    List<TrainingAndProgress> userTrainingList = new ArrayList<>();

    for (Training training : trainingList) {
      userTrainingList.add(getTraining(training.getId()));
    }
    return userTrainingList;
  }

  public UserTraining getUserTraining(long trainingId, long associateId) {
    Training theTraining = trainingRepo.findById(trainingId).orElse(null);

    if (theTraining == null)
      return null;

    Nomination theNomination = getNomination(trainingId, associateId);

    Boolean isNominated = theNomination != null;

    Integer progress = theNomination == null ? 0 : theNomination.getProgress();

    int avgProgress = (int) Math.round(nominationRepository.getAvgProgressByTraining(trainingId).orElse(0.0));

    UserTraining theUserTraining = new UserTraining(theTraining, avgProgress, progress, isNominated);

    return theUserTraining;
  }

  public TrainingAndProgress getTraining(long trainingId) {
    Training theTraining = trainingRepo.findById(trainingId).orElse(null);

    if (theTraining == null)
      return null;

    int avgProgress = (int) Math.round(nominationRepository.getAvgProgressByTraining(trainingId).orElse(0.0));

    TrainingAndProgress theTrainingAndProgress = new TrainingAndProgress(theTraining, avgProgress);

    return theTrainingAndProgress;
  }

  @Transactional
  public boolean deleteTraining(long trainingId) {
    boolean trainingDoesExist = trainingRepo.existsById(trainingId);

    if (!trainingDoesExist) {
      return false;
    }

    nominationRepository.deleteByTrainingId(trainingId);

    trainingRepo.deleteById(trainingId);

    return true;
  }

  public Nomination addNomination(long trainingId, long associateId) throws MessagingException, UnsupportedEncodingException {
    boolean trainingDoesExist = trainingRepo.existsById(trainingId);
    boolean associateDoesExist = userRepository.existsById(associateId);

    if (!trainingDoesExist || !associateDoesExist) {
      return null;
    }

    Training theTraining = trainingRepo.findById(trainingId).orElse(null);
    User theUser = userRepository.findById(associateId).orElse(null);

    if (getNomination(trainingId, associateId) != null) {
      return null;
    }

    if ((theTraining.getParticipationLimit() == nominationRepository.countByTraining(theTraining))
        && theTraining.getIsClassroom()) {
      throw new BadRequestException("Cannot nominate for training - participation limit exceeded");
    }

    Nomination newNomination = new Nomination(theTraining, theUser);
    theTraining.setNominations(theTraining.getNominations() + 1);
    addTraining(theTraining);

    sendTrainingConfirmation(theUser, theTraining);

    return nominationRepository.save(newNomination);
  }

  public Nomination getNomination(long trainingId, long associateId) {
    boolean trainingDoesExist = trainingRepo.existsById(trainingId);
    boolean associateDoesExist = userRepository.existsById(associateId);

    if (!trainingDoesExist || !associateDoesExist) {
      return null;
    }

    Training theTraining = trainingRepo.findById(trainingId).orElse(null);
    User theUser = userRepository.findById(associateId).orElse(null);

    Nomination theNomination = nominationRepository.findByTrainingAndUser(theTraining, theUser).orElse(null);

    return theNomination;
  }

  public List<UserAndProgress> getTrainingNominatons(long trainingId, long userId) {
    boolean trainingDoesExist = trainingRepo.existsById(trainingId);

    if (!trainingDoesExist)
      return null;

    Training theTraining = trainingRepo.findById(trainingId).orElse(null);

    List<Nomination> nominations = nominationRepository.findByTraining(theTraining);

    List<UserAndProgress> responseNominations = new ArrayList<>();

    for (Nomination nomination : nominations) {
      boolean isLoggedIn = nomination.getUser().getId() == userId;
      AssignmentReport assignmentReport = assignmentReportRepository.findFirstByOrderByIdDesc().orElse(null);
      AssignmentUser assignmentUser = assignmentUserRepository
          .findByAssignmentReportAndAssociateID(assignmentReport, nomination.getUser().getAssociateId()).get(0);
      UserAndProgress unp = new UserAndProgress(assignmentUser.getAssociateID(),
          assignmentUser.getAssociateName(),
          nomination.getProgress(), isLoggedIn);
      responseNominations.add(unp);
    }

    return responseNominations;
  }

  public Nomination updateProgress(long trainingId, long associateId, int progress) {
    Nomination theNomination = getNomination(trainingId, associateId);

    if (theNomination == null)
      return null;

    theNomination.setProgress(progress);

    return nominationRepository.save(theNomination);

  }

  private void sendTrainingConfirmation(User user, Training theTraining)
          throws MessagingException, UnsupportedEncodingException {

    try {
      Email email = new Email();
      email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
      email.setCc(settingService.getEmailId(EmailConstants.TAG_EMAIL_CC, null, null));
//      email.setTo("divyamk.a.83@gmail.com");
      email.setTo(settingService.getEmailId(user.getAssociateId().toString(),null,null));
      email.setSubject("Training confirmation");

      AssignmentUser assignmentUser = customUserDetailsService.loadAssignmentUserFromAssociateId(user.getAssociateId());

      Map<String, Object> model = new HashMap<String, Object>();
      model.put("name", assignmentUser.getAssociateName());
      model.put("title", theTraining.getTitle());

      email.setModel(model);
      emailService.sendTrainingConfirmation(email);

    } catch (Exception ex) {
      ex.printStackTrace();
    }

  }
//
    public void sendTrainingReminder(User user, Training theTraining){
//      log.info("Its running");
      try {
        Email email = new Email();
        email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
//        email.setTo("divyamk.a.83@gmail.com");
        email.setTo(settingService.getEmailId(user.getAssociateId().toString(),null,null));
        email.setSubject("Training Reminder");

        AssignmentUser assignmentUser = customUserDetailsService.loadAssignmentUserFromAssociateId(user.getAssociateId());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", assignmentUser.getAssociateName());
        model.put("title", theTraining.getTitle());
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        model.put("endDate", format.format(theTraining.getEndDate()));

        email.setModel(model);
        emailService.sendTrainingReminder(email);

      } catch (Exception ex) {
        ex.printStackTrace();
      }
    }

  @Scheduled(cron = "0 0 9 * * ?")
  @Transactional
  public void trainingSchedule(){
    // Business logic

    List<Nomination> nominations = nominationRepository.findAll();

    nominations.forEach(nomination -> {
      User user = nomination.getUser();
      Training theTraining = nomination.getTraining();
      Date endDate = theTraining.getEndDate();
      Date startDate = theTraining.getStartDate();
      Date currentDate = new Date();
      Date emailLastSend = nomination.getEmailLastSend();
      long weekMili = 7 * 24 * 60 * 60 * 1000;

      if(endDate.after(currentDate) && startDate.before(currentDate)){
        if(endDate.getTime() - currentDate.getTime() > weekMili){
          if(currentDate.getTime() - emailLastSend.getTime() >= weekMili){
            // send reminder email
            sendTrainingReminder(user, theTraining);
            nomination.setEmailLastSend(currentDate);
            nominationRepository.save(nomination);
          }
        } else{
          // send reminder email
          sendTrainingReminder(user, theTraining);
          nomination.setEmailLastSend(currentDate);
          nominationRepository.save(nomination);
        }
      }
    });
  }
}

