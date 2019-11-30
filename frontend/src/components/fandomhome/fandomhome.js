import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Form, Button, Table, Spinner} from 'react-bootstrap';
import Cookies from 'js-cookie';
import PostCards from './../post/postCards';
import EventCard from "../event/eventCard";
import styles from 'bootstrap/dist/css/bootstrap.css';
import './fandomhome.css';

class FandomHome extends Component {
    constructor(){
        super();

        this.state = {
            data: [],
            loading: true,
            isJoin: false,
            fandomId: 0,
            posts: [],
            level:"Limited",
            events: []
        };

        this.joinFandom = this.joinFandom.bind(this);
        this.ifJoin = this.ifJoin.bind(this);
        this.quitFandom = this.quitFandom.bind(this);
        this.goToPostWriting = this.goToPostWriting.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.displayPosts = this.displayPosts.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.goToCreateEvent = this.goToCreateEvent.bind(this);
        this.onChange = this.onChange.bind(this)
        this.getUserLevel = this.getUserLevel.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.fandomId = params.fandomId;
        this.getFandom();
        this.getPosts();
        this.getEvents();
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
                    this.getUserLevel()
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
                             fandomName: this.state.data.fandomName,
                            level: this.state.level};
                //console.log(query);
                ApiService.joinFandom(query)
                .then(res => {
                    if (res.status === 200){
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
                if (res.status === 200){
                    this.setState({isJoin: false});
                }
            })
            .catch(error => {
                console.log("Fail to quit");
            });
        }
    }

    getPosts(){
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

    displayPosts(){
        let column = 4;
        let cardTable = [];
        let len = this.state.posts.length;
        let row = Math.ceil(len / column);
        console.log("row = " + row);
        for (let i = 0; i < row; i++) {
            let row = [];
            let j = 0;
            console.log("i = " + i);
            while (j < column && j < (len - ( i * column))) {
                console.log("j = " + j);
                row.push(<td><PostCards postId={this.state.posts[(i*4)+j].postId}/></td>);
                j++;
            }
            cardTable.push(<tr>{row}</tr>);
        }
        return cardTable;
    }

    getEvents(){
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

    displayEvents(){
        let column = 4;
        let cardTable = [];
        let len = this.state.events.length;
        let row = Math.ceil(len / column);
        console.log("row = " + row);
        for (let i = 0; i < row; i++) {
            let row = [];
            let j = 0;
            console.log("i = " + i);
            while (j < column && j < (len - ( i * column))) {
                console.log("j = " + j);
                row.push(<td><EventCard eventId={this.state.events[(i*4)+j].eventId}/></td>);
                j++;
            }
            cardTable.push(<tr>{row}</tr>);
        }
        return cardTable;
    }

    goToCreateEvent(){
        this.props.history.push(this.props.location.pathname + '/event');
    }

    onChange = (e) =>
        this.setState({ level: e.target.value });

    getUserLevel(){
        let query = {
            uid: Cookies.get('id'),
            fid: this.state.fandomId};
        ApiService.getLevel(query)
            .then(res => {
                let data = res.data;
                if(data){
                    this.setState({ level: data.level});
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
            return <div className='loading'><Spinner animation='grow' variant="light"/></div>
        } 

        
        if(this.state.isJoin) {
            return (
                <div>
                    <div id='in' className={styles.jumbotronFluid}>
                        <div className={styles.bgTransparent}>
                            <h1>Welcome to {this.state.data.fandomName}</h1>
                            <p>Fandom ID: {this.state.data.fandomId}</p>
                            
                            <p>{"You are an " + this.state.level + " user"}</p>
                            <div className="buttons">
                                <p><Button  variant="primary" onClick={this.goToPostWriting}>Write A Post!</Button></p>
                                <p><Button  variant="primary" onClick={this.goToCreateEvent}>Create an Event</Button></p>
                                <p><Button  variant="primary" onClick={this.quitFandom}>Leave</Button></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Posts</h2>
                        <Table>{this.displayPosts()}</Table>
                    </div>

                    <div>
                        <h2>Events</h2>
                        <Table>{this.displayEvents()}</Table>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div id='not' className={styles.jumbotron}>
                        <div className={styles.bgTransparent + styles.dFlex + styles.alignItemsCenter + styles.justifyContentCenter}>
                            <h1>Welcome to {this.state.data.fandomName}</h1>
                            <p>Fandom ID: {this.state.data.fandomId}</p>
                            <h2>Choose your Fandom level</h2>
                            <div style={{width:"15%", margin:"auto"}}>
                                <Form.Control as='select' onChange={this.onChange}>
                                    <option name="level" value="Limited">Limited</option>
                                    <option name="level" value="Casual">Casual</option>
                                    <option name="level" value="Very Involved">Very Involved</option>
                                    <option name="level" value="Expert">Expert</option>
                                </Form.Control>
                            </div>
                            <p><Button  variant="primary" onClick={this.joinFandom}>Join Now</Button></p>
                        </div>
                    </div>

                    <div>
                        <h2>Posts</h2>
                        <Table>{this.displayPosts()}</Table>
                    </div>

                    <div>
                        <h2>Events</h2>
                        <Table>{this.displayEvents()}</Table>
                    </div>
                </div>
            )
        }            
    }
    
}


export default FandomHome;