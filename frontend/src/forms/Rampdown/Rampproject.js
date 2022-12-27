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
import { set } from "react-hook-form";

const Rampproject = () => {
  const [projectIdList, setProjectIdList] = useState([]);
  const [loblist, setLobList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectManagerName, setProjectManagerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [servicelinelist, setServiceLineList] = useState([]);
  const [serviceLine, setServiceLine] = useState("");
  const [lob, setlob] = useState("");
  const [projectId, setProjectId] = useState("");
  const [associates, setAssociates] = useState([]);
  const [showColumn, setShowColumn] = useState(false);
  const [state, setState] = useState("");
  const [handleChange, setHandleChange] = useState("");
 
  const [columns, setColumns] = useState({
    column1: true,
    column2: true,
    column3: true,
    column4: true,
    column5: true,
    column6: true,
  }); // state to track the visibility of each column

  const handleShowHideColumn = (column) => {
    setColumns({
      ...columns,
      [column]: !columns[column], // toggle the value of the specified column
    });
  };

  useEffect(() => {
    setIsLoading(true);
    DataService.getAllServiceLine()
      .then(
        (response) => {
          const ServiceLineList = [];
          response.forEach((item, index) => {
            ServiceLineList.push({
              value: item,
              label: item,
            });
          });
          setServiceLineList(ServiceLineList);
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

  // LObList useEffect
  useEffect(() => {
    RampdownService.getAssociateIdNameDesignationByServiceLine(
      serviceLine
    ).then((response) => {
      setAssociates(response.associateDetailDataList);
      setLobList(
        response.lobList.map((lob) => {
          return {
            label: lob,
            value: lob,
          };
        })
      );
    });
  }, [serviceLine]);

  //get Project Id by lob use effect
  useEffect(() => {
    RampdownService.getAssociateIdNameDesignationByServiceLineAndLob(
      serviceLine,
      lob
    ).then((response) => {
      setAssociates(response.associateDetailDataList);
      setProjectIdList(
        response.projectIdList.map((projectId) => {
          return {
            label: projectId,
            value: projectId,
          };
        })
      );
    });
  }, [serviceLine, lob]);

  useEffect(() => {
    RampdownService.getAssociateIdNameDesignationByServiceLineAndLobAndProjectId(
      projectId
    ).then((response) => {
      setAssociates(response);
    });
  }, [projectId]);
  //get project name and project manager name from project id  use effect

  useEffect(() => {
    ProjectNamesAndManagerName();
  }, [projectId]);

  const ProjectNamesAndManagerName = () => {
    if (
      serviceLine &&
      serviceLine != "" &&
      lob &&
      lob != "" &&
      projectId &&
      projectId != ""
    ) {
      RampdownService.ProjectNameAndManagerName(projectId)
        .then(
          (response) => {
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

  // useEffect(() => {
  //   RampdownService. AssociateIdNameDesignationByServiceLine(serviceLine).then((response)=>{
  //     setAssociateIdListByServiceLine(response.associateid);
  //     setAssociateNameListByServiceLine(response.associate_name);
  //     setAssociateDesignationListByServiceLine(response.designation);
  //   });
  // }, [serviceLine]);

  const onChangeProjectId = (e) => {
    const pid = e.value;
    setProjectId(pid);
  };
  const onChangeLobList = (e) => {
    setlob(e.value);
  };
  const onChangeServiceLine = (e) => {
    setServiceLine(e.value);
  };

  return (
    <div>
      <table className={classes.table}>
        <tr style={{ backgroundColor: "white" }}>
          <td
            style={{
              width: "300px",
              float: "left",
              marginTop: "15px",
              marginBottom: "15px",
              float: "left",
            }}
          >
            <Select
              options={servicelinelist}
              validations={[required]}
              onChange={onChangeServiceLine}
            ></Select>
          </td>
          <td
            style={{
              width: "300px",
              float: "left",
              marginTop: "15px",
              marginBottom: "15px",
              float: "center",
            }}
          >
            <Select
              options={loblist}
              validations={[required]}
              onChange={onChangeLobList}
            ></Select>
          </td>
          <td
            style={{
              width: "300px",
              float: "Right",
              marginTop: "15px",
              marginBottom: "15px",
              float: "right",
            }}
          >
            <Select
              options={projectIdList}
              validations={[required]}
              onChange={onChangeProjectId}
            ></Select>
          </td>
        </tr>
      </table>

      <div>
        <label>
          <input
            type="checkbox"
            checked={columns.column1}
            onChange={() => handleShowHideColumn("column1")}
          />
          &nbsp; LOB &nbsp; &nbsp;
        </label>
        <label>
          <input
            type="checkbox"
            checked={columns.column2}
            onChange={() => handleShowHideColumn("column2")}
          />
          &nbsp; SID &nbsp; &nbsp;
        </label>
        <label>
          <input
            type="checkbox"
            checked={columns.column3}
            onChange={() => handleShowHideColumn("column3")}
          />
          &nbsp; Project Name &nbsp; &nbsp;
        </label>

        <label>
          <input
            type="checkbox"
            checked={columns.column4}
            onChange={() => handleShowHideColumn("column4")}
          />
          &nbsp; Project Manager Name &nbsp; &nbsp;
        </label>

        <label>
          <input
            type="checkbox"
            checked={columns.column5}
            onChange={() => handleShowHideColumn("column5")}
          />
          &nbsp; Project Start date &nbsp; &nbsp;
        </label>

        <label>
          <input
            type="checkbox"
            checked={columns.column6}
            onChange={() => handleShowHideColumn("column6")}
          />
          &nbsp; Project End Date &nbsp; &nbsp;
        </label>
      </div>
      <table style={{ borderRadius: "3px" }}>
        <thead>
          <tr>
            <th style={{ width: "auto" }}>Associate ID</th>
            <th style={{ width: "auto" }}>Associate Name</th>
            <th style={{ width: "auto" }}>Associate Grade</th>
            <th style={{ width: "auto" }}>Associate Designation</th>
            {columns.column1 && <th style={{ width: "auto" }}>Lob</th>}
            {columns.column2 && <th style={{ width: "auto" }}>SID </th>}
            {columns.column3 && <th style={{ width: "auto" }}>Project Name</th>}
            {columns.column4 && (
              <th style={{ width: "auto" }}>Project Manager Name</th>
            )}
            {columns.column5 && (
              <th style={{ width: "auto" }}>Project Start Date</th>
            )}
            {columns.column6 && (
              <th style={{ width: "auto" }}>Project End Date</th>
            )}
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
          </tr>
        </thead>
        <tbody>
          {associates &&
            associates.map((emp) => {
              return (
                <tr id="demo">
                  <td style={{ width: "auto" }}>{emp.associateId}</td>
                  <td style={{ width: "auto" }}>{emp.associateName}</td>
                  <td style={{ width: "auto" }}>{emp.paqgrade}</td>
                  <td> {emp.designation}</td>
                  {columns.column1 && (
                    <td style={{ width: "auto" }}>{emp.lob}</td>
                  )}
                  {columns.column2 && (
                    <td style={{ width: "auto" }}>{emp.sid}</td>
                  )}
                  {columns.column3 && (
                    <td style={{ width: "auto" }}>{emp.projectDescription}</td>
                  )}
                  {columns.column4 && (
                    <td style={{ width: "auto" }}>{emp.projectManagerName}</td>
                  )}
                  {columns.column5 && (
                    <td style={{ width: "auto" }}>
                      {" "}
                      {new Date(emp.projectStartDate).toDateString()}{" "}
                    </td>
                  )}
                  {columns.column6 && (
                    <td style={{ width: "auto" }}>
                      {new Date(emp.projectEndDate).toDateString()}{" "}
                    </td>
                  )}
             {emp.rampDownDetailList.map((status)=>{
              return(
                <td><input style={{width:"50px"}} value={status} type="number"/></td>
              );
             })
             }
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default Rampproject;
