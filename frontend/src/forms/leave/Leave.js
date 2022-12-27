import React, { useEffect, useState } from "react";
import { apiGetLeaves} from "../../utils/AppUtils";
import LeaveTable from "./LeaveTable";
import "../../css/leavetracker.css";
import "../../css/general.css";
import Select from "react-select";
function Leave() {
  const [leavesData, setLeavesData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    apiGetLeaves(year).then((data) => {
      console.log(data);
      setLeavesData(data);
    });
  }, [year]);

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

  return (
    <div>
      <span className="developedby">
        Developed by: Sagar (2130352)
      </span>
      {leavesData && (
        <div>
          <table className="leaveTrackerTable">
            <tr>
              <td className="leaveTrackerHeadingRowTD">
                Associate ID : {leavesData.fullName}
              </td>
              <td className="leaveTrackerHeadingRowTD">
                {year && (
                  <Select
                    defaultValue={{ label: year, value: year }}
                    name="year"
                    options={selectYear}
                    onChange={(e) => {
                      const { name, value } = e;
                      setYear(value);
                    }}
                  ></Select>
                )}
              </td>
              <td className="leaveTrackerHeadingRowRemaining"></td>
            </tr>
            <tr>
              <td colSpan={3}>
                {leavesData && (
                  <LeaveTable
                    data={leavesData.monthStatusPOJOS}
                    year={year}
                  ></LeaveTable>
                )}
              </td>
            </tr>
          </table>
          
        </div>
      )}
    </div>
  );
}

export default Leave;
