import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UI_URL } from "../common/constants";
import swal from 'sweetalert';

import "../css/DriveList.css";
import DataService from "../services/data.service";
import AuthService from "../services/auth.service";
import InterviewDriveService from "../services/InterViewDrive.service";

const DriveListAssociate = () => {
  const [drivesData, setDrivesData] = useState([]);
  const [driveListNomination, setDriveListNomination] = useState([]);
  const [hasDrives, setHasDrives] = useState(false);

  const drivelist = new Array();

  const associateId = AuthService.getCurrentUser();

  useEffect(() => {

    // DataService.getAllInterviewDrives().then((data) => {
    //   // console.log(data);
    //   setDrivesData(data);
    //   setHasDrives(data.length > 0);
    // });

    InterviewDriveService.getAllDriveForAAssociate(associateId)
      .then(data => {
        setDrivesData(data);
      });

    InterviewDriveService.getDrivesNominatedByUser(associateId)
      .then(data => {
        // console.log(data);
        for (var i in data) {
          drivelist.push(data[i]);
        }
        // console.log(drivelist);
        setDriveListNomination(drivelist);
      });

  }, []);

  const onDeletePanelistFromDriveHandler = (driveId) => {
    swal({
      title: "Are You sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      button: true,
      dangerMode: true,
    }).then((isOkey) => {
      if (isOkey) {
        InterviewDriveService.deletePanelistById(driveId, associateId).then((res) => {
          window.location.reload();
          swal({
            title: "Deleted!",
            icon: "success",
            button: "ok",
          });
        });
      }
    });
    return false;

  }

  const renderNominateColumn = (driveId) => {
    var chk = driveListNomination.includes(driveId);
    if (chk === false) {
      return (
        <Link to={UI_URL + "add-panelist/" + driveId}>
          <p className="tdcentercontent" >
            Nominate
          </p>
        </Link>
      )
    }
    else {
      return (
        <ul className="flexbox">
          <li>
            <Link to={UI_URL + `updatePanelist/${driveId}`}>
              <p >
                Update
              </p>
            </Link>
          </li>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <li >
            <a className="cancel"
              onClick={() => onDeletePanelistFromDriveHandler(driveId)}
            >
              Cancel
            </a >
          </li>
        </ul>
      )
    }
  }

  const renderTableData = () => {
    // console.log(driveListNomination);
    // var chk = driveListNomination.includes(2);
    // console.log(chk);
    return drivesData.map((drive, index) => {
      return (
        <tr key={drive.id} className='driverow'>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{index + 1}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.interviewDriveName}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.interviewDriveDate}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.skill}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.interviewPocEmail}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.isVirtual ? 'YES' : 'NO'}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.availabilityFrom ? drive.availabilityFrom : ''}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"}>{drive.availabilityTo ? drive.availabilityTo : ''}</td>
          <td className={!drive.active && drive.availabilityFrom ? 'notactiverow tdcentercontent' : "tdcentercontent"} style={{ textDecoration: 'none' }}>
            {renderNominateColumn(drive.id)}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <label className="formheading">Interview Drives</label>
      <table width="100%">
        <tbody>
          <tr>
            <th key="1">S. No</th>
            <th key="2">Drive Name</th>
            <th key="3">Drive Date</th>
            <th key="4">Skill Set</th>
            <th key="5">Poc Email</th>
            <th key="6">Virtual</th>
            <th key="7">Available From</th>
            <th key="8">Available To</th>
            <th key="9">Action</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default DriveListAssociate;
