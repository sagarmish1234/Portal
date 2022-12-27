import React, { useEffect, useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import DataService from "../../services/data.service";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  default as Button,
  default as CheckButton,
} from "react-validation/build/button";
import { required, validateNumber } from "../../common/validators";
import "../../css/tableforms.css";
import classes from "../training/TrainingComponents.module.css";
import { UI_URL } from "../../common/constants";
import IssueService from "../../services/issues.service";
const AddIssue=()=>
{
  const form = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const checkBtn = useRef();
  const [projectIdList,setProjectIdList]=useState([]);
  const [projectId,setProjectId]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subject,setSubject]=useState("");
  const [description,setDescription]=useState("");
  const [OwnerOfTheIssue,setOwnerOfTheIssue]=useState("");
  const [ETA,setETA]=useState(null);
  const [ActionToBeTaken,setActionToBeTaken]=useState("");
  const [Remarks,setRemarks]=useState("");
  const [Impact,setImpact]=useState("");
  const [raiseddate,setRaisedDate]=useState(null);
  const [resloveddate,setReslovedDate]=useState(null); 
  const [serverError, setServerError] = useState("");
  const [ImpactCategories,setImpactCategories]=useState([]);
  const [impactCategory,setImpactCategory]=useState(undefined);
  const [IssueStatus,setIssueStatus]=useState([]);
  const [issuestatus,setIssuestatus]=useState(undefined);
  const [loblist,setLobList]=useState([]);
  const [lobname,setLobName]=useState("");
  const [successful, setSuccessful] = useState(false);
  const [servicelinelist,setServiceLineList]=useState([]);
  const [serviceline,setServiceLine]=useState("");
  const [projectName,setProjectName]=useState("");
  useEffect(() => {
    setIsLoading(true);
    DataService.getAllImpactCategories()
      .then(
        (response) => {
          const categories = [];
          response.forEach((impactcategory, index) => {
            categories.push({
              value: impactcategory.category,
              label: impactcategory.category,
            });
          });
          setImpactCategories(categories);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    DataService.getAllIssueStatus()
      .then(
        (response) => {
          const status = [];
          response.forEach((issueStatus, index) => {
            status.push({
              value: issueStatus.status,
              label: issueStatus.status,
            });
          });
          setIssueStatus(status);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    DataService.getLOBList()
      .then(
        (response) => {
          const  LobList= [];
          response.forEach((item, index) => {
            LobList.push({
              value: item,
              label: item,
            });
          });
          setLobList(LobList);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    getProjectIdsList();
  }, [serviceline, lobname]);
 
  const getProjectIdsList = () => {
    if (serviceline && serviceline != "" && lobname && lobname != "") {
      IssueService.getProjectIdList(serviceline,lobname)
      .then(
        (response) => {
          const projectids = [];
          response.forEach((item, index) => {
            projectids.push({
              value: item,
              label: item,
            });
          });
          setProjectIdList(projectids);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }
    };
    useEffect(() => {
      getProjectname();
    }, [serviceline, lobname,projectId]);
    const getProjectname=()=>
    {
      if (serviceline && serviceline != "" && lobname && lobname != "" && projectId && projectId!=""){
        IssueService.getProjectName(serviceline,lobname,projectId)
      .then(
        (response) => {
          
          //const projectname =response.value;
          setProjectName(response[0]);
          
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
      }
    };
    
  useEffect(() => {
    setIsLoading(true);
    DataService.getAllServiceLine()
      .then(
        (response) => {
          const  ServiceLineList= [];
          response.forEach((item, index) => {
            ServiceLineList.push({
              value: item,
              label: item,
            });
          });
          setServiceLineList(ServiceLineList);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setMessage(_content);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const onChangeProjectId=(e)=>{
    const pid=e.value;
    setProjectId(pid);
  }
 // const onChangeProjectName=(e)=>{
 //  const projectname=e.target.value;
 //    setProjectName(projectname);
 // };
  const onChangeServiceLine=(e)=>{
      setServiceLine(e.value);
  };
  const onChangeLobList=(e)=>{
    setLobName(e.value);
  };
  const onChangeIssueStatus=(e)=>{
    setIssuestatus(e.value);
  };
  const onChangeImpactCategory=(e)=>{
      setImpactCategory(e.value);
  };

  const onChangeRaisedDate=(e)=>{
    const rdate=e.target.value;
    setRaisedDate(new Date(rdate));
 };
  
  const onChangeRemarks=(e)=>{
    const remarks=e.target.value;
    setRemarks(remarks);
 };
 const onChangeImpact=(e)=>{
     const impact=e.target.value;
     setImpact(impact);
 };
  const onChangeActionToBeTaken=(e)=>{
     const atbt=e.target.value;
     setActionToBeTaken(atbt);
  };
  const onChangeEta=(e)=>{
           const eta=e.target.value;
           setETA(new Date(eta));
  };
  const onChangeOwnerOfTheIssue=(e)=>{
           const ownerOfTheIssue=e.target.value;
           setOwnerOfTheIssue(ownerOfTheIssue);
  };
  const onChangeDescription=(e)=>{
    const Description=e.target.value;
    setDescription(Description);
};
  const onChangeSubject=(e)=>{
    const Subject=e.target.value;
    setSubject(Subject);
};
 
  const onSubmitHandler=(e)=>
  {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setIsLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
         const addIssueRequest= {
          serviceLine:serviceline,
          lobName:lobname,
          projectId:projectId,
          projectName:projectName,
          subject:subject,
          description:description,
          ownerOfTheIssue:OwnerOfTheIssue,
          eta:ETA,
          actionToBeTaken:ActionToBeTaken,
          remarks:Remarks,
          impact:Impact,
          issueStatus:issuestatus,
          issueRaisedDate:raiseddate,
          issueReslovedDate:resloveddate,
          impactCategory:impactCategory,
         };
         
         IssueService
        .addIssue(addIssueRequest)
        .then((response) => {
          setMessage(response.message);
          
          setIsLoading(false);
          setSuccessful(true);
          window.alert("Issue added successfully");
          navigate("/ui/forms/issues/viewIssues");
        })
        .catch((error) => {
          setMessage(error.message);
          console.log(error);
          setIsLoading(false);
          setSuccessful(false);
        });    

    };
  }
  return(
       <div className="card card-container-form">
        <h5 className={classes.formheading}>Add Issue</h5>
         <Form onSubmit={onSubmitHandler} ref={form}>
         {!successful && (
          <div>
            <table className="tableform">
              <tbody>
              <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="serviceline">Service Line</label>
                      </td>
                      <td>
                        <Select options={servicelinelist} validations={[required]} onChange={onChangeServiceLine} >
                           
                        </Select>
                      </td>
              </tr>
              <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="LOBList">LOB NAME</label>
                      </td>
                      <td>
                        <Select options={loblist} validations={[required]} onChange={onChangeLobList} >
                           
                        </Select>
                      </td>
                </tr>
                <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="projectId">Project Id</label>
                      </td>
                      <td>
                        <Select options={projectIdList} validations={[required]} onChange={onChangeProjectId}>
                           
                        </Select>
                      </td>
                </tr>

                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="projectName">Project Name</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="projectName"
                          value={projectName}
                          validations={[required]}
                          disabled
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="subject">Subject</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="subject"
                          value={subject}
                          onChange={onChangeSubject}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="description">Text Area</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="description"
                          value={description}
                          onChange={onChangeDescription}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="OwnerOfTheIssue">Owner of the issue</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="OwnerOfTheIssue"
                          value={OwnerOfTheIssue}
                          onChange={onChangeOwnerOfTheIssue}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="ETA">ETA</label>
                </td>
                <td>
                <Input
                          type="Date"
                          className="form-control"
                          name="ETA"
                          onChange={onChangeEta}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="ActionToBeTaken">Action To Be Taken</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="ActionToBeTaken"
                          value={ActionToBeTaken}
                          onChange={onChangeActionToBeTaken}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="Remarks">Remarks</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="Remarks"
                          value={Remarks}
                          onChange={onChangeRemarks}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                <td className={classes.tableformlabels}>
                <label htmlFor="Impact">Impact</label>
                </td>
                <td>
                <Input
                          type="text"
                          className="form-control"
                          name="Impact"
                          value={Impact}
                          onChange={onChangeImpact}
                          validations={[required]}
                />
                </td>
                </tr>
                <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="IssueStatus">Issue Status</label>
                      </td>
                      <td>
                        <Select options={[IssueStatus[0]]} validations={[required]} onChange={onChangeIssueStatus} >
                           
                        </Select>
                      </td>
                </tr>
                <tr >
                      <td className={classes.tableformlabels}>
                        <label className="form__label" htmlFor="raiseddate">
                          Issue Raised Date:
                        </label>
                      </td>
                      <td>
                        <Input
                          type="Date"
                          name="raiseddate"
                          id="raiseddate"
                          className="form-control"
                          onChange={onChangeRaisedDate}
                          validations={[required]}
                        />
                      </td>
                    </tr>
                    
                    <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="ImpactCategory">Impact Category</label>
                      </td>
                      <td>
                        <Select options={ImpactCategories} validations={[required]} onChange={onChangeImpactCategory}>
                           
                        </Select>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className={classes.tableformlabels}></td>
                      <td>
                        <Button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </td>
                    </tr>
                    
              </tbody>
            </table>
          </div>
          )}
           {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )} 
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
         </Form>
       </div>
  );   
};
export default AddIssue;