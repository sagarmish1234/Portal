import React, { useState, useRef, useEffect, useMemo } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
import "../../css/billabilityplan.css";
import { UI_URL } from "../../common/constants";
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
import Spinner from "./Spinner";
// import Modal from "./Modal";

const NominateTraining = function ({ nominationHandler, trainingData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const cardRef = useRef();
  const backdropRef = useRef();

  const closeModal = (isSuccessful) => {
    if (isLoading) return;

    cardRef.current.classList.contains(classes.openCard) &&
      cardRef.current.classList.toggle(classes.closeCard);
    backdropRef.current.classList.toggle(classes.closeBackdrop);
    setTimeout(() => {
      nominationHandler(isSuccessful);
    }, 300);
  };

  const onBackdropClose = (e) => {
    if (e.target.classList.contains(classes.backdrop) && !isLoading) {
      closeModal();
    }
  };

  const onConfirm = (e) => {
    setIsLoading(true);
    trainingService
      .nominateTraining(trainingData.trainingId)
      .then((response) => {
        setMessage("Nomination Successfull");
        setSuccessful(true);
        setIsLoading(false);
        closeModal(true);
      })
      .catch((error) => {
        setMessage("Nomination Failed");
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
        <h5 className={classes.formheading}>Nominate</h5>
        <span className={classes["margin-bottom"]}>
          Confirm your nomination for "{trainingData.trainingTitle}" training.
        </span>
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

export default NominateTraining;
