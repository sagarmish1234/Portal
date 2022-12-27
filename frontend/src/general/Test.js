import { useEffect, useState } from "react";
import "../drives/CalendarView/Calendar.css";
import InterviewDriveService from "../services/InterViewDrive.service";

const Test = () => {
  const todayDate = new Date('09/09/2022');

  const [dateMap, setDateMap] = useState([]);

  useEffect(() => {
    InterviewDriveService.getCalenderViewForDrivePanelist("ADM")
      .then(data => {
        setDateMap(data);
        console.log(dateMap);
      })
  }, [])

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  }
  const printMonth = (vDate) => {
    let month = vDate.getMonth();
    let noOfDays = daysInMonth(month, vDate.getFullYear());
    let rows = [];
    let tempDate = new Date(vDate.getFullYear(), month, 1);
    let firstDay = tempDate.getDay();
    for (let i = 1; i <= firstDay; i++) {
      rows.push(<li></li>);
    }
    for (let i = 1; i <= noOfDays; i++) {
      rows.push(<li className="daycss">{i}<br /><label className="panelistcount">5</label></li>);
    }
    for (let i = 0; i < (46 - (firstDay + noOfDays)); i++) {
      rows.push(<li></li>);
    }
    return <tbody>{rows}</tbody>;
  }

  const renderMonth = (vDate) => {
    return (
      <table>
        <tr>
          <td className="monthcalendar">
            <div className="month">
              <ul>
                <li>
                  <span style={{ "font-size": "18px" }}>{vDate.getFullYear()}</span><br />
                  {vDate.toLocaleString('default', { month: 'long' })}
                </li>
              </ul>
            </div>
            <ul class="weekdays">
              <li>Su</li>
              <li>Mo</li>
              <li>Tu</li>
              <li>We</li>
              <li>Th</li>
              <li>Fr</li>
              <li>Sa</li>
            </ul>
            <ul class="days">
              {printMonth(vDate)}
            </ul>
          </td>

        </tr>
      </table>
    )
  }

  const renderYear = (vDate) => {
    const Q1 = [0, 1, 2];
    const Q2 = [3, 4, 5];
    const Q3 = [6, 7, 8];
    const Q4 = [9, 10, 11];
    return (<>
      <table>
        <tr>
          {
            Q1.map(day => (
              <td >
                {renderMonth(new Date(vDate.getFullYear(), day, 1))}
              </td>
            ))
          }
        </tr>
        <tr>
          {
            Q2.map(day => (
              <td >
                {renderMonth(new Date(vDate.getFullYear(), day, 1))}
              </td>
            ))
          }
        </tr>
        <tr>
          {
            Q3.map(day => (
              <td >
                {renderMonth(new Date(vDate.getFullYear(), day, 1))}
              </td>
            ))
          }
        </tr>
        <tr>
          {
            Q4.map(day => (
              <td >
                {renderMonth(new Date(vDate.getFullYear(), day, 1))}
              </td>
            ))
          }
        </tr>
      </table>
    </>)

  }

  return (
    <>
      {/* <h1> Calendar</h1> */}
      {renderYear(todayDate)}

    </>);
};

export default Test;
