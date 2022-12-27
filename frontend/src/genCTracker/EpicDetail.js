import React, { useState, useRef, useEffect, useMemo } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-validation/build/button";
// import "../../css/billabilityplan.css";
import { CURRENT_USER, UI_URL } from "../common/constants";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
// import epicService from "../../services/epic.service";
import classes from "./GenCTrackerComponents.module.css";

import {
  required,
  validateName,
  validatePositiveNumber,
} from "../common/validators";
// import EpicDevWatermark from "./EpicDevWatermark";
// import CancelEpic from "./CancelEpic";
import { apiGetEpic, apiGetEpicStories } from "../utils/AppUtils";
import StoryList from "./StoryList";

const EpicDetail = function () {
  const form = useRef();
  const checkBtn = useRef();
  const [epicData, setEpicData] = useState(null);
  const [storiesData, setStoriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [isCanceling, setIsCanceling] = useState(false);
  const [hasRecords, setHasRecords] = useState(false);
  const [params, setParams] = useSearchParams();
  // const navigate = useNavigate();

  const { epicId } = useParams();
  const epicTableColumns = [
    { accessor: "name", label: "Name", colSize: "20" },
    {
      accessor: "expectedStoryPoint",
      label: "Expected Story Point",
      colSize: "10",
    },
    { accessor: "eta", label: "ETA", colSize: "10" },
  ];

  useEffect(() => {
    getEpicData();
    getStoriesData();
  }, []);

  const getEpicData = () => {
    setIsLoading(true);
    apiGetEpic(epicId)
      .then(
        (response) => {
          setEpicData(response);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();
          window.alert(_content);
        }
      )
      //TODO: remove finally
      .finally(() => {
        setIsLoading(false);
        // setEpicData(DUMMY_TRAINING);
      });
  };

  const getStoriesData = () => {
    setIsLoading(true);
    apiGetEpicStories(epicId, params.toString())
      .then(
        (response) => {
          setStoriesData(response);
          response.length > 0 && setHasRecords(true);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();
          window.alert(_content);
        }
      )
      //TODO: remove finally
      .finally(() => {
        setIsLoading(false);
        // setEpicData(DUMMY_TRAINING);
      });
  };

  // const onCancelHandler = (e) => {
  //   e.preventDefault();
  //   setIsCanceling(true);
  // };

  // const cancelHandler = (isSuccessful) => {
  //   if (isSuccessful) {
  //     navigate("/ui/forms/epics?progress=avg");
  //   }

  //   setIsCanceling(false);
  // };

  return (
    <div className={classes.container}>
      {isLoading && (
        <div className="loader-container">
          {/* <div className="spinner"></div> */}
        </div>
      )}
      {/* <EpicDevWatermark name="Divyam Arora" /> */}
      {epicData && (
        <>
          <h5 className={classes.formheading}>{epicData.name} Stories</h5>
          {/* <table
            className={classes.table}
            style={{ float: "none", marginBottom: "1rem" }}
          >
            <thead>
              <tr className={classes.tablehead}>
                {epicTableColumns.map((column) => {
                  return (
                    <th key={column.accessor}>
                      <span>{column.label}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className={classes.tablerow}>
                <td>
                  <span>{epicData.name}</span>
                </td>
                <td>
                  <span>{epicData.expectedStoryPoint}</span>
                </td>
                <td>
                  <span>{new Date(epicData.eta).toDateString()}</span>
                </td>
              </tr>
            </tbody>
          </table> */}
        </>
      )}
      {storiesData && <StoryList stories={storiesData} />}
    </div>
  );
};

export default EpicDetail;
