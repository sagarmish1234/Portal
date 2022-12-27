import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
import DataService from "../../services/data.service";
import "../../css/tableforms.css";
import Select from "react-select";
import FileService from "../../services/file.service";
import "../../css/spinner.css";
import { useNavigate } from "react-router-dom";
import { UI_URL } from "../../common/constants";

import {
  required,
  validateNumber,
  validateName,
  validatePhone,
  validEmail,
} from "../../common/validators";


const Referrals  = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skillId, setSkillId] = useState(undefined);
  const [skills, setSkills] = useState([]);
  const [skillViews, setSkillViews] = useState([]);
  const [experience, setExperience] = useState("");
  const [referredById, setReferredById] = useState("");
  const [referredByName, setReferredByName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [statusId, setStatusId] = useState(undefined);

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

  const onChangeCandidateName = (e) => {
    const vCandidateName = e.target.value;
    setCandidateName(vCandidateName);
  };

  const onChangeEmail = (e) => {
    const vEmail = e.target.value;
    setEmail(vEmail);
  };

  const onChangePhone = (e) => {
    const vPhone = e.target.value;
    setPhone(vPhone);
  };

  const onSkillChange = (event) => {
    setSkillId(event.value);
  };

  // const onStatusChange = (event) => {
  //   setStatusId(event.value);
  // };

  const onChangeExperience = (e) => {
    const vExperience = e.target.value;
    setExperience(vExperience);
  };

  const onChangeRefferedById = (e) => {
    const vRefferedById = e.target.value;
    setReferredById(vRefferedById);
  };

  const onChangeRefferedByName = (e) => {
    const vRefferedByName = e.target.value;
    setReferredByName(vRefferedByName);
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
      const createReferralRequest = {
        candidateName: candidateName,
        email: email,
        phone: phone,
        skillId: skillId,
        experience: experience,
        referredById: referredById,
        referredByName: referredByName,
        statusId: statusId,
        
      };

      console.log(createReferralRequest);

      FileService.uploadFileWithData(
        createReferralRequest,
        selectedFiles,
        "createReferralRequest",
        (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        }
      ).then(
        (response) => {
          setSuccessful(true);
          setMessage(response.data.message);
          setIsLoading(false);

          navigate(UI_URL + "data/getAllReferrals");
          window.location.reload();
          console.log(response.data.message);
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
    <p style={{textAlign: "right"}}><b>Developed by: Susil(2102741)</b></p>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="card card-container-form">
        <label className="formheading">Upload Referral</label>
        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <table className="tableform">
                <tbody>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="candidateName">Candidate Name:</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="candidateName"
                        value={candidateName}
                        onChange={onChangeCandidateName}
                        validations={[required, validateName]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="email">Email:</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
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
                      <label htmlFor="experience">Experience: </label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="experience"
                        value={experience}
                        onChange={onChangeExperience}
                        validations={[required, validateNumber]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="referredById">RefferedBy (ID): </label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="referredById"
                        value={referredById}
                        onChange={onChangeRefferedById}
                        validations={[required, validateNumber]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="referredByName">
                        RefferedBy (Name):{" "}
                      </label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="referredByName"
                        value={referredByName}
                        onChange={onChangeRefferedByName}
                        validations={[required, validateName]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="selectedFile">Resume: </label>
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
                        className="btn btn-primary btn-block"
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

export default Referrals;