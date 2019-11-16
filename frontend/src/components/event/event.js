import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';

import {Form , FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Post extends Component{

    
    constructor(){
        super();
        this.state = {
            content: '',
            email: '',
            fandomId: '',
            title: '',
            date:"",
            deadline:"",
            status:false
        };
        this.addEvent = this.addEvent.bind(this);
        this.goToFandom = this.goToFandom.bind();
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    addEvent = (e) => {
        e.preventDefault();
        let user = {
            description: this.state.content,
            fandomId: this.state.fandomId,
            owneremail: this.state.email,
            eventName: this.state.title,
            date: this.state.date,
            deadline: this.state.date
        };
        console.log(user);
        ApiService.createEvent(user)
            .then(res => {
                console.log("Success");
                let data = res.data;
                console.log(data.id);
                this.state.status = true;
                alert("You have succesfully created the event");
                this.props.history.push(`/fandom/`+this.state.fandomId);

            })
            .catch(error => {
                alert("You Cannot the event")
                console.log("Fail");
            });
    };

    componentWillMount() {
        const { match: { params } } = this.props;
        this.email = Cookies.get('email');
        this.state.fandomId = params.fandomId;
    }

    goToFandom = () => {
        this.props.history.push(`/fandom/`+this.state.fandomId);
    };

    render() {
        return (
            <div>
                <h2>Create Event</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Event Name:</label>
                        <Input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date:</label>
                        <Input type="date" placeholder="date" name="date" className="form-control" value={this.state.date} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Deadline:</label>
                        <Input type="date" placeholder="deadline" name="deadline" className="form-control" value={this.state.deadline} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description:</label>
                        <textarea placeholder = "Enter you description here" name="description" className="form-control" value={this.state.description} onChange={this.onChange}></textarea>         
                    </div>
                    <div className="button-div">
                        <Button className="Post" onClick={this.addEvent}>Create Event</Button>
                        <Button className="Cancel" onClick={this.goToFandom}>Cancel</Button>
                    </div>
                </form>
            </div>
        );
    };
}


export default Post;