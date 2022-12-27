import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";
import SkillService from "../services/skill.service";
import { UI_URL } from "../common/constants";
import InterviewDriveService from "../services/InterViewDrive.service";
import { Link, useSearchParams } from "react-router-dom";
import {
  apiGetServiceLineList,
  apiGetLOBList,
  apiGetAllUserLeavesByServiceLine,
} from "../utils/AppUtils";
import { apiGetAllLeavesCategory } from "../utils/AppUtils";
import { Bar } from "react-chartjs-2";
import HomeService from "../services/home.service";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../css/home.css";
import "../css/Edldashboard.css";
import trainingService from "../services/training.service";
import NominateTraining from "../forms/training/NominateTraining";
import classes from "../forms/training/TrainingComponents.module.css";
import TrainingDevWatermark from "../forms/training/TrainingDevWatermark";
import TrainingProgress from "../forms/training/TrainingProgress";
import BarCharts_panels from "../charts/BarCharts_panel";

const Edldashboard = ({ data, year }) => {
  const [trainingData, setTrainingData] = useState([]);
  const [serverError, setServerError] = useState("");
  const [isNominating, setIsNominating] = useState(false);
  const [evaluationResultCategoryList, setEvaluationResultCategoryList] =
    useState([]);
  const [drivesData, setDrivesData] = useState([]);
  const [hasDrives, setHasDrives] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const showAvgProgress = searchParams.get("progress") == "avg";
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [selectLOB, setSelectLOB] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [assignmentId, setassignmentId] = useState(1);
  const [profilesData, setProfilesData] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  const [statData, setStatData] = useState([]);
  const [reportViews, setReportViews] = useState([]);
  const [selected, setSelected] = useState(2);
  const [referralData, setReferralData] = useState([]);
  const [serviceLine, setServiceLine] = useState("ADM");
  const [skillViews, setSkillViews] = useState(null);
  const [selectServiceLine, setSelectServiceLine] = useState(null);
  const [hasRecords, setHasRecords] = useState(false);
  const { register, handleSubmit, errors, control } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onBlur",
  });

  useEffect(() => {
    DataService.getAllReferrals().then(
      (response) => {
        setReferralData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );

    DataService.getRejectionCategories().then(
      (response) => {
        const resultView = [];
        response.forEach((result, index) => {
          resultView.push(result.resultCategory);
        });
        resultView.push("Selected");
        setEvaluationResultCategoryList(resultView);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );
  }, []);

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
          //window.alert(_content);
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
    apiGetLOBList().then((response) => {
      setSelectLOB(response);
    });
  }, []);

  useEffect(() => {
    SkillService.getAllSkillFamilies().then(
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
    }); //ends return loop
  };
  var billable = 0;
  statData.map((row, index) => {
    let totalFte;
    totalFte = row.offshoreBillFte + row.onsiteBillFte;

    billable = billable + totalFte;
    return billable;
  });

  var total = 0;
  statData.map((row, index) => {
    let totalFte;
    totalFte =
      row.offshoreBillFte +
      row.offshoreNBLFte +
      row.onsiteBillFte +
      row.onsiteNBLFte;

    total = totalFte + total;
    return 0;
  });

  const getBillablePercentage = () => {
    var billable = 0;
    statData.map((row, index) => {
      let totalFte;
      totalFte = row.offshoreBillFte + row.onsiteBillFte;

      billable = billable + totalFte;
      return billable;
    });

    var total = 0;
    statData.map((row, index) => {
      let totalFte;
      totalFte =
        row.offshoreBillFte +
        row.offshoreNBLFte +
        row.onsiteBillFte +
        row.onsiteNBLFte;

      total = totalFte + total;
      return 0;
    });
    console.log(total);
    return getPercentage(billable, total);
  };

  return (
    <div>
      <div>
        <div>
          {/* Assignment and service Line Drop Down  */}
          <table>
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
          {/* All boxes Available in the Dashboard */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              margin: "8px",
            }}
          >
            {/* Revnue box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">Revenue</div>
                      <div
                        className="dashboardboxvalue"
                        style={{ fontSize: "1rem" }}
                      >
                        $ 9000/$ 12,145
                      </div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          Revenue Percentage
                        </div>
                        <div className="dashboardboxpercentage">74 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Margin Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">Margin</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          Margin Percentage
                        </div>
                        <div className="dashboardboxpercentage">33 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Billability Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">Billable</div>
                      <div className="dashboardboxvalue">
                        {Math.round(billable)}/{Math.round(total)}
                      </div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          Billability
                        </div>
                        <div className="dashboardboxpercentage">
                          {statData != [] && getBillablePercentage()}
                        </div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: statData != [] && getBillablePercentage(),
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Utilization Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">Utilization</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          Utilization Percentage
                        </div>
                        <div className="dashboardboxpercentage">87 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* COD Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">COD</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          COD Percentage
                        </div>
                        <div className="dashboardboxpercentage">87 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* CII box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">CII</div>
                      <div
                        className="dashboardboxvalue"
                        style={{ fontSize: "1rem" }}
                      >
                        $ 9000/$ 12,145
                      </div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          CII Percentage
                        </div>
                        <div className="dashboardboxpercentage">87 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* S2R Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">S2R</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          S2R Percentage
                        </div>
                        <div className="dashboardboxpercentage">33 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* S2D Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">S2D</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          S2D Percentage
                        </div>
                        <div className="dashboardboxpercentage">87 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Digital Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">Digital</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          Digital Percentage
                        </div>
                        <div className="dashboardboxpercentage">87 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Transformation Box */}
            <table className="dashboardmaintable">
              <tbody>
                <tr>
                  <td>
                    <div className="dashboardbox">
                      <div className="dashboardboxheading">Transformation</div>
                      <div className="dashboardboxvalue"></div>
                      <div className="dashboardboxpercentagebox">
                        <div className="dashboardboxpercentagetitle">
                          Transformation
                        </div>
                        <div className="dashboardboxpercentage">87 %</div>
                      </div>
                      <div
                        style={{
                          height: 5,
                          border: "1px solid #ffffff",
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            float: "left",
                            width: 80,
                            height: "100%",
                            backgroundColor: "#0018f1",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e4e5f7",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Contracts and Pyramid table */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginLeft: "20px",
            }}
          >
            {/* Contracts Table */}
            <div>
              <div
                style={{
                  width: "95%",
                  height: "320px",
                  border: "2px solid #e4e5f7",
                  borderRadius: "7px",
                  margin: "4px",
                }}
              >
                <div
                  style={{
                    width: "95%",
                    border: "2px solid #ffffff",
                    borderRadius: "5px",
                    margin: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginLeft: "20px",
                    }}
                  >
                    <div>
                      {" "}
                      <h4
                        style={{
                          color: "SlateBlue",
                          fontSize: "20px",
                          float: "left",
                        }}
                      >
                        Contracts
                      </h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",

                        gap: "20px",
                      }}
                    >
                      {/* Rejected Box  */}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            align: "right",
                            width: "40px",
                            height: "40px",
                            float: "right",
                            borderRadius: "3px",
                            backgroundColor: "#abaffd",
                            marginTop: "5px",
                            color: "white",
                            fontSize: "25px",
                            textAlign: "center",
                          }}
                        >
                          0
                        </div>

                        <span style={{ fontSize: "1.3rem" }}> Approved</span>
                      </div>
                    </div>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th
                          style={{ backgroundColor: "#fff", textAlign: "left" }}
                        >
                          Title
                        </th>
                        <th style={{ backgroundColor: "#fff" }}>LOB</th>
                        <th style={{ backgroundColor: "#fff" }}>TCV</th>
                        <th style={{ backgroundColor: "#fff" }}>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {skillViews &&
                        skillViews.map((skill) => {
                          return (
                            <tr>
                              <td
                                style={{
                                  borderTop: "1.5px solid  #e4e5f7",
                                }}
                              >
                                {skill.label}
                              </td>
                              <td
                                style={{
                                  borderTop: "1.5px solid  #e4e5f7",
                                  textAlign: "center",
                                }}
                              >
                                10
                              </td>
                              <td
                                style={{
                                  borderTop: "1.5px solid  #e4e5f7",
                                  textAlign: "center",
                                }}
                              >
                                8
                              </td>
                              <td
                                style={{
                                  borderTop: "1.5px solid  #e4e5f7",
                                  textAlign: "center",
                                }}
                              >
                                10
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pyramind Table */}
            <div>
              <div
                div
                style={{
                  width: "95%",
                  height: "320px",
                  border: "2px solid #e4e5f7",
                  borderRadius: "7px",
                  margin: "4px",
                }}
              >
                <div
                  style={{
                    width: "95%",
                    border: "1px solid #ffffff",
                    borderRadius: "5px",
                    margin: "4px",
                  }}
                >
                  <h4
                    style={{
                      color: "SlateBlue",
                      fontSize: "20px",
                      marginLeft: "20px",
                    }}
                  >
                    Pyramid
                  </h4>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "white" }}> Grade </th>
                        <th style={{ backgroundColor: "white" }}> BTM </th>
                        <th style={{ backgroundColor: "white" }}> BFD </th>
                        <th style={{ backgroundColor: "white" }}> NBL </th>
                        <th style={{ backgroundColor: "white" }}> BTB </th>
                        <th style={{ backgroundColor: "white" }}> Total </th>
                      </tr>
                    </thead>

                    <tbody>
                      {statData.map((row, index) => (
                        <tr>
                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {row.grade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Table */}
          <div
            style={{
              width: "96%",
              border: "2px solid #e4e5f7",
              borderRadius: "7px",
              margin: "10px",
              marginTop: "15px",
              marginLeft: "25px",
            }}
          >
            <h4
              style={{
                color: "SlateBlue",
                fontSize: "20px",
                marginLeft: "28px",
              }}
            >
              Issues/Risks
            </h4>
            <table>
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#7ebdf8" }}>LOB</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>Owner</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>ETA</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>Status</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>Impact</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>Create Date</th>
                </tr>
              </thead>
              <tbody>
                {selectLOB &&
                  selectLOB.map((name) => {
                    return (
                      <tr>
                        <td>{name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Appreciations Table */}
          <div
            style={{
              width: "96%",
              border: "2px solid #e4e5f7",
              borderRadius: "7px",
              margin: "10px",
              marginTop: "15px",
              marginLeft: "25px",
            }}
          >
            <h4
              style={{
                color: "SlateBlue",
                fontSize: "20px",
                marginLeft: "28px",
              }}
            >
              Appreciations
            </h4>
            <table>
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#7ebdf8" }}>LOB</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>Projects</th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>
                    Indiviual Appreciation
                  </th>
                  <th style={{ backgroundColor: "#7ebdf8" }}>
                    Team Appreciations
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectLOB &&
                  selectLOB.map((name) => {
                    return (
                      <tr>
                        <td>{name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Panels Bar Graph and Training */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginLeft: "20px",
          }}
        >
          {/* Panels Bar Graph */}
          <div
            style={{
              width: "95%",
              height: "380px",
              border: "2px solid #e4e5f7",
              borderRadius: "7px",
              margin: "4px",
            }}
          >
            <h4
              style={{
                color: "SlateBlue",
                fontSize: "20px",
                marginLeft: "20px",
              }}
            >
              Panels
            </h4>
            {/* <div> <BarCharts_panels/></div> */}
          </div>

          {/* Trainings Table */}
          <div>
            <div
              style={{
                width: "95%",
                height: "380px",
                border: "2px solid #e4e5f7",
                borderRadius: "7px",
                margin: "4px",
              }}
            >
              <h4
                style={{
                  color: "SlateBlue",
                  fontSize: "20px",
                  marginLeft: "20px",
                }}
              >
                Trainings
              </h4>
              <table>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "white", textAlign: "left" }}>
                      Skill Family
                    </th>
                    <th style={{ backgroundColor: "white", textAlign: "left" }}>
                      Completed
                    </th>
                    <th style={{ backgroundColor: "white", textAlign: "left" }}>
                      In Progress
                    </th>
                    <th style={{ backgroundColor: "white", textAlign: "left" }}>
                      To Be Started
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {skillViews &&
                    skillViews.map((skill) => {
                      return (
                        <tr>
                          <td style={{ borderTop: "1.5px solid  #e4e5f7" }}>
                            {skill.label}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {trainingData &&
                              trainingData
                                .filter(
                                  (training) =>
                                    skill.label ==
                                    training.training.skill.skillName
                                )
                                .filter((training) => {
                                  return (
                                    new Date(
                                      training.training.endDate
                                    ).getTime() < new Date().getTime()
                                  );
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {trainingData &&
                              trainingData
                                .filter(
                                  (training) =>
                                    skill.label ==
                                    training.training.skill.skillName
                                )
                                .filter((training) => {
                                  return (
                                    new Date(
                                      training.training.startDate
                                    ).getTime() < new Date().getTime() &&
                                    new Date(
                                      training.training.endDate
                                    ).getTime() > new Date().getTime()
                                  );
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {trainingData &&
                              trainingData
                                .filter(
                                  (training) =>
                                    skill.label ==
                                    training.training.skill.skillName
                                )
                                .filter((training) => {
                                  return (
                                    new Date(
                                      training.training.startDate
                                    ).getTime() > new Date().getTime()
                                  );
                                }).length}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>

                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Referrals and Profile Evaluation  */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginLeft: "20px",
          }}
        >
          {/* Referral Table */}
          <div>
            <div
              style={{
                width: "95%",
                height: "300px",
                border: "2px solid #e4e5f7",
                borderRadius: "7px",
                margin: "4px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "1fr 1fr",
                  marginLeft: "20px",
                }}
              >
                <div>
                  {" "}
                  <h4
                    style={{
                      color: "SlateBlue",
                      fontSize: "20px",
                      float: "left",
                    }}
                  >
                    Referral
                  </h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    gap: "20px",
                  }}
                >
                  {/* Referred Box  */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        align: "right",
                        width: "40px",
                        height: "40px",

                        borderRadius: "3px",
                        backgroundColor: "#abaffd",

                        marginTop: "5px",
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      {referralData &&
                        referralData.filter((referral) => {
                          return referral.referralStatus == "Referred";
                        }).length}
                    </div>

                    <span> Referred</span>
                  </div>
                  {/* Joined Box  */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        align: "right",
                        width: "40px",
                        height: "40px",
                        border: "1px solid #B6E2A1",
                        float: "right",
                        borderRadius: "3px",
                        backgroundColor: "#B6E2A1",
                        marginTop: "5px",
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      {referralData &&
                        referralData.filter((referral) => {
                          return referral.referralStatus == "Joined";
                        }).length}
                    </div>
                    <span> Joined </span>
                  </div>
                </div>
              </div>
              <table>
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid  #e4e5f7",
                      textAlign: "center",
                    }}
                  >
                    <th style={{ backgroundColor: "white", textAlign: "left" }}>
                      Skill Family
                    </th>
                    <th
                      style={{ backgroundColor: "white", alignItems: "center" }}
                    >
                      Referred
                    </th>
                    <th
                      style={{ backgroundColor: "white", alignItems: "center" }}
                    >
                      Joined
                    </th>
                    <th
                      style={{ backgroundColor: "white", alignItems: "center" }}
                    >
                      Offer
                    </th>
                    <th
                      style={{ backgroundColor: "white", alignItems: "center" }}
                    >
                      Declined
                    </th>
                    <th
                      style={{ backgroundColor: "white", alignItems: "center" }}
                    >
                      Interview
                    </th>
                    <th
                      style={{ backgroundColor: "white", alignItems: "center" }}
                    >
                      Hold
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {skillViews &&
                    skillViews.map((skill) => {
                      return (
                        <tr style={{ borderTop: "1px solid #6ab5fb" }}>
                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                            }}
                          >
                            {skill.label}
                          </td>
                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {referralData &&
                              referralData
                                .filter(
                                  (referral) =>
                                    skill.label === referral.skill.skillName
                                )
                                .filter((referral) => {
                                  return referral.referralStatus == "Referred";
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {referralData &&
                              referralData
                                .filter(
                                  (referral) =>
                                    skill.label === referral.skill.skillName
                                )
                                .filter((referral) => {
                                  return referral.referralStatus == "Joined";
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {referralData &&
                              referralData
                                .filter(
                                  (referral) =>
                                    skill.label === referral.skill.skillName
                                )
                                .filter((referral) => {
                                  return referral.referralStatus == "Offered";
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {referralData &&
                              referralData
                                .filter(
                                  (referral) =>
                                    skill.label === referral.skill.skillName
                                )
                                .filter((referral) => {
                                  return (
                                    referral.referralStatus == "Offer Declined"
                                  );
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {referralData &&
                              referralData
                                .filter(
                                  (referral) =>
                                    skill.label === referral.skill.skillName
                                )
                                .filter((referral) => {
                                  return (
                                    referral.referralStatus ==
                                    "Interview scheduled"
                                  );
                                }).length}
                          </td>

                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {referralData &&
                              referralData
                                .filter(
                                  (referral) =>
                                    skill.label === referral.skill.skillName
                                )
                                .filter((referral) => {
                                  return (
                                    referral.referralStatus == "Not Started"
                                  );
                                }).length}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Profile Evaluation Table */}
          <div>
            <div
              style={{
                width: "95%",
                height: "300px",
                border: "2px solid #e4e5f7",
                borderRadius: "7px",
                margin: "4px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "1fr 1fr",
                  marginLeft: "20px",
                }}
              >
                <div>
                  {" "}
                  <h4
                    style={{
                      color: "SlateBlue",
                      fontSize: "20px",
                      float: "left",
                    }}
                  >
                    Profile Evaluation
                  </h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    gap: "20px",
                  }}
                >
                  {/* Rejected Box  */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        align: "right",
                        width: "40px",
                        height: "40px",
                        border: "1px solid #950101",
                        borderRadius: "3px",
                        backgroundColor: "#950101",

                        marginTop: "5px",
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      {profilesData &&
                        profilesData.filter(
                          (profile) =>
                            profile.feedbacks.length != 0 &&
                            profile.feedbacks[0].result.result == "Rejected"
                        ).length}
                    </div>

                    <span> Rejected</span>
                  </div>
                  {/* Selected Box  */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        align: "right",
                        width: "40px",
                        height: "40px",
                        border: "1px solid #B6E2A1",
                        float: "right",
                        borderRadius: "3px",
                        backgroundColor: "#B6E2A1",

                        marginTop: "5px",
                        color: "white",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      {profilesData &&
                        profilesData.filter(
                          (profile) =>
                            profile.feedbacks.length != 0 &&
                            profile.feedbacks[0].result.result == "Selected"
                        ).length}
                    </div>
                    <span> Selected</span>
                  </div>
                </div>
              </div>

              <table>
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid  #e4e5f7",
                      textAlign: "center",
                    }}
                  >
                    <th
                      style={{
                        backgroundColor: "white",
                        textAlign: "left",
                        fontSize: "0.8rem",
                      }}
                    >
                      {" "}
                      Status
                    </th>
                    <th
                      style={{
                        backgroundColor: "white",
                        textAlign: "center",
                        fontSize: "0.8rem",
                      }}
                    >
                      {" "}
                      Internal
                    </th>
                    <th
                      style={{
                        backgroundColor: "white",
                        textAlign: "center",
                        fontSize: "0.8rem",
                      }}
                    >
                      {" "}
                      External
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationResultCategoryList.length != 0 &&
                    evaluationResultCategoryList.map((category) => {
                      return (
                        <tr>
                          {" "}
                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "left",
                            }}
                          >
                            {category}
                          </td>
                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            {profilesData &&
                              profilesData
                                .filter((profile) => profile.isInternal == true)
                                .filter(
                                  (profile) =>
                                    profile.feedbacks.length != 0 &&
                                    (profile.feedbacks[0].result.result ==
                                      category ||
                                      (profile.feedbacks[0].resultCategory !=
                                        null &&
                                        profile.feedbacks[0].resultCategory
                                          .resultCategory == category))
                                ).length}
                          </td>
                          <td
                            style={{
                              borderTop: "1.5px solid  #e4e5f7",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            {profilesData &&
                              profilesData
                                .filter((profile) => profile.isInternal != true)
                                .filter(
                                  (profile) =>
                                    profile.feedbacks.length != 0 &&
                                    (profile.feedbacks[0].result.result ==
                                      category ||
                                      (profile.feedbacks[0].resultCategory !=
                                        null &&
                                        profile.feedbacks[0].resultCategory
                                          .resultCategory == category))
                                ).length}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edldashboard;
