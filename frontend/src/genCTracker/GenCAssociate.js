import React, { useState, useEffect } from "react";
import { apiGetGenCAssociate } from "../utils/AppUtils";
import { useSearchParams, Link } from "react-router-dom";
import { STORY_COMPLETION_THRESHOLD } from "../common/constants";

function GenCAssociate() {
  const [isLoading, setIsLoading] = useState(false);
  const [associates, setAssociates] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    apiGetGenCAssociate(searchParams.toString())
      .then((response) => setAssociates(response))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  var columns = [
    { label: "S. No.", colSize: "5", type: "text" },
    {
      accessor: "associateID",
      label: "Associate ID",
      colSize: "30",
      type: "link",
    },
    {
      accessor: "associateName",
      label: "Associate Name",
      colSize: "40",
      type: "link",
      target: "associate",
      isBillable: 0,
    },
    {
      accessor: "totalStories",
      label: "Total Stories",
      colSize: "40",
      // type: "link",
    },
    {
      accessor: "completedStories",
      label: "Completed Stories",
      colSize: "40",
      // type: "link",
    },
    {
      accessor: "skillProgression",
      label: "Skill Progression",
      colSize: "40",
      type: "progress",
    },

    {
      accessor: "projectID",
      label: "Project ID",
      colSize: "20",
      type: "link",
      target: "associate",
      isBillable: 1,
    },
    {
      accessor: "projectDescription",
      label: "Project Description",
      colSize: "5",
      type: "link",
      target: "epic",
    },

    {
      accessor: "lob",
      label: "LOB",
      colSize: "5",
      type: "link",
      target: "sprint",
      isCompleted: 0,
    },
    {
      accessor: "gradeDescription",
      label: "Grade Description",
      colSize: "5",
      type: "link",
      target: "sprint",
      isCompleted: 1,
    },
    {
      accessor: "billabilityStatus",
      label: "Billability Status",
      colSize: "5",
      type: "boolean",
    },
  ];

  const printContent = (column, row, rowIndex) => {
    if (column.type == "boolean") return row[column.accessor] ? "Yes" : "No";
    else if (column.type == "date")
      return new Date(row[column.accessor]).toUTCString();
    else if (column.type == "progress") {
      const percentage = row[column.accessor];
      return (
        <Link
          to={`/ui/gencTracker/associates/${associates[rowIndex].associateID}/skillDetails`}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                height: "min-content",
                display: "inline-block",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  width: `${percentage > 100 ? 100 : percentage}%`,
                  height: "min-content",
                  backgroundColor: "#5796fa",
                  textAlign: "right",
                }}
              >
                <span style={{ color: "black", paddingRight: "5px" }}>
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    return row[column.accessor];
  };

  return (
    <div>
      {!isLoading && (
        <table className="mainTable">
          <thead>
            <tr>
              {columns.map((column, index) => {
                return (
                  <th key={index}>
                    <span>{column.label}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {associates.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className="rowstyle">
                  {columns.map((column, colIndex) => {
                    return colIndex == 0 ? (
                      <td key={colIndex} className="tdcentercontent">
                        {rowIndex + 1}
                      </td>
                    ) : (
                      <td key={colIndex} className="tdcentercontent">
                        {printContent(column, row, rowIndex)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isLoading && <div className="loader-container"></div>}
    </div>
  );
}

export default GenCAssociate;
