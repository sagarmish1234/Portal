import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  default as Button,
  default as CheckButton,
} from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { textarea } from "react-validation/build/textarea";
import { UI_URL } from "../common/constants";
import "../css/spinner.css";
import "../css/tableforms.css";
import DataService from "../services/data.service";
import classes from "./GenCTrackerComponents.module.css";

import { required, validatePositiveNumber } from "../common/validators";
import { apiCreateEpic, apiGetAllParentAccounts } from "../utils/AppUtils";

// import TrainingDevWatermark from "./TrainingDevWatermark";

const EpicForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expectedStoryPoint, setExpectedStoryPoint] = useState("");
  const [eta, setEta] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangeName = (e) => {
    const vName = e.target.value;
    setName(vName);
  };

  const onChangeDescription = (e) => {
    const vName = e.target.value;
    setDescription(vName);
  };

  const onChangeETA = (e) => {
    const vETA = e.target.value;
    setEta(new Date(vETA));
  };

  const onChangeExpectedStoryPoint = (e) => {
    const vESP = e.target.value;
    setExpectedStoryPoint(vESP);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);
    setIsLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const epic = {
        name,
        description,
        expectedStoryPoint,
        eta,
      };

      apiCreateEpic(epic)
        .then((response) => {
          setMessage(response.message);

          setIsLoading(false);
          setSuccessful(true);
          navigate(UI_URL + "gencTracker/epics");
        })
        .catch((error) => {
          setMessage(error.message);

          setIsLoading(false);
          setSuccessful(false);
        });
    }
  };

  return (
    <>
      {/* <TrainingDevWatermark name="Divyam Arora" /> */}
      <div className="col-md-12">
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="card card-container-form">
          <h5 className={classes.formheading}>New Epic</h5>
          <Form onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>
                <table className="tableform">
                  <tbody>
                    <tr>
                      <td className={classes.tableformlabels}>
                        <label htmlFor="name">Name:</label>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          name="name"
                          value={name}
                          onChange={onChangeName}
                          validations={[required]}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.tableformlabels}>
                        <label htmlFor="description">Description:</label>
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          name="description"
                          value={description}
                          onChange={onChangeDescription}
                          validations={[required]}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.tableformlabels}>
                        <label htmlFor="expectedstorypoint">
                          Expected story point:
                        </label>
                      </td>
                      <td>
                        <Input
                          type="number"
                          className="form-control"
                          name="expectedstorypoint"
                          value={expectedStoryPoint}
                          onChange={onChangeExpectedStoryPoint}
                          validations={[required, validatePositiveNumber]}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className={classes.tableformlabels}>
                        <label htmlFor="eta">ETA:</label>
                      </td>
                      <td>
                        <Input
                          type="Date"
                          className="form-control"
                          name="eta"
                          // value={eta}
                          onChange={onChangeETA}
                          validations={[required]}
                        />
                      </td>
                    </tr>

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

export default EpicForm;
