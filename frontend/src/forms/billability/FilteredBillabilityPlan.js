import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../../css/billabilityplan.css";
import Select from "react-select";
import { BillabilityPlanTable } from "../../components/BillabilityPlanTable";
import { sortRows, filterRows, paginateRows } from "../../components/helpers";
import SaveIcon from "../../images/saveicon.svg";
import SaveIconDisabled from "../../images/saveicondisabled.svg";
import { required } from "../../common/validators";
import DatePicker from "react-datepicker";
import BillablePlanService from "../../services/billabilityplan.service";
import { UI_URL } from "../../common/constants";
import { Link } from "react-router-dom";

const FilteredBillabilityPlan = (props) => {
  const { selPractice, categoryId, grade, location } = useParams();

  const [billabilityData, setBillabilityData] = useState([]);
  const [hadRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");
  const [billableCategoryViews, setBillableCategoryViews] = useState([]);
  const [billableCategoryMap, setBillableCategoryMap] = useState([]);

  const todayDate = new Date();
  const formatDate =
    todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate();
  const formatMonth =
    todayDate.getMonth() < 9
      ? `0${todayDate.getMonth() + 1}`
      : todayDate.getMonth() + 1;
  const formattedDate = [formatMonth, formatDate, todayDate.getFullYear()].join(
    "/"
  );

  const columns = [
    { accessor: "associateID", label: "ID", colSize: "7" },
    { accessor: "associateName", label: "Associate Name", colSize: "20" },
    { accessor: "sID", label: "SID", colSize: "8" },
    { accessor: "sIDStatus", label: "SID Status", colSize: "15" },
    { accessor: "projectID", label: "Project ID", colSize: "10" },
    { accessor: "projectDescription", label: "Project Name", colSize: "20" },
    { accessor: "projectBillability", label: "Type", colSize: "4" },
    { accessor: "projectManagerID", label: "PM ID", colSize: "7" },
    { accessor: "projectManagerName", label: "PM Name", colSize: "20" },
    { accessor: "lOB", label: "LOB", colSize: "5" },
    { accessor: "region", label: "Region", colSize: "6" },
    { accessor: "grade", label: "Grade", colSize: "2" },
    { accessor: "serviceLine", label: "SL", colSize: "5" },
    { accessor: "billabilityStatus", label: "Billable?", colSize: "2" },
    { accessor: "billabilityReason", label: "B. Reason", colSize: "8" },
    { accessor: "onOff", label: "On/Off", colSize: "6" },
    { accessor: "country", label: "Country", colSize: "10" },
    { accessor: "fTE", label: "FTE", colSize: "2" },
    { accessor: "numberOfPlans", label: "# Plans", colSize: "2" },
    { accessor: "categoryId", label: "Plan", colSize: "30", type: "select" },
    { accessor: "eta", label: "ETA", colSize: "10", type: "date" },
    { accessor: "owner", label: "Owner", colSize: "10", type: "text" },
    { accessor: "remarks", label: "Remarks", colSize: "10", type: "text" },
    { label: "Save", type: "icon" },
  ];

  useEffect(() => {
    DataService.getBillableCategories().then(
      (response) => {
        const tempView = [];
        const catMap = new Map();
        response.forEach((category, index) => {
          tempView.push({
            value: category.id,
            label: category.groupValue,
          });
          catMap.set(category.id, {
            value: category.id,
            label: category.groupValue,
          });
        });
        setBillableCategoryViews(tempView);
        setBillableCategoryMap(catMap);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setServerError(_content);
      }
    );
  }, []);

  useEffect(() => {
    getFilteredBillabilityData();
  }, []);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
      width: 200,
      minWidth: 200,
    }),
  };

  const formValuesChanged = (associateId) => {
    const el = document.getElementById("img" + associateId);
    el.src = SaveIcon;
  };
  const onChangeBillableCategory = (event, associateId) => {
    /*let associateMap = getOrCreateChildMap(updatedValues, associateId);
    associateMap.set("billableCategory", event.value);*/
    formValuesChanged(associateId);
  };

  const onChangeETADate = (event, associateId) => {
    /*let associateMap = getOrCreateChildMap(updatedValues, associateId);
    associateMap.set("etaDate", event.target.value);*/
    formValuesChanged(associateId);
  };

  const onChangeText = (event, associateId, accessor) => {
    /*let associateMap = getOrCreateChildMap(updatedValues, associateId);
    associateMap.set(accessor, event.target.value);*/
    formValuesChanged(associateId);
  };

  const onSave = (event, associateId) => {
    const el = document.getElementById("img" + associateId);

    if (el && el.src.toString().indexOf("disabled") > -1) return;

    const objBillabilityPlan = {
      associateId: associateId,
      billabilityCategory:
        document.getElementsByName("select" + associateId) &&
        document.getElementsByName("select" + associateId)[0]
          ? document.getElementsByName("select" + associateId)[0].value
          : undefined,
      etaDate: document.getElementById("date" + associateId)
        ? document.getElementById("date" + associateId).value
        : undefined,
      owner: document.getElementById("textowner" + associateId)
        ? document.getElementById("textowner" + associateId).value
        : undefined,
      remarks: document.getElementById("textremarks" + associateId)
        ? document.getElementById("textremarks" + associateId).value
        : undefined,
    };
    if (el) el.src = SaveIconDisabled;

    BillablePlanService.addBillabilityPlan(objBillabilityPlan).then(
      (response) => {
        console.log("addBillabilityPlan added");
      },
      (error) => {
        console.log("addBillabilityPlan failed");
      }
    );
  };

  const printContent = (column, row) => {
    if (column.type == "icon") {
      return (
        <img
          src={SaveIconDisabled}
          alt="Save"
          name={"img" + row["associateID"]}
          id={"img" + row["associateID"]}
          width="15"
          height="15"
          onClick={(event) => onSave(event, row["associateID"])}
        />
      );
    } else if (column.type == "select") {
      return (
        <Select
          name={"select" + row["associateID"]}
          options={billableCategoryViews}
          defaultValue={billableCategoryMap.get(row[column.accessor])}
          key={billableCategoryMap.get(row[column.accessor])}
          styles={customStyles}
          onChange={(event) =>
            onChangeBillableCategory(event, row["associateID"])
          }
        ></Select>
      );
    } else if (column.type == "date") {
      return (
        <input
          type="date"
          name={"date" + row["associateID"]}
          id={"date" + row["associateID"]}
          defaultValue={row[column.accessor]}
          onChange={(event) => onChangeETADate(event, row["associateID"])}
        />
      );
    } else if (column.type == "text") {
      return (
        <input
          type="text"
          name={"text" + column.accessor + row["associateID"]}
          id={"text" + column.accessor + row["associateID"]}
          defaultValue={row[column.accessor]}
          onChange={(event) =>
            onChangeText(event, row["associateID"], column.accessor)
          }
        />
      );
    } else if (column.accessor == "numberOfPlans") {
      return (
        <Link
          to={
            UI_URL +
            "report/billability/billableplanhistory/" +
            row["associateID"] +
            "/" +
            row["associateName"]
          }
        >
          {row[column.accessor]}
        </Link>
      );
    } else return row[column.accessor];
  };

  const getFilteredBillabilityData = () => {
    DataService.getFilteredBillablePlan(
      selPractice,
      categoryId,
      grade,
      location
    ).then(
      (response) => {
        setBillabilityData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setServerError(_content);
      }
    );
  };

  return (
    <div>
      <div>
        <div>
          <table className="assignmentdropdown">
            <tbody>
              <tr width="100%">
                <td colSpan="4">
                  <table>
                    <thead>
                      <tr>
                        {columns.map((column) => {
                          return (
                            <th key={column.accessor}>
                              <span>{column.label}</span>
                            </th>
                          );
                        })}
                      </tr>
                      <tr></tr>
                    </thead>
                    <tbody>
                      {billabilityData.map((row) => {
                        return (
                          <tr key={row.id} className="rowstyle">
                            {columns.map((column) => {
                              return (
                                <td
                                  key={column.accessor}
                                  className="tdleftcontent"
                                >
                                  {printContent(column, row)}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilteredBillabilityPlan;
