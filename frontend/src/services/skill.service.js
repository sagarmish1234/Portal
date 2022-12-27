import axios from "axios";
import { API_URL } from "../common/constants";
import {
  apiGetAllSkillFamilies,
  apigetAllSkillTrackCat,
  apigetAllSkillTrackFam,
  apiSaveAssociateSkillProfile,
  apiGetSkillCategories,
  apiGetMySkillProfile,
  apiGetAllSkillProficiencies,
  apiGetAllCertificationFamilies,
  apiGetAllSkillCategories,
} from "../utils/AppUtils";

const getAllSkillFamilies = () => {
  return apiGetAllSkillFamilies();
};

const getAllSkillTrackFam = () => {
  return apigetAllSkillTrackFam();
};

const getAllSkillTrackCat = () => {
  return apigetAllSkillTrackCat();
};

const saveAssociateSkillProfile = (associateSkillProfile) => {
  return apiSaveAssociateSkillProfile(associateSkillProfile);
};

const getSkillCategories = (skillFamilyId) => {
  return apiGetSkillCategories(skillFamilyId);
};

const getAllSkillProficiencies = () => {
  return apiGetAllSkillProficiencies();
};

const getAllCertificationFamilies = () => {
  return apiGetAllCertificationFamilies();
};

const getMySkillProfile = () => {
  return apiGetMySkillProfile();
};

const getAllSkillCategories = () => {
  return apiGetAllSkillCategories();
};

const SkillService = {
  getAllSkillFamilies,
  getAllSkillTrackFam,
  getAllSkillTrackCat,
  saveAssociateSkillProfile,
  getSkillCategories,
  getAllSkillProficiencies,
  getAllCertificationFamilies,
  getMySkillProfile,
  getAllSkillCategories,
};

export default SkillService;
