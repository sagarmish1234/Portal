import React, { useEffect, useState } from "react";
import {
  apiSetLeaves,
  apiGetAllLeavesCategory,
  apiGetLeaveConflictDetails,
} from "../../utils/AppUtils";

function LeaveTable({ data, year }) {
  const [leaveRequests, setLeavesRequest] = useState([]);
  const [leaveData, setLeaveData] = useState(data);
  const [lc, setLC] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(lc);
  useEffect(() => {
    setLeaveData(data);
    setLeavesRequest([]);
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    apiGetAllLeavesCategory()
      .then((data) => setLC(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, id, value } = e.target;
    var data = leaveData;
    const month = e.target.getAttribute("month");
    data[month].statusArrayList[id - 1] = value;
    console.log(data[month]);
    setLeaveData(data);
    setLeavesRequest((prev) => [
      ...prev.filter((leave) => leave.month != month && leave.day != id),

      {
        month: name,
        day: id,
        status: value,
        year: year,
      },
    ]);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    const res = await apiGetLeaveConflictDetails(
      { leaveRequestParamsArrayList: leaveRequests },
      year
    );

    if (res.length != 0) {
      let str = "Leave conflict on ";
      for (let i = 0; i < res.length; i++) {
        str +=
          " " +
          res[i].month +
          " " +
          res[i].day +
          (i != res.length - 1 ? "," : "");
      }
      str += "\n" + "Click OK to continue.";
      if (!window.confirm(str)) {
        setIsLoading(false)
        return
      };
    }

    apiSetLeaves({ leaveRequestParamsArrayList: leaveRequests }, year)
      .then((data) => {
        alert("Your changes have been saved successfully");
        setLeavesRequest([]);
        setLeaveData(data.monthStatusPOJOS);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      {!isLoading && (
        <div className="leaveTrackerTableContainer">
          <table>
            <tr>
              <th className="task">Days of month</th>
              <th className="task">Total working days</th>
              <th className="task">1</th>
              <th className="task">2</th>
              <th className="task">3</th>
              <th className="task">4</th>
              <th className="task">5</th>
              <th className="task">6</th>
              <th className="task">7</th>
              <th className="task">8</th>
              <th className="task">9</th>
              <th className="task">10</th>
              <th className="task">11</th>
              <th className="task">12</th>
              <th className="task">13</th>
              <th className="task">14</th>
              <th className="task">15</th>
              <th className="task">16</th>
              <th className="task">17</th>
              <th className="task">18</th>
              <th className="task">19</th>
              <th className="task">20</th>
              <th className="task">21</th>
              <th className="task">22</th>
              <th className="task">23</th>
              <th className="task">24</th>
              <th className="task">25</th>
              <th className="task">26</th>
              <th className="task">27</th>
              <th className="task">28</th>
              <th className="task">29</th>
              <th className="task">30</th>
              <th className="task">31</th>
            </tr>
            {lc &&
              leaveData.map((monthData, ind) => {
                return (
                  <tr key={ind} className={ind % 2 == 0 ? "yellow" : "green"}>
                    <td className="leaveTrackerMonth">{monthData.month}</td>
                    <td className="workingdayscol">
                      {" "}
                      {
                        monthData.statusArrayList.filter(
                          (status) => status == "W"
                        ).length
                      }
                    </td>
                    {monthData.statusArrayList.map((status, index) => {
                      return (
                        <td
                          key={index}
                          className={"leaveTrackerStatusSelection"}
                        >
                          <select
                            name={monthData.month}
                            id={index + 1}
                            value={status}
                            month={ind}
                            style={
                              lc.filter(
                                (option) => option.leaveCategory == status
                              )[0].css
                            }
                            disabled={
                              status === "H" ||
                              status == "S" ||
                              new Date(year, ind, index + 1).getTime() <
                                Date.now()
                            }
                            onChange={handleChange}
                            className={"leaveTableCell" + " noDrop "}
                            onMouseEnter={(e) => {
                              e.target.className = "leaveTableCell ";
                            }}
                            onMouseLeave={(e) => {
                              e.target.className =
                                "leaveTableCell" + " noDrop ";
                              try {
                                e.target.style = new CSSStyleDeclaration(
                                  lc.filter(
                                    (option) => option.leaveCategory == status
                                  )[0].css
                                );
                              } catch {}
                            }}
                          >
                            {lc &&
                              lc.map((opt) => {
                                if (
                                  (status == "H" && opt.leaveCategory == "H") ||
                                  (status == "S" && opt.leaveCategory == "S") ||
                                  (opt.leaveCategory !== "H" &&
                                    opt.leaveCategory !== "S")
                                )
                                  return (
                                    <option value={opt.leaveCategory}>
                                      {opt.leaveCategory}
                                    </option>
                                  );
                              })}
                            {/* <option value="L">L</option> */}
                            {/* <option value="W">W</option> */}
                            {/* {status === "H" && <option value="H">H</option>} */}
                          </select>
                        </td>
                      );
                    })}
                    {monthData.statusArrayList.length + 1 <= 31 && (
                      <td className="leaveTrackerStatusSelection"></td>
                    )}
                    {monthData.statusArrayList.length + 2 <= 31 && (
                      <td className="leaveTrackerStatusSelection"></td>
                    )}
                    {monthData.statusArrayList.length + 3 <= 31 && (
                      <td className="leaveTrackerStatusSelection"></td>
                    )}
                  </tr>
                );
              })}
          </table>

          <button
            className="btn btn-primary btn-block formsubmitbutton1"
            onClick={handleSaveChanges}
          >
            Save Leaves
          </button>
          <div
            className="modalLegend"
            style={{ position: "absolute", right: "30px" }}
          >
            <div style={{ color: "rgb(146, 143, 143)" }}>H-Holiday</div>
            <div style={{ color: "rgb(146, 143, 143)" }}>
              S-Saturday/Sunday
            </div>
            <div style={{ color: "rgb(146, 143, 143)" }}>W-Working</div>
            <div style={{ color: "rgb(146, 143, 143)" }}>L-Leave</div>
            <div style={{ color: "rgb(146, 143, 143)" }}>HD-Half Day</div>
          </div>
        </div>
      )}
      {isLoading && <div className="loader-container"></div>}
    </div>
  );
}

export default LeaveTable;
