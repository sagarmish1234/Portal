import React from "react";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../common/constants";

import "./AssociateSkills.css";
function AssociateSkills() {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:2510/api/findAll`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("hello");
  console.log(data);
  console.log(data["skillName"])
  return (
    <div>
      <tbody>
        <tr >
          <th className="id">Associate ID</th>
          <th className="name">Associate Name</th>
          <th className="date">Cognizant Experience</th>
          <th className="date">Total Experience</th>
          <th className="skill">Skills</th>
          <th className="certificate">Certificates</th>
        </tr>
        
        {data.map((item) => (
          <tr>
            <td className="id">{item.associateId}</td>
            <td className="name">{item.associateName}</td>
            <td className="date">{item.cognizantExperience}</td>
            <td className="date">{item.totalExperience}</td>

            
             <td className="skill"> {item.associateSkill.map(skill=>(
                <span>{skill.skillName}  ({skill.skillProficiency}) , </span>
              ))}</td>
            
            <td className="certificate">
            {item.associateCertificate.map(certificate=>(
                <span>{certificate.certificateName} , </span>
              ))}
            </td>
            
          </tr>
          
        ))}
      </tbody>
    </div>
  );
}
export default AssociateSkills;
