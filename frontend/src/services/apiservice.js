import axios from 'axios';

const URL = 'http://localhost:8080/api';
const GETHEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'};
const POSTHEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'};

class ApiService {

    getUser(){
        return axios.get(URL + '/editUser')
    }

    setUser(user){
        return axios.post(URL + '/editUser', user)
    }

    signup(user) {
        return axios.post(URL+'/users/addUser',
            user,
            {
                headers: POSTHEADERS
            }
        )
    }

    login(user){
        return axios.get(URL + '/users/getUser',
            { params: user,
                     headers: GETHEADERS
            }  );
     }

 }

export default new ApiService();