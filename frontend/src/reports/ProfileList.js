import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";
import Button from "react-validation/build/button";
import "../css/profilelist.css";
import { UI_URL } from "../common/constants";
import SaveIcon from "../images/saveicon.svg";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import InterviewDriveService from "../services/InterViewDrive.service";
import { Form, FormGroup, Label, Input } from "reactstrap";

const ProfileList = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [profilesData, setProfilesData] = useState([]);
  const [hadRecords, setHasRecords] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [profilesChecked, setProfilesChecked] = useState([]);
  const [assignedProfilesList, setAssignedProfilesList] = useState([]);
  // const [panelistId, setPanelistId] = useState();

  let panelId = undefined;
  let driveId = undefined
  if (location.state) {
    panelId = location.state.panelistId ? location.state.panelistId : false;
    driveId = location.state.driveId ? location.state.driveId : false;
    console.log(driveId);
  }

  useEffect(() => {
    DataService.getAllProfiles().then(
      (response) => {
        setProfilesData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );

    InterviewDriveService.getAllAssignedProfiles()
      .then(data => {
        setAssignedProfilesList(data)
      });

  }, []);

  const onChangeSelection = (event) => {
    console.log(event.target.value);
    var updatedList = [...profilesChecked];
    if (event.target.checked) {
      updatedList = [...profilesChecked, event.target.value];
    } else {
      updatedList.splice(profilesChecked.indexOf(event.target.value), 1);
    }
    setProfilesChecked(updatedList);
  };

  const downloadResume = (index) => (e) => {
    const linkSource = `data:application/pdf;base64,${profilesData[index].data}`;
    const link = document.createElement("a");
    link.href = linkSource;
    link.download = "resume";
    link.click();
  };

  const onClickAssignProfiles = () => {
    console.log(profilesChecked);
    const assignProfileToPanelist = {
      profileIds: profilesChecked,
      panelistId: panelId
    };
    InterviewDriveService.linkExternalProfileToPanel(assignProfileToPanelist)
      .then(data => {
        navigate(UI_URL + "panelists/" + driveId);
        window.location.reload();
      }
      );
  }

  const renderTableData = () => {
    return profilesData.map((profile, index) => {
      let onsiteFlag = profile.isOnsite ? "Yes" : "";
      let internalFlag = profile.isInternal ? "Yes" : "";
      let isProfileAvailable = profile.data ? true : false;

      const renderProfileLink = () => {
        return (
          <>
            <img
              src={SaveIcon}
              alt="Save"
              name={"img" + index}
              id={"img" + index}
              width="15"
              height="15"
              onClick={downloadResume(index)}
            />
          </>
        );
      };

      /*----------------------------------------------------------*/
      const renderFeedback = () => {
        return profile.feedbacks.map((feedback, index) => {
          return (
            <div>
              <p> {feedback.evaluationDate + ": " + feedback.result.result}</p>
            </div>
          );
        }); //ends return loop
      };
      /*****888888888888888888888888888888888888888888888888888888888888 */


      return (
        <tr key={profile.id} className="profilerow">
          <td className="tdcentercontent">{index + 1}</td>
          {panelId && <td className="tdcentercontent">
            <input
              disabled={assignedProfilesList.includes(profile.id)}
              value={profile.id}
              type="checkbox"
              checked={profilesChecked.includes(profile.id + "")}
              onChange={(event) => onChangeSelection(event)}
            />

          </td>}
          <td className="tdleftcontent">{profile.associateId}</td>
          <td className="tdleftcontent">{profile.candidateId}</td>
          <td className="tdleftcontent">
            <Link to={UI_URL + "forms/feedback/" + profile.id}>
              {profile.fullName}
            </Link>
          </td>
          <td className="tdleftcontent">{profile.email}</td>
          <td className="tdleftcontent">{profile.phone}</td>
          <td className="tdleftcontent">{profile.city}</td>
          <td className="tdcentercontent">{onsiteFlag}</td>
          <td className="tdcentercontent">{internalFlag}</td>
          <td className="tdleftcontent">{profile.entryDate}</td>
          <td className="tdleftcontent">{profile.skill.skillName}</td>

          <td className="tdleftcontent">{renderFeedback()}</td>
          {isProfileAvailable && (
            <td className="tdcentercontent">{renderProfileLink()}</td>
          )}
        </tr>
      );
    });
  };

  return (

    <div>
      <label className="formheading">Profiles</label>
      {panelId &&
        <button className="createdrive" disabled={profilesChecked.length > 0 ? false : true} onClick={onClickAssignProfiles}>
          Assign Profiles
        </button>}
      <table>
        <td className="tddropdownlabel">
          <Label> &nbsp; &nbsp;AssociateID</Label>
        </td>
        <td className="tdheaderelements">

        </td>
      </table>
      <table className="gdvheader" width="100%">

        <tbody>
          <tr>
            <th key="0" >S. No</th>
            {panelId && <th key="1">Assign</th>}
            <th key="2" className="tdleftcontent">
              Associate ID
            </th>
            <th key="3" className="tdleftcontent">
              Candidate ID
            </th>
            <th key="4" className="tdleftcontent">
              Full Name
            </th>
            <th key="5" className="tdleftcontent">
              Email
            </th>
            <th key="6" className="tdleftcontent">
              Phone
            </th>
            <th key="7" className="tdleftcontent">
              City
            </th>
            <th key="8" className="tdcentercontent">
              Is Onsite
            </th>
            <th key="9" className="tdcentercontent">
              Is Internal
            </th>
            <th key="10" className="tdleftcontent">
              Entry Date
            </th>
            <th key="11" className="tdleftcontent">
              Skill Family
            </th>
            <th key="12" className="tdleftcontent">
              Feedback
            </th>
            <th key="13" className="tdleftcontent">
              Profile
            </th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileList;
