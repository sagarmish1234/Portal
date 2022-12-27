import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";
import GenCTrackerService from "../services/genctracker.service";
import Button from "react-validation/build/button";
import "../css/main.css";
import { UI_URL } from "../common/constants";
import SaveIcon from "../images/saveicon.svg";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InterviewDriveService from "../services/InterViewDrive.service";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { getRole } from "./roleService";

const GenCTrackerDashboard = () => {
  const [listData, setListData] = useState([]);
  const [message, setMessage] = useState(false);
  const [billableGenCs, setBillableGenCs] = useState([]);
  const [totalGenCs, setTotalGenCs] = useState([]);
  const [totalStories, setTotalStories] = useState(0);
  const [acceptedStories, setAcceptedStories] = useState(0);
  const [completedSprints, setCompletedSprints] = useState(0);
  const [totalSprints, setTotalSprints] = useState(0);
  const [totalEpics, setTotalEpics] = useState(0);
  const [completedEpics, setCompletedEpics] = useState(0);
  const [currentSprintGenCs, setCurrentSprintGenCs] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const objectIsEmpty = (obj) => {
    if (obj.toString() === "") return true;
    return false;
  };
  var role = getRole();

  var columns = [
    { label: "S. No.", colSize: "5", type: "text" },
    {
      accessor: "groupName",
      label: "Parent Account",
      colSize: "10",
      type: "link",
    },
    {
      accessor: "totalGenCs",
      label: "Total GenCs",
      colSize: "40",
      type: "link",
      target: "associate",
      isBillable: 0,
    },
    {
      accessor: "billableGenCs",
      label: "Billable GenCs",
      colSize: "20",
      type: "link",
      target: "associate",
      isBillable: 1,
    },
    {
      accessor: "totalEpics",
      label: "Total Epics Contributed",
      colSize: "5",
      type: "link",
      target: "epic",
    },
    {
      accessor: "completedEpics",
      label: "Completed Epics Contributed",
      colSize: "5",
      type: "link",
      target: "epic",
      isCompleted: 1,
    },
    {
      accessor: "totalSprints",
      label: "Total Sprints Contributed",
      colSize: "5",
      type: "link",
      target: "sprint",
      isCompleted: 0,
    },
    {
      accessor: "completedSprints",
      label: "Completed Sprints Contributed",
      colSize: "5",
      type: "link",
      target: "sprint",
      isCompleted: 1,
    },
    {
      accessor: "totalStories",
      label: "Total Stories",
      colSize: "5",
      type: "link",
      target: "story",
      isCompleted: 0,
    },
    {
      accessor: "completedStories",
      label: "Completed Stories",
      colSize: "5",
      type: "link",
      target: "story",
      isCompleted: 1,
    },
    {
      accessor: "totalGenCsHaveStories",
      label: "GenCs Engaged",
      colSize: "5",
      type: "link",
      target: "engaged",
      isActive: "1",
    },
  ];
  if (
    localStorage.getItem("roles").indexOf("PDL") != -1 &&
    objectIsEmpty(searchParams)
  ) {
    columns[1] = {
      accessor: "groupName",
      label: "Parent Account",
      colSize: "10",
    };
  } else if (
    (localStorage.getItem("roles").indexOf("EDL") != -1 &&
      objectIsEmpty(searchParams)) ||
    (!objectIsEmpty(searchParams) &&
      searchParams.has("parentAccount") &&
      !searchParams.has("lOB"))
  ) {
    columns[1] = { accessor: "groupName", label: "LOB", colSize: "10" };
  } else if (
    (localStorage.getItem("roles").indexOf("LOBLead") != -1 &&
      objectIsEmpty(searchParams)) ||
    (!objectIsEmpty(searchParams) &&
      searchParams.has("lOB") &&
      !searchParams.has("account"))
  ) {
    columns[1] = { accessor: "groupName", label: "Account", colSize: "10" };
  } else if (
    (localStorage.getItem("roles").indexOf("AccountLead") != -1 &&
      objectIsEmpty(searchParams)) ||
    (!objectIsEmpty(searchParams) &&
      searchParams.has("account") &&
      !searchParams.has("project"))
  ) {
    columns[1] = {
      accessor: "groupName",
      label: "Project",
      colSize: "10",
    };
  } else if (
    (localStorage.getItem("roles").indexOf("ProjectManager") != -1 &&
      objectIsEmpty(searchParams)) ||
    (!objectIsEmpty(searchParams) && searchParams.has("project"))
  ) {
    columns = [
      { label: "S. No.", colSize: "5", type: "text" },
      {
        accessor: "groupName",
        label: "Associate",
        colSize: "10",
        type: "text",
        target: "view",
      },
      {
        accessor: "totalStories",
        label: "Total Stories",
        colSize: "5",
        type: "link",
        target: "story",
        isCompleted: 0,
      },
      {
        accessor: "completedStories",
        label: "Completed Stories",
        colSize: "5",
        type: "link",
        target: "story",
        isCompleted: 1,
      },
    ];
  }

  useEffect(() => {
    console.log("Inside single use effect");
    setIsLoading(true);
    GenCTrackerService.getGenCDashboardMetrics(searchParams.toString())
      .then(
        (response) => {
          console.log(response);
          setBillableGenCs(response.billableGenCs);
          setTotalGenCs(response.totalGenCs);
          setTotalStories(response.totalStories);
          setAcceptedStories(response.acceptedStories);
          setTotalSprints(response.totalSprints);
          setCompletedSprints(response.completedSprints);
          setCurrentSprintGenCs(response.currentSprintGenCs);
          setTotalEpics(response.totalEpics);
          setCompletedEpics(response.completedEpics);
          setListData(response.genCGroupDetails);
        },
        (error) => {
          if ((error.response && error.response) || error.message)
            setMessage(error.toString());
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GenCTrackerService.getGenCDashboardMetrics(searchParams.toString())
      .then(
        (response) => {
          setBillableGenCs(response.billableGenCs);
          setTotalGenCs(response.totalGenCs);
          setTotalStories(response.totalStories);
          setAcceptedStories(response.acceptedStories);
          setTotalSprints(response.totalSprints);
          setTotalEpics(response.totalEpics);
          setCompletedEpics(response.completedEpics);
          setCompletedSprints(response.completedSprints);
          setCurrentSprintGenCs(response.currentSprintGenCs);
          setListData(response.genCGroupDetails);
        },
        (error) => {
          if ((error.response && error.response) || error.message)
            setMessage(error.toString());
        }
      )
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const handleTableLinkClick = (rowIndex, column) => (e) => {
    e.preventDefault();
    const params = getTableClickParams(rowIndex);
    if (column.target == "story") {
      if (column?.isCompleted == 1)
        navigate({
          pathname: "/ui/gencTracker/stories/allStories",
          search: params + "&isCompleted=1",
        });
      else {
        navigate({
          pathname: "/ui/gencTracker/stories/allStories",
          search: params + "&isCompleted=0",
        });
      }
    } else if (column.target == "epic") {
      if (column?.isCompleted == 1)
        navigate({
          pathname: "/ui/gencTracker/epics",
          search: params + "&isCompleted=1",
        });
      else {
        navigate({
          pathname: "/ui/gencTracker/epics",
          search: params + "&isCompleted=0",
        });
      }
    } else if (column.target == "sprint") {
      if (column?.isCompleted == 1)
        navigate({
          pathname: "/ui/gencTracker/sprint/allSprints",
          search: params + "&isCompleted=1",
        });
      else {
        navigate({
          pathname: "/ui/gencTracker/sprint/allSprints",
          search: params + "&isCompleted=0",
        });
      }
    } else if (column.target == "associate") {
      if (column?.isBillable == 1)
        navigate({
          pathname: "/ui/gencTracker/associates",
          search: params + "&isBillable=1",
        });
      else {
        navigate({
          pathname: "/ui/gencTracker/associates",
          search: params + "&isBillable=0",
        });
      }
    } else {
      if (column?.isActive == 1)
        navigate({
          pathname: "/ui/gencTracker/associates",
          search: params + "&isActive=1",
        });
      else {
        navigate({
          pathname: "/ui/gencTracker/associates",
          search: params + "&isActive=0",
        });
      }
    }
  };

  const getTableClickParams = (rowIndex) => {
    var params = {};
    if (localStorage.getItem("roles").indexOf("PDL") != -1) {
      if (!objectIsEmpty(searchParams) && searchParams.has("project")) {
        params = {
          ...convertParamsToObject(),
          associate: listData[rowIndex]["groupId"],
        };
      } else if (!objectIsEmpty(searchParams) && searchParams.has("account")) {
        params = {
          ...convertParamsToObject(),
          project: listData[rowIndex]["groupName"],
        };
      } else if (!objectIsEmpty(searchParams) && searchParams.has("lOB")) {
        console.log("entered");
        params = {
          ...convertParamsToObject(),
          account: listData[rowIndex]["groupId"],
        };
      } else if (
        !objectIsEmpty(searchParams) &&
        searchParams.has("parentAccount")
      ) {
        params = {
          ...convertParamsToObject(),
          lOB: listData[rowIndex]["groupName"],
        };
      } else if (objectIsEmpty(searchParams)) {
        params = { parentAccount: listData[rowIndex]["groupName"] };
      }
    } else if (localStorage.getItem("roles").indexOf("EDL") != -1) {
      if (!objectIsEmpty(searchParams) && searchParams.has("project")) {
        params = {
          ...convertParamsToObject(),
          associate: listData[rowIndex]["groupId"],
        };
      } else if (!objectIsEmpty(searchParams) && searchParams.has("account")) {
        params = {
          ...convertParamsToObject(),
          project: listData[rowIndex]["groupName"],
        };
      } else if (!objectIsEmpty(searchParams) && searchParams.has("lOB")) {
        console.log("entered");
        params = {
          ...convertParamsToObject(),
          account: listData[rowIndex]["groupId"],
        };
      } else if (objectIsEmpty(searchParams)) {
        setSearchParams((prev) => {
          params = {
            ...convertParamsToObject(),
            lOB: listData[rowIndex]["groupName"],
          };
        });
      }
    } else if (localStorage.getItem("roles").indexOf("LOBLead") != -1) {
      if (!objectIsEmpty(searchParams) && searchParams.has("account")) {
        params = {
          ...convertParamsToObject(),
          project: listData[rowIndex]["groupName"],
        };
      } else if (objectIsEmpty(searchParams)) {
        console.log("entered");
        params = {
          ...convertParamsToObject(),
          account: listData[rowIndex]["groupName"],
        };
      }
    }
    return new URLSearchParams(params).toString();
  };

  const printContent = (column, row, rowIndex) => {
    if (column.type == "text") return row[column.accessor];
    else if (column.accessor == "groupName")
      return (
        <a href="#" onClick={somethingClicked(rowIndex)}>
          {row[column.accessor]}
        </a>
      );
    else if (column?.target) {
      return (
        <a href="#" onClick={handleTableLinkClick(rowIndex, column)}>
          {row[column.accessor]}
        </a>
      );
    } else {
      return row[column.accessor];
    }
  };

  const getRandomKey = () => {
    return 1 + Math.random() * (99999999999 - 1);
  };

  const toPercentage = (number, total) => {
    if (
      !total ||
      parseFloat(total) == 0.0 ||
      !number ||
      parseFloat(number) == 0.0
    )
      return "";

    let value = parseFloat((number * 100) / total);
    if (value == 0.0) return "";

    return value.toFixed(0) + "%";
  };

  const convertParamsToObject = () => {
    return Object.fromEntries(new URLSearchParams(searchParams.toString()));
  };

  const somethingClicked = (rowIndex) => (e) => {
    e.preventDefault();
    const params = Object.fromEntries(
      new URLSearchParams(getTableClickParams(rowIndex))
    );
    setSearchParams(getTableClickParams(rowIndex));
  };

  const handleGetInfo = (option) => (e) => {
    if (option == 0) {
      navigate({
        pathname: "/ui/gencTracker/epics",
        search: searchParams.toString() + "&isGenc=1",
      });
    } else if (option == 1) {
      navigate({
        pathname: "/ui/gencTracker/sprint/allSprints",
        search: searchParams.toString() + "&isGenc=1",
      });
    } else if (option == 2) {
      navigate({
        pathname: "/ui/gencTracker/stories/allStories",
        search: searchParams.toString() + "&isGenc=1",
      });
    }
  };

  return (
    <div className="mainDiv">
      {/* <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Home
          </li>
          {Object.entries(convertParamsToObject()).map(([key, value]) => {
            // console.log(value);
            return (
              <li class="breadcrumb-item" aria-current="page">
                {value}
              </li>
            );
          })}
        </ol>
      </nav> */}
      <table className="dashboardmaintable">
        <tbody>
          <tr>
            <td>
              <div className="dashboardbox">
                <div className="dashboardboxheading">Billable GenCs</div>
                <div className="dashboardboxvalue">
                  {billableGenCs}/{totalGenCs}
                </div>
                <div className="dashboardboxpercentagebox">
                  <div className="dashboardboxpercentagetitle">Billability</div>
                  <div className="dashboardboxpercentage">
                    {toPercentage(billableGenCs, totalGenCs)}
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
                      width: toPercentage(billableGenCs, totalGenCs),
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
            <td>
              <div className="dashboardbox" onClick={handleGetInfo(0)}>
                <div className="dashboardboxheading">Epics</div>
                <div className="dashboardboxvalue">{`${completedEpics}/${totalEpics}`}</div>
                <div className="dashboardboxpercentagebox">
                  <div className="dashboardboxpercentagetitle">Completed</div>
                  <div className="dashboardboxpercentage">
                    {toPercentage(completedEpics, totalEpics)}
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
                      width: toPercentage(completedEpics, totalEpics),
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
            <td>
              <div className="dashboardbox" onClick={handleGetInfo(1)}>
                <div className="dashboardboxheading">Sprints</div>
                <div className="dashboardboxvalue">
                  {completedSprints}/{totalSprints}
                </div>
                <div className="dashboardboxpercentagebox">
                  <div className="dashboardboxpercentagetitle">Delievered</div>
                  <div className="dashboardboxpercentage">
                    {toPercentage(completedSprints, totalSprints)}
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
                      width: toPercentage(completedSprints, totalSprints),
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
            <td>
              <div className="dashboardbox" onClick={handleGetInfo(2)}>
                <div className="dashboardboxheading">Stories</div>
                <div className="dashboardboxvalue">
                  {acceptedStories}/{totalStories}
                </div>
                <div className="dashboardboxpercentagebox">
                  <div className="dashboardboxpercentagetitle">Accepted</div>
                  <div className="dashboardboxpercentage">
                    {toPercentage(acceptedStories, totalStories)}
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
                      width: toPercentage(acceptedStories, totalStories),
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
            <td>
              <div className="dashboardbox">
                <div className="dashboardboxheading">GenC Engagement</div>
                <div className="dashboardboxvalue">{`${currentSprintGenCs}/${totalGenCs}`}</div>
                <div className="dashboardboxpercentagebox">
                  <div className="dashboardboxpercentagetitle">
                    Assigned to GenCs
                  </div>
                  <div className="dashboardboxpercentage">
                    {toPercentage(currentSprintGenCs, totalGenCs)}
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
                      width: toPercentage(currentSprintGenCs, totalGenCs),
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
      <table className="mainTable">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={getRandomKey()}>
                  <span>{column.label}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {listData &&
              listData.map((row, rowIndex) => {
                return (
                  <tr key={getRandomKey()} className="rowstyle">
                    {columns.map((column, colIndex) => {
                      return colIndex == 0 ? (
                        <td className="tdcentercontent">{rowIndex + 1}</td>
                      ) : (
                        <td key={getRandomKey()} className="tdcentercontent">
                          {printContent(column, row, rowIndex)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
      {isLoading && <div className="loader-container"></div>}
    </div>
  );
};

export default GenCTrackerDashboard;
