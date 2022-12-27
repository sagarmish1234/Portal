import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import { OTPValidator, idValidator, required } from "../common/validators";
import EmailIcon from "../images/mail.svg";
import "../css/forgotpassword.css";

const ForgetPassword = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const navigate = useNavigate();

  const [associateId, setAssociateId] = useState("");
  const [otp, setOTP] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeAssociateId = (e) => {
    setAssociateId(e.target.value);
  };

  const onChangeOTP = (e) => {
    const otp = e.target.value;
    setOTP(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    // setSuccessful(false);asdasda

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (!successful) {
        AuthService.forgotPasswordInput({ associateId }).then(
          (response) => {
            setMessage(response.message);
            setSuccess(true);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
          }
        );
      } else {
        AuthService.verifyOtp({ otp }).then(
          (response) => {
            setMessage(response.message);
            setSuccess(true);
            setSuccessful(true);
            navigate("/ui/update-password", {
              state: { associateId: associateId },
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccess(false);
          }
        );
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img src={EmailIcon} alt="User" className="profile-img-card" />

        <Form onSubmit={handleSubmit} ref={form}>
          {!successful ? (
            <div>
              <div className="form-group">
                <label htmlFor="email">Associate ID</label>
                <Input
                  type="text"
                  className="form-control"
                  name="associateId"
                  value={associateId}
                  onChange={onChangeAssociateId}
                  validations={[required, idValidator]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block formsubmitbutton">
                  Send OTP
                </button>
              </div>
              <div className="links">
                <Link to="/">Back to login</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="email">Enter OTP</label>
                <Input
                  type="text"
                  className="form-control"
                  name="otp"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={onChangeOTP}
                  validations={[required, OTPValidator]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block formsubmitbutton">
                  Verify OTP
                </button>
              </div>
            </>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  success
                    ? "alert alert-success margintop"
                    : "alert alert-danger margintop"
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

export default ForgetPassword;
