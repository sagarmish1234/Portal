import React, { useContext } from "react";
import "../css/modal.css";
import { ShowYearModal } from "../reports/AdminLeavesPanel";
import { GrClose } from "react-icons/gr";

function YearModal({ leaveData, year, associate, lc }) {
  const [showYearModal, setShowYearModal] = useContext(ShowYearModal);
  return (
    <div className="yearModalBackground">
      <div className="leaveTrackerTableContainer yearModalContainer">
        <GrClose
          className="monthModalCloseButton"
          onClick={() => setShowYearModal(false)}
          style={{ cursor: "pointer" }}
        >
          X
        </GrClose>
        <div className="monthModalHeader">
          <div className="monthModalEmployee">{associate}</div>
          <div className="monthModalDate">
            <td>{year}</td>
          </div>
        </div>
        <table className="yearModalTable">
          <tr>
            <th className="task">Days of month</th>
            <th className="task">Total working days</th>
            <th className="task">Total Leaves</th>
            <th className="task">Total Half Day</th>
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
          {leaveData &&
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
                  <td className="workingdayscol">
                    {" "}
                    {
                      monthData.statusArrayList.filter(
                        (status) => status == "L"
                      ).length
                    }
                  </td>
                  <td className="workingdayscol">
                    {" "}
                    {
                      monthData.statusArrayList.filter(
                        (status) => status == "HD"
                      ).length
                    }
                  </td>
                  {monthData.statusArrayList.map((status, index) => {
                    return (
                      <td key={index} className={"leaveTrackerStatusSelection"}>
                        <div
                          name={monthData.month}
                          disabled={status === "H"}
                          style={
                            lc.filter(
                              (option) => option.leaveCategory == status
                            )[0].css
                          }
                          className={"leaveTableCell" + " noDrop "}
                        >
                          {status}
                        </div>
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
        <div className="modalLegend">
          <div style={{ color: "black" }}>H-Holiday</div>
          <div style={{ color: "black" }}>S-Saturday/Sunday</div>
          <div>W-Working</div>
          <div style={{ color: "black" }}>L-Leave</div>
          <div style={{ color: "black" }}>HD-Half Day</div>
        </div>
      </div>
    </div>
  );
}

export default YearModal;
