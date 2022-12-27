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
import ProfileService from "../../services/profile.service";
import ReferralService from "../../services/referral.service";


const UpdateStatus = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const new_ref = useRef("");

  const { referralId } = useParams();

  const { referralStatus } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [referralInfo, setReferralInfo] = useState([]);
  const [statusViews, setStatusViews] = useState([]);
  const [statusId, setStatusId] = useState(undefined);
  const [status, setStatus] = useState("");

  useEffect(() => {
    ReferralService.getReferralInfo(referralId).then(
      (response) => {
        setReferralInfo(response);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );

    DataService.getAllCategoryFamily().then(
      (response) => {
        const statusView = [];
        response.forEach((category, index) => {
          statusView.push({
            value: category.id,
            label: category.groupValue,
          });
        });
        setStatusViews(statusView);
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

  const onStatusChange = (event) => {
    setStatusId(event.value);
  };

  // console.log(statusId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);

    let userToken = await ReferralService.getStatusFromId(statusId);
    var user = userToken.groupValue

    console.log(userToken);


    ReferralService.updateReferralStatus(user,referralId).then((response) => {

      setSuccessful(true);
      setMessage(response.data?.message);
      setIsLoading(false);

      navigate(UI_URL + "data/getAllReferrals");
      window.location.reload();

    },
    (error) => {
      console.log(error);
      setSuccessful(false);
      setMessage(error.message);
      setIsLoading(false);
    }

    );
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
      <p style={{textAlign: "right"}}><b>Developed by: Susil(2102741)</b></p>
      <div className="card card-container-form">
        <label className="formheading">Referral</label>
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
                        value={referralInfo.candidateName}
                        disabled="true"
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
                        value={referralInfo.email}
                        disabled="true"
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
                        value={referralInfo.phone}
                        disabled="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label>Skill: </label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="skill"
                        value={referralInfo.skill?.skillName}
                        disabled="true"
                      />
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
                        value={referralInfo.experience}
                        disabled="true"
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
                        value={referralInfo.referredById}
                        disabled="true"
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
                        value={referralInfo.referredByName}
                        disabled="true"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="statusId">Status: </label>
                    </td>
                    <td>
                      <Select
                        onChange={onStatusChange}
                        options={statusViews}
                      ></Select>
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

export default UpdateStatus;
