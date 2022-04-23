import axios from "axios"
import authHeader from "./auth-header"
const CRUD_API_URL = "http://localhost:8080/crud";
//const CRUD_API_URL = "https://greenleafswe.herokuapp.com/crud";




class CrudService {
    getAll() {
        return axios.get(CRUD_API_URL + "/allUsers",{headers: authHeader(), "Response-type": "application/json" });
    }

    getUser(id) {
        return axios.get(CRUD_API_URL  + `/user/${id}`, {headers: authHeader(), "Response-type": "application/json" });
    }

    create(data) {
        return axios.post("/tutorials", data);
    }


    update(id,data) {
        return  axios.put(CRUD_API_URL  + `/update/${id}`, data, {headers: authHeader(),"Content-type": "application/json","Response-type": "application/json"});
    }

    delete(id) {
        return axios.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return axios.delete(`/tutorials`);
    }

    findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
    }

    addFriend(friendId) {
        return axios.get(CRUD_API_URL  + `/addFriend/${friendId}`,{headers: authHeader(),"Content-type": "application/json","Response-type": "application/json"})
    }


    showFriends(userId){
        return axios.get(CRUD_API_URL + `/listFriends/${userId}`,{headers: authHeader(), "Response-type": "application/json" });
    }

    saveChallenge(challenge,secondUserId) {
        //challenge is a param name for our data        
        return  axios.post(CRUD_API_URL + `/saveChallenge/${secondUserId}`,{challenge} , {headers: authHeader(),"Content-type": "application/json","Response-type": "application/json"});
    }

    showChallenges(userId){
        return axios.get(CRUD_API_URL + `/listChallenges/${userId}`,{headers: authHeader(),"Response-type": "application/json" });
    }



}

export default new CrudService();