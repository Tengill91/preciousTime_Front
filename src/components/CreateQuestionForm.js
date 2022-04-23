import React, { useEffect, useState } from "react";
//import EventBus from "../security/common/EventBus";
import AuthService from "../services/auth.service";
import CrudService from "../services/CrudService";

const CreateQuestionForm = () => {
  const currentUser = AuthService.getCurrentUser();

  const [label, setLabel] = useState("");
  const [question, setQuestion] = useState("");
  const [challengedFriend, setChallengedFriend] = useState("");
  const [friends, setFriends] = useState([]);

  /*useEffect(() => {
        console.warn("ID: ", currentUser.id);

        TutorialDataService.showFriends(currentUser.id).then(
            (response) => {
                setFriends(response.data);
                console.warn("user friendlist ", friends);
            },
            (error) => {
                const _users =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setFriends(_users);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);
    */

  /* function saveChallenge() {
    let challengedFriendObj = friends.find(
      (u) => u.username === challengedFriend
    );
    */

  /*TutorialDataService.saveChallenge(challenge, challengedFriendObj.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  */

  return (
    <div className="boardcontainer">
      <form id="form-user">
        <div className="form-box">
          <label>label</label>
          <input
            type={"Text"}
            id="input-first"
            value={label}
            autoFocus
            placeholder="Label"
            tabIndex="1"
            onChange={(e) => setLabel(e.target.value)}
          />
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
        <div className="form-box">
          <label>Challenge friends</label>
          <select
            id="input-friends"
            value={challengedFriend}
            onChange={(e) => setChallengedFriend(e.target.value)}
          >
            <option>-Friends-</option>

            {friends.map((user) => (
              <option key={user.id} value={user.Id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button>Cancel</button>
          <button type="button" /* onClick={() => saveChallenge()} */>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
