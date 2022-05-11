import React, { useEffect, useState } from "react";
//import EventBus from "../security/common/EventBus";
import "./componentCss/CreateLabelForm.css";
import AuthService from "../services/auth.service";
import CrudService from "../services/CrudService";

const CreateLabelForm = () => {
  const currentUser = AuthService.getCurrentUser();
  const [label, setLabel] = useState("");
  const [allLabelsList, setAllLabelsList] = useState([]);

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

  const saveLabelToApi = () => {
    console.log("hello from saveLabelToApi");
    if (label !== "") {
      CrudService.saveLabel(label)
        .then((response) => {
          console.log(response.data);
          this.setState({
            message: "The label was saved successfully!",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("you need to fill in the form!");
    }
  };

  const deleteLabelFromApi = (id) => {
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
  };

  return (
    <div className="createLabelPage">
      <form id="form-Label">
        <div className="form-box">
          <label id="2">Create label</label>
          <input
            type="text"
            id="input-description"
            value={label}
            autoFocus
            placeholder="Label"
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button className="btnSend" onClick={saveLabelToApi}>
            <p className="btnText">Send</p>
          </button>
          <button className="btnCancel">
            <p className="btnText">Cancel</p>
          </button>
        </div>

        <div>
          <p>--Labels--</p>
          <div className="listBox">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLabelForm;
