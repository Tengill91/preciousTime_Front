import React, { useEffect, useState } from "react";
//import EventBus from "../security/common/EventBus";
import AuthService from "../services/auth.service";
import CrudService from "../services/CrudService";

const CreateQuestionForm = () => {
  const currentUser = AuthService.getCurrentUser();
  const [label, setLabel] = useState("");
  const [question, setQuestion] = useState("");
  const [allQuestionsList, setAllQuestionsList] = useState([]);
  const [challengedFriend, setChallengedFriend] = useState("");

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

  const saveQuestionToApi = () => {
    console.log("hello from saveQuestionToApi");
    CrudService.saveQuestion(question, label)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The user was saved successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="boardcontainer">
      <form id="form-user">
        <div className="form-box">
          <label>Select label</label>
          <select
            id="input-friends"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option>-Questions-</option>
            {allQuestionsList.map((questionApi) => (
              <option key={questionApi.id} value={questionApi.id}>
                {questionApi.id + ". " + questionApi.question}
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
          <button>Cancel</button>
          <button onClick={saveQuestionToApi}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
