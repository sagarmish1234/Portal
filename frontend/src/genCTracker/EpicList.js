import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetAllEpics } from "../utils/AppUtils";
import classes from "./GenCTrackerComponents.module.css";

const EpicList = (props) => {
  const [epicData, setEpicData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const columns = [
    { accessor: "id", label: "S.NO", colSize: "8" },
    { accessor: "name", label: "Name", colSize: "20" },
    {
      accessor: "expectedStoryPoint",
      label: "Expected Story Point",
      colSize: "10",
    },
    { accessor: "eta", label: "ETA", colSize: "10" },
    { accessor: "storyPoints", label: "Story Points", colSize: "10" },
    { accessor: "stories", label: "# Stories", colSize: "10" },
    { accessor: "completedStories", label: "Completed Stories", colSize: "10" },
    { accessor: "completed", label: "Completed", colSize: "10" },
  ];
  useEffect(() => {
    getEpicData(searchParams.toString());
  }, []);

  const getEpicData = () => {
    setIsLoading(true);
    apiGetAllEpics(searchParams.toString())
      .then(
        (response) => {
          setEpicData(response);
          setHasRecords(response.length > 0);
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
        // setEpicData(DUMMY_TRAININGS);
      });
  };

  return (
    <div className={classes.container}>
      {/* <EpicDevWatermark name="Divyam Arora" /> */}
      <h5 className={classes.formheading}>Epics</h5>

      <table className={classes.table}>
        <thead>
          <tr className={classes.tablehead}>
            {columns.map((column) => {
              return (
                <th key={column.label}>
                  <div
                    className={classes.tableheading}
                    data-id={column.accessor}
                    // onClick={onSortHandler}
                  >
                    <p>{column.label}</p>
                    {/* <span class="material-icons">filter_alt</span> */}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {epicData.map((epic, i) => {
            // const isClosed = new Date(epic.endDate) - Date.now() < 0;
            return (
              <tr key={epic.id} className={`${classes.tablerow}`}>
                <td>
                  <span>{i + 1}</span>
                </td>
                <td>
                  <span>
                    <Link
                      to={`/ui/gencTracker/epic/${epic.id}/stories`}
                    >
                      {epic.name}
                    </Link>
                  </span>
                </td>
                <td>
                  <span>{epic.expectedStoryPoint}</span>
                </td>
                <td>
                  <span title={new Date(epic.eta).toLocaleTimeString()}>
                    {new Date(epic.eta).toDateString()}
                  </span>
                </td>
                <td>
                  <span>{epic.storyPoints}</span>
                </td>
                <td>
                  <Link
                    to={`/ui/gencTracker/epic/${epic.id}/stories`}
                  >
                    {epic.stories}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/ui/gencTracker/epic/${epic.id}/stories?isAccepted=1`}
                  >
                    {epic.acceptedStories}
                  </Link>
                </td>
                <td>
                  <span>{epic.completed ? "Yes" : "No"}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && <div className="loader-container"></div>}
      {!hasRecords && <p className={classes.info}>No Records</p>}
    </div>
  );
};

export default EpicList;
