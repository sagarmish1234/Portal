import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";
import Button from "react-validation/build/button";
import "../css/main.css";
import { UI_URL } from "../common/constants";
import SaveIcon from "../images/saveicon.svg";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import InterviewDriveService from "../services/InterViewDrive.service";
import { Form, FormGroup, Label, Input } from "reactstrap";

const ListOnly = () => {
  const [listData, setListData] = useState([]);
  const [hasRecords, setHasRecords] = useState(false);
  const [message, setMessage] = useState(false);

  const columns = [
    { label: "S. No.", colSize: "5" },
    { accessor: "associateID", label: "ID", colSize: "10" },
    { accessor: "associateName", label: "Name", colSize: "40" },
    { accessor: "latestStartDate", label: "Start Date", colSize: "20" },
    { accessor: "fTE", label: "FTE", colSize: "5" },
  ];

  useEffect(() => {
    DataService.getAssignmentListing("ADM").then(
      (response) => {
        setListData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        if ((error.response && error.response) || error.message)
          setMessage(error.toString());
      }
    );
  }, []);

  const printContent = (column, row) => {
    return row[column.accessor];
  };

  return (
    <div className="mainDiv">
      <table className="mainTable">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.accessor ? column.accessor : ""}>
                  <span>{column.label}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {listData.map((row) => {
            return (
              <tr key={row.associateID} className="rowstyle">
                {columns.map((column) => {
                  return (
                    <td key={column.accessor}>{printContent(column, row)}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListOnly;
