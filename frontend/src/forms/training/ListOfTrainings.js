import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import trainingService from "../../services/training.service";
import NominateTraining from "./NominateTraining";
import classes from "./TrainingComponents.module.css";
import TrainingDevWatermark from "./TrainingDevWatermark";
import TrainingProgress from "./TrainingProgress";

const ListOfTrainings = (props) => {
  const [trainingData, setTrainingData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState("");
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isNominating, setIsNominating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [hasRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const showAvgProgress = searchParams.get("progress") == "avg";

  const columns = [
    { accessor: "id", label: "S.NO", colSize: "8" },
    { accessor: "title", label: "Title", colSize: "20" },
    { accessor: "startDate", label: "Start Date", colSize: "10", type: "date" },
    { accessor: "endDate", label: "End Date", colSize: "10", type: "date" },
    { accessor: "skill", label: "Skill", colSize: "20" },
    { accessor: "isClassroom", label: "Online/Classroom", colSize: "6" },
    {
      accessor: "participationLimit",
      label: "Participation Limit",
      colSize: "5",
    },
    {
      accessor: "nominations",
      label: "Nominations",
      colSize: "5",
    },
    {
      accessor: showAvgProgress ? "avgProgress" : "progress",
      label: showAvgProgress ? "Avg. Progress(%)" : "Progress(%)",
      colSize: "5",
    },
  ];

  if (!showAvgProgress) {
    columns.push({ accessor: "progress", label: "Action", colSize: "10" });
  }

  useEffect(() => {
    getTrainingData();
  }, []);

  const getTrainingData = () => {
    setIsLoading(true);
    trainingService
      .getPersonalisedTrainings()
      .then(
        (response) => {
          setTrainingData(response.data);
          setHasRecords(response.data.length > 0);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setServerError(_content);
          window.alert(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
        // setTrainingData(DUMMY_TRAININGS);
      });
  };

  const onSortHandler = (e) => {
    const id = e.currentTarget.dataset.id;
    const sortedItems = trainingData;
    const isProgress = id === "progress" || id == "avgProgress";

    sortedItems.sort((a, b) => {
      let first = isProgress ? a[id] : a.training[id];
      let second = isProgress ? b[id] : b.training[id];

      if (id === sortedColumn) {
        if (isSortedAsc) {
          [first, second] = [second, first];
        }
      }

      if (id.includes("Classroom")) {
        first = first ? "Classroom" : "Online";
        second = second ? "Classroom" : "Online";
      }

      if (!isNaN(first) || id === "participationLimit") {
        first = Number.parseInt(first);
        second = Number.parseInt(second);

        first = isNaN(first) ? 0 : first;
        second = isNaN(second) ? 0 : second;

        return first - second;
      }

      if (id.includes("Date")) {
        first = Date.parse(first);
        second = Date.parse(second);

        return first - second;
      }

      if (id.includes("skill")) {
        first = first.skillName;
        second = second.skillName;
      }

      return first.localeCompare(second);
    });

    if (id === sortedColumn) {
      setIsSortedAsc((state) => {
        return !state;
      });
    } else {
      setSortedColumn(id);
      setIsSortedAsc(true);
    }
    setTrainingData([...sortedItems]);
  };

  const OnNominateHandler = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const trainingId = trainingData[id].training.id;
    const trainingTitle = trainingData[id].training.title;

    setSelectedTraining({ id, trainingId, trainingTitle });
    setIsNominating(true);
  };

  const nominationHandler = (isSuccessfull) => {
    if (isSuccessfull) {
      trainingData[selectedTraining.id].training.nominations += 1;
      trainingData[selectedTraining.id].isNominated = true;
    }

    setIsNominating(false);
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const trainingId = trainingData[id].training.id;
    const trainingTitle = trainingData[id].training.title;
    const trainingProgress = trainingData[id].progress;

    setSelectedTraining({ id, trainingId, trainingTitle, trainingProgress });
    setIsUpdating(true);
  };

  const updateHandler = (isSuccessfull, progress) => {
    if (isSuccessfull) {
      progress = parseInt(progress);
      trainingData[selectedTraining.id].progress = progress;
      trainingData[selectedTraining.id].avgProgress += Math.round(
        (progress - selectedTraining.trainingProgress) /
          trainingData[selectedTraining.id].training.nominations
      );
    }

    setIsUpdating(false);
  };

  return (
    <div className={classes.container}>
      <TrainingDevWatermark name="Divyam Arora" />
      <h5 className={classes.formheading}>Trainings</h5>

      <table className={classes.table}>
        <thead>
          <tr className={classes.tablehead}>
            {columns.map((column) => {
              return (
                <th key={column.label}>
                  <div
                    className={classes.tableheading}
                    data-id={column.accessor}
                    onClick={onSortHandler}
                  >
                    <p>{column.label}</p>
                    <span class="material-icons">filter_alt</span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {trainingData.map(
            ({ training, avgProgress, progress, isNominated }, i) => {
              const isClosed = new Date(training.endDate) - Date.now() < 0;
              return (
                <tr
                  key={training.id}
                  className={`${classes.tablerow} ${
                    isClosed ? classes.closed : ""
                  }`}
                >
                  <td>
                    <span>{i + 1}</span>
                  </td>
                  <td>
                    <span>
                      {showAvgProgress ? (
                        <Link
                          to={`/ui/forms/trainings/${training.id}`}
                          className={classes.link}
                        >
                          {training.title}
                          <span className="material-icons">link</span>
                        </Link>
                      ) : (
                        training.title
                      )}
                    </span>
                  </td>
                  <td>
                    <span>{new Date(training.startDate).toDateString()}</span>
                  </td>
                  <td>
                    <span>{new Date(training.endDate).toDateString()}</span>
                  </td>
                  <td>
                    <span>{training.skill?.skillName}</span>
                  </td>
                  <td>
                    <span>{training.isClassroom ? "Classroom" : "Online"}</span>
                  </td>
                  <td>
                    <span>
                      {training.isClassroom
                        ? training.participationLimit
                        : "---"}
                    </span>
                  </td>
                  <td>
                    <span>{training.nominations}</span>
                  </td>
                  <td>
                    <span>
                      {showAvgProgress
                        ? avgProgress
                        : isNominated
                        ? progress
                        : "---"}
                    </span>
                  </td>
                  {showAvgProgress ? null : (
                    <td>
                      {isClosed ? (
                        "Closed"
                      ) : (
                        <span>
                          {isNominated ? (
                            <button
                              className={classes.button}
                              data-id={i}
                              onClick={onUpdateHandler}
                            >
                              Update
                            </button>
                          ) : training.isClassroom &&
                            training.nominations >=
                              training.participationLimit ? (
                            "Full"
                          ) : (
                            <button
                              className={classes.button}
                              data-id={i}
                              onClick={OnNominateHandler}
                            >
                              Nominate
                            </button>
                          )}
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {isLoading && <div className="loader-container"></div>}
      {!hasRecords && <p className={classes.info}>No Records</p>}
      {isNominating && (
        <NominateTraining
          nominationHandler={nominationHandler}
          trainingData={selectedTraining}
        />
      )}
      {isUpdating && (
        <TrainingProgress
          updateHandler={updateHandler}
          trainingData={selectedTraining}
        />
      )}
    </div>
  );
};

export default ListOfTrainings;
