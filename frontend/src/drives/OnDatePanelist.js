import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { UI_URL } from "../common/constants";

import InterviewDriveService from "../services/InterViewDrive.service";

const OnDatePanelist = () => {
    const [allScheduledPanelistData, setAllScheduledPanelistData] = useState([]);
    const [allNotScheduledPanelistData, setAllNotScheduledPanelistData] = useState([]);
    const [panelistChecked, setPanelistChecked] = useState([]);
    // const [hasPanelist, setHasPanelist] = useState(false);

    const location = useLocation();
    const { calDate } = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        InterviewDriveService.getPanelistScheduledForADate(calDate)
            .then((data) => {
                setAllScheduledPanelistData(data);
                // setHasPanelist(data.length > 0);
            });
        InterviewDriveService.getPanelistNotScheduledForADate(calDate)
            .then((data) => {
                setAllNotScheduledPanelistData(data);
                // setHasPanelist(data.length > 0);
            });
    }, []);

    const onChangeSelection = (event) => {
        var updatedList = [...panelistChecked];
        if (event.target.checked) {
            updatedList = [...panelistChecked, event.target.value];
        } else {
            updatedList.splice(panelistChecked.indexOf(event.target.value), 1);
        }
        setPanelistChecked(updatedList);
    };

    const onClickCreateDrive = () => {
        navigate(UI_URL + "forms/interview/newdrive",
            {
                state: { panelistIds: panelistChecked, driveDate: calDate }
            }
        );

    }

    const renderTableDataScheduled = () => {
        return allScheduledPanelistData.map((panelist, index) => {
            return (
                <tr key={panelist.id} className="panelistrow">
                    <td className="tdcentercontent">{index + 1}</td>
                    <td className="tdcentercontent">{panelist.panelistName}</td>
                    <td className="tdcentercontent">{panelist.associateId}</td>
                    <td className="tdcentercontent">{panelist.panelistEmail}</td>
                    <td className="tdcentercontent">{panelist.skill}</td>
                    <td className="tdcentercontent">{panelist.driveName}</td>
                </tr>
            );
        });
    };

    const renderTableDataNotScheduled = () => {
        return allNotScheduledPanelistData.map((panelist, index) => {
            // console.log(panelist.id);
            return (
                <tr key={panelist.id} className="panelistrow">
                    <td className="tdcentercontent">{index + 1}</td>
                    <td className="tdcentercontent">
                        <input
                            value={panelist.id}
                            type="checkbox"
                            checked={panelistChecked.includes(panelist.id + "")}
                            onChange={(event) => onChangeSelection(event)}
                        />
                    </td>
                    <td className="tdcentercontent">{panelist.panelistName}</td>
                    <td className="tdcentercontent">{panelist.associateId}</td>
                    <td className="tdcentercontent">{panelist.panelistEmail}</td>
                    <td className="tdcentercontent">{panelist.skill}</td>
                </tr>
            );
        });
    };

    return (
        <div>
            <label className="formheading">All Panelists ({calDate})</label>
            {/* <br /> */}
            <button className="createdrive" disabled={panelistChecked.length > 0 ? false : true} onClick={onClickCreateDrive}>Create Drive</button>
            <hr />
            <i className="tabledesc">Available Panelists:</i>
            <table width="100%">
                <tbody>
                    <tr>
                        <th key="1">S. No</th>
                        <th key="2">Schedule</th>
                        <th key="3">Panelist Name</th>
                        <th key="4">Associate Id</th>
                        <th key="5">Panelist Email</th>
                        <th key="6">Skill</th>
                    </tr>
                    {renderTableDataNotScheduled()}
                </tbody>
            </table>
            <br />
            <i className="tabledesc">Scheduled Panelists:</i>
            <table width="100%">
                <tbody>
                    <tr>
                        <th key="1">S. No</th>
                        <th key="2">Panelist Name</th>
                        <th key="3">Associate Id</th>
                        <th key="4">Panelist Email</th>
                        <th key="5">Skill</th>
                        <th key="5">Drive</th>
                    </tr>
                    {renderTableDataScheduled()}
                </tbody>
            </table>
        </div>
    );
};

export default OnDatePanelist;
