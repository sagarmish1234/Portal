import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { passwordValidator, required, vusername, idValidator, emailValidator, confirmPasswordValidator } from '../common/validators';

import UserService from "../services/user.service";


const CheckedExample = (props) => {

    const [list, setList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const checkList = ["Associate", "ProjectManager", "AccountLead", "LOBLead", "EDL", "Admin", "HR", "TAG"];

    useEffect(() => {
        UserService.getAllUser()
            .then(items => {
                // console.log("Items" + JSON.stringify(items));
                setList(items)

            })
    }, [])

    // console.log(list);

    const newObj = Object.assign({}, list);
    // console.log(newObj);
    const objectLength = Object.keys(newObj).length;
  



    var role = [];


    const handleCheck = (event) => {


        var updatedList = [...checked];
        // if (event.target.checked) {
        //     updatedList = [...checked, event.target.value];
        // } else {
        //     updatedList.splice(checked.indexOf(event.target.value), 1);
        // }
        // setChecked(updatedList);
        // console.log(event.target.index);
        let rowId = event.target.id;
        let value = event.target.value;
        console.log(rowId);

        console.log(value);
        // if (newObj[i].associateId === rowId) {
        //     if (event.target.checked) {
        //         updatedList = [...checked, event.target.value];
        //     } else {
        //         updatedList.splice(checked.indexOf(event.target.value), 1);
        //     }
        //     setChecked(updatedList);

        //     // checkedItems.push(checked);
        // }


        // console.log(newObj);

       
        // for (var i = 0; i < objectLength; i++) {


            // console.log(newObj[i].index);
            // for(var j=i;j==i;j++)
         
            // if (newObj[i].associateId == rowId) {
                // console.log(rowId);

                // if (event.target.checked) {
                    // if (newObj[i].associateId == rowId) {
                    var updatedList = [...checked, event.target.value];
                    
                // } else {
                    // updatedList.splice(checked.indexOf(event.target.value), 1);
                // }
                // debugger
                setChecked(updatedList);
                role.push(updatedList);
                console.log(role);

                // newObj[i]["roles"] = updateList;
                // var c = 0
                // for (var j = i; c < role.length; c++) {
                //     newObj[j]["roles"] = role[c];
                // }
                
               
            // }
            



        // }




        // console.log(checked);

        // console.log(arr2);

    };

    // console.log(role);
    // newObj[0]["roles"] = checked;
    // console.log(checked);
    console.log(newObj);



    return (
        <div className="leaveTrackerTableContainer">
            <div class="m-4">
                <button className="btn btn-primary" >
                    Save Changes
                </button>
            </div>
            <table className="leaveTrackerTable">
                <tr>
                    <th className="task">Associate_ID</th>
                    <th className="task">Email_Address</th>
                    <th className="task">Associate_Name</th>
                    <th className="task">Serice_Line</th>
                    <th className="task">Grade</th>
                    <th className="task">Associate</th>
                    <th className="task">ProjectManager</th>
                    <th className="task">AccountLead</th>
                    <th className="task">LOBLead</th>
                    <th className="task">EDL</th>
                    <th className="task">Admin</th>
                    <th className="task">HR</th>
                    <th className="task">TAG</th>
                    <th className="task">Approval</th>
                </tr>
                {
                    list.map((data, index) => {
                        // console.log(data,index);
                        return (
                            <tr key={index} className="leaveTrackerStatusSelection">
                                <td>{data.associateId}</td>
                                <td>{data.email}</td>
                                <td>{data.associateName}</td>
                                <td>{data.serviceLine}</td>
                                <td>{data.grade}</td>
                                {
                                    // checkList.map((item) => (

                                    //     <td key={index}>
                                    //         <input value={item} id={index} type="checkbox" onChange={handleCheck} />
                                    //         {/* <span className={isChecked(item)}>{item}</span> */}
                                    //     </td>
                                    // ))
                                }

                                <td >
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="Associate"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="ProjectManager"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="AccountLead"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="LOBLead"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="EDL"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="Admin"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="HR"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark"
                                            type="checkbox"
                                            name="roles"
                                            value="TAG"
                                            id={index} oonChange={handleCheck} />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input border-dark" type="checkbox" value="" id="defaultCheck1" />
                                        <label className="form-check-label" for="defaultCheck1">
                                            Approved
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }



            </table>

            {/* <button className="leavesTrackerSaveButton" onClick={handleSaveChanges}>
        Save Changes
      </button> */}

            {

                list.map((items, index) => {
                    return (
                        <div key={index}>
                            {`Items checked are: ${checked}`

                            }
                        </div>
                    )
                })
            }

        </div>
    );
};

export default CheckedExample;
