import react, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx'
import { Redirect } from "react-router-dom";
import { RES_URL } from "../../common/constants";
import moment from 'moment';
import {apiPostResignationEmployeeListData} from '../../utils/AppUtils';

const ResignationUploadSheet = ()  =>{
    const navigate = useNavigate();
  
    const [excelFile, setExcelFile]=useState(null);
    const [excelFileError, setExcelFileError]=useState(null);  
   
    const [excelData, setExcelData]=useState(null);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
  
    const handleFile = (e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fileType.includes(selectedFile.type)){
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload=(e)=>{
            setExcelFileError(null);
            setExcelFile(e.target.result);
          } 
        }
        else{
          setExcelFileError('Please select only excel file types');
          setExcelFile(null);
        }
      }
      else{
        console.log('plz select your file');
      }
    }
  
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(excelFile!==null){
        const workbook = XLSX.read(excelFile,{type:'buffer', cellDates: true, dateNF: 'mm/dd/yyyy;@'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet=workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        let postListObj = [];
        for(let i in data){
          console.log(data[i]);
          let object =  {
            "empID":data[i].EmpId,
            "employeeName": data[i].EmployeeName,
            "lastWorkingDate":moment(data[i].LWD).format('YYYY-MM-DD'),
            "resignationReason": data[i].ResignationReason,
            "resignationStatus":"PENDING",
            "resignedOn":moment(data[i].ResignedOn).format('YYYY-MM-DD')
            };
            console.log(object);
            postListObj.push(object);
        }
        apiPostResignationEmployeeListData(postListObj).then((d) => {         
          navigate(RES_URL + "ResignationData",{state:{query:data}});
        }).catch((err) => {
          alert("Something went wrong :- ",err);
        });
      }
      else{
        console.log("else");
      }
    
    }
   
    return(
      <div className="col-md-12">
        <div className="card card-container">
        <div className='form'>
         <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
           <label><h5>Upload Resignation Sheet files</h5></label>
           <br></br>
           <input type='file' className='form-control'
           onChange={handleFile} required></input>                  
           {excelFileError&&<div className='text-danger'
           style={{marginTop:5+'px'}}>{excelFileError}</div>}
           <br></br>
           <button type='submit' className='btn btn-success'  
           style={{marginTop:5+'px'}}>Submit</button>
         </form>
       </div>
        </div>
      </div>
    
    );
}

export default ResignationUploadSheet;