import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Jumbotron, Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import  {Redirect} from 'react-router-dom';

class PostHome extends Component {
    constructor(){
        super();
        this.state = {
            eventName:"",
            description:"",
            owner:"",
            date:"",
            deadline:"",
            email:"",
            loading: true
            
        };
        this.getEvent = this.getEvent.bind(this);
        this.join = this.join.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.eventId = params.eventId;
        this.state.email = Cookies.get('email');
        this.getEvent();
        console.log("States");
        console.log(this.state);
    }

    getEvent() {
        let eventId = {id: this.state.eventId};
        ApiService.getEvent(eventId)
        .then(res => {
               let data = res.data;
               if (data){
                //    this.state.loading = false;
                    this.setState({loading:false, 
                        eventName:data.eventName,
                        description:data.description,
                        owner:data.ownerEmail,
                        date:data.date,
                        deadline:data.deadline
                    })
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

    join = (e) => {
        e.preventDefault();
        let user = {
            content: this.state.comment,
            email: this.state.email,
            postid: this.state.postId
        };
        if (this.state.email){
            console.log(user);
            ApiService.createComment(user)
            .then(res => {
                console.log("Success");
                alert("You have Succesfully Join the event");
                window.location.reload();

            })
            .catch(error => {
                console.log("Fail");
                alert("You Cannot join the event");
            });
        }
        else{
            alert("Please Log in First");
            this.props.history.push('/login');
        }
        
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {

        if(this.state.loading) {
            return 'Loading...'
        } 

        return(
            <div className="form-group">
                <div className="form-group">
                    {this.state.eventName}
                </div>
                <div className="form-group">
                    {this.state.date}
                </div>
                <div className="form-group">
                    {this.state.description}
                </div>
                <div className="form-group">
                        <div className="button-div">
                            <Button className="Join" onClick={this.join}>Join</Button>
                        </div>      
                </div>
            </div>
        )          
    }
    
}


export default PostHome;