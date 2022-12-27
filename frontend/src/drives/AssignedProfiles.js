import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UI_URL } from "../common/constants";
import AuthService from "../services/auth.service";
import InterviewDriveService from "../services/InterViewDrive.service";

const AssignedProfiles = () => {
    const params = useParams();
    const associateId = AuthService.getCurrentUser();
    console.log(associateId);
    const [profilesData, setProfilesData] = useState([]);
    const [hadRecords, setHasRecords] = useState(false);

    useEffect(() => {
        InterviewDriveService.getAssignedProfileListOfPanelistForAssociate(associateId).then(
            (response) => {
                // console.log(response);
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
    });

    const renderTableData = () => {
        return profilesData.map((profile, index) => {
            return (
                <tr key={profile.id} className="profilerow">
                    <td className="tdcentercontent">{index + 1}</td>
                    <td className="tdleftcontent">{profile.candidateId}</td>
                    <td className="tdleftcontent">
                        <Link to={UI_URL + "forms/feedback/" + profile.id}>
                            {profile.fullName}
                        </Link>
                    </td>
                    <td className="tdleftcontent">{profile.email}</td>
                    <td className="tdleftcontent">{profile.phone}</td>
                    <td className="tdleftcontent">{profile.city}</td>
                    <td className="tdleftcontent">{profile.entryDate}</td>
                    <td className="tdleftcontent">{profile.skill.skillName}</td>
                </tr>
            );
        });
    };


    return (
        <div>
            <label className="formheading">My Profile List</label>
            <table width="100%">
                <tbody>
                    <tr>
                        <th key="1">S. No</th>
                        <th key="2" className="tdleftcontent">
                            Candidate ID
                        </th>
                        <th key="3" className="tdleftcontent">
                            Full Name
                        </th>
                        <th key="4" className="tdleftcontent">
                            Email
                        </th>
                        <th key="5" className="tdleftcontent">
                            Phone
                        </th>
                        <th key="6" className="tdleftcontent">
                            City
                        </th>

                        <th key="7" className="tdleftcontent">
                            Entry Date
                        </th>
                        <th key="8" className="tdleftcontent">
                            Skill Family
                        </th>

                    </tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
}

export default AssignedProfiles;