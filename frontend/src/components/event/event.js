import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {Button, Spinner, Card} from 'react-bootstrap';
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
            date:'',
            deadline:'',
            placeId: '',
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

    handleSelect = (address, placeId) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({
                placeId: placeId,
                address : address,
                lat: latLng.lat,
                lng: latLng.lng
            }))
            .catch(error => console.error('Error', error));
        console.log("Setting Location info");
        console.log(this.state);
    };


    handleChange = address => {
        this.setState({ address : address });
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
                deadline: this.state.deadline,
                placeId: this.state.placeId,
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
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <Input
                                    type="text"
                                    placeholder="location"
                                    name="location"
                                    className="form-control"
                                    value={this.state.address}
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown">
                                    {loading && <div><Spinner animation="grow" /></div>}
                                    {suggestions.map(suggestion => (
                                        <Card body
                                              border='dark'
                                              bg='light'
                                              style={{cursor: 'pointer', height: '0%', paddingBottom: 0}}>
                                            <div {...getSuggestionItemProps(suggestion)}>
                                                <Card.Text>{suggestion.description}</Card.Text>
                                            </div>
                                        </Card>

                                    ))}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
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