const getRole = () => {
    var role = "associate";
  if (localStorage.getItem("roles").indexOf("PDL") != -1) {
    role = "PDL";
  } else if (localStorage.getItem("roles").indexOf("EDL")) {
    role = "EDL";
  } else if (localStorage.getItem("roles").indexOf("LOBLead") != -1) {
    role = "LOBLead";
  } else if (localStorage.getItem("roles").indexOf("AccountLead") != -1) {
    role = "AccountLead";
  } else if (localStorage.getItem("roles").indexOf("ProjectManager") != -1) {
    role = "ProjectManager";
  }
  return role
}
export {getRole};