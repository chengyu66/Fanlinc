import axios from 'axios';

const URL = 'http://localhost:8080/api';

class ApiService {

    getUser(){
        return axios.get(URL + '/editUser')
    }

    setUser(user){
        return axios.post(URL + '/editUser', user)
    }

    login(user){
            const response =  axios.get(URL + '/users/getUser', { params: user },  {headers:{'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json'}})
                         .then(res => {
                             console.log("Hello in service");
                             console.log(res.data);
                             return res.data;
                         })
                         .catch(error => {
                            console.log("Error in service");
                            console.log(error.config);
                            console.log(error.response)

                         });

            console.log("Back");
            return response;
     }

 }

export default new ApiService();