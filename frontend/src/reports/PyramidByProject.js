import React, { useState, useEffect } from "react";
import HomeService from "../services/home.service";
import AssignmentService from "../services/assignment.service";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../css/pyramidbyprojects.css";
import GradeMapping from "../common/GradeMapping";

const PyramidByProject = () => {
  const [content, setContent] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [newAssignmentData, setNewAssignmentData] = useState([]);
  const [reportViews, setReportViews] = useState([]);
  const [selected, setSelected] = useState(2);
  const [hasRecords, setHasRecords] = useState(false);
  const { register, handleSubmit, errors, control } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onBlur",
  });
  const [practiceViews, setPracticeViews] = useState([]);
  const [lobViews, setLobViews] = useState([]);
  const [projectViews, setProjectViews] = useState([]);
  const [practiceChecked, setPracticeChecked] = useState([]);
  const [lobChecked, setLobChecked] = useState([]);
  const [projectChecked, setProjectChecked] = useState([]);
  const [projectTypeChecked, setProjectTypeChecked] = useState([]);
  const [pyramidData, setPyramidData] = useState([]);
  const [projectIDdNameMapping, setProjectIDdNameMapping] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const keyOnsiteBill = "keyOnsiteBill";
  const keyOnsiteNBL = "keyOnsiteNBL";
  const keyOffshoreBill = "keyOffshoreBill";
  const keyOffshoreNBL = "keyOffshoreNBL";
  const keyTotal = "TotalValues";
  const [projectOwningChecked, setProjectOwningChecked] = useState(false);

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
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    refreshPyramidData();
  }, [
    practiceChecked,
    lobChecked,
    projectChecked,
    projectTypeChecked,
    projectOwningChecked,
    projectTypeChecked,
  ]);

  const onSubmit = (data) => {};

  const handleError = (errors) => {};

  const getReportData = (reportID, paramId) => {
    AssignmentService.getAssignmentReport(reportID, paramId).then(
      (response) => {
        setAssignmentData(response);
        setHasRecords(response.length > 0);
        const vPracticeMap = [];
        const vLobMap = [];
        const vProjectsMap = [];
        const vProjectsIdNameMap = new Map();
        const vProjectsIdMap = [];
        const vProjectTypeMap = [];
        response.map((associate) => {
          setAssignmentData(response);
          if (vPracticeMap.indexOf(associate.serviceLine) < 0) {
            vPracticeMap.push(associate.serviceLine);
          }

          if (vProjectTypeMap.indexOf(associate.projectBillability) < 0) {
            vProjectTypeMap.push(associate.projectBillability);
          }

          if (vLobMap.indexOf(associate.lOB) < 0) {
            vLobMap.push(associate.lOB);
          }

          let idx = vProjectsMap.findIndex(function (project) {
            return project.value.toString() === associate.projectID.toString();
          });

          if (idx < 0) {
            vProjectsMap.push({
              value: associate.projectID.toString(),
              label: associate.projectDescription,
            });
            vProjectsIdNameMap.set(
              associate.projectID.toString(),
              associate.projectDescription
            );
            vProjectsIdMap.push(associate.projectID.toString());
          }
        });
        setProjectIDdNameMapping(vProjectsIdNameMap);
        setPracticeViews(vPracticeMap);
        setPracticeChecked(vPracticeMap);
        setLobViews(vLobMap);
        setLobChecked(vLobMap);
        setProjectViews(vProjectsMap);
        setProjectChecked(vProjectsIdMap);
        setProjectType(vProjectTypeMap);
        setProjectTypeChecked(vProjectTypeMap);
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

  const onChangePracticeAllCheckBox = (event) => {
    var updatedList = [];
    if (!event.target.checked) {
    } else {
      assignmentData.map((associate) => {
        if (updatedList.indexOf(associate.serviceLine) < 0) {
          updatedList.push(associate.serviceLine);
        }
      });
    }
    setPracticeChecked(updatedList);
    refreshLOBAndProjects(updatedList);
  };

  const onChangeLobAllCheckBox = (event) => {
    var updatedList = [];
    if (!event.target.checked) {
      setLobChecked(updatedList);
      setProjectChecked(updatedList);
      refreshProjects(updatedList, projectTypeChecked);
    } else {
      refreshLOBAndProjects(practiceChecked);
    }
  };

  const onChangeProjectAllCheckBox = (event) => {
    var updatedList = [];
    if (!event.target.checked) {
      setProjectChecked(updatedList);
    } else {
      refreshProjects(lobChecked, projectTypeChecked);
    }
  };

  const refreshProjects = (updatedLobChecked, updatedPrjTypeChecked) => {
    const vProjectsMap = [];
    const vProjectsIdMap = [];
    assignmentData.map((associate) => {
      if (
        practiceChecked.indexOf(associate.serviceLine) > -1 &&
        updatedLobChecked.indexOf(associate.lOB) > -1 &&
        updatedPrjTypeChecked.indexOf(associate.projectBillability) > -1
      ) {
        let idx = vProjectsMap.findIndex(function (project) {
          return project.value.toString() === associate.projectID.toString();
        });

        if (idx < 0) {
          vProjectsMap.push({
            value: associate.projectID.toString(),
            label: associate.projectDescription,
          });
          vProjectsIdMap.push(associate.projectID.toString());
        }
      }
    });

    setProjectViews(vProjectsMap);
    setProjectChecked(vProjectsIdMap);
  };

  const onChangePracticeCheckBox = (event) => {
    var updatedList = [...practiceChecked];
    if (event.target.checked) {
      updatedList = [...practiceChecked, event.target.value.toString()];
    } else {
      updatedList.splice(practiceChecked.indexOf(event.target.value), 1);
    }
    setPracticeChecked(updatedList);
    refreshLOBAndProjects(updatedList);
  };

  const refreshLOBAndProjects = (updatedList) => {
    const vLobMap = [];
    const vProjectsMap = [];
    const vProjectsIdMap = [];
    assignmentData.map((associate) => {
      if (updatedList.indexOf(associate.serviceLine) > -1) {
        if (vLobMap.indexOf(associate.lOB) < 0) {
          vLobMap.push(associate.lOB);
        }

        let idx = vProjectsMap.findIndex(function (project) {
          return project.value.toString() === associate.projectID.toString();
        });

        if (idx < 0) {
          vProjectsMap.push({
            value: associate.projectID.toString(),
            label: associate.projectDescription,
          });
          vProjectsIdMap.push(associate.projectID.toString());
        }
      }
    });

    setLobViews(vLobMap);
    setLobChecked(vLobMap);
    setProjectViews(vProjectsMap);
    setProjectChecked(vProjectsIdMap);
  };

  const onChangeFilter = (event, selectionID) => {
    if (selectionID == 1) {
      onChangePracticeAllCheckBox(event);
    } else if (selectionID == 2) {
      onChangeLobAllCheckBox(event);
    } else if (selectionID == 3) {
      onChangeProjectAllCheckBox(event);
    } else if (selectionID == 4) {
      onChangePracticeCheckBox(event);
    } else if (selectionID == 5) {
      onChangeLobCheckBox(event);
    } else if (selectionID == 6) {
      onChangeProjectCheckBox(event);
    } else if (selectionID == 7) {
      onChangeProjectOwningPracticeCheckBox(event);
    } else if (selectionID == 8) {
      onChangeProjectTypeCheckBox(event);
    }
  };

  const onChangeLobCheckBox = (event) => {
    var updatedList = [...lobChecked];
    if (event.target.checked) {
      updatedList = [...lobChecked, event.target.value];
    } else {
      updatedList.splice(lobChecked.indexOf(event.target.value), 1);
    }
    setLobChecked(updatedList);
    refreshProjects(updatedList, projectTypeChecked);
  };

  const onChangeProjectTypeCheckBox = (event) => {
    var updatedList = [...projectTypeChecked];
    if (event.target.checked) {
      updatedList = [...projectTypeChecked, event.target.value];
    } else {
      updatedList.splice(projectTypeChecked.indexOf(event.target.value), 1);
    }
    setProjectTypeChecked(updatedList);
    refreshProjects(lobChecked, updatedList);
  };

  const onChangeProjectCheckBox = (event) => {
    var updatedList = [...projectChecked];
    if (event.target.checked) {
      updatedList = [...projectChecked, event.target.value];
    } else {
      updatedList.splice(projectChecked.indexOf(event.target.value), 1);
    }
    setProjectChecked(updatedList);
  };

  const onChangeProjectOwningPracticeCheckBox = (event) => {
    setProjectOwningChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setSelected(event.value);
    getReportData(1, event.value);
  };

  const getPercentage = (number, total) => {
    if (total > 0) return ((number * 100) / total).toFixed(1) + "%";
    else return "-";
  };

  const isProjectChecked = (projectId) => {
    if (projectChecked.indexOf(projectId.toString()) > -1) {
      return true;
    } else return false;
  };

  const setFTEValuesInMap = (map, fte, key) => {
    let vValue = map.get(key);
    if (!vValue) vValue = 0.0;
    vValue = vValue + fte;
    map.set(key, vValue);
  };

  const setBillableOrNBLMap = (
    gradeMap,
    key,
    fte,
    totalPrjMap,
    totalLobMap
  ) => {
    setFTEValuesInMap(gradeMap, fte, key);
    setFTEValuesInMap(totalPrjMap, fte, key);
    setFTEValuesInMap(totalLobMap, fte, key);
  };

  const getOrCreateChildMap = (parentMap, key) => {
    let newChildMap = parentMap.get(key);
    if (!newChildMap) {
      newChildMap = new Map();
      parentMap.set(key, newChildMap);
    }
    return newChildMap;
  };

  const fillMapAsPerOnOffBillNBL = (
    OnOff,
    billabilityStatus,
    fte,
    map,
    totalPrjMap,
    totalLobMap
  ) => {
    if (OnOff == "Onsite") {
      if (billabilityStatus == true) {
        setBillableOrNBLMap(map, keyOnsiteBill, fte, totalPrjMap, totalLobMap);
      } else {
        setBillableOrNBLMap(map, keyOnsiteNBL, fte, totalPrjMap, totalLobMap);
      }
    } else {
      if (billabilityStatus == true) {
        setBillableOrNBLMap(
          map,
          keyOffshoreBill,
          fte,
          totalPrjMap,
          totalLobMap
        );
      } else {
        setBillableOrNBLMap(map, keyOffshoreNBL, fte, totalPrjMap, totalLobMap);
      }
    }
  };

  const refreshPyramidData = () => {
    const vPyramidData = [];
    let billabilityData = new Map();
    let serviceLineMap = new Map();
    let lobMap = new Map();
    let projectMap = new Map();
    let gradeMap = new Map();
    let totalPrjMap = new Map();
    let totalLobMap = new Map();
    assignmentData.map((associate) => {
      if (practiceChecked.indexOf(associate.serviceLine) > -1) {
        serviceLineMap = getOrCreateChildMap(
          billabilityData,
          associate.serviceLine
        );

        if (lobChecked.indexOf(associate.lOB) > -1) {
          lobMap = getOrCreateChildMap(serviceLineMap, associate.lOB);
          totalLobMap = getOrCreateChildMap(lobMap, keyTotal);

          if (projectChecked.length > 0) {
            if (projectChecked.indexOf(associate.projectID.toString()) > -1) {
              projectMap = getOrCreateChildMap(
                lobMap,
                associate.projectID.toString()
              );

              let gradeIdx = GradeMapping.getGradePos(
                associate.gradeDescription
              );
              gradeMap = getOrCreateChildMap(projectMap, gradeIdx);
              totalPrjMap = getOrCreateChildMap(projectMap, keyTotal);

              fillMapAsPerOnOffBillNBL(
                associate.onOff,
                associate.billabilityStatus,
                associate.fTE,
                gradeMap,
                totalPrjMap,
                totalLobMap
              );
            }
          } else if (lobChecked.length > 0) {
            //  let gradeIdx = GradeMapping.getGradePos(associate.gradeDescription);
            //gradeMap = getOrCreateChildMap(lobMap, gradeIdx);
          }
        }
      }
    });
    setPyramidData(billabilityData);
  };

  const toNumber = (input) => {
    if (!input) return 0.0;
    else return parseFloat(input);
  };

  const toDisplay = (input) => {
    if (!input) return "";

    let value = parseFloat(input);
    if (value == 0.0) return "";

    return value.toFixed(1);
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

  const renderProjectTotal = (itemGrade, results) => {
    results.push(
      <tr className="datarowttoal">
        <td className="gridviewcontentname">Total</td>
        <td className="gridviewcontentno">
          {toDisplay(toNumber(itemGrade.get(keyOffshoreBill)))}
        </td>
        <td className="gridviewcontentno">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)),
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOffshoreBill))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toDisplay(toNumber(itemGrade.get(keyOffshoreNBL)))}
        </td>
        <td className="gridviewcontentnbl">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreNBL)),
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOffshoreBill))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>

        <td className="gridviewcontentno">
          {toDisplay(toNumber(itemGrade.get(keyOnsiteBill)))}
        </td>
        <td className="gridviewcontentno">
          {toPercentage(
            toNumber(itemGrade.get(keyOnsiteBill)),
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toDisplay(toNumber(itemGrade.get(keyOnsiteNBL)))}
        </td>
        <td className="gridviewcontentnbl">
          {toPercentage(
            toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toDisplay(
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toPercentage(
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>

        <td className="gridviewcontentno">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill))
          )}
        </td>
        <td className="gridviewcontentno">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal"></td>
      </tr>
    );
  };

  const renderPracticInfo = (practiceName, span) => {
    return (
      <td className="gridviewcontentname" rowSpan={span}>
        {practiceName}{" "}
      </td>
    );
  };

  const renderLobInfo = (lobName, span) => {
    return (
      <td className="gridviewcontentname" rowSpan={span}>
        {lobName}
      </td>
    );
  };

  const renderProjectInfo = (projectName, span) => {
    return (
      <td className="gridviewcontentname" rowSpan={span}>
        {projectName}
      </td>
    );
  };

  const renderFTEData = (gradeKey, itemGrade, prjTotalMap) => {
    return (
      <>
        <td className="gridviewcontentname">
          {GradeMapping.getGrade(parseInt(gradeKey))}
        </td>
        <td className="gridviewcontentno">
          {toDisplay(toNumber(itemGrade.get(keyOffshoreBill)))}
        </td>
        <td className="gridviewcontentno">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)),
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOffshoreBill))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toDisplay(toNumber(itemGrade.get(keyOffshoreNBL)))}
        </td>
        <td className="gridviewcontentnbl">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreNBL)),
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOffshoreBill))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>

        <td className="gridviewcontentno">
          {toDisplay(toNumber(itemGrade.get(keyOnsiteBill)))}
        </td>
        <td className="gridviewcontentno">
          {toPercentage(
            toNumber(itemGrade.get(keyOnsiteBill)),
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toDisplay(toNumber(itemGrade.get(keyOnsiteNBL)))}
        </td>
        <td className="gridviewcontentnbl">
          {toPercentage(
            toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toDisplay(
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toPercentage(
            toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>

        <td className="gridviewcontentno">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill))
          )}
        </td>
        <td className="gridviewcontentno">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentnbl">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toDisplay(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL))
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {toPercentage(
            toNumber(itemGrade.get(keyOffshoreBill)) +
              toNumber(itemGrade.get(keyOnsiteBill)) +
              toNumber(itemGrade.get(keyOffshoreNBL)) +
              toNumber(itemGrade.get(keyOnsiteNBL)),
            toNumber(prjTotalMap.get(keyOffshoreBill)) +
              toNumber(prjTotalMap.get(keyOnsiteBill)) +
              toNumber(prjTotalMap.get(keyOffshoreNBL)) +
              toNumber(prjTotalMap.get(keyOnsiteNBL))
          )}
        </td>
      </>
    );
  };

  const renderTableData = () => {
    const results = [];
    let itemObjGradeSorted;
    let totalMap;
    let totalPrjMap;
    let rowSpanLen;
    pyramidData.forEach((itemObjSL, pyramidKey, pyramidData) => {
      itemObjSL.forEach((itemObjLOB, lobKey, itemObjSL) => {
        totalMap = itemObjLOB.get(keyTotal);
        rowSpanLen = itemObjLOB.size;
        itemObjGradeSorted = new Map([...itemObjLOB.entries()].sort());
        if (projectChecked.length > 0) {
          itemObjLOB.forEach((itemObjPrj, prjKey, itemObjLOB) => {
            if (prjKey != keyTotal) {
              totalPrjMap = itemObjPrj.get(keyTotal);
              rowSpanLen = itemObjPrj.size;
              itemObjGradeSorted = new Map([...itemObjPrj.entries()].sort());
              itemObjGradeSorted.forEach(
                (itemGrade, gradeKey, itemObjGradeSorted) => {
                  if (gradeKey != keyTotal) {
                    results.push(
                      //results start
                      <tr>
                        {rowSpanLen > 0 ? (
                          <>
                            {renderPracticInfo(pyramidKey, rowSpanLen)}
                            {renderLobInfo(lobKey, rowSpanLen)}
                            {renderProjectInfo(
                              projectIDdNameMapping.get(prjKey),
                              rowSpanLen
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        {renderFTEData(gradeKey, itemGrade, totalPrjMap)}
                      </tr>
                    ); // results end
                    rowSpanLen = 0;
                  }
                }
              ); // project loop for all grades

              renderProjectTotal(totalPrjMap, results);
            }
          }); //lob loop for all projects
        } else {
          console.log("I am here");
        }
      }); // pratice loop for all LOBS
    }); // main loop for all practices
    return results;
  };

  return (
    <div className="maindiv">
      <table className="assignmentdropdown">
        <tbody>
          <tr>
            <td className="tddropdownlabel">
              <Label>Assignent Reports: &nbsp;</Label>
            </td>
            <td className="tdheaderelements">
              <Form onSubmit={handleSubmit(onSubmit, handleError)}>
                <FormGroup>
                  <Select onChange={handleChange} options={reportViews} />
                </FormGroup>
              </Form>
            </td>
            <td className="tdprojectlabel">
              {projectType && projectType.length > 0 ? (
                <Label>Project Type ={">"} &nbsp;</Label>
              ) : (
                <></>
              )}
            </td>
            <td className="tdheaderelements">
              {projectType.map((item) => (
                <>
                  <label> {item} &nbsp;</label>
                  <input
                    value={item}
                    type="checkbox"
                    checked={projectTypeChecked.includes(item)}
                    onChange={(event) => onChangeFilter(event, 8)}
                  />

                  <label> &nbsp;&nbsp;&nbsp;</label>
                </>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <table width="100%">
          <tbody>
            <tr>
              <th>
                Pratice &nbsp;
                <input
                  type="checkbox"
                  checked={practiceChecked.length > 0}
                  onChange={(event) => onChangeFilter(event, 1)}
                />
              </th>
              <th>
                LOB &nbsp;
                <input
                  type="checkbox"
                  checked={lobChecked.length > 0}
                  onChange={(event) => onChangeFilter(event, 2)}
                />
              </th>
              <th>
                Projects &nbsp;
                <input
                  type="checkbox"
                  checked={projectChecked.length > 0}
                  onChange={(event) => onChangeFilter(event, 3)}
                />
              </th>
              <th>Pyramid</th>
            </tr>
            <tr className="pyramidfulltable">
              <td className="checkboxlist">
                {practiceViews.map((practice, index) => (
                  <div key={index}>
                    <input
                      name={practice}
                      value={practice}
                      type="checkbox"
                      checked={practiceChecked.includes(practice)}
                      onChange={(event) => onChangeFilter(event, 4)}
                    />
                    <span>&nbsp;{practice}</span>
                  </div>
                ))}
              </td>
              <td className="checkboxlist">
                {lobViews.map((lob, index) => (
                  <div key={index}>
                    <input
                      value={lob}
                      type="checkbox"
                      checked={lobChecked.includes(lob)}
                      onChange={(event) => onChangeFilter(event, 5)}
                    />
                    <span>
                      &nbsp;
                      {index} - {lob}
                    </span>
                  </div>
                ))}
              </td>
              <td className="checkboxlist">
                {projectViews.map((project, index) => (
                  <div key={index}>
                    <input
                      value={project.value}
                      type="checkbox"
                      checked={isProjectChecked(project.value)}
                      onChange={(event) => onChangeFilter(event, 6)}
                    />
                    <span>
                      &nbsp;
                      {index} - {project.label}
                    </span>
                  </div>
                ))}
              </td>
              <td>
                <div>
                  <div>
                    <div>
                      <table width="100%" id="tablepyramid">
                        <tbody>
                          <tr>
                            <td>
                              {hasRecords ? (
                                <table
                                  cellSpacing="0"
                                  cellPadding="5"
                                  rules="all"
                                >
                                  <tbody>
                                    <tr className="gdvheader">
                                      <td colSpan="1">SL</td>
                                      <td colSpan="1">LOB</td>

                                      <td colSpan="1">Project</td>

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
                                        &nbsp;
                                      </th>
                                      <th className="gdvheader" scope="col">
                                        &nbsp;
                                      </th>
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
                                  </tbody>
                                </table>
                              ) : (
                                <div />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PyramidByProject;
