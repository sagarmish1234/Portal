import { Navigate } from "react-router-dom";

function PublicRoute({ user, children }) {
  let userid = localStorage.getItem("currentUser") == null ? false : true;
  console.log("Logged In? = " + userid);
  return <>{userid ? <Navigate to="/ui/home" /> : children}</>;
}

export default PublicRoute;
