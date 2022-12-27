import React, { useEffect, useState } from "react";
import { apiGetAssociateStoryDetails } from "../utils/AppUtils";
import { useParams } from "react-router-dom";
import classes from "./GenCTrackerComponents.module.css";
import { STORY_COMPLETION_THRESHOLD } from "../common/constants";

function SkillFamilyDetails() {
  const [skills, setSkills] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiGetAssociateStoryDetails(id)
      .then((response) => setSkills(response))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  var columns = [
    { label: "S. No.", colSize: "10", type: "text" },
    {
      accessor: "skill",
      label: "Skill",
      colSize: "10",
    },
    {
      accessor: "completedStories",
      label: "Completed Stories",
      colSize: "10",
    },
    {
      accessor: "storyProgress",
      label: "Story Progress",
      colSize: "10",
    },
  ];

  const printContent = (column, row, rowIndex) => {
    // if (column.type == "boolean") return row[column.accessor] ? "Yes" : "No";
    // else if (column.type == "date")
    //   return new Date(row[column.accessor]).toUTCString();
    // else if (column.type == "progress") {
    //   return (
    //     <Link
    //       to={`/ui/gencTracker/associates/${associates[rowIndex].associateID}/skillDetails`}
    //     >
    //       <div
    //         style={{
    //           float: "left",
    //           width: `${row[column.accessor]}%`,
    //           height: "10px",
    //           backgroundColor: "#0018f1",
    //         }}
    //       ></div>
    //       <div
    //         style={{
    //           width: "100%",
    //           height: "10px",
    //           backgroundColor: "#e4e5f7",
    //         }}
    //       ></div>
    //       {row[column.accessor]}%
    //     </Link>
    //   );
    // }
    if (column.accessor == "storyProgress") {
      const percentage =
        (row["completedStories"] * 100) / STORY_COMPLETION_THRESHOLD;
      return (
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
                backgroundColor: "#2cc0f2",
                textAlign: "right",
              }}
            >
              <span style={{ color: "black", paddingRight: "5px" }}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return row[column.accessor];
  };

  return (
    <div className={classes.container}>
      {!isLoading && (
        <table className={classes.table}>
          <thead>
            <tr className={classes.tablehead}>
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
            {skills.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className={"profilerow"}>
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

export default SkillFamilyDetails;
