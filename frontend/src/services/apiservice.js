import axios from 'axios';

const URL = 'http://localhost:8080/api';
const GETHEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};
const POSTHEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
const PUTHEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};
class ApiService {

    getFandom(fandom) {
        return axios.get(URL + '/fandoms/findFandomById',
            {
                params: fandom,
                headers: GETHEADERS
            });
    }

    getUser(user) {
        return axios.get(URL + '/users/findUserByEmail',
            {
                params: user,
                headers: GETHEADERS
            });
    }

    setUser(user) {
        return axios.post(URL + '/users/updateUser',
            user,
            {
                headers: POSTHEADERS
            }
        )
    }

    signup(user) {
        return axios.post(URL + '/users/addUser',
            user,
            {
                headers: POSTHEADERS
            }
        )
    }

    login(user) {
        return axios.get(URL + '/users/getUser',
            {
                params: user,
                headers: GETHEADERS
            });
    }

    seachfandom(query) {
        return axios.get(URL + '/fandoms/findSimilarFandomByName', {
                params: query,
                headers: GETHEADERS
            }
        );
    }

    checkIfJoin(query) {
        return axios.get(URL + '/fandoms/findUser', {
                params: query,
                headers: GETHEADERS
            }
        );
    }

    joinFandom(query) {
        return axios.post(URL + '/fandoms/joinFandom',
            query,
            {
                headers: POSTHEADERS
            }
        );
    }

    quitFandom(query) {
        return axios.post(URL + '/fandoms/quitFandom',
            query,
            {
                headers: POSTHEADERS
            }
        );
    }

    createFandom(query) {
        return axios.post(URL + '/fandoms/createFandom',
            query,
            {headers: POSTHEADERS}
        );
    }

     createPost(query){
        return axios.post(URL + '/posts/post',
        query,
        {
            headers: POSTHEADERS
        }
     );
     }

     getPost(query){
        return axios.get(URL + '/posts/findPostByPostId',
        {
            params: query,
            headers: POSTHEADERS
        }
     );
     }

     getCommnets(query){
        return axios.get(URL + '/comment/findcomment',
        {
            params: query,
            headers: POSTHEADERS
        }
     ); 
    }

    createComment(query){
        return axios.post(URL + '/comment/createComment',
        query,
        {
            headers: POSTHEADERS
        }
     );
    }

}

export default new ApiService();