import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
import "../../css/resignation.css";
import DataService from "../../services/data.service";
import { apiGetAllResignationEmployee, apiResignationGroupValueDropDown } from '../../utils/AppUtils';
import Select from "react-select";
import moment from 'moment';
import { RES_URL } from "../../common/constants";
import { useNavigate } from "react-router-dom";

const ResignationData = () => {

  const navigate = useNavigate();
  const [excelData, setExcelData] = useState(null);
  const [resingationCategoryData, setResingationCategoryData] = useState([]);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const [resignationCategories, setResignationCategories] = useState([]);
  const [message, setMessage] = useState("");
  const data=new Map();


  
  useEffect(() => {
    apiResignationGroupValueDropDown().then((categories) => {
      setResingationCategoryData(categories.data);
    }).catch((err) => {
      //alert("Something went wrong :- ", err);
    })
    getAllData();
  }, [])

  function getAllData() {
    apiGetAllResignationEmployee().then((data) => {
      setExcelData(data);
    }).catch((err) => {
      alert("Something went wrong :- ", err);
    });
  }

  const changedData = new Map();
  const handleSubmit = (event) => {
    const vDataList = [];
    data.forEach((value, key, data) => {
      vDataList.push({ key, value });
    });

    // alert("Changes Saved..")
    DataService.saveResignationUpdateDataAll(vDataList).then(
      (response) => {
        console.log("Changes saved");
        window.location.reload(false);
      },
      (error) => {
        console.log("Changes failed");
      }
    );
  };

  useEffect(() => {
    DataService.getAllResignationCategories().then(
      (response) => {
        const resignationCategory = [];
        response.forEach((resignationcategory, index) => {
          resignationCategory.push({
            value: resignationcategory.id,
            label: resignationcategory.rescatName,
          });
        });
        setResignationCategories(resignationCategory);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );
  }, []);


  const onResCatChange = (event,associateId) => {
    console.log("AssociateID: "+associateId+" Value :"+event.label);
    data.set(associateId,event.value);
    
    console.log(data);
  }

  return (

    <div className="container">
      <br></br>

      <label className="formheading col-3">Resignation Employees Details</label>
      <label className='col-8'></label>
      <label className='col-1'>
          <button className='formheading save col-10' 
                  onClick={(event) => handleSubmit(event)} 
                  style={{ color: "black", background: "#1aa3ff" }}>Save All</button>
      </label>

      <center><h3></h3></center>

      <div className='viewer'>
        {excelData === null && <>No file selected
          <div className='table-responsive'>
            <table className="table gdvheader" width="100%">
              <thead>
                <tr width="100%">
                  <th scope='col'>EmpId</th>
                  <th scope='col'>Employee Name</th>
                  <th scope='col'>Resigned On</th>
                  <th scope='col'>Last Working Date</th>
                  <th scope='col'>Resignation Reason</th>
                  <th scope='col'>Category</th>
                </tr>
              </thead>
            </table>
          </div>
        </>}

        {excelData !== null && (
          <div className='container'>
            <table className="table gdvheader" width="100%" >
              <thead>
                <tr width="100%" >
                  <th scope='col'>EmpId</th>
                  <th scope='col'>Employee Name</th>
                  <th scope='col'>Resigned On</th>
                  <th scope='col'>Last Working Date</th>
                  <th scope='col'>Resignation Reason</th>
                  <th scope='col'>Category</th>
                </tr>
              </thead>
              <tbody className='tdcontent'>
                {excelData.map((individualExcelData) => (

                  <tr key={individualExcelData.EmpId}>
                    <td>{individualExcelData.empID}</td>
                    <td>{individualExcelData.employeeName}</td>
                    <td style={{ width: "13%", textAlign: 'center' }}>{moment(individualExcelData.resignedOn).format('DD-MM-YYYY')}</td>
                    <td style={{ width: "13%", textAlign: 'center' }}>{moment(individualExcelData.lastWorkingDate).format('DD-MM-YYYY')}</td>
                    <td>{individualExcelData.resignationReason}</td>


                    <td >
                      <Select 
                        defaultValue={resignationCategories[individualExcelData.resignationStatus-1]}
                        key={resignationCategories[individualExcelData.resignationStatus-1]}
                        options={resignationCategories} 
                        onChange={ (event) => onResCatChange(event, individualExcelData.empID)}
                        >
                      </Select>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );

}

export default ResignationData;



//const [selectItems, setSelectItems] = useState(new Map());

//const [selectedItems, setSelectedItems] = useState();
// function updateAllData(props){
//   const items= props.items;
//   individualExcelData.resignation_status=items.map(individualExcelData.EmpId);
//   updateAllData1(individualExcelData);
// }
// const updateAllData1=(items)=>{
//   let UpdateListObj=[];
//     apiPostUpdateAllResignationEmployeeStatus(items).then((element)=>{
//       alert("all data updated");
//     })
//     alert("Updated");
//     console.log("Saving All Data");
// }

{/* {arr.map((data,i)=>{                          
})} */}
{/* <select class="form-select form-select-sm" aria-label=".form-select-sm example"  style={{font:"Verdana",fontSize:"11px"}} value={selectedItem} onChange={(e)=>setSelectedItem(e.target.value)}  >
                 
<option style={{font:"Verdana",fontSize:"11px"}} value="">Select..</option>
{
  resingationCategoryData.map((item) => (
  <option style={{font:"Verdana",fontSize:"11px"}}   key={item} value={item} >{item}</option>
 ))
}
</select> */}
{/* <Data excelData={excelData} categories={resingationCategoryData} updateResignationEmployeeStatus={updateResignationEmployeeStatus}/>                 */ }


//const individualExcelData=[];
// const [selectedItem,setSelectedItem] = useState(individualExcelData.resignation_status);

//     function updateData(item){
//         individualExcelData.resignation_status = item;
//         updateResignationEmployeeStatus(individualExcelData);
//     }
// const updateResignationEmployeeStatus = (item) => {
//   apiPostUpdateResignationEmployeeStatus(item).then((element)=>{
//     alert(`${element.employee_Name} resignation status is updated`);
//     getAllData();
//   });
// }

