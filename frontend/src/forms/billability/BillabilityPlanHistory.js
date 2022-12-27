import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import Button from "react-validation/build/button";
import "../../css/profilelist.css";
import { UI_URL } from "../../common/constants";
import { Link } from "react-router-dom";

const BillabilityPlanHistory = () => {
  const { associateId, associateName } = useParams();

  const [associateBillabilityHistory, setAssociateBillabilityHistory] =
    useState([]);
  const [hasRecords, setHasRecords] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");

  const columns = [
    { accessor: "billableCategoryName", label: "Billable Plan", colSize: "20" },
    { accessor: "etaDate", label: "ETA (Date)", colSize: "20" },
    { accessor: "owner", label: "Owner", colSize: "8" },
    { accessor: "remarkrs", label: "Remarks", colSize: "40" },
    { accessor: "dateAdded", label: "Date Added", colSize: "20" },
  ];

  useEffect(() => {
    DataService.getAssociateBillabilityHistory(associateId).then(
      (response) => {
        setAssociateBillabilityHistory(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );
  }, []);

  const renderTableData = () => {
    return associateBillabilityHistory.map((row, index) => {
      return (
        <>
          <tr key={index} className="profilerow">
            {columns.map((column) => {
              return (
                <td className="tdcentercontent">{row[column.accessor]}</td>
              );
            })}
          </tr>
        </>
      );
    });
  };

  return (
    <div>
      <label className="formheading">
        Billable Plan History: {associateName}
      </label>
      <table className="gdvheader" width="100%">
        <tbody>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.accessor} className="tdleftcontent">
                  <span>{column.label}</span>
                </th>
              );
            })}
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default BillabilityPlanHistory;
