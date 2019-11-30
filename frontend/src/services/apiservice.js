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

const DELETEHEADERS = {
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
        return axios.get(URL + '/fandomUsers/findUserInFandom', {
                params: query,
                headers: GETHEADERS
            }
        );
    }

    joinFandom(query) {
        return axios.post(URL + '/fandomUsers/joinFandom',
            query,
            {
                headers: POSTHEADERS
            }
        );
    }

    quitFandom(query) {
        return axios.post(URL + '/fandomUsers/quitFandom',
            query,
            {
                headers: POSTHEADERS
            }
        );
    }

    createFandom(query) {
        return axios.post(URL + '/fandomUsers/createFandom',
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
        return axios.get(URL + '/posts/findByPostId',
        {
            params: query,
            headers: GETHEADERS
        }
     );
     }

     getComments(query){
        return axios.get(URL + '/comments/findByPostId',
        {
            params: query,
            headers: GETHEADERS
        }
     ); 
    }

    createComment(query){
        return axios.post(URL + '/comments/createComment',
        query,
        {
            headers: POSTHEADERS
        }
     );
    }

    getAllPostByFandom(query){
        return axios.get(URL + '/posts/findByFandomId',
            {
                params: query,
                headers: GETHEADERS
            });
    }

    getAllEventsByFandom(query){
        return axios.get(URL + '/events/findByFandomId',
            {
                params: query,
                headers: GETHEADERS
            });
    }

    createEvent(query){
        return axios.post(URL + '/events/createEvent',
        query,
            {
                headers: POSTHEADERS
            });
    }

    getEvent(query){
        return axios.get(URL + '/events/findByEventId',
            {
                params: query,
                headers: GETHEADERS
            });
    }

    joinEvent(query){
        return axios.post(URL + '/events/joinEvent',
            query,
            {
                headers: POSTHEADERS
            });
    }

    uploadImage(query){
        return axios.post(URL + '/users/uploadFile',
            query,
            {
                headers: POSTHEADERS
            });
    }

    getImage(query){
        return axios.get(URL + '/users/downloadFile',
            {
                params: query,
                headers: GETHEADERS
            });
    }

    addlike(query){
        return axios.post(URL + '/posts/userLike',
            query,
            {
                headers: POSTHEADERS
            });

    }

    dislike(query){
        return axios.post(URL + '/posts/userUnlike',
            query,
            {
                headers: POSTHEADERS
            });

    }

    isliked(query){
        return axios.get(URL + '/posts/isUserLiked',
            {
                params: query,
                headers: GETHEADERS
            });

    }

    getFandomsUserIn(query) {
        return axios.get(URL + '/fandomUsers/findFandomInUser',
            {
                params: query,
                headers: GETHEADERS
            });
    }

    editPost(query){
        return axios.post(URL + '/posts/edit',
            query,
            {
                headers: POSTHEADERS
            });

    }


    getLevel(query){
        return axios.get(URL + '/fandomUsers/getLevel',
        {
            params: query,
            headers: POSTHEADERS
        });

    }
    // deletePost(query){
    //     return axios.delete(URL + '/posts/delete',

    //         {
    //             params: query,
    //             headers: DELETEHEADERS
    //         });

    // }

}

export default new ApiService();