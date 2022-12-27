import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { UI_URL } from "../../common/constants";
import DataService from "../../services/data.service";
import { required, validatorNumber } from "../../common/validators";
import "../../css/general.css";
import classes from "./ramp.css";
import Select from "react-select";
import RampdownService from "../../services/rampdown.service";

const Rampproject = () => {
  const [ProjectIdList, setProjectIdList] = useState([]);
  const [loblist, setLobList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectManagerName, setProjectManagerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [lob, setlob] = useState("");
  const [ProjectId, setProjectId] = useState("");

  // LObList useEffect
  useEffect(() => {
    setIsLoading(true);
    DataService.getLOBList()
      .then(
        (response) => {
          const LobList = [];
          response.forEach((item, index) => {
            LobList.push({
              value: item,
              label: item,
            });
          });
          setLobList(LobList);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();
          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //get Project Id by lob use effect

  useEffect(() => {
    ProjectIdsList();
  }, [lob]);

  const ProjectIdsList = () => {
    if (lob && lob != "") {
      RampdownService.ProjectIdList(lob)
        .then(
          (response) => {
            const projectids = [];
            response.forEach((item, index) => {
              projectids.push({
                value: item,
                label: item,
              });
            });
            setProjectIdList(projectids);
          },
          (error) => {
            const _content =
              (error.response && error.response) ||
              error.message ||
              error.toString();

            setMessage(_content);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  //get project name and project manager name from project id  use effect

  useEffect(() => {
    ProjectNamesAndManagerName();
  }, [ProjectId]);

  const ProjectNamesAndManagerName = () => {
    if (lob && lob != "" && ProjectId && ProjectId != "") {
      RampdownService.ProjectNameAndManagerName(ProjectId)
        .then(
          (response) => {
            console.log(response.project_description);
            console.log(response.project_manager_name);
            setProjectName(response.project_description);
            setProjectManagerName(response.project_manager_name);
          },
          (error) => {
            const _content =
              (error.response && error.response) ||
              error.message ||
              error.toString();

            setMessage(_content);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onChangeProjectId = (e) => {
    const pid = e.value;
    setProjectId(pid);
  };
  const onChangeLobList = (e) => {
    setlob(e.value);
  };
  return (
    <div>
      <table className={classes.table}>
        <tr>
          
          <td
            style={{
              width: "300px",
              float: "left",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Select
              options={loblist}
              validations={[required]}
              onChange={onChangeLobList}
            ></Select>
          </td>
           {/* <td className={classes.tableformlabels}>
              <label htmlFor="projectName">Project Name:</label>
            </td> */}
            <td style={{width:"auto"}}>
            {projectName} 
            </td>
  
            {/* <td className={classes.tableformlabels}>
              <label htmlFor="projectName">Project Manager_Name:</label>
            </td> */}
            <td style={{width:"auto"}}>
            {projectManagerName} 
            </td>
          <td
            style={{
              width: "300px",
              float: "Right",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Select
              options={ProjectIdList}
              validations={[required]}
              onChange={onChangeProjectId}
            ></Select>
          </td>
        </tr>
      </table>

      <table className={classes.table}>
        <tr className={classes.tablehead}>
          <th style={{ width: "auto" }}>Associate ID</th>
          <th style={{ width: "auto" }}>Associate Name</th>
          <th>Associate Designation</th>
          <th>January</th>
          <th>Feburary</th>
          <th>March</th>
          <th>April</th>
          <th>May</th>
          <th>June</th>
          <th>July</th>
          <th>August</th>
          <th>September</th>
          <th>October</th>
          <th>November</th>
          <th>December</th>
        </tr>
      </table>
    </div>
  );
};
export default Rampproject;
