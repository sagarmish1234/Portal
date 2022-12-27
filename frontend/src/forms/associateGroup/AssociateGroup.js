import React, { useState, useEffect } from "react";
import "../../css/associateGroup.css";
import {
  apiGetAssociateGroup,
  apiGetAssociateData,
  apiSaveAssociateGroup,
  apiCreateAssociateGroup,
  apiDeleteAssociateGroup,
} from "../../utils/AppUtils";
import { BsArrowLeft } from "react-icons/bs";

function AssociateGroup() {
  const [newGroup, setNewGroup] = useState("");
  const [newAssociate, setNewAssociate] = useState("");
  const [associateGroups, setAssociateGroups] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showCurrentGroup, setShowCurrentGroup] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    apiGetAssociateGroup()
      .then((response) => {
        setAssociateGroups(response);
        var temp = [];
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddAssociate = (index) => (e) => {
    let data = [...associateGroups];
    if (
      data[index].info.filter((ass) => ass.associateId == newAssociate)
        .length != 0
    )
      return;
    setIsSaved(false);
    apiGetAssociateData(newAssociate).then((response) => {
      data[index].info.push({
        associateId: response.associateID,
        associateName: response.associateName,
      });
      setAssociateGroups(data);
      setNewAssociate("");
      console.log(response);
    });
  };

  const handleSaveGroup = (index) => (e) => {
    setIsDisabled(true);
    e.preventDefault();
    apiSaveAssociateGroup({
      groupId: associateGroups[index].groupId,
      associateUsers: associateGroups[index].info,
    })
      .then((response) => {
        setIsDisabled(false);
        setIsSaved(true);
        alert(response.message);
        console.log(response);
      })
      .catch((err) => {
        setIsDisabled(false);
        console.log(err);
      });
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    apiCreateAssociateGroup(newGroup).then((response) => {
      console.log(response);
      setAssociateGroups((prev) => [
        { groupId: response.id, ...response, info: [] },
        ...prev,
      ]);
    });
    setNewGroup("");
  };

  const handleGroupLink = (index, flag) => (e) => {
    e.preventDefault();
    setCurrentGroup(index);
    setShowCurrentGroup(flag);
  };

  const handleDeleteGroup = (index) => (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this group ?")) {
      apiDeleteAssociateGroup(associateGroups[index].groupId).then(
        (response) => {
          let data = [...associateGroups];
          setAssociateGroups(
            data.filter((grp) => grp.groupId != data[index].groupId)
          );
        }
      );
    }
  };

  const handleDeleteAssociate = (groupIndex, associateIndex) => (e) => {
    setIsSaved(false);
    e.preventDefault();
    let data = [...associateGroups];
    console.log(
      data[groupIndex].info.filter(
        (ass) =>
          ass.associateId != data[groupIndex].info[associateIndex].associateId
      )
    );
    data[groupIndex].info = data[groupIndex].info.filter(
      (ass) =>
        ass.associateId != data[groupIndex].info[associateIndex].associateId
    );
    setAssociateGroups(data);
  };

  return (
    <div>
      <span className="developedby">Developed by Sagar(2130352)</span>
      {!showCurrentGroup && (
        <div>
          <form className="associateGroupCreate" onSubmit={handleCreateGroup}>
            <input
              name="newGroup"
              className="form-control"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary associateGroupCreateButton"
            >
              Create
            </button>
          </form>
          <table className="gdvheaderTable">
            <tr className="gdvheader">
              <th className="groupname">Group Name</th>
              <th className="groupmem">Group Members</th>
              <th className="groupaction">Action</th>
            </tr>
            {associateGroups.map((group, index) => {
              return (
                <tr key={group.groupId} className="profilerow">
                  <td style={{ cursor: "pointer" }} className="tdcentercontent">
                    <a href="#" onClick={handleGroupLink(index, true)}>
                      {group.groupName}
                    </a>
                  </td>
                  <td
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="tdleftcontent"
                  >
                    {group.info.map((ass, associateIndex) => {
                      return (
                        <>
                          {ass.associateId}({ass.associateName})&nbsp;&nbsp;
                        </>
                      );
                    })}
                  </td>
                  <td className="tdcentercontent">
                    <a href="#" onClick={handleDeleteGroup(index)}>
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
      {showCurrentGroup && currentGroup != null && (
        <div className="associateCurrentGroup">
          <div
            onClick={() => {
              if (!isSaved) {
                if (
                  window.confirm(
                    "Unsaved changes. Are you sure you want to go back?"
                  )
                ) {
                  apiGetAssociateGroup()
                    .then((response) => {
                      setAssociateGroups(response);
                      var temp = [];
                      console.log(response);
                    })
                    .catch((err) => console.log(err));
                  setShowCurrentGroup(false);
                }
              } else {
                setShowCurrentGroup(false);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <BsArrowLeft></BsArrowLeft> Back
          </div>
          <div className="associateGroupAddAssociate">
            <table className="margintop">
              <tr>
                <td>Group Name: </td>
                <td>{associateGroups[currentGroup].groupName}</td>
                <td></td>
              </tr>
              <tr>
                <td>Associate Id: </td>
                <td>
                  <input
                    className="form-control"
                    value={newAssociate}
                    onChange={(e) => setNewAssociate(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddAssociate(currentGroup)}
                  >
                    ADD
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <table>
            <tr className="gdvheader">
              <th>Associate ID</th>
              <th>Associate Name</th>
              <th>Action</th>
            </tr>
            {associateGroups[currentGroup].info.map((ass, associateIndex) => {
              return (
                <tr className="profilerow">
                  <td>{ass.associateId}</td>
                  <td>{ass.associateName}</td>
                  <td>
                    <a
                      href="#"
                      onClick={handleDeleteAssociate(
                        currentGroup,
                        associateIndex
                      )}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="divbuttoncenter">
            <button
              className="btn btn-primary"
              onClick={handleSaveGroup(currentGroup)}
              disabled={isDisabled || isSaved}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssociateGroup;
