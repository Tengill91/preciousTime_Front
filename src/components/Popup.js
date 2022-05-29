import React, { useEffect, useState } from "react";
import "./componentCss/Popup.css";
import CrudService from "../services/CrudService";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

function Popup(props) {
  const [comment, setComment] = useState("");
  const [created_date, setCreated_Date] = useState("");
  const [label, setLabel] = useState("");
  const [question_id, setQuestion_id] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [user_id, setUserId] = useState(0);

  const currentUser = AuthService.getCurrentUser();

  /* useEffect(() => {
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
  }, []); */

  useEffect(() => {
    setUserId(currentUser.id);
    setLabel(props.clickedLabel);
  }, [props, currentUser]);

  const saveAnswerToApi = () => {
    if (user_id > 0) {
      CrudService.saveAnswer(
        comment,
        created_date,
        label,
        question_id,
        timeSpent,
        user_id
      )
        .then((response) => {
          console.log(response.data);
          this.setState({
            message: "The Answer was saved successfully!",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Cant find user ");
    }
  };

  /* const deleteLabelFromApi = (id) => {
    console.log("hello from deleteLabelFromApi");
    CrudService.deleteLabel(id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The label was deleted successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }; */

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            close
          </button>
        </div>
        <div>
          <p>How mutch time have you spent on {props.clickedLabel} today?</p>
        </div>
        <div>
          <form id="form-Label">
            <div className="form-box">
              <input
                type="text"
                id="input-description"
                value={timeSpent}
                autoFocus
                placeholder="Label"
                onChange={(e) => setTimeSpent(e.target.value)}
              />
            </div>

            <div className="buttons">
              <button className="btnSend" onClick={saveAnswerToApi}>
                <p className="btnText">Send</p>
              </button>
              <button className="btnCancel">
                <p className="btnText">Cancel</p>
              </button>
            </div>

            <div>
              <p>Whant insperation?</p>
              <Link to="/questionpage" state={{ label: props.clickedLabel }}>
                Click me
              </Link>
              {/* <div className="listBox">
            {allLabelsList.map((labelApi) => (
              <li className="listItems" key={labelApi.id} value={labelApi.id}>
                {labelApi.id + ". " + labelApi.label}
                <button
                  className="btnDelete"
                  onClick={() => deleteLabelFromApi(labelApi.id)}
                >
                  <p className="btnText">Delete</p>
                </button>
              </li>
            ))}
          </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
