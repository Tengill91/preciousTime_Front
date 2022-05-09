import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import CreateQuestionForm from "./CreateQuestionForm";
import CreateLabelForm from "./CreateLabelForm";
import "./componentCss/BoardAdmin.css";
const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="adminPage">
      <div className="adminCard">
        <CreateLabelForm />
      </div>
      <div className="adminCard">
        <CreateQuestionForm />
      </div>
    </div>
  );
};

export default BoardAdmin;
