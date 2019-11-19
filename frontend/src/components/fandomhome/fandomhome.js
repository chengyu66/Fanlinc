import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Jumbotron, Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import  {Redirect} from 'react-router-dom';

class FandomHome extends Component {
    constructor(){
        super();

        this.state = {
            data: [],
            loading: true,
            isJoin: false,
            fandomId: 0,
            posts: []
        };

        this.joinFandom = this.joinFandom.bind(this);
        this.ifJoin = this.ifJoin.bind(this);
        this.quitFandom = this.quitFandom.bind(this);
        this.goToPostWriting = this.goToPostWriting.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.fandomId = params.fandomId;
        this.getFandom();
        console.log(this.state);
    }

    goToPostWriting() {
        this.props.history.push(this.props.location.pathname + '/post');
    }

    getFandom() {
        let fandom = {id: this.state.fandomId};
        ApiService.getFandom(fandom)
        .then(res => {
               let data = res.data;
               if (data){
                   this.setState({data, loading: false});
                   console.log("Find the fandom");
                   this.ifJoin();
               }
               else{
                   this.props.history.push('/notFind');
               }
           })
           .catch(error => {
               console.log("Fail");
           });
    };

    ifJoin() {
        if(Cookies.get('username')) {
            let query = {userId: Cookies.get('id'), 
                            fandomId: this.state.data.fandomId};

            ApiService.checkIfJoin(query)
            .then(res => {
                if (res.data){
                    this.setState({isJoin: true});
                    console.log("Has Joined the fandom");
                }
            })
            .catch(error => {
                console.log("Fail");
            });
        }
    }

    joinFandom() {
        if (!Cookies.get('username')) {
            alert("Please Log in First");
            this.props.history.push(`/login`);
        } else {
            if(!this.state.isJoin) {
                let query = {email: Cookies.get('email'), 
                             fandomName: this.state.data.fandomName};
                //console.log(query);
                ApiService.joinFandom(query)
                .then(res => {
                    if (res.status == 200){
                        this.setState({isJoin: true});
                    }
                })
                .catch(error => {
                    console.log("Fail to join");
                });
            }
        }
    }

    quitFandom() {
        if (this.state.isJoin) {
            let query = {email: Cookies.get('email'), 
                             fandomName: this.state.data.fandomName};
            ApiService.quitFandom(query)
            .then(res => {
                if (res.status == 200){
                    this.setState({isJoin: false});
                }
            })
            .catch(error => {
                console.log("Fail to quit");
            });
        }
    }

    displayPosts(){
        let query = {id: this.state.fandomId};
        ApiService.getAllPostByFandom(query)
            .then(res => {
                let data = res.data;
                if(data){
                    this.state.setState({posts: data});
                }
            })
            .catch(error => {
                console.log("Fail to get Posts");
            });
    }

    render() {

        if(this.state.loading) {
            return 'Loading...'
        } 

        if(this.state.isJoin) {
            return (
                <div>
                    <Jumbotron fluid>
                        <h1>Welcome to {this.state.data.fandomName}</h1>
                        <p>Fandom ID: {this.state.data.fandomId}</p>
                        {/* <p>Owner: {this.state.data.user[0].firstName} {this.state.data.user[0].lastName}</p> */}
                        <p><Button  variant="primary" onClick={this.goToPostWriting}>Write A Post!</Button></p>
                        <p><Button  variant="primary" onClick={this.quitFandom}>Leave</Button></p>
                    </Jumbotron>

                    <table>
                        {this.state.posts.map(item => (
                            <tr>
                                <td>{item.postId}</td>
                                <td>: </td>
                                <td>{item.postTitle}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <Jumbotron fluid>
                        <h1>Welcome to {this.state.data.fandomName}</h1>
                        <p>Fandom ID: {this.state.data.fandomId}</p>
                        {/* <p>Owner: {this.state.data.user[0].firstName} {this.state.data.user[0].lastName}</p> */}

                        <p><Button  variant="primary" onClick={this.joinFandom}>Join Now</Button></p>
                    </Jumbotron>
                </div>
            )
        }            
    }
    
}


export default FandomHome;