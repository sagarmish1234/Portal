import React, { useState, useRef, useEffect } from "react";
import DataService from "../../services/data.service";
import "../../css/settings.css";

const Settings = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [visibilities, setVisibilities] = useState([]);
  const [names, setNames] = useState([]);
  const [values, setValues] = useState([]);
  const [settingsData, setSettingsData] = useState([]);
  const changedData = new Map();

  const columns = [
    { accessor: "sno", label: "S.No", colSize: "7" },
    { accessor: "visibility", label: "Scope", colSize: "7" },
    { accessor: "param", label: "Param Name", colSize: "20" },
    { accessor: "value", label: "Value", colSize: "8" },
  ];

  useEffect(() => {
    DataService.getSettingsData().then(
      (response) => {
        setSettingsData(response);
      },
      (error) => {}
    );
  }, []);

  const onChangeSettingsData = (event) => {
    if (event.target.type == "text") {
      changedData.set(event.target.id, event.target.value);
    } else {
      changedData.set(event.target.id, event.target.checked);
    }
  };

  const handleSubmit = (event) => {
    const vDataList = [];
    changedData.forEach((value, key, changedData) => {
      vDataList.push({ key, value });
    });

    DataService.saveSettingsData(vDataList).then(
      (response) => {
        console.log("Settings saved");
      },
      (error) => {
        console.log("Settings failed");
      }
    );
  };

  const printContent = (row) => {
    if (row["type"] == "text") {
      return (
        <>
          <input
            type="text"
            name={row["id"]}
            id={row["id"]}
            defaultValue={row["value"]}
            className="inputeditablecontent"
            onChange={(event) => onChangeSettingsData(event)}
          />
        </>
      );
    } else if (row["type"] == "boolean") {
      return (
        <>
          <input
            type="checkbox"
            name={row["id"]}
            id={row["id"]}
            defaultChecked={row["value"] == "true" ? true : false}
            onChange={(event) => onChangeSettingsData(event)}
          />
        </>
      );
    }
  };

  return (
    <div>
      <div>
        <div>
          <table className="assignmentdropdown">
            <tbody>
              <tr width="100%">
                <td colSpan="4">
                  <table>
                    <thead>
                      <tr>
                        {columns.map((column) => {
                          return (
                            <th key={column.accessor}>
                              <span>{column.label}</span>
                            </th>
                          );
                        })}
                      </tr>
                      <tr></tr>
                    </thead>
                    <tbody>
                      {settingsData.map((row) => {
                        return (
                          <tr key={row.id} className="rowstyle">
                            <td className="tdcentercontent">{row.id}</td>
                            <td className="tdcentercontent">
                              {row[columns[1].accessor]
                                ? row[columns[1].accessor]
                                : "General"}
                            </td>
                            <td className="tdleftcontent">
                              {row[columns[2].accessor]}
                            </td>

                            <td className="tdeditablecontent">
                              {printContent(row)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="form-group formsubmitbutton">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={(event) => handleSubmit(event)}
                    >
                      <span>Save</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
