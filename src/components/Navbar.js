import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebarShow, setSideBarShow] = useState(false);

  const showSidebar = () => setSideBarShow(!sidebarShow);

  return (
    <>
      {/*IconContext = styleing för alla iconer*/}
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to={"/#"} className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebarShow ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to={"/#"} className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    {/* kolla upp span? */}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
