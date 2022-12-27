import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import "../css/registrationapproval.css";

const AdminApproval = (props) => {
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAllUser().then((items) => {
      setList(items);
    });
  }, []);

  var obj = {};
  let newObj = [];
  var associateId = [];
  let arr = [];

  for (var i = 0; i < list.length; i++) {
    associateId.push(list[i].associateId);
    newObj.push({ associateId: associateId[i] });
    newObj[i]["roles"] = [];
    newObj[i]["approved"] = false;
  }

  const handleCheck = (event) => {
    let role = [];
    let rowId = event.target.id;
    let value = event.target.value;

    if (event.target.checked) {
      newObj[rowId]["roles"].push(value);
    } else {
      newObj[rowId]["roles"].pop(value);
    }
  };

  const handleApproved = (event) => {
    var id = event.target.id;
    if (event.target.checked) {
      newObj[id]["approved"] = true;
    } else {
      newObj[id]["approved"] = false;
    }
  };

  const saveChange = (e) => {
    e.preventDefault();

    UserService.approvedAndAssignRoles(newObj).then(
      (response) => {
        navigate("/ui/home");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  return (
    <div className="leaveTrackerTableContainer">
      <div className="m-4">
        <button className="btn btn-primary" onClick={saveChange}>
          Save Changes
        </button>
      </div>
      <table>
        <tr className="gdvheader">
          <th className="task">Associate_ID</th>
          <th className="task">Email_Address</th>
          <th className="task">Associate_Name</th>
          <th className="task">Serice_Line</th>
          <th className="task">Grade</th>
          <th className="task">Associate</th>
          <th className="task">ProjectManager</th>
          <th className="task">AccountLead</th>
          <th className="task">LOBLead</th>
          <th className="task">EDL</th>
          <th className="task">PDL</th>
          <th className="task">Admin</th>
          <th className="task">HR</th>
          <th className="task">TAG</th>
          <th className="task">Approval</th>
        </tr>
        {list.map((data, index) => {
          let r = data.roles[0]?.name;

          return (
            <tr key={index} className="tablerow">
              <td>{data.associateId}</td>
              <td>{data.email}</td>
              <td>{data.associateName}</td>
              <td>{data.serviceLine}</td>
              <td>{data.grade}</td>
              {}

              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="Associate"
                    id={index}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("Associate") > -1
                        ? true
                        : false
                    }
                    onChange={handleCheck}
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="ProjectManager"
                    // checked="false"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("ProjectManager") >
                      -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="AccountLead"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("AccountLead") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="LOBLead"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("LOBLead") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="EDL"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("EDL") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="PDL"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("PDL") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="Admin"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("Admin") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="HR"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("HR") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="roles"
                    value="TAG"
                    id={index}
                    onChange={handleCheck}
                    defaultChecked={
                      data.roles.map((e) => e.name).indexOf("TAG") > -1
                        ? true
                        : false
                    }
                  />
                </div>
              </td>
              <td>
                <div className="centeralign">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    value=""
                    id={index}
                    defaultChecked={data.approved === true ? true : false}
                    onChange={handleApproved}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>

      {/* <button className="leavesTrackerSaveButton" onClick={handleSaveChanges}>
        Save Changes
      </button> */}

      {
        // list.map((items, index) => {
        //     return (
        //         <div key={index}>
        //             {`Items checked are: ${checked}`
        //             }
        //         </div>
        //     )
        // })
      }
    </div>
  );
};

export default AdminApproval;
