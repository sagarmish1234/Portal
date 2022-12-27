import React, { useState, useRef, useEffect } from "react";
import {
  apiGetStoryById,
  apiGetAllEpics,
  apiUpdateStory,
  apiGetAllPriorities,
  apiGetAllStoryStatus,
  apiGetServiceLineList,
  apiGetAssignUsersGenCFromServiceLine,
  apiGetStoryDropdowns,
  apiDeleteStory,
} from "../utils/AppUtils";
import Select from "react-select";
import "../css/newstory.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import { required } from "../common/validators";
import { useNavigate, useParams } from "react-router";
import AuthService from "../services/auth.service";
import { ROLE_ASSOCIATE } from "../common/constants";
import makeAnimated from "react-select/animated";

function StoryDetails() {
  const [epics, setEpics] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [storyStatuses, setStoryStatuses] = useState([]);
  const [storyData, setStoryData] = useState({});
  const [storyResponse, setStoryResponse] = useState({});
  const form = useRef();
  const navigate = useNavigate();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const [serviceLineList, setServiceLineList] = useState([]);
  const [serviceLine, setServiceLine] = useState(null);
  const [associateIds, setAssociateIds] = useState([]);
  const isAssociate = AuthService.getCurrentUserRoles() == ROLE_ASSOCIATE;
  const animatedComponents = makeAnimated();
  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
    setIsEditing(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    apiDeleteStory(id).then((response) => {
      alert(response.message);
      navigate("/ui/gencTracker/stories/allStories");
    });
  };

  useEffect(() => {
    apiGetStoryDropdowns().then((response) => {
      setPriorities(
        response.storyPriority.map((priority) => {
          return { label: priority.groupValue, value: priority.id };
        })
      );
      setEpics(
        response.storyEpics.map((epic) => {
          return { label: epic.name, value: epic.id };
        })
      );
      setStoryStatuses(
        response.storyStatus.map((status) => {
          return { label: status.groupValue, value: status.id };
        })
      );
      setSkills(response.storySkills);
    });

    // apiGetAllEpics().then((response) => {
    //   // console.log(response);
    //   setEpics(
    //     response.map((epic) => {
    //       return { label: epic.name, value: epic.id };
    //     })
    //   );
    // });

    // apiGetAllStoryStatus().then((response) => {
    //   console.log(response);
    //   setStoryStatuses(
    //     response.map((status) => {
    //       return { label: status.groupValue, value: status.id };
    //     })
    //   );
    // });

    // apiGetAllPriorities().then((response) => {
    //   console.log(response);
    //   setPriorities(
    //     response.map((priority) => {
    //       return { label: priority.groupValue, value: priority.id };
    //     })
    //   );
    // });
    apiGetStoryById(id).then((response) => {
      console.log(response);
      setStoryResponse(response);
      setStoryData({
        id: response.id,
        subject: response.subject,
        details: response.details,
        storyPriority: response.storyPriority.id,
        epicId: response.epic.id,
        ownerId: response.owner.associateID,
        storyPointEstimation: response.storyPointEstimation,
        storyStatus: response.storyStatus.id,
        storySkills: response.storySkills.map((skill) => skill.id),
      });
    });

    apiGetServiceLineList().then((response) => {
      let temp = [];
      response.map((line) => {
        temp.push({ value: line, label: line });
      });
      setServiceLineList(temp);
    });
  }, []);

  useEffect(() => {
    apiGetAssignUsersGenCFromServiceLine(serviceLine).then((response) => {
      console.log(response);
      setAssociateIds(response);
    });
  }, [serviceLine]);

  const handleUpdate = (e) => {
    e.preventDefault();
    form.current.validateAll();
    console.log(storyData);
    apiUpdateStory(storyData)
      .then((response) => {
        alert(response.message);
        navigate("/ui/gencTracker/stories/allStories");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card card-container-form">
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {!isAssociate && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => setIsReadOnly(!isReadOnly)}
              >
                {isReadOnly ? "Edit" : "Editing"}
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
        <label className="formheading">Story Details</label>
        <Form onSubmit={handleUpdate} ref={form}>
          {
            <div>
              <table className="tableform">
                <tbody>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="associateId">Subject</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={storyData.subject}
                        onChange={handleChange}
                        validations={[required]}
                        disabled={isReadOnly}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="fullName">Details</label>
                    </td>
                    <td>
                      <textarea
                        type="text"
                        disabled={isReadOnly}
                        className="form-control"
                        name="details"
                        value={storyData.details}
                        onChange={handleChange}
                        validations={[required]}
                        rows="9"
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="skillId">Priority</label>
                    </td>
                    <td>
                      {storyData.storyPriority != undefined && (
                        <Select
                          isDisabled={isReadOnly}
                          isClearable="false"
                          defaultValue={{
                            label: storyResponse.storyPriority.groupValue,
                            value: storyResponse.storyPriority.id,
                          }}
                          onChange={(e) => {
                            setStoryData({
                              ...storyData,
                              storyPriority: e.value,
                            });
                          }}
                          options={priorities}
                        ></Select>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="skillId">Epic</label>
                    </td>
                    <td>
                      {storyData.epicId != undefined && (
                        <Select
                          onChange={(e) => {
                            setStoryData({ ...storyData, epicId: e.value });
                          }}
                          isDisabled={isReadOnly}
                          defaultValue={{
                            value: storyData.epicId,
                            label: storyResponse.epic.name,
                          }}
                          isClearable={false}
                          options={epics}
                        ></Select>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="skillId">Current Status</label>
                    </td>
                    <td>
                      {storyData.storyStatus != undefined && (
                        <Select
                          onChange={(e) => {
                            setIsEditing(true);
                            setStoryData({
                              ...storyData,
                              storyStatus: e.value,
                            });
                          }}
                          defaultValue={{
                            label: storyResponse.storyStatus.groupValue,
                            value: storyData.storyStatus.id,
                          }}
                          isClearable={false}
                          options={storyStatuses}
                        ></Select>
                      )}
                    </td>
                  </tr>
                  {!isReadOnly && (
                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="skillId">Service Line</label>
                      </td>
                      <td>
                        <Select
                          onChange={(e) => {
                            setServiceLine(e.value);
                          }}
                          options={serviceLineList}
                          placeholder="Select Service Line"
                        ></Select>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="phone">Responsible </label>
                    </td>
                    <td>
                      {serviceLine == null && (
                        <Input
                          type="text"
                          className="form-control"
                          name="ownerId"
                          disabled={isReadOnly}
                          value={storyData.ownerId}
                          onChange={handleChange}
                          validations={[required]}
                        />
                      )}
                      {serviceLine != null && associateIds != [] && (
                        <Select
                          isDisabled={isReadOnly}
                          onChange={(e) =>
                            setStoryData({ ...storyData, ownerId: e.value })
                          }
                          options={associateIds}
                          validations={[required]}
                        ></Select>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="phone">Story Point Estimation</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        disabled={isReadOnly}
                        className="form-control"
                        name="storyPointEstimation"
                        value={storyData.storyPointEstimation}
                        onChange={handleChange}
                        // validations={[required]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="phone">Skills Required</label>
                    </td>

                    <td>
                      {storyData?.storySkills && (
                        <Select
                          isMulti={true}
                          options={skills}
                          defaultValue={storyData.storySkills.map(
                            (skillId) =>
                              skills.filter(
                                (skill) => skill.value == skillId
                              )[0]
                          )}
                          // defaultValue={skills}
                          isDisabled={true}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                          placeholder="Select required skills"
                          validations={[required]}
                          // ref={selectSkills}
                        ></Select>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels"></td>
                    <td>
                      {(!isReadOnly || isEditing) && (
                        <Button
                          className="btn btn-primary btn-block formsubmitbutton"
                          type="submit"
                        >
                          Update
                        </Button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </Form>
      </div>
    </div>
  );
}

export default StoryDetails;
