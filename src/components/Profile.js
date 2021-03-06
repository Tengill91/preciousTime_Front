import React from "react";
import AuthService from "../services/auth.service";
import "./componentCss/Profile.css"
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <button>
        <a href="/home" className="nav-link" onClick={logOut}>
          LogOut
        </a>
      </button>
    </div>
  );
};
export default Profile;
