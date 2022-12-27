import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetAllParentAccounts } from "../utils/AppUtils";
import classes from "./GenCTrackerComponents.module.css";

const ParentAccountList = (props) => {
  const [parentAccountData, setParentAccountData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");

  const columns = [
    { accessor: "id", label: "S.NO", colSize: "8" },
    { accessor: "name", label: "Name", colSize: "20" },
    {
      accessor: "edlId",
      label: "EDL id",
      colSize: "10",
    },
    { accessor: "edlName", label: "EDL name", colSize: "10" },
    { accessor: "pdl", label: "PDL", colSize: "20" },
  ];
  useEffect(() => {
    getParentAccountData();
  }, []);

  const getParentAccountData = () => {
    setIsLoading(true);
    apiGetAllParentAccounts()
      .then(
        (response) => {
          console.log(response);
          setParentAccountData(response);
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
        // setParentAccountData(DUMMY_TRAININGS);
      });
  };

  return (
    <div className={classes.container}>
      {/* <ParentAccountDevWatermark name="Divyam Arora" /> */}
      <h5 className={classes.formheading}>Parent Accounts</h5>

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
          {parentAccountData.map((parentAccount, i) => {
            // const isClosed = new Date(parentAccount.endDate) - Date.now() < 0;
            return (
              <tr key={parentAccount.id} className={`${classes.tablerow}`}>
                <td>
                  <span>{i + 1}</span>
                </td>
                <td>
                  <span>{parentAccount.name}</span>
                </td>
                <td>
                  <span>{parentAccount.edlId}</span>
                </td>
                <td>
                  <span>{parentAccount.edlName}</span>
                </td>
                <td>
                  <span>{parentAccount.pdl.name}</span>
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

export default ParentAccountList;
