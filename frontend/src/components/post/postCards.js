import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import {Card, Form, FormControl, Button, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './posthome.css';

class PostCards extends Component{

    constructor(){
        super();
        this.state = {
            userId:0,
            content: '',
            email: '',
            fandomId: '',
            title: '',
            like: "",
            postId: "",
            array: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"],
            num: 0,
            loading: true,
            level: '',
            firstName: ''
        };
        this.getPost = this.getPost.bind(this);
        this.loadUser= this.loadUser.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    componentWillMount() {
        this.state.postId = this.props.postId;
        this.getPost();
        // this.loadUser();
        // this.getUserLevel();
        this.state.num = Math.floor(Math.random() * this.state.array.length);
    }

    getPost() {
        let postId = {id: this.state.postId};
        ApiService.getPost(postId)
        .then(res => {
               let data = res.data;
               if (data){
                //    this.state.loading = false;
                    this.setState({
                        loading: false,
                        title:data.title,
                        content:data.content,
                        date:data.time,
                        email:data.email,
                        like: data.likeNum,
                        fandomId: data.fandomId
                    });
                   this.loadUser();
                   // this.getUserLevel();
                   console.log("Find Post");
                   console.log(this.state.loading);
                   console.log("States");
                   console.log(this.state);    
               }
               else{
                this.props.history.push('/notFind');
               }
           })
           .catch(error => {
               console.log("Fail");
           });
    };

    goToFandom = () => {
        this.props.history.push(`/fandom`);
    };

    loadUser() {
        let param = {email:this.state.email};
        ApiService.getUser(param)
            .then((res) => {
                console.log("Good");
                let user = res.data;
                if (user){
                    console.log(user);
                    this.setState({
                        userId: user.id,
                        firstName: user.firstName
                    });
                    console.log("Good end");
                    console.log(this.state);
                    this.getUserLevel();
                }
                else{
                    this.props.history.push('/');
                }
            })
            .catch(err=>{
                console.log("Error");
                console.log(err);
            });
    }

    getUserLevel(){
        let query = {
            uid: this.state.userId,
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
            return (<div className='loading'><Spinner animation='grow' variant="info"/></div>);
        }

        return (
            <div>
                <a href={"/fandom/"+this.state.fandomId+"/post/"+this.state.postId}>
                <Card border={this.state.array[this.state.num]} style={{ width: '18rem' }}>
                <Card.Header>Post</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.title}</Card.Title>
                        <Card.Text>
                            From {this.state.firstName} as {this.state.level}
                        </Card.Text>
                        <Card.Text>
                            {this.state.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
            </div>
        );
    };
}


export default PostCards;