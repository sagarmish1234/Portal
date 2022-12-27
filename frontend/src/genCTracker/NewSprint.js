import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import { required } from "../common/validators";
import {
  apiGetServiceLineList,
  apiGetAssignUsersFromServiceLine,
  apiCreateSprint,
  apiGetAllStories,
} from "../utils/AppUtils";
import Select from "react-select";
import {useNavigate} from "react-router-dom"
import makeAnimated from 'react-select/animated';


function NewSprint() {
  const [sprint, setSprint] = useState({
    name: "",
    startDate: "",
    endDate: "",
    scrumMasterId: "",
    storyIds: [],
  });
  const animatedComponents = makeAnimated();
  const form = useRef();
  const selectedStories = useRef();
  const navigate = useNavigate()
  const [serviceLineList, setServiceLineList] = useState([]);
  const [serviceLine, setServiceLine] = useState(null);
  const [associateIds, setAssociateIds] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    apiGetAllStories()
      .then((response) => {
        setStories(
          response.map((story) => {
            return { label: story.subject, value: story.id };
          })
        );
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSprint({ ...sprint, [name]: value });
  };

  useEffect(() => {
    apiGetServiceLineList().then((response) => {
      let temp = [];
      response.map((line) => {
        temp.push({ value: line, label: line });
      });
      setServiceLineList(temp);
    });
  }, []);

  useEffect(() => {
    apiGetAssignUsersFromServiceLine(serviceLine).then((response) => {
    //   console.log(response);
      setAssociateIds(response);
    });
  }, [serviceLine]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedStories.current.props.value);
    form.current.validateAll();
    var data = { ...sprint };
    data.storyIds = selectedStories.current.props.value.map(
      (story) => story.value
    );
    data.startDate = new Date(data.startDate).toISOString();
    data.endDate = new Date(data.endDate).toISOString();
    console.log(data)
    apiCreateSprint(data)
      .then((response) => {
          alert(response.message)
            navigate("/ui/gencTracker/sprint/allSprints");
    })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card card-container-form">
        <label className="formheading">New Sprint</label>
        <Form onSubmit={handleSubmit} ref={form}>
          {
            <div>
              <table className="tableform">
                <tbody>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="associateId">Name</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={sprint.name}
                        onChange={handleChange}
                        validations={[required]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="fullName">Start Date</label>
                    </td>
                    <td>
                      <Input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={sprint.startDate}
                        onChange={handleChange}
                        validations={[required]}
                        rows="9"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="fullName">End Date</label>
                    </td>
                    <td>
                      <Input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={sprint.endDate}
                        onChange={handleChange}
                        validations={[required]}
                        rows="9"
                      />
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
                      <label htmlFor="phone">Scrum Master</label>
                    </td>

                    <td>
                      <Select
                        onChange={(e) =>
                          setSprint({ ...sprint, scrumMasterId: e.value })
                        }
                        isDisabled={serviceLine == null}
                        options={associateIds}
                        placeholder="Select Scrum Master"
                        validations={[required]}
                      ></Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="phone">Stories</label>
                    </td>

                    <td>
                      <Select
                        options={stories}
                        placeholder="Select Stories"
                        validations={[required]}
                        isMulti={true}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        ref={selectedStories}
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
    </div>
  );
}

export default NewSprint;
