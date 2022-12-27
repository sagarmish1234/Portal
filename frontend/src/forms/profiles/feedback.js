import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
import TextArea from "react-validation/build/textarea";
import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";
import "../../css/tableforms.css";
import "../../css/tablelist.css";
import Select from "react-select";
import FileService from "../../services/file.service";
import "../../css/spinner.css";
import "../../css/feedback.css";
import { useNavigate } from "react-router-dom";
import { UI_URL } from "../../common/constants";

import {
  required,
  validateNumber,
  validateName,
  validatePhone,
  validateDescription,
} from "../../common/validators";
import ProfileService from "../../services/profile.service";

const ProfileFeedback = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const { profileId } = useParams();
  const FEEDBACK_SUCCESS = 2;
  const associateName = AuthService.getCurrentUserFullName();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [panelName, setPanelName] = useState("");

  const todayDate = new Date();
  const formatDate =
    todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate();
  const formatMonth =
    todayDate.getMonth() < 9
      ? `0${todayDate.getMonth() + 1}`
      : todayDate.getMonth() + 1;
  const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join(
    "-"
  );
  const [evaluationDate, setEvaluationDate] = useState(formattedDate);
  const [evaluationResult, setEvaluationResult] = useState(0);
  const [evaluationResultCategory, setEvaluationResultCategory] = useState(0);
  const [detailedFeedback, setDetailedFeedback] = useState("");
  const [profileInfo, setProfileInfo] = useState([]);
  const [evaluationResultList, setEvaluationResultList] = useState([]);
  const [evaluationResultCategoryList, setEvaluationResultCategoryList] =
    useState([]);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    DataService.getEvaluationResults().then(
      (response) => {
        const resultView = [];
        response.forEach((result, index) => {
          resultView.push({
            value: result.id,
            label: result.result,
          });
        });
        setEvaluationResultList(resultView);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );

    DataService.getRejectionCategories().then(
      (response) => {
        const resultView = [];
        response.forEach((result, index) => {
          resultView.push({
            value: result.id,
            label: result.resultCategory,
          });
        });
        setEvaluationResultCategoryList(resultView);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );

    ProfileService.getProfileInfo(profileId).then(
      (response) => {
        setProfileInfo(response);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );
  }, []);

  const onChangePanelName = (e) => {
    const vPanelName = e.target.value;
    setPanelName(vPanelName);
  };

  const onChangeEvaluationDate = (e) => {
    const vDate = e.target.value;
    setEvaluationDate(vDate);
  };

  const onChangeEvaluationResult = (e) => {
    const vEvaluationResult = e.value;
    console.log(vEvaluationResult);
    setEvaluationResult(vEvaluationResult);
  };

  const onChangeRejectionCategory = (e) => {
    const vRejectionCategory = e.value;
    setEvaluationResultCategory(vRejectionCategory);
  };

  const onChangeDetailedFeedback = (event) => {
    setDetailedFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const createProfileFeedback = {
        profileId: profileId,
        panelName: associateName,
        evaluationDate: evaluationDate,
        evaluationResult: evaluationResult,
        evaluationResultCategory: evaluationResultCategory,
        detailedFeedback: detailedFeedback,
      };

      if (createProfileFeedback.evaluationResult == FEEDBACK_SUCCESS) {
        createProfileFeedback.evaluationResultCategory = undefined;
      }

      ProfileService.addProfileFeedback(createProfileFeedback).then(
        (response) => {
          console.log("Feedback added");
          /*setSuccessful(true);
          setMessage(response.data.message);
          setIsLoading(false); */

          navigate(UI_URL + "data/getAllProfiles");
          window.location.reload();
        },
        (error) => {
          console.log("Feedback failed");
          setSuccessful(false);
          setMessage(error.message);
          setIsLoading(false);
        }
      );
    }
  };

  const renderFeedbacks = () => {
    return profileInfo.feedbacks.map((feedback, index) => {
      return (
        <tr className="profilerow">
          <td className="tdleftcontent">{feedback.evaluationDate}</td>
          <td className="tdleftcontent">{feedback.panelName}</td>
          <td className="tdleftcontent">{feedback.result.result}</td>
          <td className="tdleftcontent">
            {feedback.resultCategory ? (
              feedback.resultCategory.resultCategory
            ) : (
              <></>
            )}
          </td>
          <td className="tdleftcontent">{feedback.comments}</td>
        </tr>
      );
    }); //ends return loop
  };

  return (
    <div>
      {profileInfo &&
        profileInfo.feedbacks &&
        profileInfo.feedbacks.length > 0 ? (
        <div>
          <label className="formheading">Feedbacks</label>
          <table className="gdvheader" width="100%">
            <tbody>
              <tr>
                <th key="0" className="tdleftcontent">
                  Date
                </th>
                <th key="1" className="tdleftcontent">
                  Panel
                </th>
                <th key="2" className="tdleftcontent">
                  Result
                </th>
                <th key="3" className="tdleftcontent">
                  Rejection Result
                </th>
                <th key="4" className="tdleftcontent">
                  Detailed Feedback
                </th>
              </tr>
              {renderFeedbacks()}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      <div className="col-md-12">
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="card card-container-form">
          <label className="formheading">
            Feedback: {profileInfo.fullName}
          </label>
          <Form onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>
                <table className="tableform">
                  <tbody>
                    <tr>
                      <td className="tableformlabels"></td>
                      <td>
                        <Input
                          type="hidden"
                          className="form-control"
                          value={profileInfo.id}
                        />
                      </td>
                    </tr>

                    {/* <tr>
                      <td className="tableformlabels">
                        <label htmlFor="panelName">Panel Name:</label>
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          name="panelName"
                          value={associateName}
                          disabled
                        // onChange={onChangePanelName}
                        // validations={[required, validateName]}
                        />
                      </td>
                    </tr> */}

                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="evaluationDate">Evaluation Date:</label>
                      </td>
                      <td>
                        <Input
                          type="date"
                          className="form-control"
                          name="evaluationDate"
                          value={evaluationDate}
                          onChange={onChangeEvaluationDate}
                          validations={[required]}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="evaluationResult">Result: </label>
                      </td>
                      <td>
                        <Select
                          onChange={onChangeEvaluationResult}
                          options={evaluationResultList}
                        ></Select>
                      </td>
                    </tr>

                    {evaluationResult != FEEDBACK_SUCCESS ? (
                      <>
                        <tr>
                          <td className="tableformlabels">
                            <label htmlFor="evaluationResultCategory">
                              Rejection Category:{" "}
                            </label>
                          </td>
                          <td>
                            <Select
                              onChange={onChangeRejectionCategory}
                              options={evaluationResultCategoryList}
                            ></Select>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}

                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="detailedFeedback">
                          Detailed Feedback:
                        </label>
                      </td>
                      <td>
                        <TextArea
                          className="form-control"
                          name="detailedFeedback"
                          value={detailedFeedback}
                          onChange={onChangeDetailedFeedback}
                          validations={[required, validateDescription]}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="tableformlabels"></td>
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
    </div>
  );
};

export default ProfileFeedback;
