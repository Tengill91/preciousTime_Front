import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
const Home = () => {
  const [sidebarShow, setSideBarShow] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="homePage">
      <div className="loginText">
        <h1>{"Welcome"}</h1>
        {currentUser ? (
          <Link to={"/login"} onClick={logOut}>
            <h1>{"Logout"}</h1>
          </Link>
        ) : (
          <Link to={"/login"}>
            <h1>{"Login"}</h1>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Home;
