import React, { useState, useEffect, createContext, useContext } from "react";
import MonthModal from "../../components/MonthModal";
import YearModal from "../../components/YearModal";
import { ShowMonthModal } from "../../reports/AdminLeavesPanel";
import { ShowYearModal } from "../../reports/AdminLeavesPanel";
import { apiGetAllLeavesCategory } from "../../utils/AppUtils";

function AdminLeavesTable({ data, year, LOB, serviceLine }) {
  var dates = [];
  const [yearStatus, setYearStatus] = useState(year);
  const [lc, setLC] = useState(null);
  const [showYearModal, setShowYearModal] = useContext(ShowYearModal);
  const [showMonthModal, setShowMonthModal] = useContext(ShowMonthModal);
  const [associate, setAssociate] = useState(" ");
  const [monthModalData, setMonthModalData] = useState(null);
  const [yearModalData, setYearModalData] = useState(null);
  const isLeap =
    yearStatus % 400 === 0 || (yearStatus % 4 === 0 && yearStatus % 100 !== 0)
      ? 1
      : 0;
  const [status, setStatus] = useState(data);
  var startDate = new Date(yearStatus, 0, 1);
  for (let i = 1; i <= 365 + isLeap; i++) {
    let temp =
      "" +
      startDate.getDate() +
      "/" +
      (startDate.getMonth() + 1) +
      "/" +
      startDate.getFullYear();
    dates.push(temp);
    startDate.setDate(startDate.getDate() + 1);
  }

  useEffect(() => {
    setStatus(data);
    setYearStatus(year);
  }, [data]);

  useEffect(() => {
    apiGetAllLeavesCategory().then((data) => setLC(data));
  }, []);

  console.log("Hello world");

  //get month and year
  const getMonth = (str) => {
    var arr = str.split("/");
    return parseInt(arr[1]);
  };
  return (
    <div>
      <table className="adminTableDataTable">
        <tr>
          <th className="tdleftcontent">Associate / Month↠</th>
          <th className="tdleftcontent">Year</th>
          <th className="tdleftcontent">January</th>
          <th className="tdleftcontent">February</th>
          <th className="tdleftcontent">March</th>
          <th className="tdleftcontent">April</th>
          <th className="tdleftcontent">May</th>
          <th className="tdleftcontent">June</th>
          <th className="tdleftcontent">July</th>
          <th className="tdleftcontent">August</th>
          <th className="tdleftcontent">September</th>
          <th className="tdleftcontent">October</th>
          <th className="tdleftcontent">November</th>
          <th className="tdleftcontent">December</th>
        </tr>
        {status.map((emp, index) => {
          return (
            <tr>
              <td className="purpleT">
                {emp.fullName + "(" + emp.associateId + ")"}
              </td>
              <td
                className="yellowT tdHover"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowYearModal(true);
                  setAssociate(emp.fullName);
                  setYearModalData(emp.monthStatusPOJOS);
                }}
              >
                {emp.monthStatusPOJOS.reduce((total, month, ind) => {
                  return (
                    month.statusArrayList.filter((status, i) => status == "W")
                      .length + total
                  );
                }, 0)}
              </td>
              {emp.monthStatusPOJOS.map((month, ind) => {
                return (
                  <td
                    className={
                      ind % 2 === 0 ? "purpleT tdHover" : "yellowT tdHover"
                    }
                    style={{ cursor: "pointer" }}
                    key={ind}
                    onClick={() => {
                      setShowMonthModal(true);
                      setAssociate(emp.fullName);
                      setMonthModalData(month);
                    }}
                  >
                    {
                      month.statusArrayList.filter((status, i) => status == "W")
                        .length
                    }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      {showMonthModal && monthModalData && lc && (
        <MonthModal
          monthData={monthModalData}
          associate={associate}
          year={yearStatus}
          lc={lc}
        ></MonthModal>
      )}
      {showYearModal && yearModalData && lc && (
        <YearModal
          leaveData={yearModalData}
          year={yearStatus}
          associate={associate}
          lc={lc}
        ></YearModal>
      )}
    </div>
  );
}

export default AdminLeavesTable;
