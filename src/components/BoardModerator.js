import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import CreateQuestionForm from "./CreateQuestionForm";
const BoardModerator = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getModeratorBoard.then(
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
        <CreateQuestionForm />
      </header>
    </div>
  );
};
export default BoardModerator;
