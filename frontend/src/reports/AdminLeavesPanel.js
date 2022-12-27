import React, { useState, useEffect, createContext } from "react";
import {
  apiGetAllUserLeaves,
  apiGetLOBList,
  apiGetServiceLineList,
} from "../utils/AppUtils";
import AdminLeavesTable from "../forms/leave/AdminLeavesTable";
import "../css/leavetracker.css";
import Select from "react-select";
export const ShowMonthModal = createContext(false);
export const ShowYearModal = createContext(false);

function AdminLeavesPanel() {
  const [associateData, setAssociateData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [LOB, setLOB] = useState("PMO");
  const [serviceLine, setServiceLine] = useState("ADM");
  const [selectLOB, setSelectLOB] = useState(null);
  const [showYearModal, setShowYearModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [selectServiceLine, setSelectServiceLine] = useState(null);
  useEffect(() => {
    apiGetAllUserLeaves(year, LOB, serviceLine)
      .then((data) => {
        // console.log(data);
        setAssociateData(data);
      })
      .catch((err) => {
        console.log(err);
        setAssociateData(null);
      });
  }, [year, LOB, serviceLine]);

  useEffect(() => {
    apiGetLOBList().then((response) => {
      let temp = [];
      response.map((LOB) => {
        temp.push({ value: LOB, label: LOB });
      });
      setSelectLOB(temp);
    });
  }, []);

  useEffect(() => {
    apiGetServiceLineList().then((response) => {
      let temp = [];
      response.map((line) => {
        temp.push({ value: line, label: line });
      });
      setSelectServiceLine(temp);
    });
  }, []);

  const selectYear = [
    { value: new Date().getFullYear(), label: new Date().getFullYear() },
    {
      value: new Date().getFullYear() + 1,
      label: new Date().getFullYear() + 1,
    },
    {
      value: new Date().getFullYear() + 2,
      label: new Date().getFullYear() + 2,
    },
    {
      value: new Date().getFullYear() + 3,
      label: new Date().getFullYear() + 3,
    },
    {
      value: new Date().getFullYear() + 4,
      label: new Date().getFullYear() + 4,
    },
  ];

  const customStyles = {
    menu: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "100%",
      fontSize: "13px",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "13px",
    }),
  };

  return (
    <ShowMonthModal.Provider value={[showMonthModal, setShowMonthModal]}>
      <ShowYearModal.Provider value={[showYearModal, setShowYearModal]}>
        <div>
          <span className="developedby">
            Developed by Sagar(2130352)
          </span>
          <div>
            <table className="leaveTrackerTable">
              <tr>
                <td className="adminTableDropDownTD">
                  <Select
                    defaultValue={{ label: year, value: year }}
                    name="year"
                    options={selectYear}
                    onChange={(e) => {
                      const { name, value } = e;
                      setYear(value);
                    }}
                  ></Select>
                </td>

                <td className="adminTableDropDownTD">
                  <Select
                    defaultValue={{ label: LOB, value: LOB }}
                    options={selectLOB}
                    name="lob"
                    onChange={(e) => {
                      const { name, value } = e;
                      setLOB(value);
                    }}
                  ></Select>
                </td>
                <td className="adminTableDropDownTD">
                  <Select
                    defaultValue={{ label: serviceLine, value: serviceLine }}
                    name="serviceLine"
                    options={selectServiceLine}
                    onChange={(e) => {
                      const { name, value } = e;
                      setServiceLine(value);
                    }}
                  ></Select>
                </td>
              </tr>
              <tr className="adminTableDataRow">
                <td colSpan={3}>
                  {associateData && (
                    <AdminLeavesTable
                      data={associateData}
                      year={year}
                      LOB={LOB}
                      serviceLine={serviceLine}
                      className="admintabledata"
                    ></AdminLeavesTable>
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </ShowYearModal.Provider>
    </ShowMonthModal.Provider>
  );
}

export default AdminLeavesPanel;
