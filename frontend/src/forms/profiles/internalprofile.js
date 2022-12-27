import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
import DataService from "../../services/data.service";

import Select from "react-select";
import FileService from "../../services/file.service";
import "../../css/spinner.css";
import "../../css/tableforms.css";
import "../../css/general.css";
import { useNavigate } from "react-router-dom";
import { UI_URL } from "../../common/constants";

import {
  required,
  validateNumber,
  validateName,
  validatePhone,
} from "../../common/validators";

const InternalProfile = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [associateId, setAssociateId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [skillId, setSkillId] = useState(undefined);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [isOnsite, setIsOnsite] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillViews, setSkillViews] = useState([]);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    DataService.getAllSkillFamily().then(
      (response) => {
        const skillView = [];
        response.forEach((skill, index) => {
          skillView.push({
            value: skill.id,
            label: skill.skillName,
          });
        });
        setSkillViews(skillView);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );
  }, []);

  const onChangeAssociateId = (e) => {
    const vAssociateId = e.target.value;
    setAssociateId(vAssociateId);
  };

  const onChangeFullName = (e) => {
    const vFullName = e.target.value;
    setFullName(vFullName);
  };

  const onChangePhone = (e) => {
    const vPhone = e.target.value;
    setPhone(vPhone);
  };

  const onChangeCity = (e) => {
    const vCity = e.target.value;
    setCity(vCity);
  };

  const onSkillChange = (event) => {
    setSkillId(event.value);
  };

  const onIsOnsiteChange = (event) => {
    var isChecked = event.target.checked;
    setIsOnsite(isChecked);
  };

  const onIsUpdateChange = (event) => {
    var isChecked = event.target.checked;
    setIsUpdate(isChecked);
  };

  const selectFile = (event) => {
    setSelectedFiles(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const createProfileRequest = {
        associateId: associateId,
        fullName: fullName,
        phone: phone,
        city: city,
        skillId: skillId,
        isOnsite: isOnsite,
        isInternal: true,
        updateIfAlreadyExists: isUpdate,
      };

      console.log(createProfileRequest);

      FileService.uploadFileWithData(
        createProfileRequest,
        selectedFiles,
        "createProfileRequest",
        (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        }
      ).then(
        (response) => {
          setSuccessful(true);
          setMessage(response.data.message);
          setIsLoading(false);

          navigate(UI_URL + "data/getAllProfiles");
          window.location.reload();
        },
        (error) => {
          console.log(error);
          setSuccessful(false);
          setMessage(error.message);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="card card-container-form">
        <label className="formheading">Upload Profile</label>
        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <table className="tableform">
                <tbody>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="associateId">Associate ID: </label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="associateId"
                        value={associateId}
                        onChange={onChangeAssociateId}
                        validations={[required, validateNumber]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="fullName">Name:</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={fullName}
                        onChange={onChangeFullName}
                        validations={[required, validateName]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="phone">Phone: </label>
                    </td>

                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={onChangePhone}
                        validations={[required, validatePhone]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="city">City: </label>{" "}
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="city"
                        value={city}
                        onChange={onChangeCity}
                        validations={[required, validateName]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="isOnsite">Is Onsite: </label>
                    </td>
                    <td>
                      <Input
                        type="checkbox"
                        name="isOnsite"
                        onChange={onIsOnsiteChange}
                        value={isOnsite}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="isUpdate">
                        Update if already exists:
                      </label>
                    </td>
                    <td>
                      <Input
                        type="checkbox"
                        name="isUpdate"
                        onChange={onIsUpdateChange}
                        value={isUpdate}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="skillId">Skill: </label>
                    </td>
                    <td>
                      <Select
                        onChange={onSkillChange}
                        options={skillViews}
                      ></Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="selectedFile">Profile: </label>
                    </td>
                    <td>
                      <Input
                        className="form-control"
                        name="selectedFile"
                        onChange={selectFile}
                        type="file"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels"></td>
                    <td>
                      <Button
                        className="btn btn-primary btn-block formsubmitbutton"
                        disabled={!selectedFiles}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default InternalProfile;
