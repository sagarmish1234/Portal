import axios from "axios";
import { API_URL } from "../common/constants";
import {apiAddIssue,apiGetIssuesData,apiGetProjectIdList,apiGetProjectName,apiGetIssues,apiUpdateIssue} from "../utils/AppUtils";

const addIssue=(obj)=>{
    
    return apiAddIssue(obj);
} ;
const getIssuesData=(serviceline)=>
{
    
    return apiGetIssuesData(serviceline);

}
const getProjectIdList=(serviceline,lobname)=>{
    return apiGetProjectIdList(serviceline,lobname);
}
const getProjectName=(serviceline,lobname,projectId)=>{
    return apiGetProjectName(serviceline,lobname,projectId);
}
const getIssues=(id)=>{
    //console.log(id);
    return apiGetIssues(id);
}
const updateIssue=(updatedIssue)=>
{
       return apiUpdateIssue(updatedIssue);
}
const IssueService = {
    addIssue,
    getIssuesData,
    getProjectIdList,
    getProjectName,
    getIssues,
    updateIssue,
  };
  export default IssueService;