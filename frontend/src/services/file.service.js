import http from "../common/http";
import { ACCESS_TOKEN } from "../common/constants";

const uploadFile = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return http.post("/assignmentsheet", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
    onUploadProgress,
  });
};

const uploadFileWithData = (dataObject, file, objectType, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append(objectType, JSON.stringify(dataObject));

  return http.post("/forms/" + objectType, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
    onUploadProgress,
  });
};

const uploadFileWithDataProfileLinkToPanel = (dataObject, file, objectType, panelistId, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  console.log(dataObject);
  console.log(objectType);
  console.log(panelistId);
  formData.append(objectType, JSON.stringify(dataObject));

  return http.post("/forms/" + objectType + "/" + panelistId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
    onUploadProgress,
  });
};

const FileService = {
  uploadFile,
  uploadFileWithData,
  uploadFileWithDataProfileLinkToPanel
};

export default FileService;
