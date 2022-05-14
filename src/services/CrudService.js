import axios from "axios";
import authHeader from "./auth-header";
const CRUD_API_URL = "http://localhost:8080/api/crud";

class CrudService {
  getAllUsers() {
    return axios.get(CRUD_API_URL + "/allUsers", {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }

  getAllQuestions() {
    return axios.get(CRUD_API_URL + "/allQuestions", {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }

  getAllLabels() {
    return axios.get(CRUD_API_URL + "/allLabels", {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }
  getAllAnswers() {
    return axios.get(CRUD_API_URL + "/allAnswers", {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }

  getUser(id) {
    return axios.get(CRUD_API_URL + `/user/${id}`, {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }

  create(data) {
    return axios.post("/tutorials", data);
  }

  update(id, data) {
    return axios.put(CRUD_API_URL + `/update/${id}`, data, {
      headers: authHeader(),
      "Content-type": "application/json",
      "Response-type": "application/json",
    });
  }

  deleteQuestion(id) {
    return axios.delete(CRUD_API_URL + `/deleteQuestion/${id}`);
  }
  deleteLabel(id) {
    return axios.delete(CRUD_API_URL + `/deleteLabel/${id}`);
  }

  deleteAll() {
    return axios.delete(`/tutorials`);
  }

  findByTitle(title) {
    return axios.get(`/tutorials?title=${title}`);
  }

  addFriend(friendId) {
    return axios.get(CRUD_API_URL + `/addFriend/${friendId}`, {
      headers: authHeader(),
      "Content-type": "application/json",
      "Response-type": "application/json",
    });
  }

  showFriends(userId) {
    return axios.get(CRUD_API_URL + `/listFriends/${userId}`, {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }

  saveQuestion(question, label) {
    //challenge is a param name for our data
    return axios.post(
      CRUD_API_URL + `/addQuestion`,
      { question, label },
      {
        headers: authHeader(),
        "Content-type": "application/json",
        "Response-type": "application/json",
      }
    );
  }

  saveLabel(label) {
    //challenge is a param name for our data
    return axios.post(
      CRUD_API_URL + `/addLabel`,
      { label },
      {
        headers: authHeader(),
        "Content-type": "application/json",
        "Response-type": "application/json",
      }
    );
  }

  saveAnswer(comment, created_date, label, question_id, time, user_id) {
    console.log(user_id);
    return axios.post(
      CRUD_API_URL + `/addAnswer`,
      { comment, created_date, label, question_id, time, user_id },
      {
        headers: authHeader(),
        "Content-type": "application/json",
        "Response-type": "application/json",
      }
    );
  }

  showChallenges(userId) {
    return axios.get(CRUD_API_URL + `/listChallenges/${userId}`, {
      headers: authHeader(),
      "Response-type": "application/json",
    });
  }
}

export default new CrudService();
