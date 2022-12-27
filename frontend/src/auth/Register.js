import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import {
  passwordValidator,
  required,
  idValidator,
  emailValidator,
  confirmPasswordValidator,
} from "../common/validators";
import UserIcon from "../images/user.svg";
import "../css/register.css";

import AuthService from "../services/auth.service";

const cpassword = (password, confPassword) => {
  if (password !== confPassword.value) {
    return (
      <div className="invalid-feedback d-block">The password do not match</div>
    );
  }
  return "";
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const navigate = useNavigate();

  const [associateId, setAssociateId] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeAssociateId = (e) => {
    const associateId = e.target.value;
    setAssociateId(associateId);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfPassword = (e) => {
    const confPassword = e.target.value;
    setConfPassword(confPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    const signupRequest = {
      associateId: associateId,
      password: password,
      cpassword: confPassword,
    };

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(signupRequest).then(
        (response) => {
          // setMessage(response.data.message);
          setSuccessful(true);
          navigate("/ui/login");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <div className="card">
        <img src={UserIcon} alt="User" className="profile-img-card" />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="cognzantId" className="formlabel">
                  AssociateID
                </label>
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
                <label htmlFor="password" className="formlabel">
                  Password
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, passwordValidator]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpassword" className="formlabel">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="cpassword"
                  value={confPassword}
                  onChange={onChangeConfPassword}
                  validations={[required, cpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block formsubmitbutton">
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful
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

export default Register;
