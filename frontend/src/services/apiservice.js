import axios from 'axios';

const URL = 'http://localhost:8080/api';

class ApiService {

    getUser(){
        return axios.get(URL + '/editUser')
    }

    setUser(user){
        return axios.post(URL + '/editUser', user)
    }

    login(){
            return axios.get(URL + '/users/getUser')
     }

}

export default new ApiService();