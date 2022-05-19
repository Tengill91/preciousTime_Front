import React, { useEffect, useState } from "react";
import CrudService from "../services/CrudService";
import "./componentCss/QuestionPage.css";
import { useLocation } from "react-router-dom";

function QuestionPage(props) {
  const [randomQuestion, setRandomQuestion] = useState("");
  const [allQuestionsList, setAllQuestionsList] = useState([]);

  /* const location = useLocation();
  const label = location.state?.label; */

  useEffect(() => {
    CrudService.getAllQuestions().then(
      (response) => {
        setAllQuestionsList(response.data);
      },
      (error) => {
        const _questions =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setAllQuestionsList(_questions);
      }
    );
  }, []);

  // get random questions
  const getRandomQuestion = () => {
    const int = Math.floor(Math.random() * allQuestionsList.length);
    setRandomQuestion(allQuestionsList[int]);
  };

  return (
    <div className="questionpage">
      <div className="mainQuestionDiv">
        <div className="questionListBox">
          {allQuestionsList.map((questionApi) => (
            <li
              className="listItems"
              key={questionApi.id}
              value={questionApi.id}
            >
              {questionApi.question}
            </li>
          ))}
        </div>
        <div className="randomButton">
          <button onClick={getRandomQuestion}> random question</button>
          <p>{randomQuestion.question}</p>
          {console.log("hello " + props.location.state)}
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
