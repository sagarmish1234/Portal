import classes from "../training/TrainingComponents.module.css";
import { UI_URL } from "../../common/constants";
import React, { useEffect, useRef, useState } from "react";
import Form from "react-validation/build/form";
import Select from "react-select";
import { required, validateNumber } from "../../common/validators";
import Input from "react-validation/build/input";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import IssueService from "../../services/issues.service";
import {
  default as Button,
  default as CheckButton,
} from "react-validation/build/button";
const EditIssues=()=>
{
    const navigate = useNavigate();
    const {id}=useParams();
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [message, setMessage] = useState("");
    const [serviceline,setServiceLine]=useState("");
    const [ImpactCategories,setImpactCategories]=useState([]);
    const [impactCategory,setImpactCategory]=useState(undefined);
    const [lobname,setLobName]=useState("");
    const [projectId,setProjectId]=useState("");
    const [projectName,setProjectName]=useState("");
    const [subject,setSubject]=useState("");
    const [description,setDescription]=useState("");
    const [OwnerOfTheIssue,setOwnerOfTheIssue]=useState("");
    const [ETA,setETA]=useState(null);
    const [ActionToBeTaken,setActionToBeTaken]=useState("");
    const [Remarks,setRemarks]=useState("");
    const [Impact,setImpact]=useState("");
    const [IssueStatus,setIssueStatus]=useState([]);
    const [issuestatus,setIssuestatus]=useState(undefined);
    const [raiseddate,setRaisedDate]=useState(null);
    const [resloveddate,setReslovedDate]=useState(null);
    const onChangeOwnerOfTheIssue=(e)=>{
      const ownerOfTheIssue=e.target.value;
      setOwnerOfTheIssue(ownerOfTheIssue);
       console.log(OwnerOfTheIssue);
    };
    const onSubmitHandler=(e)=>
    {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        setIsLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
       const updatedIssue={
        id:id,
        subject:subject,
        description:description,
        ownerOfTheIssue:OwnerOfTheIssue,
        eta:ETA,
        actionToBeTaken:ActionToBeTaken,
        remarks:Remarks,
        impact:Impact,
        issueStatus:issuestatus,
        impactCategory:impactCategory,
        issueReslovedDate:resloveddate
       }
       IssueService
        .updateIssue(updatedIssue)
        .then((response) => {
          setMessage(response.message);
          console.log(response.message);
          setIsLoading(false);
          setSuccessful(true);
          window.alert("Data Updated successfully");
          navigate("/ui/forms/issues/viewIssues");
        })
        .catch((error) => {
          setMessage(error.message);
          console.log(error);
          setIsLoading(false);
          setSuccessful(false);
        });    
       console.log(updatedIssue);
      }
    };
    
const onChangeEta=(e)=>{
      const eta=e.target.value;
      setETA(formatDate(eta));
    
};
const onChangeActionToBeTaken=(e)=>{
  const atbt=e.target.value;
  setActionToBeTaken(atbt);
};
const onChangeDescription=(e)=>{
  setDescription(e.target.value);
}
const onChangeRemarks=(e)=>{
  const remarks=e.target.value;
  setRemarks(remarks);
};
const onChangeImpact=(e)=>{
  const impact=e.target.value;
  setImpact(impact);
};
const onChangeIssueStatus=(e)=>{
    setIssuestatus(e.value);
  };
  const onChangeImpactCategory=(e)=>{
    setImpactCategory(e.value);
};
const onChangeSubject=(e)=>{
  setSubject(e.target.value);
};
const onChangeReslovedDate=(e)=>{
    const resdate=e.target.value;
    setReslovedDate(formatDate(resdate));
};
useEffect(() => {
  getIssueData(id);
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
const formatDate=(e)=>{
  const date = new Date(e);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let temp = `${year}-${month}-${day}`;
        return(
            temp
         );
};
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
const getIssueData=(id)=>{
    IssueService.getIssues(id).then(
      (response) => {
          
           setLobName(response.lobName);
           setServiceLine(response.serviceLine);
           setProjectId(response.projectId);
           setProjectName(response.projectName);
           setSubject(response.subject);
           setDescription(response.description);
           setOwnerOfTheIssue(response.ownerOfTheIssue);
           setActionToBeTaken(response.actionToBeTaken);
           setRemarks(response.remarks);
           setImpact(response.impact);
           setIssuestatus(response.issueStatus);
           setRaisedDate(formatDate(response.issueRaisedDate));
           setETA(formatDate(response.eta));
           setImpactCategory(response.impactCategory);
           setReslovedDate(formatDate(response.reslovedDate));
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setServerError(_content);
      }
    );
}
useEffect(()=>{
  renderReslovedDate();
},[issuestatus]);
const renderReslovedDate=()=>{
     if(issuestatus && issuestatus==='Resloved')
     {
      return (
        <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="resloveddate">Issue Resloved Date</label>
                      </td>
                      <td>
                      <Input
                          type="Date"
                          className="form-control"
                          name="resloveddate"
                          value={resloveddate}
                          validations={[required]}
                          onChange={onChangeReslovedDate}
                        />
                    </td>
              </tr>
      );
     }
}

    return (
       <div className="card card-container-form">
        <h5 className={classes.formheading}>Update Issue</h5>
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
                      <Input
                          type="text"
                          className="form-control"
                          name="serviceline"
                          value={serviceline}
                          validations={[required]}
                          disabled
                        />
                      </td>
              </tr> 
              <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="lobname">LOB Name</label>
                      </td>
                      <td>
                      <Input
                          type="text"
                          className="form-control"
                          name="lobname"
                          value={lobname}
                          validations={[required]}
                          disabled
                        />
                    </td>
              </tr>
              <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="projectId">Project Id</label>
                      </td>
                      <td>
                      <Input
                          type="text"
                          className="form-control"
                          name="projectId"
                          value={projectId}
                          validations={[required]}
                          disabled
                        />
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
                          validations={[required]}
                          onChange={onChangeSubject}
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
                          validations={[required]}
                          onChange={onChangeDescription}
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
                          value={ETA}                    
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
                          validations={[required]}
                          onChange={onChangeActionToBeTaken}
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
                        <Select options={IssueStatus} validations={[required]} onChange={onChangeIssueStatus} placeholder={issuestatus}>
                          
                        </Select>
                      </td>
                </tr>
                <tr>
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
                          value={raiseddate}
                          //onChange={onChangeRaisedDate}
                          validations={[required]}
                          disabled
                        />
                      </td>
                </tr>
                {renderReslovedDate()}
                <tr>
                    <td className={classes.tableformlabels}>
                        <label htmlFor="ImpactCategory">Impact Category</label>
                      </td>
                      <td>
                        <Select options={ImpactCategories} validations={[required]} onChange={onChangeImpactCategory} placeholder={impactCategory}>
                           
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
                          Update
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
}

export default EditIssues;