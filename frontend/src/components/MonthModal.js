import React, { useContext } from "react";
import "../css/modal.css";
import { ShowMonthModal } from "../reports/AdminLeavesPanel";
import { GrClose } from "react-icons/gr";
function MonthModal({ monthData, year, associate, lc }) {
  const [showMonthModal, setShowMonthModal] = useContext(ShowMonthModal);

  return (
    <div className="monthModalBackground">
      <div className="monthModalContainer">
        <GrClose
          className="monthModalCloseButton"
          onClick={() => setShowMonthModal(false)}
          style={{ cursor: "pointer" }}
        >
          X
        </GrClose>
        <div className="monthModalHeader">
          <div className="monthModalEmployee">{associate}</div>
          <div className="monthModalDate">
            <td>{monthData.month},</td>
            <td>{year}</td>
          </div>
        </div>
        <table className="monthModalTable">
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>23</th>
            <th>24</th>
            <th>25</th>
            <th>26</th>
            <th>27</th>
            <th>28</th>
            <th>29</th>
            <th>30</th>
            <th>31</th>
          </tr>
          <tr>
            {monthData.statusArrayList.map((status, i) => {
              return (
                <td
                  className={"yellowT small"}
                  style={
                    lc.filter((option) => option.leaveCategory == status)[0].css
                  }
                >
                  {status}
                </td>
              );
            })}
            {monthData.statusArrayList.length + 1 <= 31 && (
              <td className={"yellowT small"}> </td>
            )}
            {monthData.statusArrayList.length + 2 <= 31 && (
              <td className={"yellowT small"}> </td>
            )}
            {monthData.statusArrayList.length + 3 <= 31 && (
              <td className={"yellowT small"}> </td>
            )}
          </tr>
        </table>
        <div
          className="modalLegend"
        >
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

export default MonthModal;
