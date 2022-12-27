import React, { useContext } from "react";
import classes from "./GenCTrackerComponents.module.css";
import { BsArrowLeft } from "react-icons/bs";
import { ShowSkills } from "./StoryList";

function StorySkillModal({ skills }) {
  const [showSkills, setShowSkills] = useContext(ShowSkills);

  var columns = [
    { label: "S. No.", colSize: "5", type: "text" },
    {
      accessor: "skillFamily",
      label: "Skill Family",
      colSize: "10",
    },
    {
      accessor: "skill",
      label: "Skill",
      colSize: "10",
    },
  ];
  const printContent = (column, row, rowIndex) => {
    return row[column.accessor];
  };

  return (
    <div className={classes.storySkillModalContainer}>
      <div className={classes.container}>
        <BsArrowLeft
          className={classes.backArrow}
          onClick={() => setShowSkills(false)}
        ></BsArrowLeft>
        <table>
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
            {skills.map((row, rowIndex) => {
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
      </div>
    </div>
  );
}

export default StorySkillModal;
