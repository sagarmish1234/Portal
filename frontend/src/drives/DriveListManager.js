import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UI_URL } from "../common/constants";

import "../css/DriveList.css";
import DataService from "../services/data.service";

const DriveListManager = () => {
    const [drivesData, setDrivesData] = useState([]);
    const [hasDrives, setHasDrives] = useState(false);

    useEffect(() => {
        DataService.getAllInterviewDrives().then((data) => {
            setDrivesData(data);
            setHasDrives(data.length > 0);
        });
    }, []);

    const renderTableData = () => {
        return drivesData.map((drive, index) => {
            return (
                <tr key={drive.id} className="driverow">
                    <td className="tdcentercontent">{index + 1}</td>
                    <td className="tdcentercontent">{drive.interviewDriveName}</td>
                    <td className="tdcentercontent">{drive.interviewDriveDate}</td>
                    <td className="tdcentercontent">{drive.skill}</td>
                    <td className="tdcentercontent">{drive.interviewPocEmail}</td>
                    <td className="tdcentercontent">{drive.isVirtual ? 'YES' : 'NO'}</td>
                    <td className="tdcentercontent">
                        <Link className="linkdeco" to={UI_URL + `panelists/${drive.id}`}>
                            {drive.totalPanelists}
                        </Link>
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
                        <th key="7">No. of Panelists</th>
                    </tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default DriveListManager;
