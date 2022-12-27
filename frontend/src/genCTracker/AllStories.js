import React, { useState, useEffect } from "react";
import { apiGetAllStories } from "../utils/AppUtils";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import classes from "./GenCTrackerComponents.module.css";
import StoryList from "./StoryList";

function AllStories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiGetAllStories(searchParams.toString())
      .then((response) => {
        setStories(response);
        // console.log(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  var columns = [
    { label: "S. No.", colSize: "5", type: "text" },
    {
      accessor: "subject",
      label: "Subject",
      colSize: "10",
      type: "text",
    },
    {
      accessor: "responsible",
      label: "Responsible",
      colSize: "40",
      type: "text",
      target: "associate",
    },
    {
      accessor: "epic",
      label: "Epic",
      colSize: "20",
      type: "link",
      target: "epic",
    },
    {
      accessor: "sprint",
      label: "Sprint",
      colSize: "5",
      type: "link",
      target: "sprint",
    },
    {
      accessor: "storyPointEstimation",
      label: "Story Point Estimation",
      colSize: "5",
    },
    {
      accessor: "storyStatus",
      label: "Status",
      colSize: "5",
    },
    {
      accessor: "storyPriority",
      label: "Priority",
      colSize: "5",
    },
    {
      accessor: "productOwner",
      label: "Product Owner",
      colSize: "5",
    },
  ];
// console.log("hey")
  

  return (
    <div>
      <div className={classes.container}>
        <h5 className={classes.formheading}>Stories</h5>
        {!isLoading && <StoryList stories={stories} />}
      </div>

      {isLoading && <div className="loader-container"></div>}
    </div>
  );
}

export default AllStories;
