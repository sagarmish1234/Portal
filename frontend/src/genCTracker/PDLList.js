import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetAllPDLs } from "../utils/AppUtils";
import classes from "./GenCTrackerComponents.module.css";

const PDLList = (props) => {
  const [pdlData, setPDLData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");

  const columns = [
    { accessor: "id", label: "S.NO", colSize: "8" },
    { accessor: "name", label: "Name", colSize: "20" },
    { accessor: "sbu", label: "SBU", colSize: "20" },
  ];
  useEffect(() => {
    getPDLData();
  }, []);

  const getPDLData = () => {
    setIsLoading(true);
    apiGetAllPDLs()
      .then(
        (response) => {
          console.log(response);
          setPDLData(response);
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
        // setPDLData(DUMMY_TRAININGS);
      });
  };

  return (
    <div className={classes.container}>
      {/* <PDLDevWatermark name="Divyam Arora" /> */}
      <h5 className={classes.formheading}>PDLs</h5>

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
          {pdlData.map((pdl, i) => {
            // const isClosed = new Date(pdl.endDate) - Date.now() < 0;
            return (
              <tr key={pdl.id} className={`${classes.tablerow}`}>
                <td>
                  <span>{i + 1}</span>
                </td>
                <td>
                  <span>{pdl.name}</span>
                </td>
                <td>
                  <span>{pdl.sbu.name}</span>
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

export default PDLList;
