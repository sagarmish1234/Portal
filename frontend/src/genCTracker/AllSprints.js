import React, { useState, useEffect } from "react";
import { apiGetAllSprints } from "../utils/AppUtils";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import classes from "./GenCTrackerComponents.module.css";

function AllSprints() {
  const [sprints, setSprints] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    apiGetAllSprints(searchParams.toString())
      .then((response) => {
        setSprints(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {
        <div className={classes.container}>
          <h5 className={classes.formheading}>Sprints</h5>
          <table className={classes.table}>
            <tr className={classes.tablehead}>
              <th className="groupname">Sprint Name</th>
              <th className="groupname">Start Date</th>
              <th className="groupname">End Date</th>
              <th className="groupname">Scrum Master</th>
              <th className="groupname"># Stories</th>
              <th className="groupname">Story Points</th>
              <th className="groupname">Status</th>
            </tr>
            {sprints.map((sprint, index) => {
              return (
                <tr key={sprint.id} className={`${classes.tablerow}`}>
                  <td style={{ cursor: "pointer" }} className="tdcentercontent">
                    <Link
                      className={classes.link}
                      to={`/ui/gencTracker/sprint/${sprint.id}/sprintDetail`}
                    >
                      {sprint.name}
                    </Link>
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdcentercontent"
                  >
                    {new Date(sprint.startDate).toLocaleString()}
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdcentercontent"
                  >
                    {new Date(sprint.endDate).toLocaleString()}
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdcentercontent"
                  >
                    {sprint.scrumMaster}
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdcentercontent"
                  >
                    <Link
                      className={classes.link}
                      to={`/ui/gencTracker/sprint/${sprint.id}/sprintDetail`}
                    >
                      {sprint.stories}
                    </Link>
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdcentercontent"
                  >
                    {sprint.storyPoints}
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdcentercontent"
                  >
                    {sprint.status}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      }
    </div>
  );
}

export default AllSprints;
