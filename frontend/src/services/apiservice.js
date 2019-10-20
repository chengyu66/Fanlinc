import axios from 'axios';

const URL = 'http://localhost:8080';

class ApiService {

    getUser(){
        return axios.get(URL + '/editUser')
    }

    setUser(user){
        return axios.post(URL + '/editUser', user)
    }

}

export default new ApiService();