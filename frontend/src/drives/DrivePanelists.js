import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import swal from 'sweetalert';

import InterviewDriveService from "../services/InterViewDrive.service";

import "../css/AllPanelistList.css";
import { UI_URL } from "../common/constants";

const AllPanelistList = () => {
  const params = useParams();
  const driveId = params.driveId;
  const navigate = useNavigate();

  const [driveData, setDriveData] = useState([]);
  const [allPanelistData, setAllPanelistData] = useState([]);
  const [hasPanelist, setHasPanelist] = useState(false);

  useEffect(() => {
    InterviewDriveService.getInterviewDriveById(driveId).then((data) => {
      setDriveData(data);
    });
    InterviewDriveService.getDrivePanelists(driveId).then((response) => {
      console.log(response);
      setAllPanelistData(response);
      setHasPanelist(response.length > 0);
    });
  }, []);

  const onDeletePanelistFromDriveHandler = (penalistId) => {
    swal({
      title: "Are You sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      button: true,
      dangerMode: true,
    }).then((isOkey) => {
      if (isOkey) {
        InterviewDriveService.deletePanelistById(driveId, penalistId).then((res) => {
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

  const renderTableData = () => {
    return allPanelistData.map((panelist, index) => {
      return (
        <tr key={panelist.id} className={!panelist.active ? 'notactiverow' : 'panelistrow'}>
          <td className="tdcentercontent">{index + 1}</td>
          <td className="tdcentercontent">
            {panelist.active && <p className="tdcentercontent" to={UI_URL + `panelists/${driveId}/${panelist.id}`}>
              {panelist.panelistName}
            </p>}
            {!panelist.active && <p className=" tdcentercontent">
              {panelist.panelistName}
            </p>}
          </td>
          <td className="tdcentercontent">{panelist.associateId}</td>
          <td className="tdcentercontent">{panelist.panelistEmail}</td>
          <td className="tdcentercontent">{panelist.skill}</td>
          <td className="tdcentercontent">{panelist.availabilityFrom}</td>
          <td className="tdcentercontent">{panelist.availabilityTo}</td>
          {/* <td className="tdcentercontent">
            {panelist.active && <button type="submit" className={!panelist.active ? '' : 'delete'}
              onClick={() => onDeletePanelistFromDriveHandler(panelist.id)}
            >
              X
            </button>}
          </td> */}
          <td className="tdcentercontent">
            <Link className="linkdeco" to={UI_URL + `panelistProfileList/${panelist.id}`}>
              {panelist.totalProfiles}
            </Link>
          </td>
          <td>
            <Link to={UI_URL + "profiles/externalprofile"}
              state={{ panelistId: panelist.id, driveId: driveId }} >
              <p>
                <i className="arrow right"></i>
              </p>
            </Link>
          </td>
          <td>
            <Link to={UI_URL + "data/getAllProfiles"}
              state={{ panelistId: panelist.id, driveId: driveId }} >
              <p>
                <i className="arrow right"></i>
              </p>
            </Link>
          </td>
        </tr >
      );
    });
  };

  return (
    <div>
      <label className="formheading">
        <i>{driveData.interviewDriveName}({driveData.interviewDriveDate})</i>&nbsp;&nbsp;&nbsp;:: &nbsp;&nbsp;&nbsp;Panelist
      </label>
      <table width="100%">
        <tbody>
          <tr>
            <th key="1">S. No</th>
            <th key="2">Panelist Name</th>
            <th key="3">Associate Id</th>
            <th key="4">Panelist Email</th>
            <th key="5">Skill</th>
            <th key="6">Availability From</th>
            <th key="7">Availability To</th>
            <th key="8">Total Profiles</th>
            <th key="9">Add Profile</th>
            <th key="10">Assign Profile</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default AllPanelistList;
