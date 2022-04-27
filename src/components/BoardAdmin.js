import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import CreateQuestionForm from "./CreateQuestionForm";
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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div>
        <h1>hello</h1>
        <CreateQuestionForm />
      </div>
    </div>
  );
};

export default BoardAdmin;
