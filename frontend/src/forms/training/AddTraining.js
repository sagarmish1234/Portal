import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  default as Button,
  default as CheckButton,
} from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { UI_URL } from "../../common/constants";
import "../../css/spinner.css";
import "../../css/tableforms.css";
import DataService from "../../services/data.service";
import classes from "./TrainingComponents.module.css";

import { required, validatePositiveNumber } from "../../common/validators";

import trainingService from "../../services/training.service";
import TrainingDevWatermark from "./TrainingDevWatermark";

const AddTraining = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [skillId, setSkillId] = useState(undefined);
  const [sDate, setSDate] = useState(null);
  const [eDate, setEDate] = useState(null);
  const [isClassroom, setIsClassroom] = useState(false);
  const [skillViews, setSkillViews] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [participationLimit, setParticipationLimit] = useState("");

  useEffect(() => {
    setIsLoading(true);
    DataService.getAllSkillFamily()
      .then(
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
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangeTitle = (e) => {
    const vTitle = e.target.value;
    setTitle(vTitle);
  };

  const onChangeSDate = (e) => {
    const sDate = e.target.value;
    setSDate(new Date(sDate));
  };

  const onChangeEDate = (e) => {
    const eDate = e.target.value;
    setEDate(new Date(eDate));
  };

  const onChangeParticipationLimit = (e) => {
    const vParticipationLimit = e.target.value;
    setParticipationLimit(vParticipationLimit);
  };

  const onSkillChange = (event) => {
    setSkillId(event.value);
  };

  const onIsClassroomChange = (event) => {
    var radioButtonValue = event.target.value === "true" ? true : false;
    console.log(radioButtonValue);
    setIsClassroom(radioButtonValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);
    setIsLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const createTrainingRequest = {
        title: title,
        startDate: sDate,
        endDate: eDate,
        skillId: skillId,
        isClassroom: isClassroom,
        participationLimit: participationLimit,
      };

      console.log(createTrainingRequest);

      trainingService
        .addTraining(createTrainingRequest)
        .then((response) => {
          setMessage(response.message);
          console.log(response.message);
          setIsLoading(false);
          setSuccessful(true);
          navigate(UI_URL + "forms/trainings?progress=avg");
        })
        .catch((error) => {
          setMessage(error.message);
          console.log(error);
          setIsLoading(false);
          setSuccessful(false);
        });
    }
  };

  return (
    <>
      <TrainingDevWatermark name="Divyam Arora" />
      <div className="col-md-12">
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="card card-container-form">
          <h5 className={classes.formheading}>Add Training</h5>
          <Form onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>
                <table className="tableform">
                  <tbody>
                    <tr>
                      <td className={classes.tableformlabels}>
                        <label htmlFor="title">Training Title:</label>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          name="title"
                          value={title}
                          onChange={onChangeTitle}
                          validations={[required]}
                        />
                      </td>
                    </tr>

                    <tr className="sdate">
                      <td className={classes.tableformlabels}>
                        <label className="form__label" htmlFor="sdate">
                          Start Date:
                        </label>
                      </td>
                      <td>
                        <Input
                          type="Date"
                          name="startDate"
                          id="sdate"
                          className="form-control"
                          onChange={onChangeSDate}
                          validations={[required]}
                        />
                      </td>
                    </tr>
                    <tr className="edate">
                      <td className={classes.tableformlabels}>
                        <label className="form__label" htmlFor="edate">
                          End Date:
                        </label>
                      </td>
                      <td>
                        <Input
                          type="Date"
                          name="endDate"
                          id="edate"
                          className="form-control"
                          onChange={onChangeEDate}
                          validations={[required]}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className={classes.tableformlabels}></td>
                      <td>
                        <div className="radio-inputs">
                          <label htmlFor="online"> Online: </label>
                          <input
                            type="Radio"
                            name="isClassroom"
                            id="online"
                            value={false}
                            onChange={onIsClassroomChange}
                            checked={!isClassroom}
                            required
                          />
                        </div>
                        <div className="radio-inputs">
                          <label htmlFor="classroom"> Classroom: </label>
                          <input
                            type="Radio"
                            name="isClassroom"
                            id="classroom"
                            value={true}
                            onChange={onIsClassroomChange}
                            checked={isClassroom}
                            required
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className={classes.tableformlabels}>
                        <label htmlFor="skillId">Skill: </label>
                      </td>
                      <td>
                        <Select
                          onChange={onSkillChange}
                          options={skillViews}
                          validations={[required]}
                        ></Select>
                      </td>
                    </tr>
                    {isClassroom && (
                      <tr>
                        <td className={classes.tableformlabels}>
                          <label htmlFor="particiapationLimit">
                            Praticipation limit:
                          </label>
                        </td>
                        <td>
                          <Input
                            type="number"
                            className="form-control"
                            name="particiapationLimit"
                            value={participationLimit}
                            onChange={onChangeParticipationLimit}
                            validations={[required, validatePositiveNumber]}
                          />
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className={classes.tableformlabels}></td>
                      <td>
                        <Button
                          className="btn btn-primary btn-block"
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
    </>
  );
};

export default AddTraining;
