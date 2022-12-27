import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";
import { Link, useSearchParams } from "react-router-dom";
import {
  apiGetServiceLineList,
  apiGetAllUserLeavesByServiceLine,
} from "../utils/AppUtils";
import { apiGetAllLeavesCategory } from "../utils/AppUtils";
import HomeService from "../services/home.service";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../css/home.css";
import trainingService from "../services/training.service";
import NominateTraining from "../forms/training/NominateTraining";
import classes from "../forms/training/TrainingComponents.module.css";
import TrainingDevWatermark from "../forms/training/TrainingDevWatermark";
import TrainingProgress from "../forms/training/TrainingProgress";

const Home = ({ data, year }) => {
  const [trainingData, setTrainingData] = useState([]);
  const [serverError, setServerError] = useState("");
  const [isNominating, setIsNominating] = useState(false);
  const [drivesData, setDrivesData] = useState([]);
  const [hasDrives, setHasDrives] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const showAvgProgress = searchParams.get("progress") == "avg";
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [assignmentId, setassignmentId] = useState(1);
  const [profilesData, setProfilesData] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  const [statData, setStatData] = useState([]);
  const [reportViews, setReportViews] = useState([]);
  const [selected, setSelected] = useState(2);
  const [serviceLine, setServiceLine] = useState("ADM");
  const [skillViews, setSkillViews] = useState(null);
  const [selectServiceLine, setSelectServiceLine] = useState(null);
  const [hasRecords, setHasRecords] = useState(false);
  const { register, handleSubmit, errors, control } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onBlur",
  });

  const fetchLeaveData = () => {
    apiGetAllUserLeavesByServiceLine(new Date().getFullYear(), serviceLine)
      .then((data) => {
        console.log(data);
        setLeaveData(data);
      })
      .catch((err) => {
        setLeaveData([]);
        console.log(err);
      });
  };

  useEffect(() => {
    DataService.getAllInterviewDrives().then((data) => {
      console.log(data);
      setDrivesData(data);
      setHasDrives(data.length > 0);
    });
  }, []);

  useEffect(() => {
    getTrainingData();
  }, []);

  const getTrainingData = () => {
    setIsLoading(true);
    trainingService
      .getPersonalisedTrainings()
      .then(
        (response) => {
          setTrainingData(response.data);
          setHasRecords(response.data.length > 0);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setServerError(_content);
          window.alert(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
        // setTrainingData(DUMMY_TRAININGS);
      });
  };

  const OnNominateHandler = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const trainingId = trainingData[id].training.id;
    const trainingTitle = trainingData[id].training.title;

    setSelectedTraining({ id, trainingId, trainingTitle });
    setIsNominating(true);
  };

  useEffect(() => {
    const handleChange = () => {
      getReportData(1, assignmentId, serviceLine);
    };
    handleChange();
    fetchLeaveData();
  }, [assignmentId, serviceLine]);

  //for the serviceLine list
  useEffect(() => {
    apiGetServiceLineList().then((response) => {
      let temp = [];
      response.map((line) => {
        temp.push({ value: line, label: line });
      });
      setSelectServiceLine(temp);
    });
  }, []);

  //for the skill family to
  useEffect(() => {
    DataService.getAllProfiles().then(
      (response) => {
        console.log(response);
        setProfilesData(response);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );
  }, []);

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

        // setMessage(_content);
      }
    );
  }, [profilesData]);

  useEffect(() => {
    HomeService.getHomeContent().then(
      (response) => {
        setContent(response);
        const reportView = [];
        let idVal;
        let filenameVal;

        response.forEach((assignment, index) => {
          idVal = assignment.id;
          filenameVal = assignment.id + ". " + assignment.filename;
          reportView.push({
            value: idVal,
            label: filenameVal,
          });
        });
        setReportViews(reportView);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const onSubmit = (data) => {};

  const handleError = (errors) => {};

  // const registerOptions = {
  //   name: { required: true },
  //   email: { required: "Email is required" },
  //   password: {
  //     required: "Password is required",
  //     minLength: {
  //       value: 8,
  //       message: "Password must have at least 8 characters",
  //     },
  //   },
  //   role: { required: "Role is required" },
  // };

  const getReportData = (reportID, paramId, serviceLine) => {
    HomeService.getAssignmentReportStat(reportID, paramId, serviceLine).then(
      (response) => {
        setStatData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  };
  const handleChange = (event) => {
    setSelected(event.value);
    getReportData(1, event.value, serviceLine);
  };

  const getPercentage = (number, total) => {
    if (total > 0) return ((number * 100) / total).toFixed(1) + "%";
    else return "-";
  };

  const renderTableData = () => {
    let allRowTotalFTE = 0.0;
    let offshoreBillTotalFTE = 0.0;
    let offshoreNBLTotalFTE = 0.0;
    let onsiteBillTotalFTE = 0.0;
    let onsiteNBLTotalFTE = 0.0;
    statData.forEach((row, index) => {
      allRowTotalFTE = Math.round(
        allRowTotalFTE +
          row.offshoreBillFte +
          row.offshoreNBLFte +
          row.onsiteBillFte +
          row.onsiteNBLFte
      );

      offshoreBillTotalFTE = Math.round(
        offshoreBillTotalFTE + row.offshoreBillFte
      );
      offshoreNBLTotalFTE = Math.round(
        offshoreNBLTotalFTE + row.offshoreNBLFte
      );
      onsiteBillTotalFTE = Math.round(onsiteBillTotalFTE + row.onsiteBillFte);
      onsiteNBLTotalFTE = Math.round(onsiteNBLTotalFTE + row.onsiteNBLFte);
    });

    return statData.map((row, index) => {
      let totalFte;

      totalFte = Math.round(
        row.offshoreBillFte +
          row.offshoreNBLFte +
          row.onsiteBillFte +
          row.onsiteNBLFte
      );

      return (
        <tr>
          <td className="gridviewcontentname">{row.grade}</td>
          <td className="gridviewcontentno">
            {Math.round(row.offshoreBillFte)}
          </td>
          <td className="gridviewcontentno">
            {getPercentage(
              row.offshoreBillFte,
              row.offshoreBillFte + row.offshoreNBLFte
            )}
          </td>
          <td className="gridviewcontentnbl">
            {Math.round(row.offshoreNBLFte)}
          </td>
          <td className="gridviewcontentnbl">
            {getPercentage(
              row.offshoreNBLFte,
              row.offshoreBillFte + row.offshoreNBLFte
            )}
          </td>
          <td className="gridviewcontentsubtotal">
            {Math.round(row.offshoreBillFte + row.offshoreNBLFte)}
          </td>
          <td className="gridviewcontentsubtotal">
            {getPercentage(row.offshoreBillFte + row.offshoreNBLFte, totalFte)}
          </td>

          <td className="gridviewcontentno">{Math.round(row.onsiteBillFte)}</td>
          <td className="gridviewcontentno">
            {getPercentage(
              row.onsiteBillFte,
              row.onsiteBillFte + row.onsiteNBLFte
            )}
          </td>
          <td className="gridviewcontentnbl">{Math.round(row.onsiteNBLFte)}</td>
          <td className="gridviewcontentnbl">
            {getPercentage(
              row.onsiteNBLFte,
              row.onsiteBillFte + row.onsiteNBLFte
            )}
          </td>
          <td className="gridviewcontentsubtotal">
            {Math.round(row.onsiteBillFte + row.onsiteNBLFte)}
          </td>
          <td className="gridviewcontentsubtotal">
            {getPercentage(row.onsiteBillFte + row.onsiteNBLFte, totalFte)}
          </td>

          <td className="gridviewcontentno">
            {Math.round(row.offshoreBillFte + row.onsiteBillFte)}
          </td>
          <td className="gridviewcontentno">
            {getPercentage(row.offshoreBillFte + row.onsiteBillFte, totalFte)}
          </td>
          <td className="gridviewcontentnbl">
            {Math.round(row.offshoreNBLFte + row.onsiteNBLFte)}
          </td>
          <td className="gridviewcontentnbl">
            {getPercentage(row.offshoreNBLFte + row.onsiteNBLFte, totalFte)}
          </td>
          <td className="gridviewcontentsubtotal">
            {Math.round(
              row.offshoreBillFte +
                row.onsiteBillFte +
                row.offshoreNBLFte +
                row.onsiteNBLFte
            )}
          </td>
          <td className="gridviewcontentsubtotal">
            {getPercentage(
              row.offshoreBillFte +
                row.onsiteBillFte +
                row.offshoreNBLFte +
                row.onsiteNBLFte,
              allRowTotalFTE
            )}
          </td>
        </tr>
      ); //ends
    }); //ends return loop
  };

  const renderTotalTableData = () => {
    let allRowTotalFTE = 0.0;
    let offshoreBillTotalFTE = 0.0;
    let offshoreNBLTotalFTE = 0.0;
    let onsiteBillTotalFTE = 0.0;
    let onsiteNBLTotalFTE = 0.0;
    statData.forEach((row, index) => {
      allRowTotalFTE = Math.round(
        allRowTotalFTE +
          row.offshoreBillFte +
          row.offshoreNBLFte +
          row.onsiteBillFte +
          row.onsiteNBLFte
      );

      offshoreBillTotalFTE = Math.round(
        offshoreBillTotalFTE + row.offshoreBillFte
      );
      offshoreNBLTotalFTE = Math.round(
        offshoreNBLTotalFTE + row.offshoreNBLFte
      );
      onsiteBillTotalFTE = Math.round(onsiteBillTotalFTE + row.onsiteBillFte);
      onsiteNBLTotalFTE = Math.round(onsiteNBLTotalFTE + row.onsiteNBLFte);
    });

    return (
      <tr className="datarowttoal">
        <td className="gridviewcontentname">Total</td>
        <td className="gridviewcontentno">{offshoreBillTotalFTE}</td>
        <td className="gridviewcontentno">
          {getPercentage(
            offshoreBillTotalFTE,
            offshoreBillTotalFTE + offshoreNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentnbl">{offshoreNBLTotalFTE}</td>
        <td className="gridviewcontentnbl">
          {getPercentage(
            offshoreNBLTotalFTE,
            offshoreBillTotalFTE + offshoreNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {offshoreBillTotalFTE + offshoreNBLTotalFTE}
        </td>
        <td className="gridviewcontentsubtotal">
          {getPercentage(
            offshoreBillTotalFTE + offshoreNBLTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentno">{onsiteBillTotalFTE}</td>
        <td className="gridviewcontentno">
          {getPercentage(
            onsiteBillTotalFTE,
            onsiteBillTotalFTE + onsiteNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentnbl">{onsiteNBLTotalFTE}</td>
        <td className="gridviewcontentnbl">
          {getPercentage(
            onsiteNBLTotalFTE,
            onsiteBillTotalFTE + onsiteNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {onsiteBillTotalFTE + onsiteNBLTotalFTE}
        </td>
        <td className="gridviewcontentsubtotal">
          {getPercentage(
            onsiteBillTotalFTE + onsiteNBLTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentno">
          {offshoreBillTotalFTE + onsiteBillTotalFTE}
        </td>
        <td className="gridviewcontentno">
          {getPercentage(
            offshoreBillTotalFTE + onsiteBillTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentnbl">
          {offshoreNBLTotalFTE + onsiteNBLTotalFTE}
        </td>
        <td className="gridviewcontentnbl">
          {getPercentage(
            offshoreNBLTotalFTE + onsiteNBLTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {offshoreBillTotalFTE +
            onsiteBillTotalFTE +
            offshoreNBLTotalFTE +
            onsiteNBLTotalFTE}
        </td>
        <td className="gridviewcontentsubtotal"></td>
      </tr>
    ); //ends
  };
  <h5 className={classes.formheading}>Billablity Report Table</h5>;
  return (
    <div>
      <div>
        <div>
          {/* Billablity report table */}

          {/* <table>
            <tr className="assignmentdropdown">
              <td className="tddropdownlabel">Assignent Reports:</td>
              <td className="tdheaderelements">
                <Form onSubmit={handleSubmit(onSubmit, handleError)}>
                  <FormGroup>
                    <Select
                      onChange={(e) => {
                        const { name, value } = e;
                        setassignmentId(value);
                      }}
                      options={reportViews}
                    ></Select>
                  </FormGroup>
                </Form>
              </td>

              <td className="tddropdownlabel">
                <Label> &nbsp; &nbsp; &nbsp; Service Line:</Label>
              </td>
              <td className="tdheaderelements">
                {" "}
                <Select
                  defaultValue={{ label: serviceLine, value: serviceLine }}
                  name="serviceLine"
                  // className="yearDropDown"
                  options={selectServiceLine}
                  onChange={(e) => {
                    const { name, value } = e;
                    setServiceLine(value);
                  }}
                ></Select>{" "}
              </td>
            </tr>
          </table>
          <table>
            <h5 className={classes.formheading}>Billablity Report</h5>
          </table>
          <table className="billborder">
            <tbody>
              <tr width="100%">
                <td>
                  {hasRecords ? (
                    <table
                      cellSpacing="0"
                      cellPadding="5"
                      rules="all"
                      id="tablepyramid"
                    >
                      <tbody>
                        <tr className="gdvheader">
                          <td colSpan="1">Grade</td>
                          <td colSpan="6">Offshore</td>
                          <td colSpan="6">Onsite</td>
                          <td colSpan="6">Total</td>
                        </tr>
                        <tr className="gdvheader">
                          <th className="gdvheader" scope="col">
                            &nbsp;
                          </th>

                          <th className="gdvheader" scope="col">
                            BILL
                          </th>
                          <th className="gdvheader" scope="col">
                            BILL %
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL %
                          </th>
                          <th className="gdvheader" scope="col">
                            Total{" "}
                          </th>
                          <th className="gdvheader" scope="col">
                            Total %
                          </th>

                          <th className="gdvheader" scope="col">
                            BILL
                          </th>
                          <th className="gdvheader" scope="col">
                            BILL %
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL %
                          </th>
                          <th className="gdvheader" scope="col">
                            Total{" "}
                          </th>
                          <th className="gdvheader" scope="col">
                            Total %
                          </th>

                          <th className="gdvheader" scope="col">
                            Bill
                          </th>
                          <th className="gdvheader" scope="col">
                            Bill %
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL %
                          </th>
                          <th className="gdvheader" scope="col">
                            Total
                          </th>
                          <th className="gdvheader" scope="col">
                            Total %
                          </th>
                        </tr>
                        {renderTableData()}
                        {renderTotalTableData()}
                      </tbody>
                    </table>
                  ) : (
                    <div />
                  )}
                </td>
              </tr>
            </tbody>
          </table> */}

          {/* Internal profiles skill table */}
          <table>
            <h5 className={classes.formheading}>Referal Profiles </h5>
          </table>
          <table className="internal ">
            <tr>
              <th>Skill Family</th>
              <th>Internal Profiles</th>
              <th>Selected</th>
              <th>Rejected</th>
              <th>Not Evaluated</th>
            </tr>
            {skillViews &&
              skillViews.map((skill) => {
                return (
                  <tr className={classes.row}>
                    <td >{skill.label}</td>
                    <td >
                      {" "}
                      {profilesData &&
                        profilesData.filter(
                          (profile) =>
                            profile.isInternal == true &&
                            profile.skill.id == skill.value
                        ).length}
                    </td>
                    <td >
                      {profilesData &&
                        profilesData
                          .filter(
                            (profile) =>
                              profile.isInternal == true &&
                              profile.skill.id == skill.value
                          )
                          .filter(
                            (profile) =>
                              profile.feedbacks.length != 0 &&
                              profile.feedbacks[0].result.result == "Selected"
                          ).length}
                    </td>
                    <td >
                      {profilesData &&
                        profilesData
                          .filter(
                            (profile) =>
                              profile.isInternal == true &&
                              profile.skill.id == skill.value
                          )
                          .filter(
                            (profile) =>
                              profile.feedbacks.length != 0 &&
                              profile.feedbacks[0].result.result == "Rejected"
                          ).length}
                    </td>
                    <td >
                      {profilesData &&
                        profilesData
                          .filter(
                            (profile) =>
                              profile.isInternal == true &&
                              profile.skill.id == skill.value
                          )
                          .filter((profile) => profile.feedbacks.length == 0)
                          .length}
                    </td>
                  </tr>
                );
              })}
          </table>

          {/* External profiles skill table */}
          <table className="external">
            <tr>
              <th>Skill Family</th>
              <th>External Profiles</th>
              <th>Selected</th>
              <th>Rejected</th>
              <th>Not Evaluated</th>
            </tr>
            {skillViews &&
              skillViews.map((skill) => {
                return (
                  <tr>
                    <td className="profiletable">{skill.label}</td>
                    <td className="profilecontenettable">
                      {" "}
                      {profilesData &&
                        profilesData.filter(
                          (profile) =>
                            profile.isInternal != true &&
                            profile.skill.id == skill.value
                        ).length}
                    </td>
                    <td className="profiletable">
                      {profilesData &&
                        profilesData
                          .filter(
                            (profile) =>
                              profile.isInternal != true &&
                              profile.skill.id == skill.value
                          )
                          .filter(
                            (profile) =>
                              profile.feedbacks.length != 0 &&
                              profile.feedbacks[0].result.result == "Selected"
                          ).length}
                    </td>
                    <td className="profilecontenettable">
                      {profilesData &&
                        profilesData
                          .filter(
                            (profile) =>
                              profile.isInternal != true &&
                              profile.skill.id == skill.value
                          )
                          .filter(
                            (profile) =>
                              profile.feedbacks.length != 0 &&
                              profile.feedbacks[0].result.result == "Rejected"
                          ).length}
                    </td>
                    <td className="profiletable">
                      {profilesData &&
                        profilesData
                          .filter(
                            (profile) =>
                              profile.isInternal != true &&
                              profile.skill.id == skill.value
                          )
                          .filter((profile) => profile.feedbacks.length == 0)
                          .length}
                    </td>
                  </tr>
                );
              })}
          </table>
          {/* the leave table  */}

          {/* <td className="tddropdownlabel">
              <Label> &nbsp; &nbsp; &nbsp; Service Line:</Label>
            </td>
             <td className="tdheaderelements">
              {" "}
              <Select
                defaultValue={{ label: serviceLine, value: serviceLine }}
                name="serviceLine"
                // className="yearDropDown"
                options={selectServiceLine}
                onChange={(e) => {
                  const { name, value } = e;
                  setServiceLine(value);
                }}
              ></Select>{" "}
            </td>  */}
          <table>
            <h5 className={classes.formheading}>Leave Table</h5>
          </table>

          <table className="training">
            <tr>
              <th colspan="3">January</th>

              <th colspan="3">Feburary</th>

              <th colspan="3">March</th>

              <th colspan="3">April</th>

              <th colspan="3">May</th>

              <th colspan="3">June</th>

              <th colspan="3">July</th>

              <th colspan="3">August</th>

              <th colspan="3">September</th>

              <th colspan="3">October</th>

              <th colspan="3">November</th>

              <th colspan="3">December</th>
            </tr>
            <tr>
              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>

              <th>W</th>
              <th>L</th>
              <th>HD</th>
            </tr>
            <tr>
              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[0].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[0].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[0].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[1].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[1].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[1].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[2].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[2].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[2].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[3].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[3].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[3].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[4].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[4].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[4].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[5].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[5].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[5].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[6].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[6].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[6].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[7].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[7].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[7].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[8].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[8].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[8].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[9].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[9].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[9].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[10].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[10].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[10].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[11].statusArrayList.filter(
                      (data) => data == "W"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profiletable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[11].statusArrayList.filter(
                      (data) => data == "L"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>

              <td className="profilecontenettable">
                {leaveData
                  .map((emp, ind) => {
                    return emp.monthStatusPOJOS[11].statusArrayList.filter(
                      (data) => data == "HD"
                    ).length;
                  })
                  .reduce((current, sum) => current + sum, 0)}
              </td>
            </tr>
          </table>

          {/* Training Table */}
          <table>
            <h5 className={classes.formheading}>Trainings</h5>
          </table>
          <table className="training">
            <tr>
              <th>Title Of the Training</th>
              <th>Skill Of the Training</th>
              <th>Nominations</th>
              <th>Training Mode </th>
            </tr>
            <tbody>
              {trainingData &&
                trainingData.map(
                  ({ training, avgProgress, progress, isNominated }, i) => {
                    return (
                      <tr key={training.id} className={classes.tablerow}>
                        <td>
                          <span>
                            {showAvgProgress ? (
                              <Link
                                to={`/ui/forms/trainings/${training.id}`}
                                className={classes.link}
                              >
                                {training.title}
                                <span className="material-icons">link</span>
                              </Link>
                            ) : (
                              training.title
                            )}
                          </span>
                        </td>
                        <td>
                          <span>{training.skill.skillName}</span>
                        </td>
                        <td>
                          <span>{training.nominations}</span>
                        </td>
                        <td>
                          <span>
                            {training.isClassroom ? "Classroom" : "Online"}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>

          <table className="internal">
            <tr>
              <th>January 
                
              </th>

              <th> Feburary </th>

              <th> March </th>

              <th> April </th>

              <th> May </th>

              <th> June </th>

              <th> July </th>

              <th> August</th>

              <th> September</th>

              <th> October</th>

              <th> November</th>

              <th> December</th>
            </tr>
          </table>

          {/* Interview Table  */}
          <table>
            {" "}
            <h5 className={classes.formheading}>Interview Available</h5>
          </table>
          <table className="internal">
            <tr>
              <th>Skills </th>
              <th>Total Interviews</th>
              <th>Panelist availability</th>
              <th>Panelist non-availability</th>
            </tr>
            {skillViews &&
              skillViews.map((skill) => {
                return (
                  <tr>
                    <td className="profiletable">{skill.label}</td>
                    <td className="profilecontenettable">
                      {
                        drivesData.filter((drive) => skill.label == drive.skill)
                          .length
                      }
                    </td>
                    <td className="profiletable">
                      {
                        drivesData
                          .filter((drive) => skill.label == drive.skill)
                          .filter((drive) => drive.totalPanelists >= 1).length
                      }
                    </td>

                    <td className="profilecontenettable">
                      {
                        drivesData
                          .filter((drive) => skill.label == drive.skill)
                          .filter((drive) => drive.totalPanelists == 0).length
                      }
                    </td>
                  </tr>
                );
              })}
          </table>

          <table>
            {" "}
            <h5 className={classes.formheading}>Contracts</h5>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
