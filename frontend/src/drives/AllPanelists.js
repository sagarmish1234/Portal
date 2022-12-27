import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InterviewDriveService from "../services/InterViewDrive.service";

const AllPanelists = () => {
  const [allPanelistData, setAllPanelistData] = useState([]);
  const [hasPanelist, setHasPanelist] = useState(false);

  useEffect(() => {
    InterviewDriveService.getAllPanelist().then((data) => {
      setAllPanelistData(data);
      setHasPanelist(data.length > 0);
    });
  }, []);

  const renderTableData = () => {
    return allPanelistData.map((panelist, index) => {
      return (
        <tr key={panelist.id} className="panelistrow">
          <td className="tdcentercontent">{index + 1}</td>
          <td className="tdcentercontent">{panelist.panelistName}</td>
          <td className="tdcentercontent">{panelist.associateId}</td>
          <td className="tdcentercontent">{panelist.panelistEmail}</td>
          <td className="tdcentercontent">{panelist.skill}</td>
          <td className="tdcentercontent">{panelist.totalNominations}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <label className="formheading">All Panelists</label><br />
      <table width="100%">
        <tbody>
          <tr>
            <th key="1">S. No</th>
            <th key="2">Panelist Name</th>
            <th key="3">Associate Id</th>
            <th key="4">Panelist Email</th>
            <th key="5">Skill</th>
            <th key="6">Total Nominations</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default AllPanelists;
