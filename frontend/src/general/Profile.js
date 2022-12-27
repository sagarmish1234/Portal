import React from "react";
import AuthService from "../services/auth.service";
import { CURRENT_USER } from "../common/constants";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  //const currentUser = localStorage.getItem(CURRENT_USER);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser}</strong>
        </h3>
      </header>
      <p></p>
    </div>
  );
};

export default Profile;
