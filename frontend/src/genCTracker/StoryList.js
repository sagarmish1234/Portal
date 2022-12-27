import { useState, createContext } from "react";
import { Link } from "react-router-dom";
import classes from "./GenCTrackerComponents.module.css";
import StorySkillModal from "./StorySkillModal";

export const ShowSkills = createContext(false);

const StoryList = function (props) {
  const stories = props.stories;
  const [showSkills, setShowSkills] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  var columns = [
    { label: "S. No.", colSize: "5", type: "text" },
    {
      accessor: "subject",
      label: "Subject",
      colSize: "10",
      type: "link",
      target: "story",
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
    {
      accessor: "storySkills",
      label: "Skills Required",
      colSize: "5",
      type: "array",
    },
  ];

  const handleShowSkills = (index) => (e) => {
    e.preventDefault();
    setActiveStory(stories[index]);
    setShowSkills(true);
  };

  const printContent = (column, row, rowIndex) => {
    if (column.type == "link") {
      if (column.target == "story") {
        return (
          <Link
            to={`/ui/gencTracker/stories/${stories[rowIndex].id}/storyDetails`}
          >
            {row[column.accessor]}
          </Link>
        );
      } else if (column.target == "epic") {
        return (
          <Link to={`/ui/gencTracker/epic/${stories[rowIndex].epicId}/stories`}>
            {row[column.accessor]}
          </Link>
        );
      } else {
        return (
          <Link
            to={`/ui/gencTracker/sprint/${stories[rowIndex].sprintId}/sprintDetail`}
          >
            {row[column.accessor]}
          </Link>
        );
      }
    }
    if (column.type == "array") {
      return (
        <a href="#" onClick={handleShowSkills(rowIndex)}>
          {row[column.accessor].length}
        </a>
      );
    }
    return row[column.accessor];
  };

  return (
    <>
      <ShowSkills.Provider value={[showSkills, setShowSkills]}>
        {showSkills && <StorySkillModal skills={activeStory.storySkills} />}
      </ShowSkills.Provider>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tablehead}>
            {columns.map((column, colIndex) => {
              return (
                <th key={colIndex}>
                  <span>{column.label}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {stories.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className={classes.tablerow}>
                {columns.map((column, colIndex) => {
                  return colIndex == 0 ? (
                    <td key={colIndex} className="tdcentercontent">
                      {rowIndex + 1}
                    </td>
                  ) : (
                    <td key={colIndex} className="tdcentercontent">
                      {printContent(column, row, rowIndex)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {stories.length == 0 && <p className={classes.info}>No Records</p>}
    </>
  );
};

export default StoryList;
