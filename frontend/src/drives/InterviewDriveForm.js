import { useEffect, useRef, useState } from "react";
import Button from "react-validation/build/button";
import DataService from "../services/data.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import CheckButton from "react-validation/build/button";

import { required, validEmail, validateName } from "../common/validators";
import InterviewDriveService from "../services/InterViewDrive.service";
import { useNavigate } from "react-router-dom";
import { UI_URL } from "../common/constants";
import { useLocation } from "react-router";

const InterviewDriveForm = () => {
  const form = useRef();
  const checkBtn = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  let panelistIds = undefined;
  let idriveDate = undefined;
  if (location.state) {
    panelistIds = location.state.panelistIds ? location.state.panelistIds : false;
    idriveDate = location.state.driveDate ? location.state.driveDate : false;
  }

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [skillViews, setSkillViews] = useState([]);
  const [driveName, setDriveName] = useState("");
  const [driveDate, setDriveDate] = useState(new Date());
  const [skillId, setSkillId] = useState(undefined);
  const [isVirtual, setIsVirtual] = useState(true);

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

  const onChangeDriveName = (e) => {
    const vDriveName = e.target.value;
    setDriveName(vDriveName);
  };

  const onChangeDriveDate = (e) => {
    const vDriveDate = e.target.value;
    setDriveDate(vDriveDate);
  };

  const onSkillChange = (event) => {
    setSkillId(event.value);
  };

  const onIsVirtualChange = (event) => {
    var isChecked = event.target.checked;
    setIsVirtual(isChecked);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);
    setIsLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const interviewDriveObj = {
        interviewDriveName: driveName,
        interviewDriveDate: idriveDate ? idriveDate : driveDate,
        skillId: skillId,
        isVirtual: isVirtual,
        panelistIds: panelistIds
      };

      // console.log(interviewDriveObj);

      InterviewDriveService.newDrive(interviewDriveObj).then(
        (response) => {
          setSuccessful(true);
          setIsLoading(false);

          navigate(UI_URL + "reports/interview/alldrives");
          // window.location.reload();
        },
        (error) => {
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
        <label className="formheading">Create Interview Drive</label>
        <Form onSubmit={onSubmitHandler} ref={form}>
          {!successful && (
            <div>
              <table className="tableform">
                <tbody>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="driveName">Drive Name: </label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="driveName"
                        value={driveName}
                        onChange={onChangeDriveName}
                        validations={[required, validateName]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="driveDate">Drive Date:</label>
                    </td>
                    <td>
                      <Input
                        type="date"
                        className="form-control"
                        name="driveDate"
                        value={idriveDate ? idriveDate : driveDate}
                        disabled={idriveDate !== undefined}
                        min={formattedDate}
                        onChange={onChangeDriveDate}
                        validations={[required]}
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
                      <label htmlFor="isVirtual">Is Virtual: </label>
                    </td>
                    <td>
                      <Input
                        type="checkbox"
                        name="isVirtual"
                        checked={isVirtual}
                        onChange={onIsVirtualChange}
                        value={isVirtual}
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
  );
};

export default InterviewDriveForm;
