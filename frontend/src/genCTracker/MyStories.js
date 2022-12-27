import React, { useState, useEffect } from "react";
import { apiGetAllStories, apiGetAssociateStories } from "../utils/AppUtils";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import classes from "./GenCTrackerComponents.module.css";
import StoryList from "./StoryList";

function MyStories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiGetAssociateStories(searchParams.toString())
      .then((response) => {
        setStories(response);
        console.log(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {!isLoading && (
        <div className={classes.container}>
          <h5 className={classes.formheading}>My Stories</h5>
          <StoryList stories={stories} />
        </div>
      )}
      {isLoading && <div className="loader-container"></div>}
    </div>
  );
}

export default MyStories;
