import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Jumbotron, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';

class FandomHome extends Component {
    constructor(){
        super();

        this.state = {
            data: [],
            loading: true,
            isJoin: false,
            fandomId: 0,
            posts: [],
            events: []
        };

        this.joinFandom = this.joinFandom.bind(this);
        this.ifJoin = this.ifJoin.bind(this);
        this.quitFandom = this.quitFandom.bind(this);
        this.goToPostWriting = this.goToPostWriting.bind(this);
        this.displayPosts = this.displayPosts.bind(this);
        this.displayEvents = this.displayEvents.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.fandomId = params.fandomId;
        this.getFandom();
        this.displayPosts();
        this.displayEvents();
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
                    this.setState({posts: data});
                    console.log(this.state);
                }
            })
            .catch(error => {
                console.log("Fail to get Posts");
            });
    }

    displayEvents(){
        let query = {id: this.state.fandomId};
        ApiService.getAllEventsByFandom(query)
            .then(res => {
                let data = res.data;
                if(data){
                    this.setState({ events: data});
                    console.log("Searching for Events");
                    console.log(this.state);
                }
            })
            .catch(error => {
                console.log("Fail to get Events");
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

                    <div>
                        <h2>Posts</h2>
                        <Table>
                            <tr>
                                <th>Title</th>
                                <th>Author Email</th>
                                <th>Time</th>
                            </tr>
                            {this.state.posts.map(item => (
                                <tr>
                                    <td><a href={this.props.location.pathname + "/post/" + item.postId} >{item.postTitle}</a></td>
                                    <td>{item.email}</td>
                                    <td>{item.time}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>

                    <div>
                        <h2>Events</h2>
                        <Table>
                            <tr>
                                <th>Title</th>
                                <th>description</th>
                                <th>Time</th>
                                <th>Register Deadline</th>
                            </tr>
                            {this.state.events.map(item => (
                                <tr>
                                    <td><a href={this.props.location.pathname + "/event/" + item.eventId} >{item.eventName}</a></td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>
                                    <td>{item.deadline}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>


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

                    <div>
                        <h2>Posts</h2>
                        <Table>
                            <tr>
                                <th>Title</th>
                                <th>Author Email</th>
                                <th>Time</th>
                            </tr>
                            {this.state.posts.map(item => (
                                <tr>
                                    <td><a href={this.props.location.pathname + "/post/" + item.postId} >{item.postTitle}</a></td>
                                    <td>{item.email}</td>
                                    <td>{item.time}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>

                    <div >
                        <h2>Events</h2>
                        <Table>
                            <tr>
                                <th>Title</th>
                                <th>description</th>
                                <th>Time</th>
                                <th>Register Deadline</th>
                            </tr>
                            {this.state.events.map(item => (
                                <tr>
                                    <td><a href={this.props.location.pathname + "/event/" + item.eventId} >{item.eventName}</a></td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>
                                    <td>{item.deadline}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                </div>
            )
        }            
    }
    
}


export default FandomHome;