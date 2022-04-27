import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import AuthService from "../services/auth.service";

import "./componentCss/Navbar.css";

function Navbar() {
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

  const showSidebar = () => setSideBarShow(!sidebarShow);

  return (
    <>
      {/*IconContext = styleing för alla iconer*/}
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <div className="navbarText">
            <p>preciousTime</p>
          </div>
          <div className="navbarText">
            <p>Hello there</p>
          </div>
        </div>
        <nav className={sidebarShow ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <div className="menu-bars">
                <AiIcons.AiOutlineClose />
              </div>
            </li>
            <div className="navbar-nav mr-auto">
              <li className="nav-text">
                <Link to={"/home"} className="nav-link">
                  <AiIcons.AiFillHome />
                  <span>Home</span>
                </Link>
              </li>
              {showModeratorBoard && (
                <li className="nav-text">
                  <Link to={"/mod"} className="nav-link">
                    <AiIcons.AiFillHome />
                    <span>Moderator Board</span>
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-text">
                  <Link to={"/admin"} className="nav-link">
                    <AiIcons.AiFillHome />
                    <span>Admin Board</span>
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-text">
                  <Link to={"/user"} className="nav-link">
                    <AiIcons.AiFillHome />
                    <span>User</span>
                  </Link>
                </li>
              )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-text">
                  <Link to={"/profile"} className="nav-link">
                    <AiIcons.AiFillHome />
                    <span>{currentUser.username}</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    <AiIcons.AiFillHome />
                    <span>LogOut</span>
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-text">
                  <Link to={"/login"} className="nav-link">
                    <AiIcons.AiFillHome />
                    <span>Login</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
