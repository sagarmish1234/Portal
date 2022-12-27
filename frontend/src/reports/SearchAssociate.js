import React, { useEffect } from "react";
import { useState } from "react";
import { apiGetAssociateData } from "../utils/AppUtils";
import "../css/searchassociate.css";
import DataService from "../services/data.service";
import "../css/AllPanelistList.css";
import TrainingDevWatermark from "../forms/training/TrainingDevWatermark";

function SearchAssociate() {
  const [associateData, setAssociateData] = useState(null);
  const [associateId, setAssociateId] = useState("");
  const searchAssociate = (e) => {
    e.preventDefault();
    console.log("searching associate");
    DataService.getAssociateData(associateId).then((data) => {
      console.log(data);
      setAssociateData(data);
    });
  };

  const renderTableData = () => {
    if (associateData) {
      return (
        <tr className="panelistrow">
          <td className="tdcentercontent">{associateData.associateId}</td>
          <td className="tdcentercontent">{associateData.associateName}</td>
          <td className="tdcentercontent">
            {associateData.trainingsNominated}
          </td>
          <td className="tdcentercontent">{associateData.interviewsTaken}</td>
          <td className="tdcentercontent">{associateData.referrals}</td>
          <td className="tdcentercontent">0</td>
        </tr>
      );
    }
  };

  return (
    <div>
      <TrainingDevWatermark name="Nibhanupoodi Tanmayi" />
      <form className="searchAssociate" onSubmit={searchAssociate}>
        <input
          className="form-control"
          value={associateId}
          onChange={(e) => setAssociateId(e.target.value)}
          placeholder="Search Associate"
          required
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      <br></br>
      <table>
        {associateData && (
          <div>
            <tr>
              <td>
                {" "}
                <strong>Project ID</strong>{" "}
              </td>
              <td>:{associateData.projectId} </td>
            </tr>
            <tr>
              <td>
                <strong>Project Name</strong>{" "}
              </td>
              <td>:{associateData.projectName} </td>
            </tr>
            <tr>
              <td>
                <strong>Project Start Date</strong>{" "}
              </td>
              <td>:{associateData.projectStartDate.slice(0, 10)} </td>
            </tr>
            <tr>
              <td>
                <strong>Project End Date</strong>
              </td>
              <td>:{associateData.projectEndDate.slice(0, 10)} </td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>Project Type</strong>{" "}
              </td>
              <td>:{associateData.departmentName} </td>
            </tr>

            <tr>
              <td>
                {" "}
                <strong>Grade</strong>{" "}
              </td>
              <td>:{associateData.designation} </td>
            </tr>
            <tr>
              <td>
                <strong>LOB</strong>{" "}
              </td>
              <td>:{associateData.lob}</td>
            </tr>
          </div>
        )}
      </table>
      <br></br>

      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Trainings Nominated</th>
            <th>Interviews Nominated</th>
            <th>Referrals</th>
            <th>Client Rate</th>
          </tr>
          {renderTableData()}
        </table>
      </div>
    </div>
  );
}

export default SearchAssociate;
