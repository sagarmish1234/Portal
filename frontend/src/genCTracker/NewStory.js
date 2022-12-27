import React, { useState, useRef, useEffect } from "react";
import {
  apiGetServiceLineList,
  apiGetAssignUsersGenCFromServiceLine,
  apiCreateStory,
  apiGetStoryDropdowns,
} from "../utils/AppUtils";
import Select from "react-select";
import "../css/newstory.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import { required } from "../common/validators";
import { useNavigate } from "react-router";
import makeAnimated from "react-select/animated";

function NewStory() {
  const [epics, setEpics] = useState();
  const [priorities, setPriorities] = useState();
  const form = useRef();
  const navigate = useNavigate();
  const [serviceLineList, setServiceLineList] = useState([]);
  const [serviceLine, setServiceLine] = useState(null);
  const [associateIds, setAssociateIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const animatedComponents = makeAnimated();
  const selectSkills = useRef();
  const [story, setStory] = useState({
    subject: "",
    details: "",
    ownerId: "",
    epicId: "",
    storyPointEstimation: 0,
    storyPriority: "",
    storySkills: [],
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
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

    // apiGetAllPriorities().then((response) => {
    //   // console.log(response);
    //   setPriorities(
    //     response.map((priority) => {
    //       return { label: priority.groupValue, value: priority.id };
    //     })
    //   );
    // });

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
      // alert(response.message);
      setAssociateIds(response);
    });
  }, [serviceLine]);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.current.validateAll();
    var data = { ...story };
    selectSkills.current.props.value.map((skill) => {
      data.storySkills.push(skill.value);
    });

    console.log(data);
    apiCreateStory(data)
      .then((response) => {
        console.log(response.message);
        navigate("/ui/gencTracker/stories/allStories");
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      {priorities && epics && (
        <div className="card card-container-form">
          <label className="formheading">New Story</label>
          <Form onSubmit={handleSubmit} ref={form}>
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
                          value={story.subject}
                          onChange={handleChange}
                          validations={[required]}
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
                          className="form-control"
                          name="details"
                          value={story.details}
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
                        <Select
                          onChange={(e) => {
                            setStory({ ...story, storyPriority: e.value });
                          }}
                          options={priorities}
                        ></Select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="skillId">Epic</label>
                      </td>
                      <td>
                        <Select
                          onChange={(e) => {
                            setStory({ ...story, epicId: e.value });
                          }}
                          options={epics}
                        ></Select>
                      </td>
                    </tr>
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
                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="phone">Responsible </label>
                      </td>

                      <td>
                        <Select
                          onChange={(e) =>
                            setStory({ ...story, ownerId: e.value })
                          }
                          options={associateIds}
                          placeholder="Select Responsible Associate"
                          validations={[required]}
                        ></Select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tableformlabels">
                        <label htmlFor="phone">Skills Required</label>
                      </td>

                      <td>
                        <Select
                          isMulti={true}
                          options={skills}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                          placeholder="Select required skills"
                          validations={[required]}
                          ref={selectSkills}
                        ></Select>
                      </td>
                    </tr>
                    <tr>
                      <td className="tableformlabels"></td>
                      <td>
                        <Button
                          className="btn btn-primary btn-block formsubmitbutton"
                          type="submit"
                        >
                          Create
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </Form>
        </div>
      )}
    </div>
  );
}

export default NewStory;
