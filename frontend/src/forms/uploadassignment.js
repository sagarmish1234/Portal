import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import CheckButton from "react-validation/build/button";
import FileService from "../services/file.service";
import "../css/spinner.css";
import AuthService from "../services/auth.service";
import { UI_URL } from "../common/constants";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const UploadAssignment = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const selectFile = (event) => {
    setSelectedFiles(event.target.files[0]);

    setSelectedFiles((state) => {
      return state;
    });
  };

  const upload = () => {
    setIsLoading(true);
    FileService.uploadFile(selectedFiles, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setIsLoading(false);
        navigate(UI_URL + "home");
        window.location.reload();
      })
      .catch(() => {
        setMessage("Failed to upload the file!");
        setIsLoading(false);
      });

    setSelectedFiles(undefined);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="col-md-12">
        <div className="card card-container">
          <Form ref={form}>
            <div className="form-group">
              <Input
                className="createform-inputfile"
                name="file"
                size="large"
                onChange={selectFile}
                type="file"
              />
            </div>

            <div className="alert alert-light" role="alert">
              <p className="text-danger">{message}</p>
            </div>
            <div className="form-group">
              <Button
                className="btn btn-dark"
                disabled={!selectedFiles}
                onClick={upload}
                type="button"
              >
                Upload
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;
