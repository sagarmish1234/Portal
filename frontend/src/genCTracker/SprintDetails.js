import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import { required } from "../common/validators";
import {
  apiGetSprintById,
  apiGetSprintStoriesById,
} from "../utils/AppUtils";
import Select from "react-select";
import { useNavigate, useParams, Link } from "react-router-dom";
import makeAnimated from "react-select/animated";
import classes from "./GenCTrackerComponents.module.css";
import StoryList from "./StoryList";

function SprintDetails() {
  const [sprint, setSprint] = useState(null);
  const { id } = useParams();
  const animatedComponents = makeAnimated();
  const form = useRef();
  const selectedStories = useRef();
  const navigate = useNavigate();
  const DateFormat = "yyyy-MM-dd";
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sprintTableColumns = [
    { accessor: "name", label: "Name", colSize: "20" },
    { accessor: "startDate", label: "Start Date", colSize: "10" },
    { accessor: "endDate", label: "End Date", colSize: "10" },
    { accessor: "scrumMaster", label: "Scrum Master", colSize: "10" },
    { accessor: "stories", label: "# Stories", colSize: "10" },
    {
      accessor: "storyPoint",
      label: "Story Points",
      colSize: "10",
    },
    { accessor: "status", label: "Status", colSize: "10" },
  ];

  //   Sprint Name<
  // Start Date</
  // End Date</th
  // Scrum Master
  // # Stories</t
  // Story Points
  // Status</th>

  useEffect(() => {
    apiGetSprintStoriesById(id)
      .then((response) => {
        setStories(response);
      })
      .catch((err) => console.log(err));
    apiGetSprintById(id)
      .then((response) => setSprint(response))
      .catch((err) => console.log(err));
  }, []);

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     setSprint({ ...sprint, [name]: value });
  //   };

  //   useEffect(() => {
  //     apiGetServiceLineList().then((response) => {
  //       let temp = [];
  //       response.map((line) => {
  //         temp.push({ value: line, label: line });
  //       });
  //       setServiceLineList(temp);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     apiGetAssignUsersFromServiceLine(serviceLine).then((response) => {
  //       //   console.log(response);
  //       setAssociateIds(response);
  //     });
  //   }, [serviceLine]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(selectedStories.current.props.value);
  //     form.current.validateAll();
  //     var data = { ...sprint };
  //     data.storyIds = selectedStories.current.props.value.map(
  //       (story) => story.value
  //     );
  //     data.startDate = new Date(data.startDate).toISOString();
  //     data.endDate = new Date(data.endDate).toISOString();
  //     console.log(data);
  //     apiCreateSprint(data)
  //       .then((response) => {
  //         alert(response.message);
  //         navigate("/ui/gencTracker/sprint/allSprints");
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <div className={classes.container}>
      {isLoading && (
        <div className="loader-container">
          {/* <div className="spinner"></div> */}
        </div>
      )}
      {/* <SprintDevWatermark name="Divyam Arora" /> */}
      {sprint && (
        <>
          <h5 className={classes.formheading}>{sprint.name} Stories</h5>
          {/* <table
            className={classes.table}
            style={{ float: "none", marginBottom: "1rem" }}
          >
            <thead>
              <tr className={classes.tablehead}>
                {sprintTableColumns.map((column) => {
                  return (
                    <th key={column.accessor}>
                      <span>{column.label}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className={classes.tablerow}>
                <td>
                  <span>{sprint.name}</span>
                </td>
                <td>
                  <span>{new Date(sprint.startDate).toDateString()}</span>
                </td>
                <td>
                  <span>{new Date(sprint.endDate).toDateString()}</span>
                </td>
                <td>
                  <span>{sprint.storyPoints}</span>
                </td>
                <td>
                  <span>{sprint.stories}</span>
                </td>
                <td>
                  <span>{sprint.storyPoints}</span>
                </td>
                <td>
                  <span>{sprint.status}</span>
                </td>
              </tr>
            </tbody>
          </table> */}
        </>
      )}
      <div className={classes.container}>
        <StoryList stories={stories} />
      </div>
    </div>
  );
}

export default SprintDetails;
