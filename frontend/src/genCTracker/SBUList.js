import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetAllSBUs } from "../utils/AppUtils";
import classes from "./GenCTrackerComponents.module.css";

const SBUList = (props) => {
  const [sbuData, setSBUData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");

  const columns = [
    { accessor: "id", label: "S.NO", colSize: "8" },
    { accessor: "name", label: "Name", colSize: "20" },
    {
      accessor: "headId",
      label: "Head id",
      colSize: "10",
    },
    { accessor: "headName", label: "Head name", colSize: "10" },
  ];
  useEffect(() => {
    getSBUData();
  }, []);

  const getSBUData = () => {
    setIsLoading(true);
    apiGetAllSBUs()
      .then(
        (response) => {
          console.log(response);
          setSBUData(response);
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
        // setSBUData(DUMMY_TRAININGS);
      });
  };

  return (
    <div className={classes.container}>
      {/* <SBUDevWatermark name="Divyam Arora" /> */}
      <h5 className={classes.formheading}>SBUs</h5>

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
          {sbuData.map((sbu, i) => {
            // const isClosed = new Date(sbu.endDate) - Date.now() < 0;
            return (
              <tr key={sbu.id} className={`${classes.tablerow}`}>
                <td>
                  <span>{i + 1}</span>
                </td>
                <td>
                  <span>{sbu.name}</span>
                </td>
                <td>
                  <span>{sbu.headId}</span>
                </td>
                <td>
                  <span>{sbu.headName}</span>
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

export default SBUList;
