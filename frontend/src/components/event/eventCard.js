import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import {Card, Form, FormControl, Button, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import moment from "moment";
import './eventhome.css';

class EventCard extends Component{

    constructor(){
        super();
        this.state = {
            loading: true,
            eventId: '',
            description: '',
            email: '',
            fandomId: '',
            eventName: '',
            date:"",
            deadline:"",
            array: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"],
            status:false,
            lat: 0,
            lng: 0,
            address: ''
        };
        this.getEvent = this.getEvent.bind(this);
        this.goToFandom = this.goToFandom.bind();
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    componentWillMount() {
        this.state.eventId = this.props.eventId;
        this.getEvent();
        this.state.num = Math.floor(Math.random() * this.state.array.length);
    }

    getEvent() {
        let eventId = {id: this.state.eventId};
        ApiService.getEvent(eventId)
        .then(res => {
               let data = res.data;
               if (data){
                //    this.state.loading = false;
                    this.setState({
                        loading:false,
                        eventName:data.eventName,
                        description:data.description,
                        owner:data.ownerEmail,
                        date:data.date,
                        deadline:data.deadline,
                        fandomId: data.fandomId,
                        lng: data.longitude,
                        lat: data.latitude,
                        address: data.address
                    });
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

    render() {
        if(this.state.loading) {
            return (<div className='loading'><Spinner animation='grow' variant="dark"/></div>);
        }

        return (
            <div>
                <a href={"/fandom/"+this.state.fandomId+"/event/"+this.state.eventId}>
                <Card border={this.state.array[this.state.num]} style={{ width: '18rem' }}>
                <Card.Header>Event</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.eventName}</Card.Title>
                        <Card.Text>
                            {this.state.description}
                        </Card.Text>
                        <Card.Text>
                            {moment(this.state.date).format("LL")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
            </div>
        );
    };
}


export default EventCard;