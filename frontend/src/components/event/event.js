import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {Form , FormControl, Button} from 'react-bootstrap';
import styles from 'bootstrap/dist/css/bootstrap.css';
import './event.css';

class Event extends Component{

    
    constructor(){
        super();
        this.state = {
            content: '',
            email: '',
            fandomId: '',
            title: '',
            date:"",
            deadline:"",
            lat: 0,
            lng: 0,
            address: '',
            status:false,
        };
        this.addEvent = this.addEvent.bind(this);
        this.goToFandom = this.goToFandom.bind();
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    addEvent = (e) => {
        e.preventDefault();
        if (!this.state.email){
            alert("Please log in first");
            this.props.history.push('/Login');
        }
        else{
            let user = {
                description: this.state.content,
                fandomId: this.state.fandomId,
                ownerEmail: this.state.email,
                eventName: this.state.title,
                date: this.state.date,
                deadline: this.state.date,
                longitude: this.state.lng,
                latitude: this.state.lat,
                address: this.state.address
            };
            console.log(user);
            ApiService.createEvent(user)
                .then(res => {
                    console.log("Success");
                    let data = res.data;
                    if (data){
                        console.log("Success");
                        let data = res.data;
                        console.log(data);
                        console.log("yes");
                        this.state.status = true;
                        alert("You have succesfully created the event");
                        this.props.history.push(`/fandom/`+this.state.fandomId);
                    }
                    else{
                        alert("No event");
                    }
                })
                .catch(error => {
                    alert("Somethong wrong event");
                    console.log("Fail");
                });
            }
    };

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.email = Cookies.get('email');
        this.state.fandomId = params.fandomId;
    }

    goToFandom = () => {
        this.props.history.push(`/fandom/`+this.state.fandomId);
    };

    render() {
        return (
            <form className="form">
            <h2>Create Event</h2>
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
                    <textarea placeholder = "Enter you description here" name="content" className="form-control" value={this.state.content} onChange={this.onChange}></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Location:</label>
                    <Input type="text" placeholder="location" name="location" className="form-control" value={this.state.location} onChange={this.onChange}/>
                </div>
                <div className="button-div">
                    <Button className="Event" onClick={this.addEvent}>Create Event</Button>
                    <Button className="Cancel" onClick={this.goToFandom}>Cancel</Button>
                </div>
            </form>
        );
    };
}


export default Event;