import {
  apiAddTraining,
  apiGetTrainings,
  apiGetPersonalisedTrainings,
  apiGetTraining,
  apiGetPersonalisedTraining,
  apiNominateTraining,
  apiGetTrainingNominations,
  apiUpdateTrainingProgress,
  apiDeleteTraining,
} from "../utils/AppUtils";

const addTraining = (objAddTraining) => {
  return apiAddTraining(objAddTraining);
};

const getTrainings = () => {
  return apiGetTrainings();
};

const getPersonalisedTrainings = () => {
  return apiGetPersonalisedTrainings();
};

const getTraining = (trainingId, userDetails) => {
  return apiGetTraining(trainingId, userDetails);
};

const getPersonalisedTraining = (trainingId, userDetails) => {
  return apiGetPersonalisedTraining(trainingId, userDetails);
};

const getTrainingNominations = (trainingId) => {
  return apiGetTrainingNominations(trainingId);
};

const nominateTraining = (trainingId) => {
  return apiNominateTraining(trainingId);
};

const updateTrainingProgress = (trainingId, progress) => {
  return apiUpdateTrainingProgress(trainingId, progress);
};

const deleteTraining = (trainingId) => {
  return apiDeleteTraining(trainingId);
};

const trainingService = {
  addTraining,
  getTrainings,
  getPersonalisedTrainings,
  getTraining,
  getPersonalisedTraining,
  getTrainingNominations,
  deleteTraining,
  nominateTraining,
  updateTrainingProgress,
};

export default trainingService;
