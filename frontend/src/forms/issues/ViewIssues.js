import "../../css/billabilityplan.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import IssueService from "../../services/issues.service";
import SaveIcon from "../../images/saveicon.svg";
import DataService from "../../services/data.service";
import { Link } from "react-router-dom";
const  ViewIssues= () => {

    const [serviceLineList,setServiceLineList]=useState([]);
    const [serviceline,setServiceLine]=useState(undefined);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [IssuesData,setIssuesData]=useState([]);
    const [serverError, setServerError] = useState("");
    const todayDate = new Date();
  
    const onChangeServiceList=(e)=>
    {
         setServiceLine(e.value);
         
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
      const formatDate=(e)=>{
        if(e!=null)
        {
        const date = new Date(e);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let temp = `${day}-${month}-${year}`;
        return(
            temp
         );
        }
        else
        {
          return e;
        }
      };
      const renderTableData = () => {
        return IssuesData.map((issue, index) => {
          const date = new Date(issue.eta);
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          let currentDate = `${day}-${month}-${year}`;
          
            return (
                <tr key={issue.id} className="profilerow">
                    <td className="tdcentercontent" style={{width:"auto"}}>{index + 1}</td>
                    <td className="tdleftcontent">{issue.serviceLine}</td>
                    <td className="tdleftcontent">{issue.lobName}</td>  
                    <td className="tdleftcontent">{issue.projectId}</td>
                    <td className="tdleftcontent" style={{width:"auto"}}>{issue.projectName}</td>
                    <td className="tdleftcontent">{issue.subject}</td>
                    <td className="tdleftcontent">{issue.description}</td>
                    <td className="tdleftcontent">{issue.ownerOfTheIssue}</td>
                    <td className="tdleftcontent">{formatDate(issue.eta)}</td>
                    <td className="tdleftcontent">{issue.actionToBeTaken}</td>
                    <td className="tdleftcontent">{issue.remarks}</td>
                    <td className="tdleftcontent">{issue.issueStatus}</td>
                    <td className="tdleftcontent">{formatDate(issue.issueRaisedDate)}</td>
                    <td className="tdleftcontent">{formatDate(issue.issueReslovedDate)}</td>
                    <td className="tdleftcontent" >{issue.impactCategory}</td>
                    <td className="tdleftcontent">
                      <Link to={"/ui/forms/issues/EditIssues/"+issue.id}>
                        Update Issue
                      </Link></td>                 
                </tr>
            );
        });
    };

      useEffect(() => {
        getIssuesData();
      }, [serviceline]);

      const getIssuesData = () => {
        if (serviceline && serviceline != "") {
          
          IssueService.getIssuesData(serviceline).then(
            (response) => {
              //console.log(response[0].eta);
              setIssuesData(response);
              
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
      };

    return (
        <div>
           <table >
            <tbody>
              <tr>
                <td className="tddropdownlabel">
                  <Label>
                  Service Line    
                    : &nbsp;
                  </Label>
                </td>
              
              <td className="tdheaderelements">
                  <FormGroup>
                    <Select
                      onChange={onChangeServiceList}
                      options={serviceLineList}
                    ></Select>
                  </FormGroup>
              </td>
              </tr>
                <tr width="auto">
                <td colSpan="4">
                  <table>
                  <tbody>
                    <tr>
                        <th key="1">S. No</th>
                        <th key="2" className="tdleftcontent">
                            Service Line
                        </th>
                        <th key="3" className="tdleftcontent">
                            LOB NAME
                        </th>
                        <th key="4" className="tdleftcontent">
                            Project Id
                        </th>
                        <th key="5" className="tdleftcontent" >
                            Project Name
                        </th>
                        <th key="6" className="tdleftcontent">
                            Subject
                        </th>
                        <th key="7" className="tdleftcontent">
                            Text Area
                        </th>

                        <th key="8" className="tdleftcontent">
                            Owner of the issue
                        </th>
                        <th key="9" className="tdleftcontent">
                            ETA
                        </th>
                        <th key="10" className="tdleftcontent">
                            Action To Be Taken
                        </th>
                        <th key="11" className="tdleftcontent">
                            Remarks
                        </th>
                        <th key="12" className="tdleftcontent">
                            Issue Status
                        </th>
                        <th key="13" className="tdleftcontent">
                            Issue Raised Date
                        </th>
                        <th key="14" className="tdleftcontent">
                            Issue Resloved Date
                        </th>
                        <th key="15" className="tdleftcontent">
                            Imapct Category
                        </th>
                        <th key="16" className="tdleftcontent">
                            Edit
                        </th>

                    </tr>
                    {renderTableData()}
                </tbody>  
                  </table>
                </td>
              </tr>
            </tbody>
           </table>
        </div>
    ); 
};
export default ViewIssues;