import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataService from "../services/data.service";
import Button from "react-validation/build/button";
import "../css/profilelist.css";
import { UI_URL } from "../common/constants";
import SaveIcon from "../images/saveicon.svg";
import DownloadIcon from "../images/download.svg";

const ReferralList = () => {
  const [referralData, setReferralData] = useState([]);
  const [hasRecords, setHasRecords] = useState(false);

  useEffect(() => {
    DataService.getAllReferrals().then(
      (response) => {
        setReferralData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );
  }, []);

  const renderTableData = () => {
    return referralData.map((referral, index) => {
      let isReferralAvailable = referral.data ? true : false;

      const downloadResume = index => e => {
        const linkSource = `data:application/pdf;base64,${referralData[index].data}`;
        const link = document.createElement("a");
        link.href = linkSource;
        link.download = referral.candidateName;
        link.click();
      };

      const renderReferralLink = () => {
        return (
          <>
            <img
              src={DownloadIcon}
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

     
      return (
        <tr key={referral.id} className="profilerow">
          <td className="tdcentercontent">{index + 1}</td>
          <td className="tdleftcontent">{referral.candidateName}</td>
          
          <td className="tdleftcontent">{referral.email}</td>
          
          <td className="tdleftcontent">{referral.phone}</td>
          <td className="tdleftcontent">{referral.skill.skillName}</td>

          <td className="tdleftcontent">{referral.experience}</td>
          
          <td className="tdleftcontent">{referral.referredByName}({referral.referredById})</td>
  
          <td className="tdleftcontent">
            <Link to={UI_URL + "data/getReferralInfo/" + referral.id}>
              {referral.referralStatus}
            </Link>
          </td>

          {isReferralAvailable && (
            <td className="tdcentercontent">{renderReferralLink()}</td>
          )}
       
        </tr>
      );
    });
  };
    // <td className="tdleftcontent">{renderReferralLink()}</td>
    //  <td className="tdleftcontent">{referral.referredById}</td>

  return (
    <div>
    <p style={{textAlign: "right"}}><b>Developed by: Susil(2102741)</b></p>
      <label className="formheading">Referrals</label>
      <table className="gdvheader" width="100%">
        <tbody>
          <tr>
            <th key="0">S. No</th>
            <th key="1" className="tdleftcontent">
              Candidate Name
            </th>
            <th key="2" className="tdleftcontent">
              Email
            </th>
            <th key="3" className="tdleftcontent">
              Phone
            </th>
            <th key="4" className="tdleftcontent">
              Skill
            </th>
            <th key="5" className="tdleftcontent">
              Experience
            </th>
            <th key="6" className="tdleftcontent">
              Referred By
            </th>
            <th key="7" className="tdcentercontent">
              Status
            </th>
            <th key="8" className="tdleftcontent">
              Referral
            </th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralList;

// <th key="7" className="tdcentercontent">
// Referred By Name
// </th>
