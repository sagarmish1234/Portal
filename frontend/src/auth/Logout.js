import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const Logout = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout();

    currentUser = undefined;
    navigate("/");
    window.location.reload();
  }, []);

  return <></>;
};
export default Logout;
