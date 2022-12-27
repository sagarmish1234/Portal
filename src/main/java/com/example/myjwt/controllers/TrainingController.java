package com.example.myjwt.controllers;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.exception.ResourceNotFoundException;
import com.example.myjwt.models.Skill;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.models.trainings.Nomination;
import com.example.myjwt.models.trainings.Training;
import com.example.myjwt.models.trainings.TrainingAndProgress;
import com.example.myjwt.models.trainings.UserAndProgress;
import com.example.myjwt.models.trainings.UserTraining;
import com.example.myjwt.payload.request.TrainingProgress;
import com.example.myjwt.payload.request.TrainingRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.ListResponse;
import com.example.myjwt.repo.SkillRepository;
import com.example.myjwt.security.services.CustomUserDetailsService;
import com.example.myjwt.security.services.TrainingService;
import com.example.myjwt.security.services.UserPrincipal;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api")
public class TrainingController extends BaseController {

  @Autowired
  private TrainingService theTrainingService;

  @Autowired
  private SkillRepository theSkillRepository;

  @Autowired
  private CustomUserDetailsService userService;

  private static final Logger logger = LoggerFactory.getLogger(TrainingController.class);

  @PostMapping(value = "/forms/trainings")
  public ApiResponse addTraining(@RequestBody TrainingRequest theTrainingRequest) {

    Skill theSkill = theSkillRepository.findById(theTrainingRequest.getSkillId()).orElse(null);

    if (theTrainingRequest.getIsClassroom()) {
      if (theTrainingRequest.getParticipationLimit() == 0) {
        throw new BadRequestException("participation limit cannot be zero!");
      }
    } else {
      theTrainingRequest.setParticipationLimit(0);
    }

    Training theTraining = new Training(theTrainingRequest.getTitle(), theTrainingRequest.getStartDate(),
        theTrainingRequest.getEndDate(), theTrainingRequest.getIsClassroom(), theSkill,
        theTrainingRequest.getParticipationLimit());

    Training newTraining = theTrainingService.addTraining(theTraining);

    return new ApiResponse(true, newTraining.getId().toString());
  }

  @GetMapping(value = "/forms/personalised-trainings")
  public ListResponse<UserTraining> getAllPersonalisedTrainings() {
    long userId = getCurrentUserId();
    List<UserTraining> userTrainings = theTrainingService.getUserTrainingList(userId);

    return new ListResponse<UserTraining>(true, "List of Trainings", userTrainings);
  }

  @GetMapping(value = "/forms/trainings")
  public ListResponse<TrainingAndProgress> getAllTrainings() {
    List<TrainingAndProgress> userTrainings = theTrainingService.getTrainingList();

    return new ListResponse<TrainingAndProgress>(true, "List of Trainings", userTrainings);
  }

  @GetMapping(value = "/forms/personalised-trainings/{trainingId}")
  public UserTraining getPersonalisedTraining(@PathVariable long trainingId) {
    UserTraining userTraining = theTrainingService.getUserTraining(trainingId, getCurrentUserId());

    if (userTraining == null) {
      throw new ResourceNotFoundException("Training", "trainingId", trainingId);
    }

    return userTraining;
  }

  @GetMapping(value = "/forms/trainings/{trainingId}")
  public TrainingAndProgress getTraining(@PathVariable long trainingId) {
    TrainingAndProgress userTraining = theTrainingService.getTraining(trainingId);

    if (userTraining == null) {
      throw new ResourceNotFoundException("Training", "trainingId", trainingId);
    }

    return userTraining;
  }

  @DeleteMapping("/forms/trainings/{trainingId}")
  public ApiResponse deleteTraining(@PathVariable long trainingId) {
    boolean isDeleted = theTrainingService.deleteTraining(trainingId);

    if (!isDeleted) {
      throw new ResourceNotFoundException("Training", "trainingid", trainingId);
    }

    return new ApiResponse(true, "Deleted training with trainingId : " + trainingId);
  }

  @GetMapping("/forms/trainings/{trainingId}/nominations")
  public List<UserAndProgress> getnominations(@PathVariable long trainingId) {
    List<UserAndProgress> nominations = theTrainingService.getTrainingNominatons(trainingId, getCurrentUserId());

    if (nominations == null) {
      throw new ResourceNotFoundException("Training", "trainingId", trainingId);
    }

    return nominations;
  }

  @PostMapping("/forms/trainings/{trainingId}/nominate")
  public ApiResponse nominateUser(@PathVariable long trainingId) throws MessagingException, UnsupportedEncodingException {

    Nomination newNomination = theTrainingService.addNomination(trainingId, getCurrentUserId());

    if (newNomination == null) {
      throw new ResourceNotFoundException("Training/User", "trainingId/userId", trainingId);
    }

    return new ApiResponse(true, "created new nomination for trainingId : " + trainingId);
  }

  @PostMapping("/forms/trainings/{trainingId}/updateprogress")
  public ApiResponse updateTrainingProgress(@PathVariable long trainingId, @RequestBody TrainingProgress progress) {

    Nomination updatedNomination = theTrainingService.updateProgress(trainingId, getCurrentUserId(),
        progress.getProgress());

    if (updatedNomination == null) {
      throw new ResourceNotFoundException("Training?User", "trainingId?userId", trainingId);
    }

    return new ApiResponse(true, "updated progress to " + progress.getProgress());
  }
}
