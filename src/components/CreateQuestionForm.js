import React, { lazy, useEffect, useState } from "react";
//import EventBus from "../security/common/EventBus";
import "./componentCss/CreateQuestionForm.css";
import AuthService from "../services/auth.service";
import CrudService from "../services/CrudService";

const CreateQuestionForm = () => {
  const currentUser = AuthService.getCurrentUser();
  const [label, setLabel] = useState("");
  const [question, setQuestion] = useState("");
  const [allQuestionsList, setAllQuestionsList] = useState([]);
  const [allLabelsList, setAllLabelsList] = useState([]);
  const [labelId, setLabelId] = useState();

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
    CrudService.getAllLabels().then(
      (response) => {
        setAllLabelsList(response.data);
      },
      (error) => {
        const _questions =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setAllLabelsList(_questions);
      }
    );
  }, []);

  const saveQuestionToApi = () => {
    console.log(labelId);
    if (label !== "" && question !== "") {
      CrudService.saveQuestion(question, label)
        .then((response) => {
          console.log(response.data);
          this.setState({
            message: "The question was saved successfully!",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Did you forget to write a question or add a label?");
    }
  };

  const deleteQuestionFromApi = (id) => {
    console.log("hello from deleteQuestionFromApi");
    CrudService.deleteQuestion(id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The question was deleted successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* useEffect(() => {
  function getLabelIdfromLabelName() {
    allLabelsList?.map((objekt) => {
      if (label === objekt.label) {
        setLabelId(objekt.id);
      }
      return null;
    });
  }
  getLabelIdfromLabelName()
}, [labelId,label]); */

  return (
    <div className="createQuestionPage">
      <form id="form-question">
        <div className="form-box">
          <label>Create question</label>
          <select
            id="input-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option>-Labels-</option>
            {allLabelsList.map((labelApi) => (
              <option key={labelApi.id} value={label.id}>
                {labelApi.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-box">
          <label id="2">Question</label>
          <input
            type="text"
            id="input-description"
            value={question}
            autoFocus
            placeholder="Question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button className="btnSend" onClick={saveQuestionToApi}>
            <p className="btnText">Send</p>
          </button>
          <button className="btnCancel">
            <p className="btnText">Cancel</p>
          </button>
        </div>

        <div>
          <p>--Questions--</p>
        </div>
        <div className="listBox">
          {allQuestionsList.map((questionApi) => (
            <li
              className="listItems"
              key={questionApi.id}
              value={questionApi.id}
            >
              {questionApi.id + ". " + questionApi.question}
              <button
                className="btnDelete"
                onClick={() => deleteQuestionFromApi(questionApi.id)}
              >
                <p className="btnText">Delete</p>
              </button>
            </li>
          ))}
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
