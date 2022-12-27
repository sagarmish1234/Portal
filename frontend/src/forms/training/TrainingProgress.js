import React, { useState, useRef, useEffect, useMemo } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
import "../../css/billabilityplan.css";
import { CURRENT_USER_FULLNAME, UI_URL } from "../../common/constants";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import trainingService from "../../services/training.service";
import { apiGetCurrentUser } from "../../utils/AppUtils";
import classes from "./TrainingComponents.module.css";

import {
  required,
  validateName,
  validatePositiveNumber,
  validatePercentage,
} from "../../common/validators";
import TrainingDevWatermark from "./TrainingDevWatermark";
import AuthService from "../../services/auth.service";
import Spinner from "./Spinner";

const TrainingProgress = function ({ updateHandler, trainingData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const cardRef = useRef();
  const backdropRef = useRef();
  const inputRef = useRef();

  const closeModal = (isSuccessful, progress) => {
    if (isLoading) return;

    cardRef.current.classList.contains(classes.openCard) &&
      cardRef.current.classList.toggle(classes.closeCard);
    backdropRef.current.classList.toggle(classes.closeBackdrop);
    setTimeout(() => {
      updateHandler(isSuccessful, progress);
    }, 300);
  };

  const onBackdropClose = (e) => {
    if (e.target.classList.contains(classes.backdrop) && !isLoading) {
      closeModal();
    }
  };

  const onConfirm = (e) => {
    setIsLoading(true);
    const progress = inputRef.current.value;
    if (progress <= 0 || progress > 100) {
      inputRef.current.classList.add(classes.invalid);
      inputRef.current.classList.remove(classes.valid);
      setIsLoading(false);
      return;
    } else {
      inputRef.current.classList.remove(classes.invalid);
      inputRef.current.classList.add(classes.valid);
    }
    trainingService
      .updateTrainingProgress(trainingData.trainingId, progress)
      .then((response) => {
        setMessage("Progress updated successfully.");
        setSuccessful(true);
        setIsLoading(false);
        closeModal(true, progress);
      })
      .catch((error) => {
        setMessage("Progress update failed.");
        setIsLoading(false);
        setSuccessful(false);
      });
    console.log(message);
  };

  const onClose = (e) => {
    closeModal(false);
  };

  return (
    <div
      ref={backdropRef}
      className={classes.backdrop + " " + classes.openBackdrop}
      onClick={onBackdropClose}
    >
      <div
        ref={cardRef}
        className={
          "card card-container-form " + classes.card + " " + classes.openCard
        }
      >
        <h5 className={classes.formheading}>Enter Progress</h5>
        <div
          className={
            classes.input +
            " " +
            classes["margin-top-sm"] +
            " " +
            classes["margin-bottom"]
          }
        >
          <label htmlFor="input">Progress: </label>
          <div>
            <input
              ref={inputRef}
              id="input"
              type={"number"}
              placeholder={trainingData.trainingProgress}
              className={"form-control " + classes.unvalidated}
              onChange={() => {
                inputRef.current.classList.remove(classes.invalid);
              }}
            />
            <p>Invalid form input.</p>
          </div>
        </div>
        <div className={classes["flex-row-right"]}>
          {isLoading && <Spinner />}
          <button
            className="btn btn-primary"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Confirm
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Close
          </button>
        </div>
        {message && (
          <div className={"form-group " + classes["margin-top"]}>
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
      </div>
    </div>
  );
};

export default TrainingProgress;
