import React, { useEffect, useState } from "react";
import CrudService from "../services/CrudService";
import "./componentCss/QuestionPage.css";
import { useLocation } from "react-router-dom";

function QuestionPage(props) {
  const [allQuestionsList, setAllQuestionsList] = useState([]);
  const [sortedQuestionsList, setSortedQuestionsList] = useState();

  // getting state data from Link in Popup
  const location = useLocation();
  const { label } = location.state;

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

  useEffect(() => {
    //console.log(allQuestionsList)
    let sortedList = [];
    try {
      if (allQuestionsList.length > 1)
        allQuestionsList.forEach((element) => {
          if (element.label === label) {
            sortedList.push(element);
          }
        });
      if (sortedList.length > 1) {
        console.log("hello");
        setSortedQuestionsList(sortedList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [label, allQuestionsList]);

  return (
    <div className="questionpage">
      <div className="mainQuestionDiv">
        <div className="questionListBox">
          {sortedQuestionsList?.map((questionApi) => (
            <li
              className="listItems"
              key={questionApi.id}
              value={questionApi.id}
            >
              {questionApi.question}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
