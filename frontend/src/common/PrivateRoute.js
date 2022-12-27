import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function PrivateRoute({ user, role, children }) {
  let currentRoles = AuthService.getCurrentUserRoles();
  let userid = localStorage.getItem("currentUser") == null ? false : true;

  const renderElement = (vUserId, vRole, vChildren) => {
    if (vUserId) {
      if (vRole && !(currentRoles.indexOf(vRole) > -1)) {
        console.log("going home");
        return <Navigate to="/ui/home" />;
      } else {
        // console.log("going child");
        return vChildren;
      }
    } else {
      console.log("going login");
      return <Navigate to="/ui/login" />;
    }
  };

  return <>{renderElement(userid, role, children)}</>;
}

export default PrivateRoute;
