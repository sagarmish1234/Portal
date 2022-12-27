import React, { useState, useRef, useEffect, useMemo } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
import "../../css/billabilityplan.css";
import { CURRENT_USER, UI_URL } from "../../common/constants";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import trainingService from "../../services/training.service";
import classes from "./TrainingComponents.module.css";

import {
  required,
  validateName,
  validatePositiveNumber,
} from "../../common/validators";
import TrainingDevWatermark from "./TrainingDevWatermark";
import CancelTraining from "./CancelTraining";

const DUMMY_TRAINING = {
  id: "1",
  nameOfTraining: "Java",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  skillSet: "Java",
  isClassroom: false,
  participationLimit: 40,
  nominations: 30,
};

const TrainingDetail = function () {
  const form = useRef();
  const checkBtn = useRef();
  const [trainingData, setTrainingData] = useState(null);
  const [nominationsData, setNominationsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [hasRecords, setHasRecords] = useState(false);
  const navigate = useNavigate();

  const { trainingId } = useParams();

  const trainingTableColumns = [
    { accessor: "title", label: "Title", colSize: "20" },
    { accessor: "startdate", label: "Start Date", colSize: "10", type: "date" },
    { accessor: "enddate", label: "End Date", colSize: "10", type: "date" },
    { accessor: "skill", label: "Skill", colSize: "20" },
    { accessor: "online/Classroom", label: "Online/Classroom", colSize: "6" },
    {
      accessor: "participationlimit",
      label: "Participation Limit",
      colSize: "5",
    },
    {
      accessor: "nominations",
      label: "Nominations",
      colSize: "5",
    },
    {
      accessor: "avgprogress",
      label: "Avg. Progress",
      colSize: "5",
    },
    { accessor: "action", label: "Action", colSize: "20" },
  ];

  const nominationTableColumns = [
    { accessor: "associateid", label: "Associate Id", colSize: "20" },
    { accessor: "associatename", label: "Associate Name", colSize: "10" },
    { accessor: "progress", label: "progress", colSize: "10" },
  ];

  useEffect(() => {
    getTrainingData();
    getNominationsData();
  }, []);

  const getTrainingData = () => {
    setIsLoading(true);
    trainingService
      .getTraining(trainingId, {})
      .then(
        (response) => {
          setTrainingData(response);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();
          window.alert(_content);
        }
      )
      //TODO: remove finally
      .finally(() => {
        setIsLoading(false);
        // setTrainingData(DUMMY_TRAINING);
      });
  };

  const getNominationsData = () => {
    setIsLoading(true);
    trainingService
      .getTrainingNominations(trainingId)
      .then(
        (response) => {
          setNominationsData(response);
          response.length > 0 && setHasRecords(true);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();
          window.alert(_content);
        }
      )
      //TODO: remove finally
      .finally(() => {
        setIsLoading(false);
        // setTrainingData(DUMMY_TRAINING);
      });
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    setIsCanceling(true);
  };

  const cancelHandler = (isSuccessful) => {
    if (isSuccessful) {
      navigate("/ui/forms/trainings?progress=avg");
    }

    setIsCanceling(false);
  };

  return (
    <div className={classes.container}>
      {isLoading && (
        <div className="loader-container">
          {/* <div className="spinner"></div> */}
        </div>
      )}
      <TrainingDevWatermark name="Divyam Arora" />
      <h5 className={classes.formheading}>Nominations</h5>
      {trainingData && (
        <table
          className={classes.table}
          style={{ float: "none", marginBottom: "1rem" }}
        >
          <thead>
            <tr className={classes.tablehead}>
              {trainingTableColumns.map((column) => {
                return (
                  <th key={column.accessor}>
                    <span>{column.label}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className={classes.tablerow}>
              <td>
                <span>{trainingData.training.title}</span>
              </td>
              <td>
                <span>
                  {new Date(trainingData.training.startDate).toDateString()}
                </span>
              </td>
              <td>
                <span>
                  {new Date(trainingData.training.endDate).toDateString()}
                </span>
              </td>
              <td>
                <span>{trainingData.training.skill?.skillName}</span>
              </td>
              <td>
                <span>
                  {trainingData.training.isClassroom ? "Classroom" : "Online"}
                </span>
              </td>
              <td>
                <span>
                  {trainingData.training.isClassroom
                    ? trainingData.training.participationLimit
                    : "---"}
                </span>
              </td>
              <td>
                <span>{trainingData.training.nominations}</span>
              </td>
              <td>
                <span>{trainingData.avgProgress}</span>
              </td>
              <td>
                <button className={classes.button} onClick={onCancelHandler}>
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {nominationsData && (
        <table
          className={classes.table}
          style={{ float: "none", maxWidth: "800px", margin: "auto" }}
        >
          <thead>
            <tr className={classes.tablehead}>
              {nominationTableColumns.map((column) => {
                return (
                  <th key={column.accessor}>
                    <span>{column.label}</span>
                  </th>
                );
              })}
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {nominationsData.map((row, i) => {
              return (
                <tr key={row.associateId} className={classes.tablerow}>
                  <td>
                    <span>{row.associateId}</span>
                  </td>
                  <td>
                    <span>{row.associateName}</span>
                  </td>
                  <td>
                    <span>{row.progress}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!hasRecords && <p className={classes.info}>No Records</p>}
      {isCanceling && (
        <CancelTraining
          cancelHandler={cancelHandler}
          trainingData={trainingData}
        />
      )}
    </div>
  );
};

export default TrainingDetail;
