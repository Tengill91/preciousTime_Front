import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="homePage">
      <div className="loginText">
        <Link to={"/login"} className="navLink">
          <h1 className="loginLink">{"Welcome"}</h1>
        </Link>
        <Link to={"/login"} className="navLink">
          <h1 className="loginLink">{"Login"}</h1>
        </Link>
      </div>
    </div>
  );
};
export default Home;
